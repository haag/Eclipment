import React, { useState } from "react";
import {
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardSubtitle
} from "reactstrap";
import img3 from "../../assets/images/big/img4.jpg";

function Counter(props) {
  const handleClick = () => props.onClickFunction(props.increment);
  return (
    <Button color={props.color} onClick={handleClick}>
      <i className={props.icon}></i> {props.message} {props.curCount}
    </Button>
  );
}

function Display(props) {
  return <h4> {props.message} </h4>;
}

const ModalComponent = props => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const [counter, setCounter] = useState(0);
  const incrementCounter = () => setCounter(counter + 1);
  const [counter1, setCounter1] = useState(0);
  const incrementCounter1 = () => setCounter1(counter1 + 1);
  const [counter2, setCounter2] = useState(0);
  const incrementCounter2 = () => setCounter2(counter2 + 1);

  const externalCloseBtn = (
    <button
      className="close"
      style={{
        position: "absolute",
        right: "15px",
        top: "15px"
      }}
      onClick={toggle.bind(null)}
    >
      &times;
    </button>
  );
  const handleClick = () => props.onClickFunction(props.increment);

  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <Col xs="12" md="6">
          <Card>
            <CardTitle className="bg-light border-bottom p-3 mb-0">
              <i className="mdi mdi mdi-tablet mr-2"> </i>
              Bryces Incrementers!
            </CardTitle>

            <CardBody className="">
              <Button color="danger" onClick={toggle.bind(null)}>
                Student's Info
              </Button>
              <Modal
                isOpen={modal}
                toggle={toggle.bind(null)}
                className={props.className}
              >
                <ModalHeader toggle={toggle.bind(null)}>
                  Student information quick link
                </ModalHeader>
                <ModalBody>
                  <Card>
                    <CardImg top width="100%" src={img3} alt="Card image cap" />
                    <CardBody>
                      <CardTitle>Alexandra Sparks</CardTitle>
                      <CardSubtitle>English 1 (2nd Period)</CardSubtitle>
                      <CardText>Any Text we want here</CardText>
                      <Row>
                        <Col>
                          <Counter
                            color={"warning"}
                            onClickFunction={incrementCounter}
                            increment={1}
                            message={"Hall Pass"}
                            icon={"icon-logout"}
                          />
                          <Display message={counter} />
                        </Col>

                        <Counter
                          color={"primary"}
                          onClickFunction={incrementCounter1}
                          increment={1}
                          message={"Electronics Warning"}
                          icon={"mr-2 mdi mdi-cellphone-iphone"}
                        />
                        <Display message={counter1} />

                        <Counter
                          color={"secondary"}
                          onClickFunction={incrementCounter2}
                          increment={1}
                          message={"Disruptive"}
                          icon={"icon-volume-2"}
                          curCount={counter2}
                        />
                        <Button color="secondary" onClick={toggle.bind(null)}>
                          Cancel
                        </Button>
                      </Row>
                    </CardBody>
                  </Card>
                </ModalBody>
              </Modal>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}

      {/* --------------------------------------------------------------------------------*/}
      {/* End Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default ModalComponent;
