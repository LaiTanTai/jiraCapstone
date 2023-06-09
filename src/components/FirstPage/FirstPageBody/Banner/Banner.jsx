import React from "react";
import Neon_Button from "./../../../Button/Neon_Button/Neon_Button";
import Aos from "aos";
import styles from "./Banner.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signout } from "../../../../slice/userslice";

Aos.init();
function Banner() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = () => {
    dispatch(signout());
    localStorage.removeItem("user");
  };

  return (
    <div className={`${styles.bannerBackGround}`}>
      <section className={styles.getStart}>
        <h1 className={styles.getStart_text}>GET START MANAGEMENT</h1>
        <div className={styles.getStart_button}>
          <Neon_Button style={"1.5rem"} Nav={"/login"}>
            Login
          </Neon_Button>
          <Neon_Button style={"1.5rem"} Nav={"/register"}>
            Register
          </Neon_Button>
          <Neon_Button style={"1.5rem"} onClick={handleSignout}>
            Log out
          </Neon_Button>
        </div>
      </section>
      <section className={styles.Banner}>
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className={styles.text}
        >
          <p>Jira Scrypt is easier than ever</p>
          <p className={styles.normal_text}>
            Explore Jira’s features that help your team succeed
          </p>
          <ul className={styles.list}>
            <li className={styles.li}>10 user licenses</li>
            <li className={styles.li}>Workflows and automation</li>
            <li className={styles.li}>Out-of-the-box roadmaps</li>
            <li className={styles.li}>
              Integrations with thousands of other tools
            </li>
          </ul>
        </div>
        <img
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="1000"
          className={styles.img}
          src="./../img/workJira.jpeg"
        />
      </section>
    </div>
  );
}

export default Banner;
