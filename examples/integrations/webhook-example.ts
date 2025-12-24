/**
 * Winmem Webhook Receiver Example
 *
 * This is a small Node server that receives Winmem webhooks.
 * It verifies the signature using a shared secret and prints the event.
 *
 * Run:
 *   pnpm add express body-parser
 *   WINMEM_WEBHOOK_SECRET=... ts-node webhook-example.ts
 */
import express from "express";
import crypto from "crypto";

const app = express();

// Keep the raw body for signature verification
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    }
  })
);

function verifySignature(rawBody: Buffer, signature: string, secret: string) {
  const mac = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(mac, "hex"), Buffer.from(signature, "hex"));
}

app.post("/winmem-webhook", (req: any, res) => {
  const secret = process.env.WINMEM_WEBHOOK_SECRET || "";
  const sig = (req.headers["x-winmem-signature"] || "").toString();

  if (!secret) return res.status(500).send("Missing WINMEM_WEBHOOK_SECRET");
  if (!sig) return res.status(401).send("Missing signature");

  if (!verifySignature(req.rawBody, sig, secret)) {
    return res.status(401).send("Invalid signature");
  }

  console.log("Webhook event:", JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
});

app.listen(8081, () => console.log("Listening on http://localhost:8081"));
