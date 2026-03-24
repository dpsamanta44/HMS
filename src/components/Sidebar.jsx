import { Drawer, Toolbar, Box, Tooltip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const DRAWER_WIDTH = 232;

const Sidebar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user }  = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const roleColors = {
    admin:   { accent: "#2563eb", light: "#dbeafe", label: "Administrator" },
    staff:   { accent: "#0891b2", light: "#cffafe", label: "Staff Member"  },
    student: { accent: "#7c3aed", light: "#ede9fe", label: "Student"       },
  };
  const { accent, light, label } = roleColors[user?.role] ?? roleColors.student;

  const navSections = [
    {
      title: "Overview",
      items: [
        {
          path: "/",
          label: "Dashboard",
          roles: ["admin", "staff", "student"],
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="7" height="7" rx="1.2"/>
              <rect x="14" y="3" width="7" height="7" rx="1.2"/>
              <rect x="3" y="14" width="7" height="7" rx="1.2"/>
              <rect x="14" y="14" width="7" height="7" rx="1.2"/>
            </svg>
          ),
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          path: "/rooms",
          label: "Rooms",
          roles: ["admin", "staff"],
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          ),
        },
        {
          path: "/students",
          label: "Students",
          roles: ["admin", "staff"],
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
          ),
        },
        {
          path: "/complaints",
          label: "Complaints",
          roles: ["admin", "staff", "student"],
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          ),
         
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          path: "/admin",
          label: "Admin Panel",
          roles: ["admin"],
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          ),
        },
      ],
    },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const drawerWidth = collapsed ? 68 : DRAWER_WIDTH;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');

        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.18s ease;
          text-decoration: none;
          position: relative;
          border: 1.5px solid transparent;
          animation: fadeInLeft 0.35s ease both;
        }

        .sidebar-item:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.07);
        }

        .sidebar-item.active {
          background: var(--accent-alpha);
          border-color: var(--accent-border);
        }

        .collapse-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 7px;
          border: 1.5px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          cursor: pointer;
          transition: all 0.18s ease;
          color: rgba(255,255,255,0.4);
          flex-shrink: 0;
        }

        .collapse-btn:hover {
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
        }
      `}</style>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            overflowX: "hidden",
            transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
          },
        }}
      >
        <Toolbar sx={{ minHeight: "58px !important" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            py: 1.5,
            px: 1.5,
            gap: 0,
            "--accent-alpha": `${accent}22`,
            "--accent-border": `${accent}44`,
            "--accent": accent,
          }}
        >
          {/* ── Collapse toggle ── */}
          <Box sx={{ display: "flex", justifyContent: collapsed ? "center" : "flex-end", mb: 1.5, px: 0.5 }}>
            <button
              className="collapse-btn"
              onClick={() => setCollapsed((v) => !v)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg
                width="13" height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform 0.22s ease" }}
              >
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
          </Box>

          {/* ── Nav sections ── */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2.5, overflowY: "auto", overflowX: "hidden" }}>
            {navSections.map((section) => {
              const visibleItems = section.items.filter((i) => i.roles.includes(user?.role));
              if (!visibleItems.length) return null;

              return (
                <Box key={section.title}>
                  {/* Section label */}
                  {!collapsed && (
                    <Box
                      sx={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.25)",
                        px: 1,
                        mb: 0.8,
                      }}
                    >
                      {section.title}
                    </Box>
                  )}

                  {/* Items */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    {visibleItems.map((item, idx) => {
                      const active = isActive(item.path);
                      const itemEl = (
                        <div
                          key={item.path}
                          className={`sidebar-item${active ? " active" : ""}`}
                          style={{ animationDelay: `${idx * 0.05}s`, justifyContent: collapsed ? "center" : "flex-start" }}
                          onClick={() => navigate(item.path)}
                        >
                          {/* Active indicator bar */}
                          {active && (
                            <div style={{
                              position: "absolute",
                              left: 0,
                              top: "20%",
                              height: "60%",
                              width: 3,
                              borderRadius: "0 3px 3px 0",
                              background: accent,
                            }} />
                          )}

                          {/* Icon */}
                          <div style={{
                            color: active ? accent : "rgba(255,255,255,0.45)",
                            display: "flex",
                            alignItems: "center",
                            flexShrink: 0,
                            transition: "color 0.18s ease",
                          }}>
                            {item.icon}
                          </div>

                          {/* Label + badge */}
                          {!collapsed && (
                            <>
                              <span style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.845rem",
                                fontWeight: active ? 600 : 400,
                                color: active ? "#fff" : "rgba(255,255,255,0.55)",
                                flex: 1,
                                transition: "all 0.18s ease",
                                whiteSpace: "nowrap",
                              }}>
                                {item.label}
                              </span>

                              {item.badge && (
                                <span style={{
                                  minWidth: 20,
                                  height: 20,
                                  borderRadius: 99,
                                  background: "#f59e0b",
                                  color: "#fff",
                                  fontSize: "0.65rem",
                                  fontWeight: 700,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontFamily: "'DM Sans', sans-serif",
                                  padding: "0 5px",
                                }}>
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      );

                      return collapsed ? (
                        <Tooltip key={item.path} title={item.label} placement="right" arrow>
                          {itemEl}
                        </Tooltip>
                      ) : itemEl;
                    })}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* ── Bottom user card ── */}
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {collapsed ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  px: 1,
                  py: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                </Box>
                <Box>
                  <Box sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#fff",
                    lineHeight: 1.2,
                    textTransform: "capitalize",
                  }}>
                    {user?.name ?? user?.role}
                  </Box>
                  <Box sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    color: "rgba(255,255,255,0.35)",
                    fontWeight: 400,
                  }}>
                    {label}
                  </Box>
                </Box>
                <Box sx={{ ml: "auto" }}>
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#10b981",
                      boxShadow: "0 0 6px #10b981",
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
