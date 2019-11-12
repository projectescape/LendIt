import React from "react";
import { Jumbotron, Container, Button } from "react-bootstrap";
import Logo from "../images/logo.jpg";

class Landing extends React.Component {
  render() {
    return (
      <Jumbotron>
        <Container>
          <div className="text-center">
            <img src={Logo} className="mb-3" height="200" alt="Logo Image" />

            <div className="display-4 mb-3">
              A place for you to make some extra bucks lending your items,
              helping others save and reduce waste generation at the same time
            </div>
            <Button variant="primary" size="lg" href="/auth/google">
              Login to Continue
            </Button>
          </div>
        </Container>
      </Jumbotron>
    );
  }
}

export default Landing;
