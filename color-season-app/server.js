// server.js  (ESM version)
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import OpenAI from "openai";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

// --- CHECK API KEY ---
if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY missing in .env");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory celeb data (you can expand later)
const celebrities = [
  {
    name: "Zendaya",
    season: "Deep Autumn",
    profileImage:
      "https://via.placeholder.com/300x400.png?text=Zendaya",
    outfits: [
      {
        image:
          "https://via.placeholder.com/80.png?text=Outfit+1",
        description: "Rust dress with deep teal earrings.",
      },
    ],
    note: "Looks amazing in rich warm tones like rust, teal, and gold.",
  },
  {
    name: "Priyanka Chopra",
    season: "Deep Autumn",
    profileImage:
      "https://via.placeholder.com/300x400.png?text=Priyanka",
    outfits: [
      {
        image:
          "https://via.placeholder.com/80.png?text=Outfit+1",
        description: "Terracotta gown with gold jewelry.",
      },
    ],
    note: "Warm jewel tones and earthy colors flatter her undertones.",
  },
];

// middleware
app.use(cors());
app.use(express.static("public")); // serves index.html etc.

// ========== /analyze ==========
app.post("/analyze", upload.single("file"), async (req, res) => {
  console.log("Analyze endpoint");
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64 = imageBuffer.toString("base64");
    const mime = req.file.mimetype || "image/jpeg";
    const imageDataUrl = `data:${mime};base64,${base64}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a stylist and seasonal color analyst. " +
            "Return ONLY JSON with this structure: " +
            "{ \"season\": string, " +
            "\"confidence\": number, " +
            "\"base_skin_hex\": string, " +
            "\"hair_hex\": string, " +
            "\"eye_hex\": string, " +
            "\"palette\": [{\"name\": string, \"hex\": string}], " +
            "\"notes\": [string] }",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                "Look at this face and decide the best season from the 12-season system. " +
                "Then create 8-12 flattering colors (hex codes) with simple names. " +
                "Explain briefly in 3-5 bullet notes.",
            },
            {
              type: "image_url",
              image_url: { url: imageDataUrl },
            },
          ],
        },
      ],
    });

    const content = completion.choices?.[0]?.message?.content;
    if (!content) {
      console.error("No content returned from OpenAI:", completion);
      return res
        .status(500)
        .json({ error: "AI did not return any content" });
    }

    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch (e) {
      console.error("Could not parse AI JSON:", content);
      return res
        .status(500)
        .json({ error: "AI returned invalid JSON" });
    }

    return res.json({ analysis });
  } catch (err) {
    console.error("Error in /analyze:", err);
    return res
      .status(500)
      .json({ error: "Server error during analysis" });
  } finally {
    fs.unlink(req.file.path, () => {});
  }
});

// ========== /celebrities ==========
app.get("/celebrities", (req, res) => {
  const season = req.query.season;
  if (!season || typeof season !== "string") {
    return res
      .status(400)
      .json({ error: "Missing ?season= query parameter" });
  }

  const normalized = season.toLowerCase();
  const matches = celebrities.filter(
    (c) => c.season.toLowerCase() === normalized
  );

  res.json({ season, celebrities: matches });
});

// ========== START SERVER ==========
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
