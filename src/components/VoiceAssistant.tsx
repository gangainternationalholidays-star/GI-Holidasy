import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Loader2, 
  Activity, 
  Square,
  Sparkles,
  RefreshCw,
  PhoneOff
} from "lucide-react";
import { GoogleGenAI, Modality } from "@google/genai";
import { cn } from "../lib/utils";

type VoiceAssistantProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Helper to convert Float32Array to Int16Array
function floatTo16BitPCM(input: Float32Array) {
  let offset = 0;
  const buffer = new ArrayBuffer(input.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}

export default function VoiceAssistant({ isOpen, onClose }: VoiceAssistantProps) {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string>("");

  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const outBufferRef = useRef<Int16Array[]>([]);

  const toggleSession = async () => {
    if (isActive) {
      stopSession();
    } else {
      startSession();
    }
  };

  const startSession = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Request microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Audio setup
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            setIsListening(true);
            
            processor.onaudioprocess = (e) => {
              if (isListening) {
                const inputData = e.inputBuffer.getChannelData(0);
                const pcmBuffer = floatTo16BitPCM(inputData);
                const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmBuffer)));
                session.sendRealtimeInput({
                  audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
                });
              }
            };
            source.connect(processor);
            processor.connect(audioCtx.destination);
          },
          onmessage: async (msg: any) => {
            // Handle Model Turn Parts (Audio)
            const audioData = msg.serverContent?.modelTurn?.parts?.find((p: any) => p.inlineData)?.inlineData?.data;
            if (audioData) {
              playAudioChunk(audioData);
            }

            // Handle Transcriptions
            if (msg.serverContent?.modelTurn?.parts?.[0]?.text) {
              // Handle text if needed
            }

            if (msg.serverContent?.interrupted) {
              outBufferRef.current = [];
              setIsSpeaking(false);
            }
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setError("Connection failed. Please try again.");
            stopSession();
          },
          onclose: () => {
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } } // Puck is a good professional voice. 
          },
          systemInstruction: `You are the official GI Holidays (Ganga International Holidays) AI Voice Assistant. 
          Your tone is professional, helpful, and energetic, reflecting a premier B2B Travel Management Company.
          You speak in a clear Indian accent. 
          You support multiple languages: English, Hindi, Punjabi, and other major Indian languages. 
          If someone speaks in Hindi, reply in Hindi. If Punjabi, reply in Punjabi. Default to a professional blend if appropriate.
          
          COMPANY INFO:
          - Name: GI Holidays (Ganga International Holidays)
          - Years of Expertise: 15+ years
          - Type: B2B Travel Management Company (BMC)
          - Contact: +91 93548 10841, info@giholidays.com, www.giholidays.com
          - Office: Dwarka Vihar, Najafgarh, New Delhi - 110043, India
          - Specialization: B2B Hotel Bookings (500k+ hotels), International Packages, Flight Management, Visa Assistance, MICE & Destination Weddings.
          
          PACKAGES:
          - Char Dham Yatra (12 Days - Custom & Fixed Departures)
          - Kashmir (6 Days - Srinagar & Pahalgam Specials)
          - Dubai B2B Special (4 Nights with Safari)
          - Switzerland Luxury, Bali, Singapore, and 40+ more.
          
          GOAL: Assist travel agents with destinations and services. Inform them that specific B2B net rates are available on the portal for registered agents. Encourage them to register on the B2B portal or request a callback. Do not quote specific prices.`
        }
      });
      sessionRef.current = session;

    } catch (err: any) {
      console.error("Session start error:", err);
      setIsConnecting(false);
      
      if (err.name === 'NotAllowedError' || err.message?.includes('denied')) {
        setError("Microphone access was denied. Please allow microphone permissions in your browser settings and try again.");
      } else if (err.name === 'SecurityError' || err.message?.includes('not allowed')) {
        setError("Microphone access is restricted by your browser. Please try opening the app in a new tab for full feature support.");
      } else {
        setError("Connection failed. Please ensure you have a working microphone and internet connection.");
      }
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setIsConnecting(false);
    setIsListening(false);
    setIsSpeaking(false);
    
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const playAudioChunk = (base64: string) => {
    if (!audioContextRef.current) return;
    setIsSpeaking(true);
    
    const binary = atob(base64);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) buffer[i] = binary.charCodeAt(i);
    
    const pcm = new Int16Array(buffer.buffer);
    const float32 = new Float32Array(pcm.length);
    for (let i = 0; i < pcm.length; i++) float32[i] = pcm[i] / 32768;

    const audioBuffer = audioContextRef.current.createBuffer(1, float32.length, 16000);
    audioBuffer.getChannelData(0).set(float32);
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);
    source.onended = () => {
      // Logic for tracking if still speaking can be complex without a queue
      // For now we just set false after a delay or track chunks
    };
    source.start();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#002366]/40 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-400 hover:text-red-500 transition-colors p-2"
        >
          <X size={24} />
        </button>

        <div className="p-12 text-center">
          <div className="mb-10 relative inline-block">
            <div className={cn(
              "w-24 h-24 rounded-full gold-gradient flex items-center justify-center text-[#002366] shadow-2xl relative z-10",
              isActive && "animate-pulse"
            )}>
              {isConnecting ? <Loader2 className="animate-spin" size={40} /> : <Sparkles size={40} />}
            </div>
            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-[#D4AF37]/20 rounded-full -z-10"
              />
            )}
          </div>

          <h2 className="text-3xl font-bold text-[#002366] mb-4 serif">GI Holidays AI Voice Agent</h2>
          <p className="text-slate-500 mb-12 text-lg font-medium leading-relaxed">
            {isActive 
              ? "Listening... Speak in Hindi, English, Punjabi or Tamil." 
              : isConnecting 
                ? "Connecting to satellite..." 
                : "Professional B2B Voice Support is ready."}
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-8 text-sm font-bold flex items-center gap-3 justify-center">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div className="space-y-4">
            {!isActive ? (
              <button
                onClick={startSession}
                className="w-full py-6 bg-[#002366] text-white rounded-2xl font-bold text-xl shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4 group"
              >
                <Mic size={24} className="group-hover:animate-bounce" /> Start Voice Chat
              </button>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex justify-center gap-4 mb-4">
                   <div className={cn("w-16 h-1 bg-[#D4AF37] rounded-full transition-all duration-300", isListening ? "scale-x-110 opacity-100" : "scale-x-50 opacity-20")} />
                   <div className={cn("w-16 h-1 bg-[#002366] rounded-full transition-all duration-300", isSpeaking ? "scale-x-110 opacity-100" : "scale-x-50 opacity-20")} />
                </div>
                <button
                  onClick={stopSession}
                  className="w-full py-6 bg-red-500 text-white rounded-2xl font-bold text-xl shadow-xl hover:bg-red-600 transition-all flex items-center justify-center gap-4"
                >
                  <PhoneOff size={24} /> End Conversation
                </button>
              </div>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-center gap-8 text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Professional AI</span>
            <span className="flex items-center gap-2"><Globe size={14} className="text-blue-500" /> Multi-Lingual</span>
            <span className="flex items-center gap-2"><Shield size={14} className="text-[#D4AF37]" /> B2B Verified</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AlertCircle({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
}

function CheckCircle({ size, className }: { size: number, className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
}

function Globe({ size, className }: { size: number, className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}

function Shield({ size, className }: { size: number, className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
