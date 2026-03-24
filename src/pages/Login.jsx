import { Box, Typography, Divider, Modal, TextField, MenuItem, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [hoveredRole, setHoveredRole] = useState(null);
  const [visitorModalOpen, setVisitorModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, type: "" }); // 'success' | 'error'

  const emptyForm = {
    visitorName: "", phone: "", companion1: "", companion2: "",
    residentName: "", roomNumber: "", visitDate: "", visitTime: "", purpose: "",
  };
  const [form, setForm] = useState(emptyForm);

  const handleLogin = (role) => {
    login({ name: role, role });
    navigate("/");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const showToast = (type) => {
    setToast({ show: true, type });
    setTimeout(() => setToast({ show: false, type: "" }), 3800);
  };

  const handleVisitorSubmit = () => {
    const newErrors = {};
    if (!form.visitorName.trim()) newErrors.visitorName = true;
    if (!form.phone.trim()) newErrors.phone = true;
    if (!form.visitDate) newErrors.visitDate = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("error");
      return;
    }

    setErrors({});
    setSubmitted(true);
    showToast("success");
  };

  const handleModalClose = () => {
    setVisitorModalOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setErrors({});
      setForm(emptyForm);
    }, 400);
  };

  const roles = [
    {
      key: "admin", label: "Administrator", sublabel: "Full system access",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      accent: "#2563eb", accentLight: "#dbeafe",
    },
    {
      key: "staff", label: "Staff Member", sublabel: "Operational access",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      ),
      accent: "#0891b2", accentLight: "#cffafe",
    },
    {
      key: "student", label: "Student", sublabel: "Resident access",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      ),
      accent: "#7c3aed", accentLight: "#ede9fe",
    },
  ];

  // Dynamic input styles with red error state
  const inputSx = (field) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      fontSize: "0.85rem",
      fontFamily: "'DM Sans', sans-serif",
      background: errors[field] ? "#fff5f5" : "#fafafa",
      transition: "background 0.2s ease",
      "& fieldset": { borderColor: errors[field] ? "#f87171" : "#e2e8f0" },
      "&:hover fieldset": { borderColor: errors[field] ? "#ef4444" : "#d97706" },
      "&.Mui-focused fieldset": { borderColor: errors[field] ? "#ef4444" : "#d97706", borderWidth: "1.5px" },
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.82rem",
      fontFamily: "'DM Sans', sans-serif",
      color: errors[field] ? "#f87171" : "#94a3b8",
      "&.Mui-focused": { color: errors[field] ? "#ef4444" : "#d97706" },
    },
    "& .MuiFormHelperText-root": {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.7rem",
      marginLeft: "4px",
    },
  });

  return (
    <Box sx={{ height: "100vh", display: "flex", fontFamily: "'DM Sans', sans-serif", background: "#f1f5f9", overflow: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.7; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes checkDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes toastSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-5px); }
          40%       { transform: translateX(5px); }
          60%       { transform: translateX(-3px); }
          80%       { transform: translateX(3px); }
        }

        .role-card {
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          animation: fadeUp 0.5s ease both;
        }
        .role-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .visitor-card {
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: 1.5px dashed #fcd34d;
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          animation: fadeUp 0.5s ease both;
          position: relative;
          overflow: hidden;
        }
        .visitor-card::before {
          content: '';
          position: absolute;
          top: -30px; right: -30px;
          width: 90px; height: 90px;
          border-radius: 50%;
          background: rgba(251,191,36,0.15);
        }
        .visitor-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(217,119,6,0.18);
          border-color: #f59e0b;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        }
        .modal-content { animation: scaleIn 0.28s cubic-bezier(0.4,0,0.2,1); }
        .check-circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: checkDraw 0.6s 0.3s ease forwards;
        }
        .toast-popup {
          animation: toastSlideUp 0.32s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .error-banner {
          animation: shake 0.42s ease;
        }
      `}</style>

      {/* ── Toast Notification ── */}
      {toast.show && (
        <Box
          className="toast-popup"
          sx={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2.5,
            py: 1.6,
            borderRadius: "16px",
            minWidth: 280,
            maxWidth: 380,
            overflow: "hidden",
            boxShadow: toast.type === "success"
              ? "0 12px 40px rgba(217,119,6,0.25), 0 2px 8px rgba(0,0,0,0.08)"
              : "0 12px 40px rgba(239,68,68,0.22), 0 2px 8px rgba(0,0,0,0.08)",
            background: toast.type === "success" ? "#fffbeb" : "#fff5f5",
            border: `1.5px solid ${toast.type === "success" ? "#fcd34d" : "#fca5a5"}`,
          }}
        >
          {/* Icon bubble */}
          <Box sx={{
            width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
            background: toast.type === "success"
              ? "linear-gradient(135deg, #fde68a, #fbbf24)"
              : "linear-gradient(135deg, #fecaca, #f87171)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: toast.type === "success" ? "#92400e" : "#fff",
            boxShadow: toast.type === "success"
              ? "0 2px 8px rgba(217,119,6,0.3)"
              : "0 2px 8px rgba(239,68,68,0.35)",
          }}>
            {toast.type === "success" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            )}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography sx={{
              fontSize: "0.82rem", fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              color: toast.type === "success" ? "#78350f" : "#991b1b",
              lineHeight: 1.3,
            }}>
              {toast.type === "success" ? "Request Submitted Successfully!" : "Incomplete Form"}
            </Typography>
            <Typography sx={{
              fontSize: "0.71rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
              color: toast.type === "success" ? "#a16207" : "#b91c1c",
              mt: 0.2, lineHeight: 1.4,
            }}>
              {toast.type === "success"
                ? "Your visitor pass is pending warden approval."
                : "Please fill in all mandatory fields marked with *."}
            </Typography>
          </Box>

          {/* Auto-dismissal progress bar */}
          <Box sx={{
            position: "absolute", bottom: 0, left: 0, height: "3px",
            borderRadius: "0 0 16px 16px",
            background: toast.type === "success"
              ? "linear-gradient(90deg, #d97706, #fbbf24)"
              : "linear-gradient(90deg, #ef4444, #f87171)",
            animation: "toastProgress 3.8s linear forwards",
          }} />
        </Box>
      )}

      {/* ── Left decorative panel ── */}
      <Box sx={{
        display: { xs: "none", md: "flex" },
        width: "42%",
        background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 60%, #0c4a6e 100%)",
        flexDirection: "column", justifyContent: "center", alignItems: "flex-start",
        px: 7, position: "relative", overflow: "hidden",
      }}>
        {[...Array(3)].map((_, i) => (
          <Box key={i} sx={{
            position: "absolute", borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.07)",
            width: `${280 + i * 160}px`, height: `${280 + i * 160}px`,
            top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            animation: "subtlePulse 4s ease-in-out infinite",
            animationDelay: `${i * 0.8}s`,
          }} />
        ))}

        <Box sx={{ width: 48, height: 48, borderRadius: "12px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", mb: 4, zIndex: 1 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </Box>

        <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", fontWeight: 700, color: "#fff", lineHeight: 1.2, mb: 2, zIndex: 1 }}>
          Hostel<br />Management<br />System
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", maxWidth: 280, lineHeight: 1.7, zIndex: 1 }}>
          Streamlined operations for modern residential facilities. Manage rooms, residents, and requests — all in one place.
        </Typography>

        <Box sx={{ mt: 5, display: "flex", gap: 1, flexWrap: "wrap", zIndex: 1 }}>
          {["Room Allocation", "Attendance", "Complaints", "Billing"].map((tag) => (
            <Box key={tag} sx={{ px: 1.5, py: 0.5, borderRadius: "6px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", fontSize: "0.75rem", fontWeight: 500 }}>
              {tag}
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 4, zIndex: 1, px: 2, py: 1.5, borderRadius: "10px", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "#fbbf24", flexShrink: 0 }} />
          <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}>
            Visitors can apply for a <Box component="span" sx={{ color: "#fbbf24", fontWeight: 600 }}>hostel visit pass</Box> online
          </Typography>
        </Box>
      </Box>

      {/* ── Right login panel ── */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", px: { xs: 3, sm: 6 } }}>
        <Box sx={{ width: "100%", maxWidth: 400, animation: "fadeUp 0.6s ease both" }}>
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", mb: 1 }}>
              Welcome back
            </Typography>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}>
              Sign in to your<br />workspace
            </Typography>
          </Box>

          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", mb: 1.5 }}>
            Select your role
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
            {roles.map((role, i) => (
              <Box
                key={role.key}
                className="role-card"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                onMouseEnter={() => setHoveredRole(role.key)}
                onMouseLeave={() => setHoveredRole(null)}
                onClick={() => handleLogin(role.key)}
                sx={{ borderColor: hoveredRole === role.key ? role.accent : "#e2e8f0", backgroundColor: hoveredRole === role.key ? role.accentLight : "#fff" }}
              >
                <Box sx={{ width: 40, height: 40, borderRadius: "10px", background: hoveredRole === role.key ? role.accent : "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", color: hoveredRole === role.key ? "#fff" : "#64748b", transition: "all 0.22s ease", flexShrink: 0 }}>
                  {role.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.3 }}>{role.label}</Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 400 }}>{role.sublabel}</Typography>
                </Box>
                <Box sx={{ color: hoveredRole === role.key ? role.accent : "#cbd5e1", transition: "all 0.2s ease", transform: hoveredRole === role.key ? "translateX(3px)" : "none" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Box>
              </Box>
            ))}
          </Box>

          {/* OR divider */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
            <Typography sx={{ fontSize: "0.72rem", color: "#cbd5e1", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>or</Typography>
            <Box sx={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
          </Box>

          {/* Visitor card */}
          <Box className="visitor-card" style={{ animationDelay: "0.38s" }} onClick={() => setVisitorModalOpen(true)}>
            <Box sx={{ width: 40, height: 40, borderRadius: "10px", background: "rgba(217,119,6,0.15)", border: "1px solid rgba(217,119,6,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#d97706", flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                <circle cx="12" cy="13" r="2"/>
                <path d="M8 21v-1a4 4 0 0 1 8 0v1"/>
              </svg>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: "#92400e" }}>Visitor Pass</Typography>
                <Box sx={{ px: 1, py: 0.2, borderRadius: "4px", background: "#d97706", color: "#fff", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>New</Box>
              </Box>
              <Typography sx={{ fontSize: "0.75rem", color: "#a16207", fontWeight: 400 }}>Apply for a hostel visit appointment</Typography>
            </Box>
            <Box sx={{ color: "#d97706" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "#e2e8f0", mt: 3, mb: 2 }} />
          <Typography sx={{ fontSize: "0.73rem", color: "#94a3b8", textAlign: "center", lineHeight: 1.6 }}>
            By continuing, you agree to the institution's{" "}
            <Box component="span" sx={{ color: "#2563eb", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>Terms of Use</Box>{" "}
            and{" "}
            <Box component="span" sx={{ color: "#2563eb", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>Privacy Policy</Box>
          </Typography>
        </Box>
      </Box>

      {/* ── Visitor Application Modal ── */}
      <Modal open={visitorModalOpen} onClose={handleModalClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
        <Box
          className="modal-content"
          sx={{
            background: "#fff", borderRadius: "20px", width: "100%", maxWidth: 520,
            maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 32px 80px rgba(0,0,0,0.18)", outline: "none",
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-thumb": { background: "#e2e8f0", borderRadius: "4px" },
          }}
        >
          {!submitted ? (
            <>
              {/* Modal header */}
              <Box sx={{ px: 4, pt: 4, pb: 3, borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: "9px", background: "linear-gradient(135deg, #fef3c7, #fde68a)", border: "1px solid #fcd34d", display: "flex", alignItems: "center", justifyContent: "center", color: "#d97706" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="2" y="7" width="20" height="14" rx="2"/>
                        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                        <circle cx="12" cy="13" r="2"/>
                        <path d="M8 21v-1a4 4 0 0 1 8 0v1"/>
                      </svg>
                    </Box>
                    <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "#0f172a" }}>
                      Visitor Pass Application
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                    Fields marked <Box component="span" sx={{ color: "#ef4444", fontWeight: 700 }}>*</Box> are mandatory
                  </Typography>
                </Box>
                <IconButton size="small" onClick={handleModalClose} sx={{ color: "#94a3b8", "&:hover": { background: "#f8fafc" } }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </IconButton>
              </Box>

              <Box sx={{ px: 4, py: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>

                {/* Inline error banner — shows when fields are missing */}
                {Object.keys(errors).length > 0 && (
                  <Box
                    className="error-banner"
                    sx={{
                      display: "flex", alignItems: "flex-start", gap: 1.5,
                      px: 2, py: 1.5, borderRadius: "10px",
                      background: "#fff5f5", border: "1.5px solid #fca5a5",
                    }}
                  >
                    <Box sx={{ color: "#ef4444", mt: 0.15, flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "0.79rem", fontWeight: 700, color: "#b91c1c" }}>
                        Please fill all required fields
                      </Typography>
                      <Typography sx={{ fontSize: "0.71rem", color: "#dc2626", mt: 0.25 }}>
                        Missing:{" "}
                        {[
                          errors.visitorName && "Full Name",
                          errors.phone && "Phone Number",
                          errors.visitDate && "Visit Date",
                        ].filter(Boolean).join(" · ")}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {/* ── Visitor Information ── */}
                <Box>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#d97706", mb: 1.5 }}>
                    Visitor Information
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>

                    <TextField
                      fullWidth label="Your Full Name *" name="visitorName"
                      value={form.visitorName} onChange={handleFormChange}
                      size="small" error={!!errors.visitorName}
                      helperText={errors.visitorName ? "Name is required" : ""}
                      sx={inputSx("visitorName")}
                    />

                    <TextField
                      fullWidth label="Your Phone Number *" name="phone"
                      value={form.phone} onChange={handleFormChange}
                      size="small" type="tel" inputProps={{ maxLength: 15 }}
                      error={!!errors.phone}
                      helperText={errors.phone ? "Phone number is required" : ""}
                      sx={inputSx("phone")}
                    />

                    {/* Optional companions */}
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748b", letterSpacing: "0.04em" }}>
                          Persons with you
                        </Typography>
                        <Box sx={{ px: 1, py: 0.15, borderRadius: "4px", background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#94a3b8", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          Optional
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {[1, 2].map((n) => (
                          <Box key={n} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Box sx={{ width: 26, height: 26, borderRadius: "50%", background: "#f1f5f9", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#94a3b8" }}>{n}</Typography>
                            </Box>
                            <TextField
                              fullWidth label={`Companion ${n} name`}
                              name={`companion${n}`}
                              value={form[`companion${n}`] || ""}
                              onChange={handleFormChange}
                              size="small"
                              sx={inputSx("")}
                            />
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* ── Visit Details ── */}
                <Box>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#d97706", mb: 1.5 }}>
                    Visit Details
                  </Typography>
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
                    <TextField fullWidth label="Resident Name" name="residentName" value={form.residentName} onChange={handleFormChange} size="small" sx={inputSx("")} />
                    <TextField fullWidth label="Room Number" name="roomNumber" value={form.roomNumber} onChange={handleFormChange} size="small" sx={inputSx("")} />
                    <TextField
                      fullWidth label="Visit Date *" name="visitDate"
                      value={form.visitDate} onChange={handleFormChange}
                      size="small" type="date" InputLabelProps={{ shrink: true }}
                      error={!!errors.visitDate}
                      helperText={errors.visitDate ? "Visit date is required" : ""}
                      sx={inputSx("visitDate")}
                    />
                    <TextField fullWidth label="Preferred Time" name="visitTime" value={form.visitTime} onChange={handleFormChange} size="small" type="time" InputLabelProps={{ shrink: true }} sx={inputSx("")} />
                    <TextField
                      fullWidth select label="Purpose of Visit" name="purpose"
                      value={form.purpose} onChange={handleFormChange}
                      size="small" sx={{ ...inputSx(""), gridColumn: "1 / -1" }}
                    >
                      {["Personal Visit", "Corporate / Official", "Parental Visit", "Maintenance / Service", "Delivery", "Other"].map((opt) => (
                        <MenuItem key={opt} value={opt} sx={{ fontSize: "0.84rem", fontFamily: "'DM Sans', sans-serif" }}>{opt}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Box>

                {/* ID note */}
                <Box sx={{ px: 2, py: 1.5, borderRadius: "10px", background: "#fffbeb", border: "1px solid #fde68a", display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                  <Box sx={{ color: "#d97706", mt: 0.1, flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                  </Box>
                  <Typography sx={{ fontSize: "0.74rem", color: "#92400e", lineHeight: 1.6 }}>
                    Please carry a valid government-issued ID (Aadhaar, Passport, or Driving Licence) at the time of your visit. Entry is subject to warden approval.
                  </Typography>
                </Box>

                {/* Submit */}
                <Button
                  fullWidth onClick={handleVisitorSubmit}
                  sx={{
                    mt: 0.5, py: 1.4, borderRadius: "12px",
                    background: "linear-gradient(135deg, #d97706, #f59e0b)",
                    color: "#fff", fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700, fontSize: "0.88rem", textTransform: "none",
                    letterSpacing: "0.02em", boxShadow: "0 4px 14px rgba(217,119,6,0.35)",
                    "&:hover": { background: "linear-gradient(135deg, #b45309, #d97706)", boxShadow: "0 6px 20px rgba(217,119,6,0.4)" },
                  }}
                >
                  Submit Visit Request
                </Button>
              </Box>
            </>
          ) : (
            /* ── Success state ── */
            <Box sx={{ px: 4, py: 6, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 2 }}>
              <Box sx={{ width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(135deg, #fef3c7, #fde68a)", display: "flex", alignItems: "center", justifyContent: "center", mb: 1, boxShadow: "0 8px 24px rgba(217,119,6,0.2)" }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#d97706" strokeWidth="1.5"/>
                  <polyline className="check-circle" points="7,12 10,15 17,9" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Box>
              <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#0f172a" }}>
                Request Submitted!
              </Typography>
              <Typography sx={{ fontSize: "0.84rem", color: "#64748b", maxWidth: 320, lineHeight: 1.7 }}>
                Your visitor pass application has been received. You'll get a confirmation on{" "}
                <Box component="span" sx={{ color: "#d97706", fontWeight: 600 }}>{form.phone}</Box>{" "}
                once approved by the warden.
              </Typography>
              <Box sx={{ mt: 1, px: 3, py: 1.5, borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", width: "100%", textAlign: "left" }}>
                <Typography sx={{ fontSize: "0.72rem", color: "#94a3b8", mb: 0.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Reference details</Typography>
                <Typography sx={{ fontSize: "0.84rem", color: "#0f172a", fontWeight: 700 }}>{form.visitorName}</Typography>
                <Typography sx={{ fontSize: "0.76rem", color: "#64748b", mt: 0.2 }}>Visit Date: {form.visitDate}</Typography>
                {(form.companion1 || form.companion2) && (
                  <Typography sx={{ fontSize: "0.76rem", color: "#64748b", mt: 0.2 }}>
                    With: {[form.companion1, form.companion2].filter(Boolean).join(", ")}
                  </Typography>
                )}
              </Box>
              <Button
                onClick={handleModalClose}
                sx={{ mt: 1, px: 4, py: 1.2, borderRadius: "10px", border: "1.5px solid #e2e8f0", color: "#64748b", fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem", fontWeight: 600, textTransform: "none", "&:hover": { background: "#f8fafc" } }}
              >
                Close
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Login; 
