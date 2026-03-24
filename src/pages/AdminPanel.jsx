import { useState } from "react";
import Layout from "../components/Layout";
import { useData } from "../context/DataContext";
import toast from "react-hot-toast";

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
  InputAdornment,
} from "@mui/material";

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, accent, bg }) => (
  <Box
    sx={{
      flex: 1,
      minWidth: 140,
      p: 2.5,
      borderRadius: "14px",
      background: "#fff",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      display: "flex",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Box
      sx={{
        width: 42,
        height: 42,
        borderRadius: "11px",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: accent,
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Box sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </Box>
      <Box sx={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}>
        {value}
      </Box>
    </Box>
  </Box>
);

// ── Role badge ────────────────────────────────────────────────────────────────
const RoleBadge = ({ role = "Staff" }) => (
  <Box sx={{
    display: "inline-flex", alignItems: "center", gap: "5px",
    px: 1.2, py: "3px", borderRadius: 99,
    background: "#dbeafe", border: "1.5px solid #bfdbfe",
  }}>
    <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb" }} />
    <Box sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#2563eb", letterSpacing: "0.05em" }}>
      {role}
    </Box>
  </Box>
);

// ── Main Component ────────────────────────────────────────────────────────────
const AdminPanel = () => {
  const { staff, setStaff } = useData();
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", salary: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())   errs.name   = "Name is required";
    if (!form.phone.trim())  errs.phone  = "Phone is required";
    if (!form.email.trim())  errs.email  = "Email is required";
    if (!form.salary.trim()) errs.salary = "Salary is required";
    return errs;
  };

  const handleAddStaff = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400)); // simulate async
    setStaff([...staff, { ...form, id: Date.now() }]);
    toast.success("Staff member added successfully");
    setForm({ name: "", phone: "", email: "", salary: "" });
    setErrors({});
    setSubmitting(false);
  };

  const handleRemove = (idx) => {
    setStaff(staff.filter((_, i) => i !== idx));
    toast.success("Staff member removed");
  };

  const filtered = staff.filter((s) =>
    [s.name, s.email, s.phone].some((v) =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const avgSalary = staff.length
    ? Math.round(staff.reduce((s, m) => s + Number(m.salary || 0), 0) / staff.length)
    : 0;

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .staff-row { transition: background 0.15s ease; }
        .staff-row:hover { background: #f8fafc; }

        .remove-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 11px;
          border-radius: 7px;
          border: 1.5px solid #fecaca;
          background: transparent;
          color: #dc2626;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .remove-btn:hover { background: #fef2f2; border-color: #f87171; }
      `}</style>

      {/* ── Page header ── */}
      <Box sx={{ mb: 3, animation: "fadeUp 0.4s ease both" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: "10px",
            background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
              <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </Box>
          <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#0f172a" }}>
            Admin Panel
          </Typography>
        </Box>
        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#94a3b8", ml: "52px" }}>
          Manage staff records, access levels, and payroll information.
        </Typography>
      </Box>

      {/* ── Stat cards ── */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3, animation: "fadeUp 0.45s ease both" }}>
        <StatCard
          label="Total Staff" value={staff.length}
          accent="#2563eb" bg="#dbeafe"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>}
        />
        <StatCard
          label="Avg. Salary" value={avgSalary ? `₹${avgSalary.toLocaleString()}` : "—"}
          accent="#0891b2" bg="#cffafe"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>}
        />
        
        <StatCard
          label="Active Today" value={staff.length}
          accent="#10b981" bg="#d1fae5"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
        />
      </Box>

      {/* ── Add Staff form ── */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: "16px", animation: "fadeUp 0.5s ease both" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
          <Box sx={{
            width: 32, height: 32, borderRadius: "8px",
            background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </Box>
          <Box>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
              Add New Staff Member
            </Typography>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#94a3b8" }}>
              Fill in the details below to onboard a new staff member
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {[
            { name: "name",   label: "Full Name",    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
            { name: "phone",  label: "Phone Number", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a2 2 0 012-2.18h3a2 2 0 012 1.72c.13 1 .37 1.98.72 2.93a2 2 0 01-.45 2.11L9.91 15a16 16 0 006.08 6.08l1.42-1.42a2 2 0 012.11-.45c.95.35 1.93.59 2.93.72a2 2 0 011.55 2z"/></svg> },
            { name: "email",  label: "Email Address", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
            { name: "salary", label: "Monthly Salary", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
          ].map((field) => (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              value={form[field.name]}
              onChange={handleChange}
              error={!!errors[field.name]}
              helperText={errors[field.name]}
              size="small"
              sx={{ flex: "1 1 180px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{field.icon}</InputAdornment>
                ),
              }}
            />
          ))}

          <Button
            variant="contained"
            onClick={handleAddStaff}
            disabled={submitting}
            sx={{
              alignSelf: "flex-start",
              mt: errors.name || errors.phone || errors.email || errors.salary ? 0 : "0px",
              px: 3,
              py: "7.5px",
              borderRadius: "9px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "0.845rem",
              background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
              textTransform: "none",
              "&:hover": { background: "linear-gradient(135deg, #1e3a5f, #0f172a)" },
              "&:disabled": { opacity: 0.6 },
            }}
          >
            {submitting ? "Adding…" : "Add Staff"}
          </Button>
        </Box>
      </Paper>

      {/* ── Staff table ── */}
      <Paper sx={{ borderRadius: "16px", overflow: "hidden", animation: "fadeUp 0.55s ease both" }}>
        {/* Table header bar */}
        <Box sx={{
          px: 3, py: 2,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid #e2e8f0",
          flexWrap: "wrap", gap: 1.5,
        }}>
          <Box>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
              Staff Directory
            </Typography>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#94a3b8" }}>
              {staff.length} member{staff.length !== 1 ? "s" : ""} registered
            </Typography>
          </Box>

          {/* Search */}
          <TextField
            size="small"
            placeholder="Search by name, email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 220 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {filtered.length === 0 ? (
          <Box sx={{ py: 7, textAlign: "center" }}>
            <Box sx={{ color: "#cbd5e1", mb: 1.5, display: "flex", justifyContent: "center" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
              </svg>
            </Box>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#94a3b8", fontWeight: 500 }}>
              {search ? "No staff match your search" : "No staff members added yet"}
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {["Staff Member", "Phone", "Email", "Monthly Salary", "Role", "Actions"].map((h) => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((s, i) => (
                <TableRow key={s.id ?? i} className="staff-row">
                  {/* Name + avatar */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{
                        width: 34, height: 34, borderRadius: "50%",
                        background: "linear-gradient(135deg, #2563eb, #0891b2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>
                          {s.name?.charAt(0)?.toUpperCase() ?? "?"}
                        </span>
                      </Box>
                      <Box>
                        <Box sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.845rem", fontWeight: 600, color: "#0f172a" }}>
                          {s.name}
                        </Box>
                        <Box sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "#94a3b8" }}>
                          ID #{String(i + 1).padStart(4, "0")}
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.845rem", color: "#475569" }}>
                      {s.phone}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.845rem", color: "#475569" }}>
                      {s.email}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: "0.845rem",
                      fontWeight: 600, color: "#0f172a",
                    }}>
                      ₹{Number(s.salary).toLocaleString()}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <RoleBadge role="Staff" />
                  </TableCell>

                  <TableCell>
                    <button className="remove-btn" onClick={() => handleRemove(i)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/>
                        <path d="M9 6V4h6v2"/>
                      </svg>
                      Remove
                    </button>
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

export default AdminPanel;
