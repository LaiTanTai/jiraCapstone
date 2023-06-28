import React from "react";
import styles from "./Sponsor.module.scss";

function Sponsor() {
  return (
    <>
      <div className={styles.Sponsor_background}>
        <div className={styles.Sponsor_position}>
          <div className={styles.Sponsor_children}>
            <div className="text-center">
              <h2 className={styles.h2_text}>
                Move fast, stay aligned, and build better -
                <br /> together{" "}
              </h2>
            </div>
            <div className={`text-center mt-4 `}>
              <button className={`${styles.button_text} btn btn-warning `}>
                Get it free
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.feature}>
        {" "}
        <div className={styles.worldwide_feature}>
          {" "}
          <div className="text-center">
            {" "}
            <h3 className="fnt-wt font-wt- fnt-mg font-mgn- fnt-ln font-lnh- heading">
              {" "}
              Trusted by over 100,000 customers world-wide{" "}
            </h3>{" "}
          </div>{" "}
          <div className={`row mt-5 justify-content-between`}>
            {" "}
            <div className="col-3 text-center">
              {" "}
              <img
                id="151707d5"
                alt="Square logo"
                className={styles.component__image}
                
                src="https://wac-cdn.atlassian.com/dam/jcr:4cba45db-e328-4abd-88ea-bfe276355cb5/Square%20Logo.svg?cdnVersion=1042"
                loading="auto"
              />{" "}
            </div>{" "}
            <div className="col-3 text-center">
              {" "}
              <img
                id="f15adc7b"
                alt="ebay logo"
                className={styles.component__image}
                
                src="https://wac-cdn.atlassian.com/dam/jcr:db51d228-2145-498b-ab73-064aa651770d/ebay%20logo.svg?cdnVersion=1042"
                loading="auto"
              />{" "}
            </div>{" "}
            <div className="col-3 text-center">
              {" "}
              <img
                id="a2c9f3e7"
                alt="Spotify logo"
                className={styles.component__image}
                
                src="https://wac-cdn.atlassian.com/dam/jcr:7db3e103-186c-4413-950d-dea2f2a5755c/Spotify%20logo.svg?cdnVersion=1042"
                loading="auto"
              />{" "}
            </div>{" "}
            <div className="col-3 text-center">
              {" "}
              <img
                id="67d47758"
                alt="Cisco logo"
                className={styles.component__image}
                src="https://wac-cdn.atlassian.com/dam/jcr:4d6ede5b-a9ea-410b-baab-6cb7166c080d/Cisco%20Logo.svg?cdnVersion=1042"
                loading="auto"
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
}

export default Sponsor;
