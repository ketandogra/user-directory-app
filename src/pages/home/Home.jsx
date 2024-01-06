import React from "react";
import Directory from "../../components/directory/Directory";
import { Container, Row, Col } from "reactstrap";
import "./home.scss"

const Home = () => {
  return (
    <div className="homeWrapper">
      <Container>
        <header>
          <h1>Directory</h1>
        </header>

        <Directory />
      </Container>
    </div>
  );
};

export default Home;
