import { useState } from "react";
import Layout from "../components/Layout";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import {
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Stack,
  Divider,
  IconButton,
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

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ name, size = 32 }) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${corp.accent}, ${corp.steel})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: size * 0.38,
      fontWeight: 700,
      fontFamily: "'DM Sans', sans-serif",
      flexShrink: 0,
    }}
  >
    {name?.[0]?.toUpperCase()}
  </Box>
);

// ─── Dept Badge ───────────────────────────────────────────────────────────────
const DeptBadge = ({ dept }) => (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      px: 1.2,
      py: 0.3,
      borderRadius: "3px",
      fontSize: 11,
      fontWeight: 600,
      fontFamily: "'DM Mono', monospace",
      letterSpacing: "0.4px",
      background: "#EEF2FF",
      color: corp.steel,
      border: `1px solid #C7D2FE`,
    }}
  >
    {dept}
  </Box>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const Students = () => {
  const { rooms = [], setRooms, students = [], setStudents } = useData();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", department: "", batch: "", room: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddStudent = () => {
    if (!form.name || !form.room || !form.department) {
      toast.error("All fields required");
      return;
    }
    const selectedRoom = rooms.find((r) => r.number === form.room);
    if (!selectedRoom) return;
    if (selectedRoom.occupied >= selectedRoom.capacity) {
      toast.error("Room is full!");
      return;
    }
    setStudents([...students, { name: form.name, department: form.department, batch: form.batch, room: form.room }]);
    setRooms(rooms.map((r) => r.number === form.room ? { ...r, occupied: r.occupied + 1 } : r));
    toast.success("Resident added");
    setForm({ name: "", department: "", batch: "", room: "" });
    setOpen(false);
  };

  const handleDelete = (index) => {
    const student = students[index];
    setRooms(rooms.map((r) => r.number === student.room ? { ...r, occupied: r.occupied - 1 } : r));
    setStudents(students.filter((_, i) => i !== index));
    toast.success("Resident removed");
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

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
            Allocation
          </Typography>
          <Typography variant="h4" sx={{ ...sectionTitle, color: "#fff", mt: 0.5 }}>
            Resident Directory
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              mt: 0.5,
            }}
          >
            {user?.role === "staff"
              ? "Add and manage resident assignments"
              : "View residents and their room allocations"}
          </Typography>
        </Box>

        {/* KPI pills */}
        <Stack direction="row" spacing={2}>
          {[
            { label: "Total", value: students.length, color: "#fff" },
            { label: "Rooms", value: rooms.length, color: "#93C5FD" },
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

      {/* ── Toolbar ───────────────────────────────────────────────────────── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography sx={{ ...monoLabel, mb: 0 }}>Search:</Typography>
          <TextField
            placeholder="Resident name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ ...inputSx, minWidth: 240 }}
          />
        </Box>

        {user?.role === "staff" && (
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
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
            + Add Resident
          </Button>
        )}
      </Box>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <Paper
        elevation={0}
        sx={{ border: `1px solid ${corp.border}`, borderRadius: "10px", background: "#fff", overflow: "hidden" }}
      >
        {/* Table toolbar */}
        <Box
          sx={{
            px: 3,
            py: 2,
            background: corp.surface,
            borderBottom: `1px solid ${corp.border}`,
          }}
        >
          <Typography sx={{ ...sectionTitle, fontSize: 14 }}>
            All Residents
            <Box
              component="span"
              sx={{
                ml: 1.5,
                px: 1.2,
                py: 0.3,
                borderRadius: "4px",
                background: "#E0E7FF",
                color: corp.accent,
                fontSize: 11,
                fontFamily: "'DM Mono', monospace",
                fontWeight: 700,
              }}
            >
              {filtered.length}
            </Box>
          </Typography>
        </Box>

        {filtered.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: corp.textSecondary, fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
              No residents found.
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ background: corp.surface }}>
                {["#", "Resident", "Department", "Room", ...(user?.role === "staff" ? ["Action"] : [])].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "1.2px",
                      textTransform: "uppercase",
                      color: corp.textSecondary,
                      borderBottom: `2px solid ${corp.border}`,
                      py: 1.5,
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((s, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": { background: "#F8FAFF" },
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  {/* # */}
                  <TableCell
                    sx={{
                      color: corp.textSecondary,
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 12,
                      width: 50,
                    }}
                  >
                    {String(index + 1).padStart(3, "0")}
                  </TableCell>

                  {/* Resident */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar name={s.name} size={32} />
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                            color: corp.textPrimary,
                            lineHeight: 1.2,
                          }}
                        >
                          {s.name}
                        </Typography>
                        {s.batch && (
                          <Typography
                            sx={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 10,
                              color: corp.textSecondary,
                            }}
                          >
                            Batch {s.batch}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Department */}
                  <TableCell>
                    <DeptBadge dept={s.department} />
                  </TableCell>

                  {/* Room */}
                  <TableCell
                    sx={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 13,
                      fontWeight: 600,
                      color: corp.textPrimary,
                    }}
                  >
                    {s.room}
                  </TableCell>

                  {/* Action (staff only) */}
                  {user?.role === "staff" && (
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => handleDelete(index)}
                        disableElevation
                        sx={{
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
                        Remove
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* ── Add Resident Modal ────────────────────────────────────────────── */}
      {user?.role === "staff" && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            elevation: 0,
            sx: {
              border: `1px solid ${corp.border}`,
              borderRadius: "12px",
              minWidth: 420,
            },
          }}
        >
          {/* Modal Header */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${corp.navy} 0%, ${corp.steel} 100%)`,
              px: 3,
              py: 2.5,
              borderRadius: "12px 12px 0 0",
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
                 Allocation
              </Typography>
              <Typography sx={{ ...sectionTitle, color: "#fff", fontSize: 17, mt: 0.3 }}>
                Add New Resident
              </Typography>
            </Box>
            <IconButton
              onClick={() => setOpen(false)}
              size="small"
              sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: "#fff" } }}
            >
              ✕
            </IconButton>
          </Box>

          <DialogContent sx={{ px: 3, py: 3 }}>
            <Stack spacing={2.5}>
              {[
                { label: "Full Name", name: "name", placeholder: "e.g. Arjun Mehta" },
                { label: "Department", name: "department", placeholder: "e.g. Engineering" },
                { label: "Academic Batch", name: "batch", placeholder: "e.g. 2024" },
              ].map(({ label, name, placeholder }) => (
                <Box key={name}>
                  <Typography sx={{ ...monoLabel, mb: 0.6 }}>{label}</Typography>
                  <TextField
                    placeholder={placeholder}
                    name={name}
                    value={form[name] || ""}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    sx={inputSx}
                  />
                </Box>
              ))}

              <Box>
                <Typography sx={{ ...monoLabel, mb: 0.6 }}>Assign Room</Typography>
                <TextField
                  select
                  name="room"
                  value={form.room}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={inputSx}
                >
                  {rooms.map((room, i) => (
                    <MenuItem key={i} value={room.number}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
                          Room {room.number}
                        </span>
                        <span
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 11,
                            color: corp.textSecondary,
                          }}
                        >
                          {room.occupied}/{room.capacity} occupied
                        </span>
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Divider sx={{ borderColor: corp.border }} />

              <Button
                variant="contained"
                onClick={handleAddStudent}
                fullWidth
                disableElevation
                sx={{
                  background: corp.accent,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  textTransform: "none",
                  borderRadius: "8px",
                  py: 1.3,
                  "&:hover": { background: corp.accentHover },
                }}
              >
                Confirm & Add Resident
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
};

export default Students;
