import { useRef,useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
// import SideBar from '../Sidebar';
import background from './Rectangle.png';
import { useLocation } from 'react-router-dom'
import SideBar from '../SideBar/Sidebar';

export const ChatPage = () => {
    
    const location = useLocation();
    const { trip } = location.state;
    const { user } = location.state;
    
    const [messages, setMessages] = useState([]); // State to store chat messages
    const [members, setMembers] = useState(['']);
    let k = messages.length - 1;
    const chatRef = useRef(null);
    
    const [input, setInput] = useState(''); // State to store input message
    useEffect(() => {
        // console.log( props.startDate)
        fetch(`http://127.0.0.1:8000/${user}/${trip}/messages/`)
            .then((response) => response.json())
            .then((data) => { setMessages(data); console.log(messages); return fetch(`http://localhost:8000/${user}/${trip}/attendees`) })
            .then((response) => response.json())
            .then((data) => setMembers(data))
            .then(() => {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
              }, [messages]);
        console.log(members);

    }, [])

    // useEffect(() => {
    //     chatRef.current.scrollTop = chatRef.current.scrollHeight;
    //   }, [messages]);

    let username ="";
    const getUsername = (id) => {
        for (let i=0; i<members.length; i=i+1)
        {
            if (members[i].id===id)
            {
                username=members[i].name;
            }
        }
        return username;

    }
    username = getUsername(user);
    let group_id = trip;


    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (input.trim() === '') return; // Do not submit empty messages
        k = k + 1;

        console.log(input);
       
        fetch(`http://127.0.0.1:8000/${user}/${trip}/post/`, {
            // mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                sender: username,
                message: input,
                group_id: group_id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => { console.log(res); return res.json(); })
            .then((data) => { setMessages([...messages, data]); setInput(''); })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div>
            <SideBar trip={trip} user={user} />
         <div style={{
            position: "fixed", backgroundColor: "#F6AD52", color: "#000000", minHeight: '2.77em',
            top: '3em', width: '100%', zIndex: '3'
         }}>
            <div style={{ fontSize: "1.5em", textAlign: "center", fontWeight: "2em", maxHeight: "60px", marginLeft: "3%", paddingTop: ".5%", paddingBottom: ".3%" }}>GENERAL
            </div>
         </div>
         

            <Container fluid>
                <div className="row"  >
                    <Col sm={2} style={{ width:"254px",backgroundColor: '#FFE193', height: '100vh', position: 'fixed', marginTop: '6.7%', marginLeft:'-1%' }}>
                        <ListGroup>
                        <ListGroup.Item
                                    key={0}
                                    style={{
                                        backgroundColor: "#FFE193",
                                        fontSize: '20px',
                                        width:'242px',
                                        borderColor: '#0000000', 
                                        
                                        fontWeight: 'bold'
                                    }}
                                >
                                    TRIP MEMBERS
                                </ListGroup.Item>
                            {members.map(member => (
                                <ListGroup.Item
                                    key={member.id}
                                    style={{
                                        backgroundColor: "#FFE193",
                                        fontSize: '20px',
                                        width:'242px',
                                        borderColor: '#0000000',
                                        
                                    }}
                                >
                                    {member.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col className="chat"  sm={10}
                        style={{
                            marginTop: '6.4%',
                            padding: '20px',
                            width: '96%'
                        }} >
                        <img src={background} alt="Trip"
                            style={{
                                position: 'fixed',
                                zIndex: '-1',
                                height: '100%',
                                width: '100%',
                                marginLeft: '14%'
                            }} />
                        {messages.map((m) => (

                            <div key={m.id} ref={chatRef} className="message">
                                {username === m.sender ?
                                    (<div className="d-flex mb-3">
                                        <Card
                                            style={{
                                                marginLeft: "60%",
                                                backgroundColor: "#FF900B",
                                                borderColor: "#000000",
                                                width: "40%",
                                                height: "20%",
                                                borderRadius: "20px",
                                                borderTopRightRadius: "0px"
                                            }}>
                                            <Card.Body>
                                                <Card.Title>{m.sender}</Card.Title>
                                                <Card.Text style={{ fontSize: "20px", color: "#FFFFFF" }}>
                                                    {m.message}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>)
                                    :
                                    (<div className="d-flex mb-3">
                                        <Card 
                                            style={{
                                                marginLeft: "22%",
                                                backgroundColor: "#FF900B",
                                                borderColor: "#000000",
                                                width: "40%",
                                                height: "20%",
                                                borderRadius: "20px",
                                                borderTopLeftRadius: "0px"
                                            }}>
                                            <Card.Body>
                                                <Card.Title>{m.sender}</Card.Title>
                                                <Card.Text style={{ fontSize: "20px", color: "#FFFFFF" }}>
                                                    {m.message}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>

                                    )}
                            </div>

                        ))}
                        <div
                            style={{
                                bottom: '-10px',
                                position: 'fixed',
                                width: '95%',
                                zIndex: '2'
                            }}>
                            <Form onSubmit={handleFormSubmit} className="chat-form"
                                style={{
                                    marginLeft: "20%",
                                }}>
                                <div className="d-flex" style={{ width: '100%' }}>
                                    <Form.Group className="mb-3 mr-2 flex-grow-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="Type your message..."
                                            value={input}
                                            onChange={(e) => { setInput(e.target.value) }}
                                            style={{ borderColor: "#000000", borderBottomLeftRadius: "30px", borderTopLeftRadius: "30px" }}
                                        />
                                    </Form.Group>
                                    <Button variant="warning" type="submit" style={{ backgroundColor: "#F6AD52", borderColor: "#000000", height: "38px", borderBottomRightRadius: "30px", borderTopRightRadius: "30px" }}>Send</Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </div>
            </Container >
        </div>
    );
};

