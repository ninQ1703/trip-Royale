import SideBar from '../SideBar/Sidebar.js';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Dates } from './dates.js';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom'

export function Scehduler(props) {

  let [sdate, setSDate] = useState("");
  let [edate, setEDate] = useState("");
  let [name, setName] = useState("");
  const location = useLocation();
  const { trip } = location.state;
  const { user } = location.state;
  console.log(location.state.user);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/${user}/${trip}/`)
      .then((response) => response.json())
      .then((data) => { setSDate(data.start_date); setEDate(data.end_date); setName(data.name) })
      .then(console.log(user))

  }, [user, trip])
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

  console.log(sdate, edate)
  let daysOfTrip = getDates(sdate, edate);

  return (
    <>
      <SideBar trip={trip} user={user} name={name}/>
      <div style={{
        position: "fixed", backgroundColor: "#F6AD52", color: "#000000", minHeight: '2.77em',
        top: '3em', width: '100%', zIndex: '3'
      }}>
        <div style={{ fontSize: "1.5em", textAlign: "center", fontWeight: "2em", maxHeight: "60px", marginLeft: "3%", paddingTop: ".5%", paddingBottom: ".3%" }}>SCHEDULER
        </div>
      </div>
      <div style={{
        position: "fixed", backgroundColor: "#FFFFFF", color: "#000000", minHeight: '5em',
        top: '5em', width: '100%', zIndex: '1'
      }}>
      </div>
      <Dates dayplans={daysOfTrip} startDate={sdate} trip={trip} user={user} />
    </>
  );
}

export default Scehduler;
