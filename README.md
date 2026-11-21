# AI Counter-Drone Command Center & Threat Monitoring System

A web dashboard that detects drones in images using a custom-trained **YOLOv11n** model. A React + Vite frontend sends images to a Flask backend, which runs the model and returns the detections. The dashboard then shows the bounding boxes, drone count, confidence and threat level.

![Dashboard](screenshots/dashboard.png)

## Demo

Watch the demo video: **[ADD YOUR VIDEO LINK HERE]**

## Features

- Upload an image and detect drones with bounding boxes and confidence scores
- Live drone count, threat level and system status panel
- Custom YOLOv11n model trained on about 30,000 images
- Separate frontend and backend, connected through a simple REST API

## Model Performance

Single class (`drone`), trained for 20 epochs on about 30,000 images.

| Metric | Value |
|---|---|
| mAP@0.5 | 0.949 |
| mAP@0.5:0.95 | 0.635 |
| Precision | 0.925 |
| Recall | 0.91 |
| Best F1 | 0.92 at confidence 0.35 |
| Detection speed | 28 FPS on [ADD HARDWARE] |

Training curves and evaluation plots:

| Precision-Recall curve | Training results |
|---|---|
| ![PR curve](docs/PR_curve.png) | ![Results](docs/results.png) |

## Tech Stack

| Part | Technology |
|---|---|
| Model | YOLOv11n (Ultralytics), PyTorch |
| Backend | Python, Flask, Flask-CORS, OpenCV |
| Frontend | React, Vite, JavaScript |

## Project Structure

```
CounterDroneSystem/
├── backend/
│   ├── app.py              Flask server (POST /detect)
│   ├── detect.py           Model loading and inference
│   ├── best.pt             Trained YOLOv11n weights
│   └── requirements.txt    Python dependencies
├── src/
│   ├── components/         Dashboard UI components
│   ├── pages/              Dashboard pages
│   ├── services/api.js     Calls the backend API
│   └── ...
├── public/
├── docs/                   Evaluation plots
├── screenshots/            Dashboard screenshots
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Python 3.10 or newer
- Node.js 20.19 or newer
- Git

### Step 1: Clone the repository

```bash
git clone https://github.com/K-aniket09/CounterDroneSystem.git
cd CounterDroneSystem
```

### Step 2: Start the backend

Open a terminal in the project folder and run:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

On macOS or Linux, activate the environment with `source venv/bin/activate` instead.

Wait until the terminal shows `Running on http://127.0.0.1:5000`. Keep this terminal open.

### Step 3: Start the frontend

Open a **second** terminal in the project folder (not inside `backend`) and run:

```bash
npm install
npm run dev
```

### Step 4: Open the dashboard

Go to **http://localhost:5173/** in your browser.

### Step 5: Run a detection

1. Click **Choose File** and select an image that contains a drone.
2. Click **Detect Image**.
3. The detection output shows the bounding boxes. The panels above and beside it show the drone count, threat level and confidence.

The backend must be running before you click **Detect Image**.

## API

The frontend talks to the backend through one endpoint.

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/detect` | form-data, key `image` (the image file) | Runs the model and returns the detections as JSON |

Example with curl:

```bash
curl -X POST -F "image=@sample.jpg" http://127.0.0.1:5000/detect
```

## Configuration

- **Backend address:** change `API_URL` in `src/services/api.js` if the backend runs on a different host or port.
- **Confidence threshold:** set `conf` in the model call in `backend/detect.py`. The F1 curve peaks at 0.35, which is a good starting point. A lower value finds more small drones but gives more false detections.
- **Overlapping boxes:** lower the `iou` value in the same call to merge duplicate boxes on one drone.

## Troubleshooting

| Problem | Fix |
|---|---|
| Detection keeps loading, or the browser shows a failed `detect` request | The backend is not running. Start it (Step 2) and keep its terminal open. |
| `python` is not recognized | Install Python and tick "Add to PATH", or use `py` instead of `python`. |
| `ModuleNotFoundError` in the backend terminal | Activate the virtual environment and run `pip install -r requirements.txt` again. |
| CORS error in the browser console | Make sure `app.py` uses Flask-CORS (`CORS(app)`). |
| Port 5000 already in use | Stop the other program, or change the port in `app.py` and `src/services/api.js`. |
| `npm` is not recognized | Install Node.js from nodejs.org and restart the terminal. |

## Limitations

- The model detects one class (drone) and was trained on still images.
- Small or distant drones may be missed at higher confidence thresholds.
- The backend runs locally and is not set up for public hosting.

## Author

**Aniket Narendra Kunghadkar**
Final-year B.Tech Electronics Engineering, NIELIT
GitHub: [K-aniket09](https://github.com/K-aniket09)
