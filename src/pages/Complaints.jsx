import { useState } from "react";
import Layout from "../components/Layout";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Chip,
  Divider,
  Stack,
} from "@mui/material";

// ─── Corporate palette & overrides ──────────────────────────────────────────
const corp = {
  navy: "#0A1628",
  navyMid: "#162340",
  steel: "#1E3A5F",
  accent: "#0057FF",
  accentHover: "#0047D6",
  gold: "#F5A623",
  surface: "#F4F6FA",
  border: "#DDE3EE",
  textPrimary: "#0A1628",
  textSecondary: "#5A6A85",
  success: "#0A7A55",
  successBg: "#E6F4EF",
  warning: "#B45309",
  warningBg: "#FEF3CD",
};

const sectionTitle = {
  fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.5px",
  color: corp.textPrimary,
};

const labelStyle = {
  fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "1.2px",
  color: corp.textSecondary,
  mb: 0.5,
};

const StatusChip = ({ status }) =>
  status === "Resolved" ? (
    <Chip
      label="Resolved"
      size="small"
      sx={{
        background: corp.successBg,
        color: corp.success,
        fontWeight: 700,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 11,
        letterSpacing: "0.5px",
        border: `1px solid #A7D7C5`,
        borderRadius: "4px",
      }}
    />
  ) : (
    <Chip
      label="Pending"
      size="small"
      sx={{
        background: corp.warningBg,
        color: corp.warning,
        fontWeight: 700,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 11,
        letterSpacing: "0.5px",
        border: `1px solid #FBBF24`,
        borderRadius: "4px",
      }}
    />
  );

const TypeBadge = ({ type }) => (
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
      letterSpacing: "0.5px",
      background: "#EEF2FF",
      color: corp.steel,
      border: `1px solid #C7D2FE`,
    }}
  >
    {type}
  </Box>
);

// ─── Component ───────────────────────────────────────────────────────────────
const Complaints = () => {
  const { complaints = [], setComplaints } = useData();
  const { user } = useAuth();

  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ text: "", type: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.text || !form.type) return;
    setComplaints([
      ...(complaints || []),
      { text: form.text, type: form.type, status: "Pending", role: user?.role },
    ]);
    setForm({ text: "", type: "" });
  };

  const handleResolve = (index) =>
    setComplaints(
      complaints.map((c, i) => (i === index ? { ...c, status: "Resolved" } : c))
    );

  const filteredComplaints = (complaints || []).filter((c) =>
    filter === "All" ? true : c.status === filter
  );

  const pendingCount = complaints.filter((c) => c.status === "Pending").length;
  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;

  return (
    <Layout>
      {/* ── Page Header ─────────────────────────────────────────────────── */}
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
            variant="overline"
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "2px",
            }}
          >
            Internal Operations
          </Typography>
          <Typography
            variant="h4"
            sx={{ ...sectionTitle, color: "#fff", mt: 0.5 }}
          >
            Issue Tracker
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              mt: 0.5,
            }}
          >
            Submit, monitor, and resolve facility complaints
          </Typography>
        </Box>

        {/* KPI pills */}
        <Stack direction="row" spacing={2}>
          {[
            { label: "Total", value: complaints.length, color: "#fff" },
            { label: "Pending", value: pendingCount, color: corp.gold },
            { label: "Resolved", value: resolvedCount, color: "#4ADE80" },
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
                  color: "rgba(255,255,255,0.45)",
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

      {/* ── Submit Form (student only) ───────────────────────────────────── */}
      {user?.role === "student" && (
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
            Raise a New Issue
          </Typography>
          <Typography
            sx={{
              color: corp.textSecondary,
              fontSize: 12,
              fontFamily: "'DM Sans', sans-serif",
              mb: 2.5,
            }}
          >
            Describe the problem and select the relevant department
          </Typography>
          <Divider sx={{ mb: 2.5, borderColor: corp.border }} />

          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={labelStyle}>Description</Typography>
              <TextField
                placeholder="Briefly describe the issue…"
                name="text"
                value={form.text}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={inputSx}
              />
            </Box>

            <Box sx={{ minWidth: 170 }}>
              <Typography sx={labelStyle}>Category</Typography>
              <TextField
                select
                name="type"
                value={form.type}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={inputSx}
              >
                <MenuItem value="Maintenance">Maintenance</MenuItem>
                <MenuItem value="Cleaning">Cleaning</MenuItem>
                <MenuItem value="Security">Security</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Box>

            <Box sx={{ pt: "22px" }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
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
                Submit
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {/* ── Filter + Table ───────────────────────────────────────────────── */}
      <Paper
        elevation={0}
        sx={{
          border: `1px solid ${corp.border}`,
          borderRadius: "10px",
          background: "#fff",
          overflow: "hidden",
        }}
      >
        {/* Toolbar */}
        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${corp.border}`,
            background: corp.surface,
          }}
        >
          <Typography sx={{ ...sectionTitle, fontSize: 14 }}>
            All Reports
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography sx={{ ...labelStyle, mb: 0 }}>Filter:</Typography>
            <TextField
              select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              size="small"
              sx={{ ...inputSx, minWidth: 140 }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
            </TextField>
          </Box>
        </Box>

        {/* Table */}
        {filteredComplaints.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography
              sx={{
                color: corp.textSecondary,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
              }}
            >
              No records match the current filter.
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ background: corp.surface }}>
                {["#", "Description", "Category", "Status", "Action"].map(
                  (h) => (
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
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredComplaints.map((c, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": { background: "#F8FAFF" },
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
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

                  <TableCell
                    sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: corp.textPrimary,
                      maxWidth: 340,
                    }}
                  >
                    {c.text}
                  </TableCell>

                  <TableCell>
                    <TypeBadge type={c.type} />
                  </TableCell>

                  <TableCell>
                    <StatusChip status={c.status} />
                  </TableCell>

                  <TableCell>
                    {(user?.role === "staff" || user?.role === "admin") &&
                      c.status === "Pending" && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleResolve(index)}
                          disableElevation
                          sx={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 700,
                            fontSize: 12,
                            textTransform: "none",
                            borderRadius: "6px",
                            color: corp.success,
                            borderColor: "#A7D7C5",
                            "&:hover": {
                              background: corp.successBg,
                              borderColor: corp.success,
                            },
                          }}
                        >
                          Mark Resolved
                        </Button>
                      )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Layout>
  );
};

// ─── Shared input styling ─────────────────────────────────────────────────────
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
};

export default Complaints;
