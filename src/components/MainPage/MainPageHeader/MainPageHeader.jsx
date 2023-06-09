import React, { useRef, useState, useEffect } from "react";
import { DiJira } from "react-icons/di";
import styles from "./MainPageHeader.module.scss";
import "./MainPageHeader.scss";
import { Container, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { signout } from "../../../slice/userslice";
import Avatar from "@mui/material/Avatar";
import DropdownButton from "react-bootstrap/DropdownButton";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.charAt(0).toUpperCase()}`,
  };
}

function MainPageHeader() {
  const [name, setName] = useState("");
  const nameLogin = JSON.parse(localStorage.getItem("user"))?.name;

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(nameLogin);
  }, []);
  const handleSignout = () => {
    dispatch(signout());
    localStorage.removeItem("user");
    // <Navigate to={url} />;
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <div className={styles.navbar_brand}>
          <DiJira style={{ fontSize: "2rem", color: "#ffa526" }} />
          <Navbar.Brand
            style={{ fontSize: "2rem", fontWeight: "700", color: "#d085e5" }}
          >
            Jira Scrypt
          </Navbar.Brand>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle>
              <Avatar {...stringAvatar(`${name}`)} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-2">Setting</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={handleSignout}>
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
}

export default MainPageHeader;
