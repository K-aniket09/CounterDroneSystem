from ultralytics import YOLO
import os

# Load trained model
model = YOLO("best.pt")

# Folder containing test images
image_folder = "test_images"

# Find the first JPG/PNG image automatically
images = [
    f for f in os.listdir(image_folder)
    if f.lower().endswith((".jpg", ".jpeg", ".png"))
]

if not images:
    print("No images found!")
    exit()

image_path = os.path.join(image_folder, images[0])

print("Testing image:", image_path)

# Run detection
results = model.predict(
    source=image_path,
    conf=0.25,
    save=True,
    project="output",
    name="prediction",
    exist_ok=True
)

print("Detection completed successfully!")