import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import * as React from 'react';
import bgm from './bgm.png'
import DisplayItem from './DisplayItem';
import { useLocation } from 'react-router-dom';

//  list of functions used
//  App => call DisplayItem
//  DisplayItem (displays al users names) => calls Total, PaidInfo ,GetList
//  Total (prints total amount) => 
//  PaidInfo (prints total paid info) => calls DisplayPaidInfo
//  GetList (prints list of payments corresponding to each user) => calls DisplayPaidInfo
//  DisplayPaidInfo (prints paid for true and unpaid for false) =>


const AmountToBePaid = (props) => {
    const [users, setUsers] = useState([])
    const location = useLocation();
    const { trip } = location.state;
    const { user } = location.state;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/${user}/${trip}/attendees`);
            const newUser = await response.json();
            const newUser2 = newUser.filter((person) => person.id != user);
            setUsers(newUser2);
        };
        fetchData();
    }, [])
    console.log(users);



    const DisplayList = () => {
        return users.map((item) => <DisplayItem item={item} user={user} trip={trip} />)
    }

    return (
        <>
            <div style={{
                position: "fixed", backgroundColor: "#E28616", color: "#FFFFFF",
                minHeight: '3em', width: '100%',
                margin: '0', top: '0%', left: '0%', zIndex: '3'
            }}>
                <div style={{ fontSize: "2em", fontWeight: "2em", float: "left", maxHeight: "60px", marginLeft: "3%" }}>
                    TripRoyale
                </div>
            </div>
            <div style={{
                position: "fixed", backgroundColor: "#F6AD52", color: "#000000", minHeight: '2.77em',
                top: '3em', width: '100%', zIndex: '3'
            }}>
                <div style={{ fontSize: "1.5em", textAlign: "center", fontWeight: "2em", maxHeight: "60px", marginLeft: "3%", paddingTop: ".5%", paddingBottom: ".3%" }}>AMOUNT TO BE PAID
                </div>
            </div>
            <div style={{
                position: "fixed", backgroundColor: "#FFFFFF", color: "#000000", minHeight: '3em',
                top: '5em', width: '100%', zIndex: '1'
            }}>
            </div>

            <Container className="pt-3" style={{ marginTop: '15%' }}>
                <div >
                    {DisplayList()}
                </div>
            </Container >
            <div style={{ position: 'fixed', top: "90px", zIndex: "-10" }}>
                <img src={bgm} style={{ width: "85%" }} />
            </div>
        </>
    );
}

export default AmountToBePaid;