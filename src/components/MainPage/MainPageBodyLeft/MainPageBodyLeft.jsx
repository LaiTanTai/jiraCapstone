import React, { useState, useRef } from "react";

import "./MainPageBodyLeft.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TocIcon from "@mui/icons-material/Toc";
import SettingsIcon from "@mui/icons-material/Settings";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";
import SettingsInputComponentRoundedIcon from "@mui/icons-material/SettingsInputComponentRounded";
import BuildCircleRoundedIcon from "@mui/icons-material/BuildCircleRounded";

function MainPageBodyLeft({ open, setOpen }) {
  const [renderOpen, setRenderOpen] = useState(false);
  const [renderClose, setRenderClose] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    setRenderClose(true);
    setRenderOpen(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setRenderOpen(true);
    setRenderClose(false);
  };
  return (
    <>
      {renderClose && (
        <button
          className={`${renderClose ? "btn__close" : "btn__open"}`}
          onClick={handleDrawerClose}
        >
          <ArrowBackIosIcon sx={{ fontSize: "15px", marginLeft: "4px" }} />
        </button>
      )}
      {renderOpen && (
        <button
          className={`${renderOpen ? "btn__open" : "btn__close"}`}
          onClick={handleDrawerOpen}
        >
          <ArrowForwardIosIcon sx={{ fontSize: "15px", marginLeft: "0px" }} />
        </button>
      )}
      <nav className={`content ${open ? "open" : "closed"}`}>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "25px" }}
        >
          <BuildCircleRoundedIcon
            sx={{
              color: "rgb(66 153 225 / .5)",
              display: "block",
              textAlign: "center",
              width: "25%",
              fontSize: "35px",
            }}
          />
          <h2 style={{ lineHeight: "35px", margin: "0" }}>Tool</h2>
        </div>
        <ul>
          <li>
            <div>
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "35px",
                }}
              >
                <TocIcon sx={{ width: "25%" }} />
                Board
              </a>

              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "35px",
                }}
              >
                <SettingsIcon sx={{ width: "25%" }} />
                Setings
              </a>
            </div>

            <hr />

            <div>
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "35px",
                }}
              >
                <NewReleasesRoundedIcon sx={{ width: "25%" }} />
                Releases
              </a>
              <a
                href="#"
                style={{
                  display: "flex",
                  height: "35px",
                  alignItems: "center",
                }}
              >
                <GppGoodRoundedIcon sx={{ width: "25%" }} />
                Issues and filters
              </a>
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "35px",
                }}
              >
                <SettingsInputComponentRoundedIcon sx={{ width: "25%" }} />
                Component
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default MainPageBodyLeft;
