/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import img from "../../SVG/list.svg";
import { Form , Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const users = [
  {
    customer: "Abhisekh",
    Hero: "Arpan",
    service: "Photo",
    location: "delhi",
    date: "12/02/2005",
    amount: "5,000",
    mode: "online",
  },
  {
    customer: "Sharukh",
    Hero: "Gauri",
    service: "Video",
    location: "delhi",
    date: "12/02/2005",
    amount: "45,000",
    mode: "Cash",
  },
  {
    customer: "Krishna",
    Hero: "Raftaar",
    service: "Video",
    location: "delhi",
    date: "12/02/2005",
    amount: "95,000",
    mode: "online",
  },
];

const NotifyLabour = () => {
  const [modalShow, setModalShow] = React.useState(false);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Edit Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Form.Group>
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone Number </Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <br />
              <Form.Select aria-label="Default select example">
                <option>Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </Form.Select>
              <br />
              <Form.Group>
                <Form.Label>DOB</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Website</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Wallet</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <br />
              <Button
                variant="outline-success"
                onClick={() => {
                  setModalShow(false);
                  toast.success("Customer added Successfully");
                }}
              >
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }




  return (
    <>
      <div style={{ display: "flex", gap: "20px", marginBottom: "2%" }}>
        <img
          src={img}
          alt=""
          style={{
            backgroundColor: "#4099ff",
            padding: "8px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            width: "40px",
            height: "40px",
            marginTop: "5px",
          }}
        />
        <p style={{ color: "black", fontSize: "18px", margin: "0" }}>
          Project's List <br />
          <span style={{ fontSize: "14px" }}>All Project's List</span>
        </p>
      </div>

      <section
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All Project's
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        <div
          style={{
            overflow: "auto",
            width: "100%",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Customer </th>
                <th> Hero </th>
                <th> Service </th>
                <th> Date </th>
                <th> Status </th>
                <th> Amount </th>
                <th> Payment Method </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((i, index) => (
                <tr key={index}>
                  <td> {i.customer} </td>
                  <td> {i.Hero} </td>
                  <td> {i.service} </td>
                  <td> {i.date} </td>
                  <td> Successfull </td>
                  <td> {i.amount} </td>
                  <td> {i.mode} </td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <i
                        class="fa-solid fa-eye"
                        style={{ color: "#099ffe", cursor: "pointer" }}
                      ></i>
                      <i
                        class="fa-solid fa-pen-to-square"
                        style={{ color: "#267cb5", cursor: "pointer" }}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};
export default HOC(NotifyLabour);
