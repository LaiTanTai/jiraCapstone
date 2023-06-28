import React from "react";
import { DiJira } from "react-icons/di";
import styles from "./FirstPageHeader.module.scss";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Header from "../../Header/Header";
function FirstPageHeader() {
  return (
    // <Navbar bg="light" expand="lg" sticky="top">
    //   <Container>
    //     <div className={styles.navbar_brand}>
    //       <DiJira style={{ fontSize: "2rem", color: "#ffa526" }} />
    //       <Navbar.Brand
    //         style={{ fontSize: "2rem", fontWeight: "700", color: "#d085e5" }}
    //       >
    //         Jira Scrypt
    //       </Navbar.Brand>
    //     </div>
    //   </Container>
    // </Navbar>
    <Header />
  );
}

export default FirstPageHeader;
