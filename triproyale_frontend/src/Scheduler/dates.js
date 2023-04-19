// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/esm/Container';
import Collapse from 'react-bootstrap/Collapse';
import { useState, useEffect } from 'react';
import { months } from './month';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';
import { DayPlans } from './Dayplans.js';
import TaskAdd from './TaskAddition.js';
import "./dates.css"



const DatesButton = (props) => {
  const [selected, setSelected] = useState("dateButton")

  const changeSelect = () => {  
    props.setprevSel(props.date)
  }

  const formatDate = (date) => {
    let y = parseInt(date.substr(0, 4));
    let m = parseInt(date.substring(5, 7));
    let d = parseInt(date.substring(8, 10));

    return (

      <p>{d} {months[m]}</p>
    )
  }
  return <Button
    className={(props.date==props.prevSel)?"seldateButton":"dateButton"}
    key={props.date}
    onClick={() => {
      props.handleClick(props.date);
      changeSelect();
    }}
    aria-controls="schedule"
    aria-expanded={props.open}
  >
    <div className='=' style={{ fontSize: '20px' }}>{formatDate(props.date)}
    </div>
  </Button>
}


const RenderItems = (props) => {
  const [prevSel, setprevSel] = useState('')
  useEffect(()=>{
    setprevSel(props.dayplans[0])
  }, [props.dayplans])

  console.log(prevSel);
  return (
    <div style={{ display: 'flex', overflowX: 'auto', maxWidth: '1500px', justifyContent: 'center', }}>
      {props.dayplans.map((date) => (
        <DatesButton handleClick={props.handleClick} open={props.open} date={date} setprevSel={setprevSel} prevSel={prevSel}/>
      ))}
    </div>
  );
};

export const Dates = (props) => {

  const [open, setOpen] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState("");

  function addMyTask(id, time, loc, desc) {
    const mp = {
      id: id,
      time: time,
      desc: desc,
      loc: loc
    }
    setSchedule([...schedule, mp]);
  }
  function DeleteTask(Task) {
    setSchedule(schedule.filter((e) => {
      return e !== Task;
    }));


  }
  useEffect(() => {
    console.log(props.startDate)
    fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/`)
      .then((response) => response.json())
      .then((data) => { setDay(data.start_date); return fetch(`http://localhost:8000/${props.user}/${props.trip}/schedule/${data.start_date}/events`) })
      .then((response) => response.json())
      .then((data) => setSchedule(data));
    console.log(schedule);

  }, [props.user, props.trip])

  const handleClick = async (date) => {
    const res = await fetch(`http://localhost:8000/${props.user}/${props.trip}/schedule/${date}/events`);
    const schedule = await res.json();
    setSchedule(schedule);
    // setOpen(!open)
    console.log(schedule)
    setDay(date);

  }

  console.log(schedule);

  return (
    <div className="text-center" style={{}}>
      <div
        style={{ backgroundColor: "#FFE193", top: '20%', height: '10.5%', position: 'fixed', width: '100%', zIndex: '1' }}
      >

        <ButtonGroup size="lg" zIndex="2">
          <RenderItems dayplans={props.dayplans} handleClick={handleClick} open={open} />
        </ButtonGroup >
      </div>

      <div id="schedule" style={{ overflowY: 'initial', marginTop: '15%', zIndex: '-2' }}>
        <DayPlans Plan={schedule} DeleteTask={DeleteTask} user={props.user} trip={props.trip} />
      </div>

      <TaskAdd day={day} addMyTask={addMyTask} trip={props.trip} user={props.user} />
    </div>

  );
}