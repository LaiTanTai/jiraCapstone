import React from "react";
import styles from "./Sponsor.module.scss";

function Sponsor() {
  return (
    <div className={styles.Sponsor_background}>
      <div className="row">
        <div className="column column-md-8 column-lg-6 column-md-offset-2 column-lg-offset-3 text-center s0 between">
          <div className="component component--heading">
            <h2 className="fnt-wt font-wt- fnt-mg font-mgn- fnt-ln font-lnh- heading text-light">
              Move fast, stay aligned, and build better - together{" "}
            </h2>
          </div>
          <div className="component component--link-button">
            <a
              href="#start-trial"
              data-event="clicked"
              data-uuid="582af884-e7"
              data-event-component="linkButton"
              data-event-container="linkButton"
              data-schema-version={1}
              data-product-key="jiraSoftware"
              data-label="Get it free"
              data-label-english="Get it free"
              className="component__link button button--two button--regular button--primary "
            >
              Get it free
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sponsor;
