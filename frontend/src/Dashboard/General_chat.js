import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import SideBar from '../Sidebar';

export const ChatPage = ({ groupData }) => {
    let username = "Himani";
    const [messages, setMessages] = useState(groupData.chatMsg); // State to store chat messages
    let k = messages.length - 1;
    const [input, setInput] = useState(''); // State to store input message

    const handleInputChange = (event) => {
        setInput(event.target.value); // Update input state with user's input
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (input.trim() === '') return; // Do not submit empty messages
        k = k + 1;
        let mymsg = {
            id: k,
            sender: username,
            text: input
        };
        setMessages([...messages, mymsg]); // Add input message to messages state
        setInput(''); // Reset input state after submission
    };

    return (
        <div>
            <Navbar variant="dark"
                style={{ backgroundColor: "#E28616", color: "#000000", height: "50px" }}>
                <SideBar groupName={groupData.name} />
                <Container>
                    <Navbar.Brand style={{ fontSize: "30px" }}><strong>TRIP  ROYALE</strong></Navbar.Brand>
                </Container>
            </Navbar>
            <Navbar
                style={{ backgroundColor: "#F6AD52", color: "#000000", textAlign: "center", display: "inline-block", width: "100%" }}>
                <h4>GENERAL</h4>
            </Navbar>

            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                    backgroundColor: '#FFE193',
                }}>
                <div style={{ flexBasis: '20%', }}>
                    <ListGroup>
                        {groupData.members.map(member => (
                            <ListGroup.Item
                                key={member.id}
                                style={{
                                    backgroundColor: "#FFE193",
                                    fontSize: '30px',
                                }}
                            >
                                {member.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
                <div
                    style={{
                        flexBasis: '80%',
                        backgroundColor: '#fff',
                        padding: '20px',
                    }}>
                    {messages.map((m) => (
                        <div key={m.id} className="d-flex mb-3">
                            <Card
                                style={{
                                    backgroundColor: "#FFE193",
                                    width: "50%",
                                    height: "30%",
                                    borderRadius: "5%"
                                }}
                            >
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                        {m.sender}
                                    </blockquote>
                                    <footer >{m.text}</footer>
                                </Card.Body>
                            </Card>

                        </div>
                    ))}
                    <form onSubmit={handleFormSubmit} >
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};


