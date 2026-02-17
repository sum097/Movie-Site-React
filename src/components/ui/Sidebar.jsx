import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Material UI Icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Menu configuration so you never repeat code
  const topMenu = [
    { label: "Home", path: "/", icon: <HomeRoundedIcon /> },
    { label: "Movies", path: "/movies", icon: <LocalMoviesRoundedIcon /> },
  ];

  const bottomMenu = [
    { label: "Settings", icon: <SettingsRoundedIcon /> },
    { label: "Help", icon: <HelpRoundedIcon /> },
  ];

  return (
    <div className="sidebar">
      <h4>Menu</h4>

      {/* Top Section */}
      <div className="sidebar__top">
        {topMenu.map((item) => (
          <div
            key={item.label}
            className={`sidebar__option ${
              location.pathname === item.path ? "sidebar__option--active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="sidebar__bottom">
        {bottomMenu.map((item) => (
          <div
            key={item.label}
            className="sidebar__option no-cursor"
          >
            {item.icon}
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
