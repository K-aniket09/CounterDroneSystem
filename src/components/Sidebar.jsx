import { useState } from "react";
import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "Live Detection", path: "/live" },
  { name: "Threat Analysis", path: "/threat" },
  { name: "Trajectory", path: "/trajectory" },
  { name: "History", path: "/history" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          fontSize: "30px",
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          zIndex: 1001,
        }}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: open ? 0 : "-280px",
          width: "250px",
          height: "100vh",
          background: "#111827",
          padding: "20px",
          transition: "0.3s",
          zIndex: 1000,
        }}
      >
        <h2
          style={{
            color: "#60A5FA",
            marginTop: "50px",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          AI-Counter Drone
        </h2>

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "18px",
              color: "white",
              textDecoration: "none",
              borderRadius: "12px",
              marginBottom: "15px",
              background: "#1E293B",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </>
  );
}