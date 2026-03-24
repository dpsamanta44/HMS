import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState } from "react";

const DRAWER_WIDTH      = 232;
const DRAWER_COLLAPSED  = 68;
const TOPBAR_HEIGHT     = 58;

const Layout = ({ children }) => {
  // Lift collapse state so Layout can adjust main content margin
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? DRAWER_COLLAPSED : DRAWER_WIDTH;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        body {
          margin: 0;
          background: #f1f5f9;
          font-family: 'DM Sans', sans-serif;
        }

        /* Thin custom scrollbar for main content */
        .main-scroll::-webkit-scrollbar { width: 5px; }
        .main-scroll::-webkit-scrollbar-track { background: transparent; }
        .main-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 99px;
        }
        .main-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      <Box sx={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>

        {/* ── Topbar ── */}
        <Topbar />

        {/* ── Sidebar — pass collapse state down ── */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* ── Main content area ── */}
        <Box
          component="main"
          className="main-scroll"
          sx={{
            flexGrow: 1,
            minHeight: "100vh",
            // Offset for sidebar width — animate in sync with sidebar collapse
            ml: `${sidebarWidth}px`,
            transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {/* Space for fixed Topbar */}
          <Box sx={{ height: TOPBAR_HEIGHT, flexShrink: 0 }} />

          {/* ── Page content wrapper ── */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 2, sm: 3, md: 3.5 },
              maxWidth: 1320,
              width: "100%",
              mx: "auto",
            }}
          >
            {/* ── Breadcrumb / page header slot ── */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
                minHeight: 28,
              }}
              id="layout-page-header"
            />

            {/* ── Children ── */}
            {children}
          </Box>

          {/* ── Footer ── */}
          <Box
            sx={{
              mt: "auto",
              py: 2,
              px: { xs: 2, sm: 3.5 },
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                color: "#94a3b8",
                fontWeight: 400,
              }}
            >
              © {new Date().getFullYear()} Hostel Management System. All rights reserved.
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {["Privacy", "Terms", "Support"].map((item) => (
                <Box
                  key={item}
                  component="span"
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: "#94a3b8",
                    cursor: "pointer",
                    transition: "color 0.15s ease",
                    "&:hover": { color: "#475569" },
                  }}
                >
                  {item}
                </Box>
              ))}

              {/* Status pill */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  px: 1,
                  py: "2px",
                  borderRadius: "5px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 5px #10b981",
                  }}
                />
                <Box
                  component="span"
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.67rem",
                    fontWeight: 600,
                    color: "#059669",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  All systems operational
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
