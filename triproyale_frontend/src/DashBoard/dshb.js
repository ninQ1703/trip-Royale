
import background from './Frame.png';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5"
import { BsArrowRight } from "react-icons/bs"
import ConfigIcon from './icon_color';
import { icons } from 'react-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';

const DashB = () => {


  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "", id: "" }))
    dispatch(unSetUserToken({ access_token: null }))
    removeToken()
    navigate('/login')
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { access_token } = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(access_token)

  const [userData, setUserData] = useState({
    email: "",
    name: "",
    id: ""
  })
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.email,
        name: data.name,
        id: data.id,
      })
    }
  }, [data, isSuccess])
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.email,
        name: data.name,
        id: data.id
      }))
    }
  }, [data, isSuccess, dispatch])




  const [groupsData, setData] = useState([]);
  const [trip, setTrip] = useState("");
  // const [user, setUser] = useState(0);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/${userData.id}/trips`)
      .then((response) => response.json())
      .then((data) => { setData(data) })
  }, [userData])



  console.log(groupsData);
  // console.log(trip);
  return (
    <div >
      <div>

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
              Welcome to Trip Royale,<br /> {userData.name}
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
                    {/* <Link to="/scheduler" state={{ trip: ev.id, user: userData.id }} style={{ textDecoration: 'none', color: 'white', width: '100%', }}> */}

                    <Card onClick={() => {
                      setTrip(ev.id);
                      navigate('/scheduler',
                        {
                          state: {
                            trip: ev.id,
                            user: userData.id
                          }
                        }
                      )

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
                    {/* </Link> */}
                  </div>
                );
              })}
              <Link to="/newtrip" state={{ user: userData.id }} >
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: 'white',
                    marginLeft: '100%',
                    marginTop: '70%',
                  }}
                >
                  <IoAddCircleSharp color='orange' size="4em" />


                </Button>
              </Link>
            </Container>
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default DashB;









