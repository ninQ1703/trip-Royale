
import background from './Frame.png';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5"
import {BsArrowRight} from "react-icons/bs"
import ConfigIcon from './icon_color';
import { icons } from 'react-icons';

export const DashB = (props) => {
  const [groupsData, setData] = useState([]);
  const [trip, setTrip] = useState("");
  // const [user, setUser] = useState(0);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/${props.user}/trips`)
      .then((response) => response.json())
      .then((data) => { setData(data) })
  }, [])



  // console.log(groupsData);
  // console.log(trip);
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
              width: '60%',
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
              Welcome to Trip Royale,<br /> {props.user}
            </h1>
          </Col>

          <Col sm={4}  >
            <Container className="pt-3">
              <h1
                style={{
                  fontSize: '35px',
                  fontWeight: 'bold',
                  marginBottom: '35px',
                  marginTop: "5%"
                }}
              ><BsArrowRight />   See previous trips
              </h1>
              {groupsData.map((ev) => {
                return (
                  <div key={ev.id} className="d-flex mb-3">
                    <Link to="/scheduler" state={{ trip: ev.id, user: props.user }} style={{ textDecoration: 'none', color:'white', width:'100%', }}>

                      <Card onClick={() => {
                        setTrip(ev.id);

                      }}
                        style={{
                          backgroundColor: "#FF900B",
                          height: "50px"
                        }}
                      >
                        <Card.Body>
                          <blockquote className="blockquote mb-0">
                            {ev.name} {"=>"} {ev.dest}
                          </blockquote>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                );
              })}
              <Link to="/newtrip" state={{ user: props.user }} >
                <Button
                    style={{
                      backgroundColor:'transparent', 
                      borderColor:'white',
                      marginLeft:'100%',
                      marginTop:'70%',
                      }}
                >
                  <IoAddCircleSharp color='orange' size="4em"/>


                </Button>
              </Link>
            </Container>
          </Col>
        </div>
      </Container>
    </div>
  );
};









