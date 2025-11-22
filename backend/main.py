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

# ========== CELEBRITY DATA ==========
celebrities = [
    {
        "name": "Zendaya",
        "season": "Deep Autumn",
        "profileImage": "https://via.placeholder.com/300x400.png?text=Zendaya",
        "outfits": [
            {
                "image": "https://via.placeholder.com/80.png?text=Outfit+1",
                "description": "Rust dress with deep teal earrings."
            }
        ],
        "note": "Looks amazing in rich warm tones like rust, teal, and gold."
    },
    {
        "name": "Priyanka Chopra",
        "season": "Deep Autumn",
        "profileImage": "https://via.placeholder.com/300x400.png?text=Priyanka",
        "outfits": [
            {
                "image": "https://via.placeholder.com/80.png?text=Outfit+1",
                "description": "Terracotta gown with gold jewelry."
            }
        ],
        "note": "Warm jewel tones and earthy colors flatter her undertones."
    },
]

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
        # 1. RESIZE & COMPRESS IMAGE
        # ===========================
        img = Image.open(filepath)

        MAX_SIZE = 1024  # safe for OpenAI
        img.thumbnail((MAX_SIZE, MAX_SIZE))  # maintains aspect ratio

        buffer = io.BytesIO()
        img.save(buffer, format="JPEG", quality=85)
        compressed_bytes = buffer.getvalue()

        base64_string = base64.b64encode(compressed_bytes).decode()
        image_data_url = f"data:image/jpeg;base64,{base64_string}"

        # ===========================
        # 2. CALL OPENAI
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
                        '{ "season": string, "confidence": number, '
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
                                "Analyze the face in the image and determine the season from the 12-season system. "
                                "Return 8–12 flattering colors and 3–5 notes."
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

# ============================================================
# ================   CELEBRITIES ENDPOINT   ==================
# ============================================================
@app.route("/celebrities", methods=["GET"])
def get_celebrities():
    season = request.args.get("season")
    if not season:
        return jsonify({"error": "Missing ?season= query parameter"}), 400

    normalized = season.lower()
    matches = [c for c in celebrities if c["season"].lower() == normalized]

    return jsonify({"season": season, "celebrities": matches})

# ============================================================
# ================   STATIC FILES SERVING   ==================
# ============================================================
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

# ============================================================
# ================   START SERVER   ==========================
# ============================================================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=True)
