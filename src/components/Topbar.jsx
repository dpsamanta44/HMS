import { AppBar, Toolbar, Box, Tooltip } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Topbar = () => {
  const { user, logout } = useAuth();
  const [logoutHover, setLogoutHover] = useState(false);
  const [themeHover, setThemeHover] = useState(false);

  const roleColors = {
    admin:   { accent: "#2563eb", light: "#dbeafe", label: "Administrator" },
    staff:   { accent: "#0891b2", light: "#cffafe", label: "Staff Member"  },
    student: { accent: "#7c3aed", light: "#ede9fe", label: "Student"       },
  };

  const { accent, light, label } =
    roleColors[user?.role] ?? roleColors.student;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');

        @keyframes topbarSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .topbar-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 9px;
          border: 1.5px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          cursor: pointer;
          transition: all 0.18s ease;
          color: rgba(255,255,255,0.6);
        }

        .topbar-icon-btn:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.2);
          color: #fff;
        }

        .topbar-logout-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          border-radius: 9px;
          border: 1.5px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .topbar-logout-btn:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.4);
          color: #fca5a5;
        }
      `}</style>

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: 1201,
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          animation: "topbarSlide 0.4s ease both",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "58px !important",
            px: { xs: 2, sm: 3 },
          }}
        >
          {/* ── Left: Logo + Title ── */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Logo mark */}
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </Box>

            {/* Title */}
            <Box>
              <Box
                component="span"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.01em",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Hostel Management
              </Box>
              <Box
                component="span"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#fff",
                  display: { xs: "block", sm: "none" },
                }}
              >
                HMS
              </Box>
            </Box>

            {/* Divider */}
            <Box
              sx={{
                width: "1px",
                height: 18,
                background: "rgba(255,255,255,0.12)",
                display: { xs: "none", md: "block" },
                mx: 0.5,
              }}
            />

            {/* Version tag */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: "5px",
                px: 1,
                py: "2px",
                borderRadius: "5px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 6px #10b981",
                }}
              />
              <Box
                component="span"
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Live
              </Box>
            </Box>
          </Box>

          {/* ── Right: Controls ── */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Role badge */}
            {user && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  px: 1.5,
                  py: "5px",
                  borderRadius: 99,
                  background: `${accent}22`,
                  border: `1.5px solid ${accent}44`,
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                </Box>
                <Box
                  component="span"
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.73rem",
                    fontWeight: 600,
                    color: light,
                    letterSpacing: "0.02em",
                  }}
                >
                  {label}
                </Box>
              </Box>
            )}

            

            {/* Notifications stub */}
            <Tooltip title="Notifications" arrow>
              <button className="topbar-icon-btn" aria-label="Notifications" style={{ position: "relative" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
                {/* Badge dot */}
                <span style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#f59e0b",
                  border: "1.5px solid #0f172a",
                }} />
              </button>
            </Tooltip>

            {/* Divider */}
            <Box sx={{ width: "1px", height: 18, background: "rgba(255,255,255,0.1)" }} />

            {/* Logout */}
            <button
              className="topbar-logout-btn"
              onClick={logout}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                Logout
              </Box>
            </button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Topbar;
