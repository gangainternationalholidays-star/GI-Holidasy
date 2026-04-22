# Security Specification for GI Holidays

## Data Invariants
1. **Packages**: Read-only for public/agents. Write-only for Admins.
2. **Leads**: Create-only for public. Read/Write for Admins.
3. **Bookings**: Users/Agents can read/create their own bookings. Admins have full access.
4. **Agents**: Agents can read/update their own profile (restricted fields). Admins have full access.

## The "Dirty Dozen" Payloads (Denial Tests)
1. **Spoofed Package Edit**: Attempting to update a package price by a non-admin.
2. **Lead Data Hijack**: Attempting to read all leads as a non-authenticated user.
3. **Booking Identity Spoofing**: Creating a booking with a `userId` that doesn't match `request.auth.uid`.
4. **Agent Wallet Inflation**: Attempting to update `walletBalance` manually.
5. **Admin Claim Forgery**: Attempting to update a field by providing a forged `isAdmin` token (if we used tokens, but we use DB lookup).
6. **Cross-Agent Data Access**: Agent A trying to read Agent B's profile.
7. **Malformed ID Attack**: Sending a 2KB string as a `packageId`.
8. **Shadow Field Injection**: Adding an `isVerified: true` field to a lead creation by a public user.
9. **Terminal State Bypass**: Attempting to change a `Confirmed` booking to `Cancelled` without authorization.
10. **Resource Exhaustion**: Sending a 1MB message string in a lead inquiry.
11. **Relational Ghosting**: Creating a booking for a `packageId` that does not exist.
12. **PII Leakage**: Attempting to list all user emails from the `agents` collection as a guest.
