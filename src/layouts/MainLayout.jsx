import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#0F172A",
        color: "white",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <div
          style={{
            flex: 1,
            padding: "20px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}