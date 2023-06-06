import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CopyrightIcon from "@mui/icons-material/Copyright";
import "./FirstPageFooter.scss";
function FirstPageFooter() {
  return (
    <div className="homeFooter">
      <footer className="container-fluid d-flex">
        <div className="products">
          <h5>Products</h5>
          <ul>
            <li>
              <a href="#">Jira Home</a>
            </li>
            <li>
              <a href="#"> Jira Service </a>
            </li>
            <li>
              <a href="#"> Jira Management</a>
            </li>
          </ul>
        </div>
        <div className="resources">
          <h5>Resources</h5>
          <ul>
            <li>
              <a href="#">Account</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="#">Evaluate</a>
            </li>
          </ul>
        </div>
        <div className="expland--learn">
          <h5>Expland--Learn</h5>
          <ul>
            <li>
              <a href="#">Jira Home</a>
            </li>
            <li>
              <a href="#"> Jira Service </a>
            </li>
            <li>
              <a href="#"> Jira Management</a>
            </li>
          </ul>
        </div>
        <div className="contact">
          <h5>Contact</h5>
          <ul>
            <li>
              <a href="#">Blogs</a>
            </li>
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="#">Events</a>
            </li>
          </ul>
        </div>
      </footer>
      <hr />
      <div className="container-fluid copyright d-flex pt-3">
        <h6>Copyright © 2023 Atlassian: </h6>
        <a href="#">
          <FacebookIcon className="text-dark" />
        </a>
        <a href="#">
          <TwitterIcon className="text-dark" />
        </a>
        <a href="#">
          <YouTubeIcon className="text-dark" />
        </a>
        <a href="#">
          <LinkedInIcon className="text-dark" />
        </a>
      </div>
    </div>
  );
}

export default FirstPageFooter;
