import React from "react";
import { DiJira } from "react-icons/di";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Header.module.scss";

function Header() {
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
      </Container>
    </Navbar>
  );
}

export default Header;
