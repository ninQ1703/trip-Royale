
import background from './Frame.png';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md"
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
    <div style={{ marginTop: '4.6%', overflow: 'hidden' }}>

      <Container fluid>
        <div className="row">
          <Col sm={8}
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '90vh',
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

          <Col sm={4} style={{overflowY:'initial'}} >
            <Container className="pt-3" style={{height:'90vh',width:'75vh', overflowY:'scroll', scrollbarWidth:'0px'}}>
              <h1
                style={{
                  fontSize: '35px',
                  fontWeight: 'bold',
                  // marginBottom: '35px',
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
                        height: "50px",
                        boxShadow: "3px 3px 3px rgba(46, 46, 46, 0.62)",
                        width: '100%',
                        color: '#FFFFFF',
                        verticalAlign: 'middle'
                      }}
                    >
                      <Card.Body>
                        <blockquote className="blockquote mb-0">
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', alignContent: 'center', verticalAlign: 'middle', }}>
                            <div style={{ fontWeight: "bold", fontSize: "24px" }}>{ev.name} </div> <div> {ev.dest}  <BsArrowRight marginLeft="auto" /> </div>
                          </div>
                        </blockquote>
                      </Card.Body>
                    </Card>
                    {/* </Link> */}
                  </div>
                );
              })}
              <Link to="/newtrip" state={{ user: userData.id }} style={{ textDecoration: 'none', backgroundColor: 'transparent', color: '#FFFFFF' , position:'fixed', bottom:'10px', right:'100px'}} >
                <div
                  style={{

                    marginLeft: '100%',
                    marginTop: '50%',
                    
                  }}
                >
                  <MdAddCircle color='#E28616'  size="4em"  />


                </div>
              </Link>
            </Container>
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default DashB;









