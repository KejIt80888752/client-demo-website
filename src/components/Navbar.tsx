import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Home, Briefcase, Image, User, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home",     path: "/",         icon: Home      },
  { label: "Business", path: "/business", icon: Briefcase },
  { label: "Gallery",  path: "/gallery",  icon: Image     },
  { label: "Profile",  path: "/profile",  icon: User      },
];

const Navbar = () => {
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      // ── CHANGED: lighter black (was 0,0,0,0.88 → now 18,18,18,0.92) ──
      background: "rgba(18,18,18,0.92)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      // subtle bottom glow so it lifts off the page
      boxShadow: "0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4)",
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "0 16px",
        height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img src={logo} alt="KejShots Logo" style={{ height: "80px", width: "auto" }} />
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px", flexWrap: "wrap", justifyContent: "center" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  padding: "8px 13px", borderRadius: "10px",
                  fontSize: "13px", fontWeight: 500, textDecoration: "none",
                  transition: "background 0.15s, color 0.15s",
                  background: isActive
                    ? "linear-gradient(135deg, hsl(0,84%,52%), hsl(0,78%,38%))"
                    : "transparent",
                  color: isActive ? "#fff" : "#9e9e9e",
                  boxShadow: isActive ? "0 2px 12px -2px rgba(220,30,30,0.40)" : "none",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.color = "#ebebeb";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#9e9e9e";
                  }
                }}
              >
                <Icon style={{ width: 15, height: 15 }} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Sign out */}
        <button
          onClick={signOut}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "8px 14px", borderRadius: "10px",
            background: "transparent", border: "1px solid rgba(255,255,255,0.09)",
            color: "#9e9e9e", fontSize: "13px", fontWeight: 500,
            cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap", flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "hsl(0,84%,52%)";
            (e.currentTarget as HTMLElement).style.color = "hsl(0,84%,52%)";
            (e.currentTarget as HTMLElement).style.background = "rgba(220,30,30,0.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
            (e.currentTarget as HTMLElement).style.color = "#9e9e9e";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          <LogOut style={{ width: 15, height: 15 }} />
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
