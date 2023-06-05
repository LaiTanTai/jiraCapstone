import React from "react";
import { Container, Row, Col, Modal, Form, Pagination } from "react-bootstrap";
import styles from "./Boards.module.scss";

function Boards() {
  return (
    <div
      className="tab-pane show active"
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      <Row>
        <Col sm={5} className="px-5">
          <div className={`component component--heading`}>
            <h2
              className={`${styles.h2_text} fnt-wt font-wt- fnt-mg font-mgn- fnt-ln font-lnh- heading`}
            >
              {" "}
              Powerful agile boards
            </h2>
          </div>
          <div className="component component--list-block ">
            <ul className={`${styles.li_css}`}>
              <li className={`${styles.featured_checkmark} mt-4`}>
                <svg
                  version="1.2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 30"
                  width={60}
                  height={40}
                >
                  <path d="m1.5 16.4c1.8-1.7 4.2-0.3 4.2-0.3l5.6 5.9 15.4-18.7c0 0 1.7-1.2 3.5 0.1 1.9 1.4 0.8 3.6 0.8 3.6l-18 22h-2l-9.1-8.7c0 0-2.1-2.2-0.4-3.9z"></path>
                </svg>
                <p className={styles.p_text}>
                  <strong>Scrum boards:</strong> Scrum boards help agile teams
                  break large, complex projects into manageable pieces of work
                  so focused teams ship faster.
                </p>
              </li>{" "}
              <li className={`${styles.featured_checkmark} mt-4`}>
                <svg
                  version="1.2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 30"
                  width={90}
                  height={40}
                >
                  <path d="m1.5 16.4c1.8-1.7 4.2-0.3 4.2-0.3l5.6 5.9 15.4-18.7c0 0 1.7-1.2 3.5 0.1 1.9 1.4 0.8 3.6 0.8 3.6l-18 22h-2l-9.1-8.7c0 0-2.1-2.2-0.4-3.9z"></path>
                </svg>
                <p className={styles.p_text}>
                  <strong>Kanban boards:</strong> Agile and DevOps teams can use
                  flexible kanban boards to visualize workflows, limit
                  work-in-progress, and maximize efficiency as a team. Templates
                  make it easy to get started quickly and customize as you go.
                </p>
              </li>{" "}
              <li className={`${styles.featured_checkmark} mt-4`}>
                <svg
                  version="1.2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 30"
                  width={60}
                  height={40}
                >
                  <path d="m1.5 16.4c1.8-1.7 4.2-0.3 4.2-0.3l5.6 5.9 15.4-18.7c0 0 1.7-1.2 3.5 0.1 1.9 1.4 0.8 3.6 0.8 3.6l-18 22h-2l-9.1-8.7c0 0-2.1-2.2-0.4-3.9z"></path>
                </svg>
                <p className={styles.p_text}>
                  <strong>Choose your own adventure:</strong> Jira Software is
                  flexible enough to mold to your team’s own unique way of
                  working, whether it is Scrum, Kanban, or something in between.
                </p>
              </li>{" "}
            </ul>
          </div>
        </Col>
        <Col sm={7} className="px-5">
          <div className="component component--image">
            {" "}
            <img
              alt="Jira automation"
              className={styles.component_image}
              src="https://wac-cdn.atlassian.com/dam/jcr:61848582-efe5-4b31-9ff0-de864d004900/JSW_Automation.png?cdnVersion=1039"
              loading="auto"
            />{" "}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Boards;
