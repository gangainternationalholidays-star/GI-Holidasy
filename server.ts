import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/inquiry", async (req, res) => {
    try {
      const formData = req.body;
      console.log("Inquiry received:", formData);
      
      // In a real app, you'd push to Google Sheets here or via client side.
      // We'll simulate success.
      res.json({ success: true, message: "Inquiry submitted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Submission failed" });
    }
  });

  app.post("/api/b2b-register", async (req, res) => {
    try {
      const formData = req.body;
      console.log("B2B Registration:", formData);
      res.json({ success: true, message: "Registration request sent successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Registration failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve static files from 'dist'
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
