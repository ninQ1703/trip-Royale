import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as React from 'react';
import ye from './Credit_card_bro.png'
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react"
import DisplayItem from './DisplayItem';

const PendingPayments = (props) =>  {
    const [splits, setSplits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log(props.user)
            const resSplits = await fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/mysplits/`);
            const splits = await resSplits.json();
            setSplits(splits)
        };
        fetchData();
    }, [])




    const DisplayList = () => {
        console.log(splits);
        return splits.map((split) => <DisplayItem split={split} user={props.user} trip={props.trip} />)
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
                <div style={{ fontSize: "1.5em", textAlign: "center", fontWeight: "2em", maxHeight: "60px", marginLeft: "3%", paddingTop: ".5%", paddingBottom: ".3%" }}>PENDING PAYMENTS
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
                <div style={{ backgroundColor: "#FFE193", height: "100vh", width: "75vh", top: '2%', left: '-5%', position: 'fixed', zIndex: '2' }}>
                </div>
                <div style={{ backgroundColor: "#FFFFFF", height: "35vh", width: "35vh", top: '21%', left: '-5%', position: 'fixed', zIndex: '3', borderRadius: '50%' }}>
                </div>
                <div style={{ backgroundColor: "#FFE193", border: "1px solid black", width: "50%", height: "20vh", width: "20vh", top: '40%', left: '-5%', position: 'fixed', zIndex: '3', borderRadius: '50%' }}>
                </div>
                <Col>
                    <Row>
                        <img
                            src={ye} height={300} width={300} style={{ marginLeft: "1%", marginTop: "-3%", top: '60%', left: '3%', position: 'fixed', zIndex: '4' }}
                            alt="logo"
                        />
                    </Row >
                </Col >
                <div style={{}}>
                    <Button variant="warning" style=
                        {{ backgroundColor: "#FF900B", fontSize: "20px", color: "#000000", borderRadius: '20px', borderColor: "#FFFFFF", width: "250px", height: "50px", marginLeft: "51%", marginTop: "10%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
                        onClick={() => { }}>+ ADD NEW SPLIT</Button>
                </div>
            </Container >
        </>
    );
}

export default PendingPayments;