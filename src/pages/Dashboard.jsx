import Layout from "../components/Layout";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

import {
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Box,
  Divider,
  Stack,
} from "@mui/material";

// ─── Corporate design tokens ──────────────────────────────────────────────────
const corp = {
  navy: "#0A1628",
  navyMid: "#162340",
  steel: "#1E3A5F",
  accent: "#0057FF",
  surface: "#F4F6FA",
  border: "#DDE3EE",
  textPrimary: "#0A1628",
  textSecondary: "#5A6A85",
};

const monoLabel = {
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: corp.textSecondary,
};

const sectionTitle = {
  fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.5px",
  color: corp.textPrimary,
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ title, value, accent, icon, subtitle }) => (
  <Card
    elevation={0}
    sx={{
      border: `1px solid ${corp.border}`,
      borderRadius: "10px",
      background: "#fff",
      transition: "box-shadow 0.2s, transform 0.2s",
      "&:hover": {
        boxShadow: "0 8px 32px rgba(10,22,40,0.10)",
        transform: "translateY(-3px)",
      },
      overflow: "hidden",
      position: "relative",
    }}
  >
    {/* Top accent bar */}
    <Box sx={{ height: 3, background: accent }} />
    <CardContent sx={{ p: 2.5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography sx={{ ...monoLabel, mb: 1 }}>{title}</Typography>
          <Typography
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: 36,
              lineHeight: 1,
              color: corp.textPrimary,
            }}
          >
            {value}
          </Typography>
          {subtitle && (
            <Typography sx={{ color: corp.textSecondary, fontSize: 12, fontFamily: "'DM Sans', sans-serif", mt: 0.8 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "10px",
            background: `${accent}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// ─── Info Row ─────────────────────────────────────────────────────────────────
const InfoRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1.4 }}>
    <Typography sx={{ ...monoLabel }}>{label}</Typography>
    <Typography
      sx={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        color: corp.textPrimary,
      }}
    >
      {value || "N/A"}
    </Typography>
  </Box>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const { rooms = [], students = [], complaints = [] } = useData();
  const { user } = useAuth();

  // ── Student View ────────────────────────────────────────────────────────────
  if (user?.role === "student") {
    const currentStudent = students.find((s) => s.name === user?.name);
    const myRoom = rooms.find((r) => r.number === currentStudent?.room);
    const roommates = students.filter(
      (s) => s.room === currentStudent?.room && s.name !== user?.name
    );

    return (
      <Layout>
        {/* Page Header */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${corp.navy} 0%, ${corp.steel} 100%)`,
            borderRadius: "10px",
            px: 4,
            py: 3.5,
            mb: 3,
          }}
        >
          <Typography
            sx={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase" }}
          >
            Resident Portal
          </Typography>
          <Typography variant="h4" sx={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, mt: 0.5, letterSpacing: "-0.5px" }}>
            My Dashboard
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "'DM Sans', sans-serif", mt: 0.5 }}>
            Welcome back, {user?.name}
          </Typography>
        </Box>

        {currentStudent ? (
          <Grid container spacing={2.5}>
            {/* Profile Card */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{ border: `1px solid ${corp.border}`, borderRadius: "10px", overflow: "hidden" }}
              >
                <Box sx={{ background: corp.surface, px: 3, py: 2, borderBottom: `1px solid ${corp.border}` }}>
                  <Typography sx={{ ...sectionTitle, fontSize: 14 }}>Personal Information</Typography>
                </Box>
                <Box sx={{ px: 3 }}>
                  <InfoRow label="Full Name" value={currentStudent.name} />
                  <Divider sx={{ borderColor: corp.border }} />
                  <InfoRow label="Department" value={currentStudent.department} />
                  <Divider sx={{ borderColor: corp.border }} />
                  <InfoRow label="Batch" value={currentStudent.batch} />
                  <Divider sx={{ borderColor: corp.border }} />
                  <InfoRow label="Gender" value={currentStudent.gender} />
                </Box>
              </Paper>
            </Grid>

            {/* Room Card */}
            <Grid item xs={12} md={7}>
              <Paper
                elevation={0}
                sx={{ border: `1px solid ${corp.border}`, borderRadius: "10px", overflow: "hidden" }}
              >
                <Box sx={{ background: corp.surface, px: 3, py: 2, borderBottom: `1px solid ${corp.border}` }}>
                  <Typography sx={{ ...sectionTitle, fontSize: 14 }}>Room Assignment</Typography>
                </Box>
                <Box sx={{ px: 3 }}>
                  <InfoRow label="Room Number" value={currentStudent.room} />
                  <Divider sx={{ borderColor: corp.border }} />
                  <InfoRow label="Capacity" value={myRoom?.capacity} />
                </Box>

                <Box sx={{ px: 3, pb: 2, mt: 1 }}>
                  <Typography sx={{ ...monoLabel, mb: 1.5 }}>Roommates</Typography>
                  {roommates.length === 0 ? (
                    <Typography sx={{ color: corp.textSecondary, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                      No roommates assigned
                    </Typography>
                  ) : (
                    <Stack spacing={1}>
                      {roommates.map((mate, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            px: 2,
                            py: 1,
                            borderRadius: "7px",
                            border: `1px solid ${corp.border}`,
                            background: corp.surface,
                          }}
                        >
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              background: corp.accent,
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: 700,
                              fontSize: 12,
                            }}
                          >
                            {mate.name?.[0]?.toUpperCase()}
                          </Box>
                          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: corp.textPrimary }}>
                            {mate.name}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Paper elevation={0} sx={{ border: `1px solid ${corp.border}`, borderRadius: "10px", p: 4, textAlign: "center" }}>
            <Typography sx={{ color: corp.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>
              No profile data found. Please contact administration.
            </Typography>
          </Paper>
        )}
      </Layout>
    );
  }

  // ── Admin / Staff View ──────────────────────────────────────────────────────
  const totalRooms = rooms.length;
  const totalStudents = students.length;
  const totalComplaints = complaints.length;
  const occupiedBeds = rooms.reduce((sum, room) => sum + (room.occupied || 0), 0);
  const pendingComplaints = complaints.filter((c) => c.status === "Pending").length;

  const cards = [
    { title: "Total Rooms", value: totalRooms, accent: "#0057FF", icon: "🏢", subtitle: "Active units" },
    { title: "Residents", value: totalStudents, accent: "#0A7A55", icon: "👥", subtitle: "Registered occupants" },
    { title: "Occupied Beds", value: occupiedBeds, accent: "#F5A623", icon: "🛏", subtitle: "Currently in use" },
    { title: "Open Issues", value: pendingComplaints, accent: "#D32F2F", icon: "⚠️", subtitle: `${totalComplaints} total filed` },
  ];

  return (
    <Layout>
      {/* Page Header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${corp.navy} 0%, ${corp.steel} 100%)`,
          borderRadius: "10px",
          px: 4,
          py: 3.5,
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase" }}
          >
            Operator Center
          </Typography>
          <Typography variant="h4" sx={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, mt: 0.5, letterSpacing: "-0.5px" }}>
            Dashboard Overview
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "'DM Sans', sans-serif", mt: 0.5 }}>
            Facility management at a glance
          </Typography>
        </Box>
        <Box
          sx={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            px: 2.5,
            py: 1.5,
            textAlign: "right",
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "1px", textTransform: "uppercase" }}>
            Logged in as
          </Typography>
          <Typography sx={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, mt: 0.3 }}>
            {user?.name || "Administrator"}
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "1px" }}>
            {user?.role}
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2.5}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* Quick Summary */}
      <Paper
        elevation={0}
        sx={{ border: `1px solid ${corp.border}`, borderRadius: "10px", mt: 3, overflow: "hidden" }}
      >
        <Box sx={{ background: corp.surface, px: 3, py: 2, borderBottom: `1px solid ${corp.border}` }}>
          <Typography sx={{ ...sectionTitle, fontSize: 14 }}>Occupancy Summary</Typography>
        </Box>
        <Box sx={{ px: 3 }}>
          <InfoRow label="Total Capacity" value={rooms.reduce((s, r) => s + (r.capacity || 0), 0)} />
          <Divider sx={{ borderColor: corp.border }} />
          <InfoRow label="Beds Occupied" value={occupiedBeds} />
          <Divider sx={{ borderColor: corp.border }} />
          <InfoRow
            label="Occupancy Rate"
            value={
              rooms.reduce((s, r) => s + (r.capacity || 0), 0) > 0
                ? `${Math.round((occupiedBeds / rooms.reduce((s, r) => s + (r.capacity || 0), 0)) * 100)}%`
                : "N/A"
            }
          />
          <Divider sx={{ borderColor: corp.border }} />
          <InfoRow label="Pending Issues" value={pendingComplaints} />
        </Box>
      </Paper>
    </Layout>
  );
};

export default Dashboard;
