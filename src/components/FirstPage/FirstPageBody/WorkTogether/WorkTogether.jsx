import React from "react";
import "./WorkTogether.scss";

function WorkTogether() {
  return (
    <div>
      <div className="container-fluid md-comfortable">
        <div className="container">
          <div className="column text-center">
            <div className="component component--heading">
              <h3 className="fnt-wt font-wt- fnt-mg font-mgn- fnt-ln font-lnh- heading">
                Trusted by over 100,000 customers world-wide
              </h3>
            </div>
          </div>
          <div className="d-flex mt-4">
            <div className="component component--image">
              <img
                id="151707d5"
                alt="Square logo"
                className="component__image"
                src="https://wac-cdn.atlassian.com/dam/jcr:4cba45db-e328-4abd-88ea-bfe276355cb5/Square%20Logo.svg?cdnVersion=984"
              />
            </div>
            <div className="component component--image">
              <img
                id="f15adc7b"
                alt="ebay logo"
                className="component__image"
                src="https://wac-cdn.atlassian.com/dam/jcr:db51d228-2145-498b-ab73-064aa651770d/ebay%20logo.svg?cdnVersion=984"
              />
            </div>
            <div className="component component--image">
              <img
                id="a2c9f3e7"
                alt="Spotify logo"
                className="component__image"
                src="https://wac-cdn.atlassian.com/dam/jcr:7db3e103-186c-4413-950d-dea2f2a5755c/Spotify%20logo.svg?cdnVersion=984"
              />
            </div>
            <div className="component component--image">
              <img
                id="67d47758"
                alt="Cisco logo"
                className="component__image"
                src="https://wac-cdn.atlassian.com/dam/jcr:4d6ede5b-a9ea-410b-baab-6cb7166c080d/Cisco%20Logo.svg?cdnVersion=984"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkTogether;
