import React, { useState } from "react";
import styles from "./AboutUs.module.scss";
import Automation from "./Automation/Automation";
import Boards from "./Boards/Boards";
import Reportss from "./Reportss/Reportss";
import Roadmaps from "./Roadmaps/Roadmaps";

function AboutUs() {
  const [show, setShow] = useState("Boards");

  const handleClick = (value) => {
    setShow(value);
  };
  return (
    <>
      <section className={styles.feature}>
        <h2 className={`${styles.text} text-center mb-5`}>
          Discover the features that make Jira so easy to use
        </h2>
        <div className={`${styles.container} mb-5`}>
          <div className="row justify-content-between">
            <button
              className={`${
                show === "Boards" ? styles.button_active : styles.button_css
              } col-3`}
              onClick={() => {
                handleClick("Boards");
              }}
            >
              Boards
            </button>
            <button
              className={`${
                show === "Roadmaps" ? styles.button_active : styles.button_css
              } col-3`}
              onClick={() => {
                handleClick("Roadmaps");
              }}
            >
              Roadmaps
            </button>
            <button
              className={`${
                show === "Reportss" ? styles.button_active : styles.button_css
              } col-3`}
              onClick={() => {
                handleClick("Reportss");
              }}
            >
              Reports
            </button>
            <button
              className={`${
                show === "Automation" ? styles.button_active : styles.button_css
              } col-3`}
              onClick={() => {
                handleClick("Automation");
              }}
            >
              Automation
            </button>
          </div>
        </div>
        <div className="tab-content" id="nav-tabContent">
          {show === "Boards" ? (
            <Boards />
          ) : show === "Roadmaps" ? (
            <Roadmaps />
          ) : show === "Reportss" ? (
            <Reportss />
          ) : show === "Automation" ? (
            <Automation />
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
}

export default AboutUs;
