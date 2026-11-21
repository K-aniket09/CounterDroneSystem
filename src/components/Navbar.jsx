export default function Navbar() {
  return (
    <div
      style={{
        height: "70px",
        background: "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 25px",
      }}
    >
      <h2>AI Counter-Drone Command Center</h2>

      <div>
        AI Status :
        <span
          style={{
            color: "#22C55E",
            marginLeft: "10px",
          }}
        >
          Running
        </span>
      </div>
    </div>
  );
}