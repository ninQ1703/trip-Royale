import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/esm/Container';
import Collapse from 'react-bootstrap/Collapse';
import { useState, useEffect } from 'react';
import { months } from './month';

import { DayPlans } from './Dayplans.js';
import TaskAdd from './TaskAddition.js';

export const Dates = (props) => {

  const [open, setOpen] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState("");

  function addMyTask(id, time,loc,desc){
    const mp = {
      id: id,
      time: time, 
      desc: desc, 
      loc: loc
    }
    setSchedule([...schedule,mp]);
  }
  function DeleteTask(Task){
    setSchedule(schedule.filter((e)=>{
      return e!==Task;
    }));
    
    
  }
  useEffect(() => { 
    console.log( props.startDate)
    fetch("http://127.0.0.1:8000/1/trips/1/")
      .then((response) => response.json())
      .then((data) => {setDay(data.start_date); return fetch(`http://localhost:8000/1/trips/1/schedule/${data.start_date}/events`)})
      .then((response) => response.json())
      .then((data) => setSchedule(data));
    console.log(schedule);

  }, [])

  const handleClick = async (date) => {
    const res = await fetch(`http://localhost:8000/1/trips/1/schedule/${date}/events`);
    const schedule = await res.json();
    setSchedule(schedule);
    // setOpen(!open)
    console.log(schedule)
    setDay(date);

  }

  const formatDate = (date) => {
    // let m=date.getMonth()+1;
    // let d=date.getDate();
    // let y=date.getYear();
    let y=parseInt(date.substr(0,4));
    let m=parseInt(date.substring(5,7));
    let d=parseInt(date.substring(8,10));

    return (

      <p>{d} {months[m]}, {y}</p>
    )
  }

  const RenderItems = () => {

    const [dateColor, setDateColor] = useState("#FF900B");

    return props.dayplans.map((date) =>
    (

      <Button variant="warning" style=
        {{ backgroundColor: dateColor, color: "#000000", borderColor: "", height: "60px" }}
        onClick={() => { handleClick(date) }}
        aria-controls="schedule"
      // >{date}</Button>
      >{formatDate(date)}</Button>



    )
    );

  }
  console.log(schedule);

  return (
    <div className="text-center">
      <Container fluid
        style={{ backgroundColor: "#FFE193", marginTop: "3%", marginBottom: "3%" }}
      >

        <ButtonGroup size="lg" >
          {RenderItems()}
        </ButtonGroup>
      </Container>
      {/* <Collapse in={open}> */}
      <div id="schedule">
        <DayPlans Plan={schedule} DeleteTask={DeleteTask}/>
      </div>
      {/* </Collapse> */}
      <TaskAdd day={day}  addMyTask={addMyTask}/>

    </div>
  );
}