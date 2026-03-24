import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { useData } from "../context/DataContext";
import { Grid } from "@mui/material";

// ── Custom Tooltip ────────────────────────────────────────────────────────────
const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0f172a",
      border: "1px solid #1e293b",
      borderRadius: 10,
      padding: "10px 14px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.8rem",
      color: "#fff",
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    }}>
      <div style={{ color: "#94a3b8", marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: p.fill }} />
          <span style={{ color: "#cbd5e1", textTransform: "capitalize" }}>{p.dataKey}:</span>
          <span style={{ fontWeight: 600 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const CustomPieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0f172a",
      border: "1px solid #1e293b",
      borderRadius: 10,
      padding: "10px 14px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.8rem",
      color: "#fff",
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: payload[0].payload.fill }} />
        <span style={{ color: "#94a3b8" }}>{payload[0].name}:</span>
        <span style={{ fontWeight: 600 }}>{payload[0].value}</span>
      </div>
    </div>
  );
};

// ── Stat Chip ─────────────────────────────────────────────────────────────────
const StatChip = ({ label, value, color, bg }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 8,
    padding: "5px 12px", borderRadius: 99,
    background: bg, border: `1.5px solid ${color}22`,
  }}>
    <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
    <span style={{ fontSize: "0.75rem", fontWeight: 600, color, fontFamily: "'DM Sans', sans-serif" }}>
      {value} {label}
    </span>
  </div>
);

// ── Card wrapper ──────────────────────────────────────────────────────────────
const ChartCard = ({ title, subtitle, chips, children }) => (
  <div style={{
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: "24px 24px 16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
  }}>
    {/* Header */}
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
      <div>
        <p style={{
          margin: 0,
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "#0f172a",
        }}>{title}</p>
        {subtitle && (
          <p style={{
            margin: "3px 0 0",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            color: "#94a3b8",
            fontWeight: 400,
          }}>{subtitle}</p>
        )}
      </div>
      {chips && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {chips}
        </div>
      )}
    </div>
    {children}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const Charts = () => {
  const { rooms, complaints } = useData();

  const roomData = rooms.map((room) => ({
    name: `R${room.number}`,
    Occupied: room.occupied,
    Capacity: Number(room.capacity),
    Available: Number(room.capacity) - room.occupied,
  }));

  const pending  = complaints.filter((c) => c.status === "Pending").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const total    = pending + resolved;

  const complaintData = [
    { name: "Pending",  value: pending,  fill: "#f59e0b" },
    { name: "Resolved", value: resolved, fill: "#10b981" },
  ];

  const totalOccupied  = rooms.reduce((s, r) => s + r.occupied, 0);
  const totalCapacity  = rooms.reduce((s, r) => s + Number(r.capacity), 0);
  const occupancyRate  = totalCapacity ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');
      `}</style>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* ── Bar Chart ── */}
        <Grid item xs={12} md={7}>
          <ChartCard
            title="Room Occupancy"
            subtitle="Occupied vs total capacity per room"
            chips={[
              <StatChip key="occ" label="Occupied" value={totalOccupied} color="#2563eb" bg="#dbeafe" />,
              <StatChip key="rate" label="Rate" value={`${occupancyRate}%`} color="#0891b2" bg="#cffafe" />,
            ]}
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={roomData} barGap={3} barCategoryGap="30%">
                <XAxis
                  dataKey="name"
                  tick={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "#f8fafc" }} />
                <Bar dataKey="Occupied" fill="#2563eb" radius={[6, 6, 0, 0]} maxBarSize={32} />
                <Bar dataKey="Capacity" fill="#bfdbfe"  radius={[6, 6, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8 }}>
              {[
                { color: "#2563eb", label: "Occupied" },
                { color: "#bfdbfe",  label: "Capacity" },
              ].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: l.color }} />
                  <span style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>
        </Grid>

        {/* ── Pie Chart ── */}
        <Grid item xs={12} md={5}>
          <ChartCard
            title="Complaint Status"
            subtitle={`${total} total complaints logged`}
            chips={[
              <StatChip key="p" label="Pending"  value={pending}  color="#f59e0b" bg="#fef3c7" />,
              <StatChip key="r" label="Resolved" value={resolved} color="#10b981" bg="#d1fae5" />,
            ]}
          >
            <div style={{ position: "relative" }}>
              <ResponsiveContainer width="100%" height={230}>
                <PieChart>
                  <Pie
                    data={complaintData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {complaintData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Donut center label */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                pointerEvents: "none",
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  lineHeight: 1,
                }}>{total}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  color: "#94a3b8",
                  fontWeight: 500,
                  marginTop: 3,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}>Total</div>
              </div>
            </div>

            {/* Bottom resolution rate bar */}
            <div style={{ marginTop: 12, padding: "0 4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.73rem", color: "#94a3b8", fontWeight: 500 }}>
                  Resolution rate
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.73rem", color: "#0f172a", fontWeight: 700 }}>
                  {total ? Math.round((resolved / total) * 100) : 0}%
                </span>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: "#f1f5f9", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${total ? (resolved / total) * 100 : 0}%`,
                  background: "linear-gradient(90deg, #10b981, #34d399)",
                  borderRadius: 99,
                  transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
                }} />
              </div>
            </div>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Charts;
