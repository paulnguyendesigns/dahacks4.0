# main.py
import os
import json
import base64
import io
from flask_cors import CORS
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from openai import OpenAI
from PIL import Image

# ========== LOAD ENV ==========
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY missing in .env")

client = OpenAI(api_key=OPENAI_API_KEY)

# ========== FLASK SETUP ==========
app = Flask(__name__, static_folder="public", static_url_path="/public")
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# ============================================================
# ================   ANALYZE ENDPOINT   ======================
# ============================================================
@app.route("/analyze", methods=["POST"])
def analyze():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    try:
        # ===========================
        # 1. RESIZE & CONVERT IMAGE
        # ===========================
        img = Image.open(filepath)

        # FIX: convert RGBA/PNG → RGB BEFORE JPEG save
        if img.mode == "RGBA":
            img = img.convert("RGB")
        elif img.mode == "P":   # some PNGs use palette mode
            img = img.convert("RGB")

        MAX_SIZE = 1024
        img.thumbnail((MAX_SIZE, MAX_SIZE))

        buffer = io.BytesIO()
        img.save(buffer, format="JPEG", quality=85)
        compressed_bytes = buffer.getvalue()

        base64_string = base64.b64encode(compressed_bytes).decode()
        image_data_url = f"data:image/jpeg;base64,{base64_string}"

        # ===========================
        # 2. CALL OPENAI
        # (your original code unchanged)
        # ===========================
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a stylist and seasonal color analyst. "
                        "Return ONLY JSON with: "
                        '{"characteristic": string, "season": string,'
                        '"base_skin_hex": string, "hair_hex": string, '
                        '"eye_hex": string, '
                        '"palette": [{"name": string, "hex": string}], '
                        '"notes": [string] }'
                    ),
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": (
                                    """
Analyze the face in the image and determine the correct season from the 12-season color analysis system. 
Return ONLY one of these exact season names (spelled exactly as below):

Bright Spring
True Spring
Light Spring
Light Summer
True Summer
Soft Summer
Soft Autumn
True Autumn
Deep Autumn
Deep Winter
True Winter
Bright Winter

Next, return exactly ONE characteristic from the valid groupings below. 
Do NOT create new characteristic combinations:

• For Spring seasons → choose ONLY one: Bright, True, or Light
• For Summer seasons → choose ONLY one: Light, True, or Soft
• For Autumn seasons → choose ONLY one: Soft, True, or Deep
• For Winter seasons → choose ONLY one: Deep, True, or Bright

The characteristic MUST correctly match the season group. 
Never combine multiple descriptors (NOT 'Light Cool Soft'). Only ONE descriptor.

Focus the analysis ONLY on the user's skin, hair, and eye colors. 
Do NOT depend heavily on the background. 
Select a season whose palettes align naturally with real human undertones—not neon, artificial, or overly dull colors.

Return exactly:
• 24 flattering colors
• 5 helpful notes
• All 24 colors ordered in aesthetic rainbow/light-to-deep progression.

Your output MUST ensure the season name matches EXACTLY one of the 12 predefined season keys above so that our CelebMatches lookup always works.

                                    """
                            )
                        },
                        {
                            "type": "image_url",
                            "image_url": {"url": image_data_url}
                        }
                    ]
                }
            ],
        )

        content = response.choices[0].message.content
        analysis = json.loads(content)

        return jsonify({"analysis": analysis})

    except Exception as e:
        print("Error in /analyze:", e)
        return jsonify({"error": "Server error during analysis"}), 500

    finally:
        if os.path.exists(filepath):
            os.remove(filepath)

# ================   STATIC FILE SERVE   ====================
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

# ================   START SERVER   ==========================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=True)
