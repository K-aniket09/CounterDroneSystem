import { useEffect, useState } from "react";
import { getDetection } from "./services/api";
import "./App.css";
import DetectionChart from "./components/DetectionChart";
import ThreatGauge from "./components/ThreatGauge";

function App() {
  const [detection, setDetection] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadDetection = async () => {
    if (!selectedFile) {
        alert("Please choose an image first.");
        return;
    }
    
    try {

        const data = await getDetection(selectedFile);

        setDetection(data);

    }
    catch(err){

        console.log(err);

    }

};

useEffect(() => {
    console.log("useEffect started");

    loadDetection();
}, []);

    

  return (
    <div className="container">
      <button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  style={{
    position: "fixed",
    top: "18px",
    left: "18px",
    width: "48px",
    height: "48px",
    borderRadius: "8px",
    border: "none",
    background: "#1E293B",
    color: "white",
    fontSize: "28px",
    cursor: "pointer",
    zIndex: 2000,
  }}
>
  ☰
</button>
      {/* SIDEBAR */}
<div
  className={`sidebar ${sidebarOpen ? "open" : "closed"}`}
  style={{
    left: sidebarOpen ? "0" : "-330px",
    transition: "0.35s ease",
    position: "fixed",
    top: 0,
    zIndex: 1000,
  }}
>        <h2>🛡 AI-Counter Drone</h2>
        <nav className="sidebar-nav">
            <a href="#dashboard" className="activeLink">Dashboard</a>
            <a href="#live">Live Detection</a>
            <a href="#history">Threat Analysis</a>
            <a href="#trajectory">Trajectory</a>
            <a href="#history">History</a>
            <a href="#mission">Reports</a>
            <a href="#mission">Settings</a>
        </nav>
      </div>

      {/* MAIN CONTENT */}
<div
    className={`main ${sidebarOpen ? "" : "full"}`}
>        
        {/* TOP NAVBAR */}
        <div className="navbar">
          <h1>AI Counter-Drone Command Center & Threat Monitoring System</h1>
          <div className="status">
            AI Status: <span className="status-running">Running</span>
          </div>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="cards" id="dashboard">
          <div className="card">
    <h3>📡 Active Drones</h3>

    <h2>
        {detection
            ? `${detection.drone_count} ${
                  detection.drone_count === 1 ? "Drone" : "Drones"
              }`
            : "Loading..."}
    </h2>
</div>
          <div className="card">
            <h3>⚠️ Threat Level</h3>
            <h2 style={{
                  color:
                  detection?.threat === "HIGH"
                  ? "red"
                  : detection?.threat === "MEDIUM"
                  ? "orange"
                  : detection?.threat === "LOW"
                  ? "lime"
                  : "gray"
  }}
>
  {detection ? detection.threat : "Loading..."}</h2>
          </div>
          <div className="card">
            <h3>📹 Camera</h3>
            <h2 style={{ color: "lime" }}>ONLINE</h2>
          </div>
        </div>

        {/* LIVE CAMERA SECTION */}
        <div className="cameraSection" id="live">
          <div className="camera">
            <h2>🛰 Drone Detection Output</h2>
            <div style={{
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px"
}}>

    <input
        type="file"
        accept="image/*"
        onChange={(e)=>setSelectedFile(e.target.files[0])}
    />

    <button
        className="randomButton"
        onClick={loadDetection}

    >
        Detect Image
    </button>

</div>
            <div className="video">
              {detection?.image ? (
                <img
                  src={detection.image}
                  alt="Drone Detection"
                  className="detection-image"
                />
              ) : (
                <div className="cameraOverlay">
                  <h1>📹 LIVE CAMERA</h1>
                  <p>Loading Detection...</p>
                </div>
              )}
            </div>
          </div>

          <div className="systemCard">
            <h2>⚙️ System Status</h2>
            <p><strong>GPU:</strong> Tesla T4</p>
            <p><strong>Model:</strong> YOLO11n</p>
            <p><strong>Camera:</strong> 🟢 Online</p>
            <p><strong>Detection:</strong> {detection ? detection.drone_count : "--"} Drone(s)</p>
            <p><strong>Confidence:</strong> {detection ? `${detection.confidence}%` : "--"}</p>
          </div>
        </div>

        {/* DRONE INFO & THREAT GAUGE */}
        <div className="bottom-section">
          <div className="box">
            <h2>Drone Information</h2>
            <p><strong>Drone ID:</strong> D-001</p>
            <p><strong>Confidence:</strong> {detection ? `${detection.confidence}%` : "Loading..."}</p>
            <p><strong>Speed:</strong> 12 m/s</p>
            <p><strong>Altitude:</strong> 42 m</p>
            <p><strong>Status:</strong> Tracking</p>
          </div>
          <div className="gauge-container">
          <ThreatGauge confidence={detection?.confidence || 0} />
          </div>
        </div>

        {/* HISTORY & ALERTS */}
        <div className="dashboard-grid" id="history">
          <div className="history">
            <h2>Detection History</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Object</th>
                  <th>Confidence</th>
                  <th>Altitude</th>
                  <th>Threat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>D001</td>
                  <td>Drone</td>
                  <td>98%</td>
                  <td>42 m</td>
                  <td className="threat-high">HIGH</td>
                </tr>
                <tr>
                  <td>D002</td>
                  <td>Drone</td>
                  <td>95%</td>
                  <td>38 m</td>
                  <td className="threat-medium">MEDIUM</td>
                </tr>
                <tr>
                  <td>D003</td>
                  <td>Drone</td>
                  <td>91%</td>
                  <td>55 m</td>
                  <td className="threat-low">LOW</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="alerts">
            <h2>🚨 Active Alerts</h2>
            <div className="alert highAlert">
              <strong>HIGH THREAT</strong><br />
              🚨 Drone D001 entered Restricted Zone
            </div>
            <div className="alert mediumAlert">
              <strong>MEDIUM THREAT</strong><br />
              ⚠ Drone hovering near Building B
            </div>
            <div className="alert lowAlert">
              <strong>LOW THREAT</strong><br />
              ✅ Drone leaving monitored area
            </div>
          </div>
        </div>

        {/* TRAJECTORY CHART */}
        <div id="trajectory" className="trajectory-section">
          <h2>Flight Trajectory</h2>
          <DetectionChart />
        </div>

        {/* MISSION STATUS */}
        <div className="missionStatus" id="mission">
          <h2>🛰️ Mission Status</h2>
          <div className="missionGrid">
            <div className="missionItem">
              <h3>Mission</h3>
              <p>Surveillance</p>
            </div>
            <div className="missionItem">
              <h3>Zone</h3>
              <p>Sector A</p>
            </div>
            <div className="missionItem">
              <h3>Weather</h3>
              <p>Clear ☀️</p>
            </div>
            <div className="missionItem">
              <h3>Signal</h3>
              <p>Excellent</p>
            </div>
            <div className="missionItem">
              <h3>Tracking</h3>
              <p>Enabled</p>
            </div>
            <div className="missionItem">
              <h3>Threat Mode</h3>
              <p style={{ color: "#ef4444", fontWeight: "bold" }}>ACTIVE</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="footerStatus">
          <span>🟢 System Online</span>
          <span>📡 Connected to Camera</span>
          <span>🤖 YOLO11n Loaded</span>
          <span>⚡ Detection Speed: 28 FPS</span>
        </div>

      </div>
    </div>
  );
}

export default App;