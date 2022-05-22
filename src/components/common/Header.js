import React from "react";
import { MdMenu } from "react-icons/md";
import logo from "../../images/logo.png";
import { FaTwitter, FaDiscord } from "react-icons/fa";

const Header = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg" id="navbar">
      <div className="container-fluid">
        <a className="nav-link" href="#home">
          <img
            src={logo}
            className="img-fluid"
            alt="Logo"
            width="100"
            height="80"
          />
        </a>
        <button
          className="navbar-toggler header-icon"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-label="Toggle navigation"
        >
          <MdMenu />
        </button>
        <div className="navbar-collapse collapse" id="navbarNav">
          <div className="header-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#lore">
                  Lore
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#roadmap">
                  Anti-Roadmap
                </a>
              </li>
            </ul>
          </div>
          <div className="header-end">
            <div className="icon-group">
              <a
                className="header-icon"
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/graveyardfalls?s=21&t=U3HFGlh_aQ5iuPukG3Nbvg"
              >
                <FaTwitter />
              </a>
              <a
                className="header-icon"
                target="_blank"
                rel="noreferrer"
                href="https://discord.gg/supers"
              >
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
