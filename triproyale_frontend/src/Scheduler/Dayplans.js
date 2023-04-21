import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import CloseButton from 'react-bootstrap/CloseButton';
import { useEffect, useState } from 'react';
import {MdLocationPin} from 'react-icons/md'

export const DayPlans = (props) => {

  const [status, setStatus] = useState("");
  function handleClick(Task) {
    fetch(`http://localhost:8000/${props.user}/${props.trip}/schedule/${Task.date}/events/${Task.id}`, { method: 'DELETE' })
      .then(() => setStatus('Delete successful'));
    console.log(status);
  };


  return (
    <Container className="pt-3" style={{}}>
      {props.Plan.map((ev) => {
        return (
          <div key={ev.id} className="d-flex mb-3">
            <div
              style={{
                backgroundColor: "#FFE193",
                width: "50%",
                marginLeft: "25%",
                height: "90px",
                display: 'flex',
                alignItems: 'center',
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '30px',
                borderWidth:'3px'
                // justifyContent:'space-around'
              }}
            >
              <div
                style={{
                  paddingLeft: '5%',
                  backgroundColor: '#F6AD52',
                  height: '100%',
                  paddingTop: '6%',
                  paddingRight: '3%',
                  borderTopLeftRadius: '30px',
                  borderBottomLeftRadius: '30px'
                }}>
                {ev.time}
              </div>
              <div style={{width:'80%', display:'flex', flexDirection:'column', alignItems:'flex-start', paddingLeft:'5%'}}>
                  <div style={{fontSize:'20px'}}>
                    {ev.desc}
                  </div>
                  <div style={{color:'grey'}}><MdLocationPin/> {ev.loc}</div>
              </div> 
            </div>
            <CloseButton aria-label="Hide"
              style={{ height: "90px" }}
              onClick={() => { props.DeleteTask(ev); handleClick(ev); }}
            >
            </CloseButton>

          </div>
        );
      })}
      {/* <TaskAdd/> */}
    </Container>

  );
}