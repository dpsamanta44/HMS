import { useState } from "react";
import Layout from "../components/Layout";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Divider,
  Stack,
  LinearProgress,
} from "@mui/material";

// ─── Corporate palette ────────────────────────────────────────────────────────
const corp = {
  navy: "#0A1628",
  steel: "#1E3A5F",
  accent: "#0057FF",
  accentHover: "#0047D6",
  surface: "#F4F6FA",
  border: "#DDE3EE",
  textPrimary: "#0A1628",
  textSecondary: "#5A6A85",
  success: "#0A7A55",
  successBg: "#E6F4EF",
  danger: "#C0392B",
  dangerBg: "#FDECEC",
};

const monoLabel = {
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "1.4px",
  textTransform: "uppercase",
  color: corp.textSecondary,
};

const sectionTitle = {
  fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.5px",
  color: corp.textPrimary,
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    borderRadius: "7px",
    background: "#fff",
    "& fieldset": { borderColor: corp.border },
    "&:hover fieldset": { borderColor: "#A0ABBE" },
    "&.Mui-focused fieldset": { borderColor: corp.accent, borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
  },
};

// ─── Room Card ────────────────────────────────────────────────────────────────
const RoomCard = ({ room, index, studentsInRoom, onDelete, isAdmin }) => {
  const occupied = room.occupied || 0;
  const capacity = Number(room.capacity) || 0;
  const isFull = occupied >= capacity;
  const pct = capacity ? Math.round((occupied / capacity) * 100) : 0;

  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${corp.border}`,
        borderRadius: "10px",
        background: "#fff",
        overflow: "hidden",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: "0 4px 24px rgba(0,87,255,0.08)" },
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          background: corp.surface,
          borderBottom: `1px solid ${corp.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography sx={{ ...monoLabel, mb: 0.2 }}>Unit</Typography>
          <Typography sx={{ ...sectionTitle, fontSize: 18 }}>
            Room {room.number}
          </Typography>
        </Box>

        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: "5px",
            background: isFull ? corp.dangerBg : corp.successBg,
            border: `1px solid ${isFull ? "#F5C6C6" : "#A7D7C5"}`,
          }}
        >
          <Typography
            sx={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "1px",
              color: isFull ? corp.danger : corp.success,
            }}
          >
            {isFull ? "FULL" : "AVAILABLE"}
          </Typography>
        </Box>
      </Box>

      {/* Card Body */}
      <Box sx={{ px: 2.5, py: 2 }}>
        {/* Occupancy bar */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.6 }}>
            <Typography sx={monoLabel}>Occupancy</Typography>
            <Typography sx={{ ...monoLabel, color: corp.textPrimary }}>
              {occupied} / {capacity}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={pct}
            sx={{
              height: 6,
              borderRadius: 3,
              background: "#E8ECF4",
              "& .MuiLinearProgress-bar": {
                background: isFull
                  ? `linear-gradient(90deg, ${corp.danger}, #E74C3C)`
                  : `linear-gradient(90deg, ${corp.accent}, #4A90E2)`,
                borderRadius: 3,
              },
            }}
          />
        </Box>

        <Divider sx={{ borderColor: corp.border, mb: 2 }} />

        {/* Residents */}
        <Typography sx={{ ...monoLabel, mb: 1.2 }}>Residents</Typography>

        {studentsInRoom.length === 0 ? (
          <Typography
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: corp.textSecondary,
              fontStyle: "italic",
            }}
          >
            No residents assigned
          </Typography>
        ) : (
          <Stack spacing={0.8}>
            {studentsInRoom.map((s, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  px: 1.5,
                  py: 0.8,
                  borderRadius: "6px",
                  background: corp.surface,
                  border: `1px solid ${corp.border}`,
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${corp.accent}, ${corp.steel})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                    flexShrink: 0,
                  }}
                >
                  {s.name?.[0]?.toUpperCase()}
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      color: corp.textPrimary,
                      lineHeight: 1.2,
                    }}
                  >
                    {s.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: corp.textSecondary,
                    }}
                  >
                    {s.department}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        )}

        {/* Delete */}
        {isAdmin && (
          <Button
            size="small"
            onClick={() => onDelete(index)}
            disableElevation
            sx={{
              mt: 2,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              textTransform: "none",
              borderRadius: "6px",
              color: corp.danger,
              border: `1px solid #F5C6C6`,
              background: corp.dangerBg,
              "&:hover": { background: "#FAD7D7", borderColor: corp.danger },
            }}
          >
            Remove Unit
          </Button>
        )}
      </Box>
    </Paper>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Rooms = () => {
  const { rooms, setRooms, students } = useData();
  const { user } = useAuth();

  const [form, setForm] = useState({ number: "", capacity: "" });
  const [search, setSearch] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddRoom = () => {
    if (!form.number || !form.capacity) {
      toast.error("All fields required");
      return;
    }
    setRooms([...rooms, { ...form, occupied: 0 }]);
    toast.success("Room added successfully");
    setForm({ number: "", capacity: "" });
  };

  const handleDelete = (index) => {
    setRooms(rooms.filter((_, i) => i !== index));
    toast.success("Room deleted");
  };

  const filtered = rooms.filter((r) =>
    r.number.toString().includes(search)
  );

  const totalBeds = rooms.reduce((s, r) => s + Number(r.capacity || 0), 0);
  const occupiedBeds = rooms.reduce((s, r) => s + (r.occupied || 0), 0);

  return (
    <Layout>
      {/* ── Page Header ───────────────────────────────────────────────────── */}
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
            sx={{
              color: "rgba(255,255,255,0.45)",
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Facilities Management
          </Typography>
          <Typography variant="h4" sx={{ ...sectionTitle, color: "#fff", mt: 0.5 }}>
            Room Directory
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              mt: 0.5,
            }}
          >
            Manage units, capacity, and resident allocation
          </Typography>
        </Box>

        {/* KPI pills */}
        <Stack direction="row" spacing={2}>
          {[
            { label: "Units", value: rooms.length, color: "#fff" },
            { label: "Capacity", value: totalBeds, color: "#93C5FD" },
            { label: "Occupied", value: occupiedBeds, color: "#FCD34D" },
          ].map(({ label, value, color }) => (
            <Box
              key={label}
              sx={{
                textAlign: "center",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                px: 2.5,
                py: 1.5,
                minWidth: 70,
              }}
            >
              <Typography
                sx={{
                  color,
                  fontWeight: 800,
                  fontSize: 22,
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: 1,
                }}
              >
                {value}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 10,
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  mt: 0.4,
                }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* ── Add Room Form (admin only) ─────────────────────────────────────── */}
      {user?.role === "admin" && (
        <Paper
          elevation={0}
          sx={{
            border: `1px solid ${corp.border}`,
            borderRadius: "10px",
            p: 3,
            mb: 3,
            background: "#fff",
          }}
        >
          <Typography sx={{ ...sectionTitle, fontSize: 15, mb: 0.4 }}>
            Add New Unit
          </Typography>
          <Typography
            sx={{
              color: corp.textSecondary,
              fontSize: 12,
              fontFamily: "'DM Sans', sans-serif",
              mb: 2.5,
            }}
          >
            Register a new room to the facility
          </Typography>
          <Divider sx={{ mb: 2.5, borderColor: corp.border }} />

          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
            <Box>
              <Typography sx={{ ...monoLabel, mb: 0.5 }}>Room Number</Typography>
              <TextField
                placeholder="e.g. 204"
                name="number"
                value={form.number}
                onChange={handleChange}
                size="small"
                sx={inputSx}
              />
            </Box>
            <Box>
              <Typography sx={{ ...monoLabel, mb: 0.5 }}>Capacity</Typography>
              <TextField
                placeholder="e.g. 3"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                size="small"
                sx={inputSx}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleAddRoom}
              disableElevation
              sx={{
                background: corp.accent,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                textTransform: "none",
                borderRadius: "7px",
                px: 3,
                height: 40,
                "&:hover": { background: corp.accentHover },
              }}
            >
              Add Unit
            </Button>
          </Box>
        </Paper>
      )}

      {/* ── Search ────────────────────────────────────────────────────────── */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Typography sx={{ ...monoLabel, mb: 0 }}>Search:</Typography>
        <TextField
          placeholder="Room number…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ ...inputSx, minWidth: 220 }}
        />
      </Box>

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      {rooms.length === 0 ? (
        <Paper
          elevation={0}
          sx={{ border: `1px solid ${corp.border}`, borderRadius: "10px", p: 6, textAlign: "center" }}
        >
          <Typography sx={{ color: corp.textSecondary, fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
            No units have been added yet.
          </Typography>
        </Paper>
      ) : filtered.length === 0 ? (
        <Paper
          elevation={0}
          sx={{ border: `1px solid ${corp.border}`, borderRadius: "10px", p: 6, textAlign: "center" }}
        >
          <Typography sx={{ color: corp.textSecondary, fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
            No rooms match your search.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2.5}>
          {filtered.map((room, index) => {
            const studentsInRoom = students.filter((s) => s.room === room.number);
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <RoomCard
                  room={room}
                  index={index}
                  studentsInRoom={studentsInRoom}
                  onDelete={handleDelete}
                  isAdmin={user?.role === "admin"}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Layout>
  );
};

export default Rooms;
