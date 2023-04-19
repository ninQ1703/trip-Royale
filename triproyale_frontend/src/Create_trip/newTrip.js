import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import photo from './Travel_mode.png'
// import { usersData } from './usersData';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom'
import {BiMessageAltAdd} from "react-icons/bi"
export const NewTrip = () => {
  const [groupName, setGroupName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [trip, setTrip] = useState(1);
  const location = useLocation();
  const navigate = useNavigate()
  const { user } = location.state;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users")
      .then((response) => response.json())
      .then((data) => { setUsersData(data) })

  }, [])
  // console.log(usersData);


  const handleMemberSelection = (event) => {
    const selectedOptions = event.target.options;
    let selectedMemberIds = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i].selected) {
        // console.log(selectedOptions[i].value);
        // selectedMemberIds.push((selectedOptions[i].value));
        selectedMemberIds = [...selectedMemberIds, selectedOptions[i].value,];
      }
    }
    for (let i = 0; i < selectedMemberIds.length; i++) {
      selectedMemberIds[i] = parseInt(selectedMemberIds[i]);
    }
    setSelectedMembers(selectedMemberIds);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(groupName, destination, startDate, endDate, selectedMembers);
    if (!groupName || !destination || !startDate || !endDate) {
      alert("Group details can't be empty");
    }
    else {
      fetch(`http://127.0.0.1:8000/${user}/newTrip`, {
        method: 'POST',
        body: JSON.stringify({
          dest: destination,
          name: groupName,
          leader: user,
          attendees: selectedMembers,
          start_date: startDate,
          end_date: endDate,
          // dest: "dvsn",
          // name: "kldsv",
          // leader: 1,
          // attendees: [1,2],
          // start_date: "2023-04-08",
          // end_date: "2023-04-08",

        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        // .then(console.log('Form submitted:', groupName, destination, startDate, endDate, selectedMembers);)
        .then((response) => response.json())
        .then((response) => {
          navigate('/scheduler', {
            state: {
              trip: response.id,
              user: user
            }
          })
        })
        // .then(response => {return response.json();})
        // // .then((res) => { console.log(res.json()); return res.json(); })
        // .then((response)=>{setTrip(response.id);console.log(trip)})
        // .then((data) => props.addMyTask(data.id, data.time, data.loc, data.desc))
        .catch((err) => {
          console.log(err.message);
        });
      ;

    }
  };
  console.log(trip);

  return (

    <div >
      <Container fluid
        style={{ marginTop: "4.5%" }} >
        <div className="row">
          <div className="col" style={{marginTop:'5%'}}>
            <img src={photo} alt="Trip" />
          </div>
          <div className="col" style={{ marginRight: "2%" }} >
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="groupName" style={{ margin: "3%" }} >
                <Form.Label><strong>Group Name</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="destination" style={{ margin: "3%" }}>
                <Form.Label><strong>Destination</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="startDate" style={{ margin: "3%" }}>
                <Form.Label><strong>Start Date</strong></Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="endDate" style={{ margin: "3%" }}>
                <Form.Label><strong>End Date</strong></Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="members" style={{ margin: "3%" }}>
                <Form.Label><strong>Add Members</strong></Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={selectedMembers}
                  onChange={handleMemberSelection}
                >{usersData.map((user) => (
                  // <option key={user.id} value={user.id}>+{user.name}</option>
                  <option key={user.id} value={user.id}>+ {user.name}</option>

                ))}</Form.Control>
              </Form.Group>
              <Button
                variant="warning"
                type="submit"
                style={{ margin: "3%", backgroundColor: '#FF900B', color: '#000000', borderColor: '#000000', width: '95%' }}
              >
                {/* <Link to="/scheduler" state={{trip:trip, user:user}}> */}
                SUBMIT
                {/* </Link> */}
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};


