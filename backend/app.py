print("************* NEW APP.PY IS RUNNING *************")

from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from ultralytics import YOLO
import os
import random

app = Flask(__name__)
CORS(app)

# Load YOLO model only once
print("Loading YOLO model...")
model = YOLO("best.pt")
print("Model loaded successfully!")

# Folder containing test images
IMAGE_FOLDER = "test_images"

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return jsonify({
        "message": "Counter Drone Backend Running"
    })


@app.route("/detect", methods=["GET", "POST"])
def detect():

    print("\n========== DETECT API CALLED ==========")

    # Find all images
    if request.method == "POST":

        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"})

        file = request.files["image"]

        selected_image = file.filename

        image_path = os.path.join(UPLOAD_FOLDER, selected_image)

        file.save(image_path)

    else:

        images = [
        f for f in os.listdir(IMAGE_FOLDER)
        if f.lower().endswith((".jpg", ".jpeg", ".png"))
        ]

        selected_image = random.choice(images)

        image_path = os.path.join(IMAGE_FOLDER, selected_image)

    

    # Run YOLO Detection
    results = model.predict(
        source=image_path,
        conf=0.25,
        save=True,
        project="runs",
        name="prediction",
        exist_ok=True
    )

    print("YOLO Prediction Completed")

    boxes = results[0].boxes

    drone_count = len(boxes)

    confidence = 0

    if drone_count > 0:
        confidence = round(float(boxes.conf[0]) * 100, 2)

    print("Drone Count :", drone_count)
    print("Confidence :", confidence)

    print("Prediction Image Saved")
    print("=======================================\n")
    
    if confidence >= 80:
        threat = "HIGH"
    elif confidence >= 50:
        threat = "MEDIUM"
    elif confidence > 0:
        threat = "LOW"
    else:
        threat = "NONE"

    return jsonify({

        "image": f"http://127.0.0.1:5000/image/{selected_image}",
        "drone_count": drone_count,
        "confidence": confidence,
        "threat": threat
    })


# Route to send predicted image
@app.route("/image/<filename>")
def image(filename):
    return send_from_directory(
        os.path.join(app.root_path, "runs", "detect", "runs", "prediction"),
        filename
    )


if __name__ == "__main__":
    app.run(debug=True)