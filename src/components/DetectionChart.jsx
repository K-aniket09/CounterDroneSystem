import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label,
} from "recharts";

const data = [
  { time: "10:00", drones: 1 },
  { time: "10:10", drones: 2 },
  { time: "10:20", drones: 3 },
  { time: "10:30", drones: 5 },
  { time: "10:40", drones: 4 },
  { time: "10:50", drones: 6 },
];

function DetectionChart() {
  return (
    <div
      style={{
        background: "#1E293B",
        padding: "20px",
        borderRadius: "15px",
        marginTop: "30px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "white",
          textAlign: "center",
        }}
      >
        Real-Time Drone Detection Trend
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid stroke="#334155" strokeDasharray="5 5" />

          <XAxis dataKey="time" stroke="#CBD5E1">
            <Label
              value="Time"
              position="insideBottom"
              offset={-10}
              fill="#CBD5E1"
            />
          </XAxis>

          <YAxis stroke="#CBD5E1">
            <Label
              value="Number of Drones"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
              fill="#CBD5E1"
            />
          </YAxis>

          <Tooltip
            contentStyle={{
              backgroundColor: "#0F172A",
              border: "1px solid #334155",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="drones"
            stroke="#3B82F6"
            strokeWidth={4}
            dot={{
              r: 6,
              fill: "#3B82F6",
            }}
            activeDot={{
              r: 8,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DetectionChart;