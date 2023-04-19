import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

// export const TaskAdd = (pl, { addMyTask }) => {
  
export const TaskAdd = (props) => {
  const [time, setTime] = useState("");
  const [loc, setLoc] = useState("");
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!time || !loc || !desc) {
  //     alert("PLease fill all the details for your plan");
  //   }
  //   else pl.addMyTask(pl.length, time, loc, desc);
  // }
 
  
  const handleSubmit = (e) => {
    console.log(props.day, desc, time, loc);
    e.preventDefault();
    if (!time || !loc || !desc) {
      alert("PLease fill all the details for your plan");
    }
    else {
      fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/newSchedule`, {
        method: 'POST',
        body: JSON.stringify({
          desc: desc,
          date: props.day,
          time: time,
          loc: loc,
          trip: props.trip,
          added_by: props.user
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => { console.log(res); return res.json(); })
        .then((data) => props.addMyTask(data.id, data.time, data.loc, data.desc))
        .catch((err) => {
          console.log(err.message);
        });       
    }

  };
  return (

    <OverlayTrigger
      // trigger="click"
      show={open}
      placement="right"
      style={{ backgroundColor: "#FFE193  ", width: "600px" }}
      overlay={
        <Popover id={`popover-positioned-top`} style={{ backgroundColor: "#FFFFFF", width: "600px", maxWidth: "35%" ,borderWidth:'1px',borderColor:'grey',boxShadow:'2px 2px 2px grey'}}>
          <Popover.Header as="h3" style={{ backgroundColor: "#E28616" ,color:'white',borderWidth:'1px',borderColor:'grey'}}>ADD DETAILS</Popover.Header>
          <Popover.Body>
            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-3" >
                <Form.Label value={time} >Time</Form.Label>
                <Form.Control type="time" onChange={(e) => { setTime(e.target.value) }} />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label value={loc} >Location</Form.Label>
                <Form.Control as="textarea" rows={2} placeholder="Eg. Hotel Roar" onChange={(e) => setLoc(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label value={desc} >Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Eg. Go To Mahal" onChange={(e) => setDesc(e.target.value)} />
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit" style=
                  {{ backgroundColor: "#E28616", color: "#000000", borderColor: "grey", width: "240px" }} onClick={() => setOpen(false)}>
                  Done
                </Button>
              </div>
            </Form>
          </Popover.Body>
        </Popover>
      }
    >
      <Button variant="warning" style=
        {{ backgroundColor: "#FF900B", color: "#000000", borderColor: "grey", width: "400px", height: "50px", margin: "2%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
        size="lg" onClick={(e) => setOpen(!open)}>ADD TASK</Button>
    </OverlayTrigger>
  );
}

export default TaskAdd;