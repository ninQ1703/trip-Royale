import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { Collapse } from 'react-collapse';
import ye from './Credit_card_bro.png'

//  list of functions used
//  App => call DisplayItem
//  DisplayItem (displays al users names) => calls Total, PaidInfo ,GetList
//  Total (prints total amount) => 
//  PaidInfo (prints total paid info) => calls DisplayPaidInfo
//  GetList (prints list of payments corresponding to each user) => calls DisplayPaidInfo
//  DisplayPaidInfo (prints paid for true and unpaid for false) =>





const GetList = (props) => {
    const [list, setlist] = useState({ list: [] });
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/mydebt/${props.id}/`)
            const newList = await response.json()
            setlist(newList)
        };

        fetchData();
    }, [])

    if (list.length) {
        console.log(list)
        return list.map(item => { console.log(item.paid); return <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: "1%", paddingRight: '1%', alignItems: 'center', marginLeft: '6%', border: '1px solid black', backgroundColor: "#FFE193 ", width: '94vh', height: '6vh', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px' }}>{item.creation_date}  <DisplayPaidInfo paid={item.paid} amount={item.amount} /></div> });
    } else {
        return null;
    }
}

const DisplayPaidInfo = (props) => {
    if (props.paid == true) return <div style={{ display: 'inline-block' }}>{props.amount} PAID </div>
    else return <div style={{ display: 'inline-block' }}> {props.amount} UNPAID </div>
}

const Paidinfo = (props) => {
    console.log("hi")
    const [paid, setPaid] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/ispaidbyowner/${props.id}/`)
            const newPaid = await response.json()
            setPaid(newPaid)
        };

        fetchData();
    }, [])
    console.log(paid)
    return <DisplayPaidInfo paid={paid} user={props.user} trip={props.trip} />
}

const Total = (props) => {
    const [total, setTotal] = useState('0')
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/mydebtbyowner/${props.id}/`)
            const newTotal = await response.json()
            setTotal(newTotal)
        };

        fetchData();
    }, [])
    return <p style={{ display: 'inline-block' }}>{total}</p>
}
const DisplayItem = (props) => {
    const closedd = <div style={{
        color: 'white',
        width: '0px',
        height: '0px',
        border: '8px solid black',
        borderRadius: '7px',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: '#FF900B',
        borderBottomColor: 'transparent'
    }}></div>
    const opened = <div style={{
        color: 'white',
        width: '0px',
        height: '0px',
        border: '8px solid black',
        borderRadius: '7px',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: '#FF900B',
        borderLeftColor: 'transparent'
    }}></div>
    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState(closedd)


    function changeDisplay() {

        if (icon == closedd) setIcon(opened);
        else setIcon(closedd);
        setOpen(!open);
    }

    console.log(props.item.Name);
    return <>
        <div style={{ marginLeft: '35%' }}>
            {/* <div> */}
            <button onClick={() => { changeDisplay() }} style={{ backgroundColor: 'transparent', border: '0px', margin: '.1%' }}>{icon}</button>

            <div style={{ boxShadow: "0px 0px 5px  ", display: "inline-block", border: '1px solid black', backgroundColor: "#FF900B ", width: '100vh', height: '7vh', marginTop: '1%', borderRadius: '10px' }}>
                {props.item.Name}
                <Total id={props.item.id} user={props.user} trip={props.trip} />
                <Paidinfo id={props.item.id} user={props.user} trip={props.trip} />
            </div>
            <Collapse isOpened={open} style={{}}>
                <GetList id={props.item.id} user={props.user} trip={props.trip} />

            </Collapse>
        </div>
    </>
}


function App() {
    const user = 1;
    const trip = 1;
    const [users, setUsers] = useState([])

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
        // console.log(list);
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
                <div style={{ backgroundColor: "#FFE193", height: "35vh", width: "35vh", top: '21%', left: '-5%', position: 'fixed', zIndex: '-2', borderRadius: '50%' }}>
                </div>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid black", width: "50%", height: "20vh", width: "20vh", top: '40%', left: '-5%', position: 'fixed', zIndex: '-1', borderRadius: '50%' }}>
                </div>
                <Col>
                    <Row>
                        <img
                            src={ye} height={300} width={300} style={{ marginLeft: "1%", marginTop: "-3%", top: '60%', left: '3%', position: 'fixed', zIndex: '-1' }}
                            alt="logo"
                        />

                    </Row >
                </Col >
            </Container >
        </>
    );
}

export default App;