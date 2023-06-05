import React from "react";
import { Container, Row, Col, Modal, Form, Pagination } from "react-bootstrap";
import styles from "./Reportss.module.scss";

function Reportss() {
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
              Reports and insights
            </h2>
          </div>
          <div className="component component--list-block ">
            <ul className={`${styles.li_css}`}>
              <li className={`${styles.featured_checkmark} mt-4`}>
                <svg
                  version="1.2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 30"
                  width={80}
                  height={40}
                >
                  <path d="m1.5 16.4c1.8-1.7 4.2-0.3 4.2-0.3l5.6 5.9 15.4-18.7c0 0 1.7-1.2 3.5 0.1 1.9 1.4 0.8 3.6 0.8 3.6l-18 22h-2l-9.1-8.7c0 0-2.1-2.2-0.4-3.9z"></path>
                </svg>
                <p className={styles.p_text}>
                  <strong>Ready to go reporting:</strong> Out-of-the-box reports
                  and dashboards in Jira Software offer critical insights within
                  the context of your work to ensure your teams are always up to
                  date and set up for success.
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
                  <strong>Sprint reporting:</strong> Determine where your team
                  is overcommitted to reduce excessive scope creep and better
                  understand completed work in each sprint.
                </p>
              </li>{" "}
              <li className={`${styles.featured_checkmark} mt-4`}>
                <svg
                  version="1.2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 30"
                  width={40}
                  height={40}
                >
                  <path d="m1.5 16.4c1.8-1.7 4.2-0.3 4.2-0.3l5.6 5.9 15.4-18.7c0 0 1.7-1.2 3.5 0.1 1.9 1.4 0.8 3.6 0.8 3.6l-18 22h-2l-9.1-8.7c0 0-2.1-2.2-0.4-3.9z"></path>
                </svg>
                <p className={styles.p_text}>
                  <strong>Burndown charts:</strong> Track work towards sprint
                  goals to manage progress and respond accordingly.
                </p>
              </li>{" "}
              <li className={`${styles.featured_checkmark} mt-4`}>
                <svg
                  version="1.2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 30"
                  width={50}
                  height={40}
                >
                  <path d="m1.5 16.4c1.8-1.7 4.2-0.3 4.2-0.3l5.6 5.9 15.4-18.7c0 0 1.7-1.2 3.5 0.1 1.9 1.4 0.8 3.6 0.8 3.6l-18 22h-2l-9.1-8.7c0 0-2.1-2.2-0.4-3.9z"></path>
                </svg>
                <p className={styles.p_text}>
                  <strong>Release Burndown:</strong> Track and monitor the
                  projected release date for versions and take action if work is
                  falling behind schedule.
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

export default Reportss;
