import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const roleColors = {
    admin: { accent: "#2563eb", light: "#dbeafe", label: "Administrator" },
    staff: { accent: "#0891b2", light: "#cffafe", label: "Staff Member" },
    student: { accent: "#7c3aed", light: "#ede9fe", label: "Student" },
  };

  const { accent, light, label } = roleColors[user.role] ?? roleColors.student;

  const navLinks = [
    {
      to: "/",
      label: "Dashboard",
      roles: ["admin", "staff", "student"],
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      to: "/rooms",
      label: "Rooms",
      roles: ["admin", "staff"],
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      to: "/complaints",
      label: "Complaints",
      roles: ["admin", "staff", "student"],
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
    },
    {
      to: "/visitors",
      label: "Visitors",
      roles: ["admin", "staff", "student"]
    }
  ];

  const visibleLinks = navLinks.filter((l) => l.roles.includes(user.role));

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap');
 
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
 
        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
 
        .nav-link {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 13px;
          border-radius: 8px;
          font-size: 0.845rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          color: #64748b;
          transition: all 0.18s ease;
          position: relative;
          white-space: nowrap;
        }
 
        .nav-link:hover {
          color: #0f172a;
          background: #f1f5f9;
        }
 
        .nav-link.active {
          color: var(--accent);
          background: var(--accent-light);
          font-weight: 600;
        }
 
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 0.845rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          background: transparent;
          border: 1.5px solid #e2e8f0;
          color: #64748b;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
        }
 
        .logout-btn:hover {
          border-color: #fca5a5;
          color: #dc2626;
          background: #fef2f2;
        }
 
        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          color: #475569;
          transition: all 0.16s ease;
          animation: mobileSlide 0.25s ease both;
        }
 
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--accent);
          background: var(--accent-light);
        }
 
        .hamburger-bar {
          display: block;
          width: 20px;
          height: 1.8px;
          background: #64748b;
          border-radius: 2px;
          transition: all 0.22s ease;
        }
      `}</style>

      <nav
        style={{
          "--accent": accent,
          "--accent-light": light,
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e2e8f0",
          animation: "slideDown 0.4s ease both",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.01em",
              }}
            >
              HMS
            </span>
          </div>

          {/* Desktop nav links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              // Hide on mobile
              flexWrap: "nowrap",
            }}
            className="desktop-nav"
          >
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link${isActive(link.to) ? " active" : ""}`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: role badge + logout */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Role badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 11px 5px 8px",
                borderRadius: 99,
                background: light,
                border: `1.5px solid ${accent}22`,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: accent,
                  letterSpacing: "0.02em",
                }}
              >
                {label}
              </span>
            </div>

            {/* Logout button — desktop */}
            <button className="logout-btn" onClick={logout}
              style={{ display: "flex" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                display: "none",
                flexDirection: "column",
                gap: 4,
                background: "none",
                border: "none",
                padding: "6px",
                cursor: "pointer",
                borderRadius: 6,
              }}
              className="hamburger"
              aria-label="Toggle menu"
            >
              <span
                className="hamburger-bar"
                style={mobileOpen ? { transform: "rotate(45deg) translate(4px, 4px)" } : {}}
              />
              <span
                className="hamburger-bar"
                style={mobileOpen ? { opacity: 0 } : {}}
              />
              <span
                className="hamburger-bar"
                style={mobileOpen ? { transform: "rotate(-45deg) translate(4px, -4px)" } : {}}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            style={{
              borderTop: "1px solid #f1f5f9",
              padding: "10px 16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              background: "#fff",
            }}
          >
            {visibleLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-nav-link${isActive(link.to) ? " active" : ""}`}
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => setMobileOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            <div style={{ height: 1, background: "#f1f5f9", margin: "6px 0" }} />

            <button
              className="logout-btn"
              onClick={logout}
              style={{ justifyContent: "flex-start", width: "100%" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        )}

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 640px) {
            .desktop-nav { display: none !important; }
            .hamburger { display: flex !important; }
            .logout-btn.desktop-logout { display: none !important; }
          }
        `}</style>
      </nav>
    </>
  );
};

export default Navbar;
