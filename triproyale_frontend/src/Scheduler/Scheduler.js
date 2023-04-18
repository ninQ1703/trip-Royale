import SideBar from '../SideBar/Sidebar.js';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Dates } from './dates.js';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom'
// import './App.css';

// import {Dates} from './S_comp/dates.js';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';

// let userid=1;
// let trip_id=1;
export function Scehduler(props) {

  let [sdate, setSDate] = useState("");
  let [edate, setEDate] = useState("");
  const location = useLocation();
  const { trip } = location.state;
  const { user } = location.state;
  
  function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  // 3. Create out useEffect function
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/${user}/${trip}/`)
      .then((response) => response.json())
      .then((data) => { setSDate(data.start_date); setEDate(data.end_date); })
  }, [])
  console.log(sdate, edate)
  let daysOfTrip = getDates(sdate, edate);
  // console.log(sdate)

  return (
    <>
      <div>
        <Navbar variant="dark"
          style={{ backgroundColor: "#E28616", color: "#000000", height: "50px" }}>
          <SideBar trip={trip} user={user}/>
          <Container>
            <Navbar.Brand style={{ fontSize: "30px" }}><strong>TRIP  ROYALE</strong></Navbar.Brand>
          </Container>
        </Navbar>
        <Navbar
          style={{ backgroundColor: "#F6AD52", color: "#000000", textAlign: "center", display: "inline-block", width: "100%" }}>
          <h4>SCHEDULER</h4>
        </Navbar>
      </div>
      <Dates dayplans={daysOfTrip} startDate={sdate} trip={trip} user={props.user} />
    </>
  );
}

export default Scehduler;