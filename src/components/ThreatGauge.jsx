import { RadialBarChart, RadialBar } from "recharts";

function ThreatGauge({ confidence }) {

    const percentage = confidence || 0;

    let threat = "NONE";

    if (percentage >= 80) {
        threat = "HIGH";
    }
    else if (percentage >= 50) {
        threat = "MEDIUM";
    }
    else if (percentage > 0) {
        threat = "LOW";
    }

    const color =
        threat === "HIGH"
            ? "#ef4444"
            : threat === "MEDIUM"
            ? "#f59e0b"
            : threat === "LOW"
            ? "#22c55e"
            : "#6b7280";

    const data = [
        {
            name: "Threat",
            value: percentage,
            fill: color,
        },
    ];

    return (
        <div
            style={{
                background: "#1E293B",
                padding: "20px",
                borderRadius: "15px",
                textAlign: "center",
                marginTop: "30px",
            }}
        >
            <h2>Threat Level</h2>

            <RadialBarChart
                width={300}
                height={300}
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={18}
                data={data}
                startAngle={90}
                endAngle={-270}
            >
                <RadialBar
                    background
                    dataKey="value"
                />
            </RadialBarChart>

            <h1 style={{ color }}>{percentage}%</h1>

            <p
                style={{
                    color,
                    fontWeight: "bold",
                    fontSize: "22px",
                }}
            >
                {threat}
            </p>
        </div>
    );
}

export default ThreatGauge;