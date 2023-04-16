
import background from './Dash_trip.jpg';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

export const DashB = ({ username }) => {
  const [groupsData, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/1/trips")
    .then((response) => response.json())
    .then((data) => {setData(data)} )
  }, [])
  console.log(groupsData);
  return (
    <div >
      <div>

        <Navbar variant="dark"
          style={{ backgroundColor: "#E28616", color: "#000000", height: "50px" }}>
          <Container>
            <Navbar.Brand style={{ fontSize: "30px" }}><strong>TRIP  ROYALE</strong></Navbar.Brand>
          </Container>
        </Navbar>

      </div>
      <Container fluid>
        <div className="row">
          <Col sm={8}
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <h1
              style={{
                color: '#fff',
                borderColor: "#000000",
                fontSize: '55px',
                fontWeight: 'bold',
                marginBottom: '30%',
              }}>
              Welcome to Trip Royale,<br /> {username}
            </h1>
          </Col>

          <Col sm={4}  >
            <Container className="pt-3">
              <h1
                style={{
                  fontSize: '35px',
                  fontWeight: 'bold',
                  marginBottom: '35px',
                  marginTop: "20%"
                }}
              >{" -> "}See previous trips
              </h1>
              {groupsData.map((ev) => {
                return (
                  <div key={ev.id} className="d-flex mb-3">
                    <Button variant="warning"
                      style={{ height: "50px", borderRadius: "50%", backgroundColor: "#FF900B" }}
                    >{">"}</Button>
                    <Card
                      style={{
                        backgroundColor: "#FF900B",
                        width: "100%",
                        height: "50px"
                      }}
                    >
                      <Card.Body>
                        <blockquote className="blockquote mb-0">
                          {ev.name} {"=>"} {ev.dest}
                        </blockquote>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
              <Button
                variant="warning"
                style={{
                  background: '#FF900B',
                  color: '#000000',
                  borderColor: '#000000',
                  borderRadius: '30%',
                  fontSize: '50px',
                  fontWeight: 'bold',
                  width: '30%',
                  height: '90px',
                  cursor: 'pointer',
                  marginTop: '30%',
                  marginLeft: "70%"
                }}>+</Button>
            </Container>
          </Col>
        </div>
      </Container>
    </div>
  );
};









