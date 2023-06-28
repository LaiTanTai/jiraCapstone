import React from "react";
import styles from "./Customize.module.scss";

function Customize() {
  return (
    <div className={`${styles.Customize_background}`}>
      <div className={`${styles.feature}`}>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div>
              {" "}
              <img
                id="0c37f65a"
                alt="Jira boards"
                className={`${styles.Customize_image}`}
                src="https://wac-cdn.atlassian.com/dam/jcr:e966255e-69d5-400f-a45c-dec5442225b1/JSW_Boards.png?cdnVersion=1040"
                loading="auto"
              />{" "}
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div>
              <div className="component component--heading mt-5">
                {" "}
                <h2 className={styles.h2_text}>
                  {" "}
                  Customize how your team’s work flows{" "}
                </h2>{" "}
              </div>
              <div className="component component--horizontal-rule align-left mt-5 text-info">
                {" "}
                <hr className="longCustom b75" />{" "}
              </div>
              <div className="component component--textblock mt-5 ">
                {" "}
                <p className={styles.p_text}>
                  Set up, clean up, and automate even the most complicated
                  project workflows.
                </p>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.feature}`}>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div>
              <div className="component component--heading mt-5">
                {" "}
                <h2 className={styles.h2_text}>
                  {" "}
                  Stay on track – even when the track changes{" "}
                </h2>{" "}
              </div>
              <div className="component component--horizontal-rule align-left mt-5 text-info">
                {" "}
                <hr className="longCustom b75" />{" "}
              </div>
              <div className="component component--textblock mt-5 ">
                {" "}
                <p className={styles.p_text}>
                  Use integrated roadmaps to sketch out the big picture,
                  communicate plans with stakeholders, and ensure your team
                  stays on the same page.
                </p>{" "}
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-sm-12">
            <div>
              {" "}
              <img
                id="0c37f65a"
                alt="Jira boards"
                className={`${styles.Customize_image}`}
                src="https://wac-cdn.atlassian.com/dam/jcr:e966255e-69d5-400f-a45c-dec5442225b1/JSW_Boards.png?cdnVersion=1040"
                loading="auto"
              />{" "}
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.feature}`}>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div>
              {" "}
              <img
                id="0c37f65a"
                alt="Jira boards"
                className={`${styles.Customize_image}`}
                src="https://wac-cdn.atlassian.com/dam/jcr:e966255e-69d5-400f-a45c-dec5442225b1/JSW_Boards.png?cdnVersion=1040"
                loading="auto"
              />{" "}
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div>
              <div className="component component--heading mt-5">
                {" "}
                <h2 className={styles.h2_text}> Bye-bye, spreadsheets </h2>{" "}
              </div>
              <div className="component component--horizontal-rule align-left mt-5 text-info">
                {" "}
                <hr className="longCustom b75" />{" "}
              </div>
              <div className="component component--textblock mt-5 ">
                {" "}
                <p className={styles.p_text}>
                  Keep every detail of a project centralized in real time so
                  up-to-date info can flow freely across people, teams, and
                  tools.
                </p>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customize;
