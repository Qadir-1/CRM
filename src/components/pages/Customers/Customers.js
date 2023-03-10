/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { Button, Container, Form } from "react-bootstrap";
import img from "../../SVG/list.svg";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";

const Customers = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [query, setQuery] = useState("");
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(false);
  const [time, setTime] = useState(false);
  const [data, setData] = useState([]);
  const [customerId, setID] = useState("");

  const salesId = localStorage.getItem("salesId");
  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://p4v6aoqh3g.execute-api.ap-south-1.amazonaws.com/dev/api/v1/sales/${salesId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, [token, salesId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Add Customer
  function MyVerticallyCenteredModal(props) {
    const [name, setN] = useState("");
    const [email, setE] = useState("");
    const [mobile, setM] = useState("");
    const [category, setC] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "https://p4v6aoqh3g.execute-api.ap-south-1.amazonaws.com/dev/api/v1/sales/add",
          {
            name,
            email,
            mobile,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        toast.success("Customer Added Successfully");
        fetchData();
        setModalShow(false);
      } catch (err) {
        console.log(err);
      }
    };

    const putCategory = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          `https://p4v6aoqh3g.execute-api.ap-south-1.amazonaws.com/dev/api/v1/sales/${customerId}`,
          {
            category,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        toast.success("Category Edited ");
        props.onHide();
        fetchData();
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit Customer" : "Add Customer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {edit ? (
              <Form onSubmit={putCategory}>
                <Form.Group className="my-3">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setC(e.target.value)}
                  >
                    <option>Select Category</option>
                    <option value="Good+">Good+</option>
                    <option value="Good">Good</option>
                    <option value="About To Pay">About To Pay</option>
                    <option value="Payment">Payment</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="outline-success" type="submit">
                  Submit
                </Button>
              </Form>
            ) : (
              <Form onSubmit={postHandler}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setN(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setE(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone Number </Form.Label>
                  <Form.Control
                    type="tel"
                    pattern="[0-9]{10}"
                    onChange={(e) => setM(e.target.value)}
                  />
                </Form.Group>
                <br />

                <Button variant="outline-success" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  // SearchBar

  const filterData = !query
    ? data?.data
    : data?.data?.filter(
        (i) =>
          i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.mobile?.toString()?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.category?.toLowerCase().includes(query?.toLowerCase())
      );

  function AddComment(props) {
    const [comment, setComment] = useState("");
    const [reminder, setReminder] = useState("");

    const AddComment = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          `https://p4v6aoqh3g.execute-api.ap-south-1.amazonaws.com/dev/api/v1/sales/${customerId}`,
          {
            comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        toast.success("Comment  Added");
        props.onHide();
        fetchData();
      } catch (err) {
        console.log(err);
      }
    };

    const AddReminder = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.patch(
          `https://p4v6aoqh3g.execute-api.ap-south-1.amazonaws.com/dev/api/v1/sales/timer/${customerId}`,
          {
            reminder,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        toast.success("Reminder  Added");
        props.onHide();
        fetchData();
      } catch (err) {
        toast.success("Reminder  Added");
        props.onHide();
        fetchData();
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add {time ? "Reminder" : "Customer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={time ? AddReminder : AddComment}>
              {time ? (
                <Form.Group className="my-3">
                  <Form.Label>Reminder</Form.Label>
                  <Form.Control
                    type="time"
                    onChange={(e) => setReminder(e.target.value)}
                  />
                </Form.Group>
              ) : (
                <Form.Group>
                  <Form.Label>Comment</Form.Label>
                  <FloatingLabel
                    controlId="floatingTextarea"
                    label="Comments"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              )}
              <Button variant="outline-success" type="submit">
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
      <AddComment show={comment} onHide={() => setComment(false)} />{" "}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />{" "}
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
          Customer List <br />
          <span style={{ fontSize: "14px" }}>All Customer List</span>
        </p>
      </div>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
        className="response"
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All Customers ( Total : {data?.data?.length} )
            <hr style={{ width: "70%" }} />
          </span>
          <Button
            style={{
              backgroundColor: "#4099ff",
              color: "#fff",
              borderRadius: "0",
              border: "1px solid #4099ff",
              padding: "10px",
            }}
            onClick={() => {
              setModalShow(true);
              setEdit(false);
            }}
          >
            Add Customers
          </Button>
        </div>

        <div className="three-box">
          <div className="items" onClick={() => setQuery("")}>
            All
          </div>
          <div className="items" onClick={() => setQuery("Good+")}>
            Good+
          </div>
          <div className="items" onClick={() => setQuery("Good")}>
            Good
          </div>
          <div className="items" onClick={() => setQuery("About To Pay")}>
            About To Pay
          </div>
          <div className="items" onClick={() => setQuery("Payment")}>
            Payment
          </div>
        </div>

        <div>
          <div style={{ color: "black" }}>
            Search:{" "}
            <input
              type={"search"}
              style={{
                border: "1px solid #bfbfbf",
                width: "250px",
                color: "black",
                padding: "5px",
              }}
              placeholder="Search by Name , Phone number.."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflow: "auto", marginTop: "2%" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th> Phone Number </th>
                <th> Category </th>
                <th className="Comm"> Comment </th>
                <th>Reminder</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterData?.map((i, index) => (
                <tr key={index}>
                  <td> {i.name} </td>
                  <td> {i.email} </td>
                  <td> {i.mobile} </td>
                  <td> {i.category} </td>
                  <td style={{ maxWidth: "200px" }} className="Comm">
                    {" "}
                    {i.comment ? (
                      <div style={{ display: "flex", gap: "10px" }}>
                        {i.comment}

                        <i
                          className="fa-solid fa-plus"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setID(i._id);
                            setTime(false);
                            setComment(true);
                          }}
                        ></i>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setID(i._id);
                          setTime(false);
                          setComment(true);
                        }}
                      >
                        Add Comment
                      </Button>
                    )}{" "}
                  </td>
                  <td>
                    {" "}
                    {i.reminder ? (
                      <div style={{ display: "flex", gap: "10px" }}>
                        {i.reminder}

                        <i
                          className="fa-solid fa-plus"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setID(i._id);
                            setTime(true);
                            setComment(true);
                          }}
                        ></i>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setID(i._id);
                          setTime(true);
                          setComment(true);
                        }}
                      >
                        Add Reminder
                      </Button>
                    )}{" "}
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-pen-to-square"
                      style={{ color: "#267cb5", cursor: "pointer" }}
                      onClick={() => {
                        setID(i._id);
                        setModalShow(true);
                        setEdit(true);
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default HOC(Customers);
