import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as React from 'react';
import bgm from './bgm.png'
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react"
import DisplayItem from './DisplayItem';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SideBar from '../../SideBar/Sidebar';


const PendingPayments = (props) => {
    const location = useLocation();
    const { trip } = location.state;
    const { user } = location.state;
    const [splits, setSplits] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            console.log(user)
            const resSplits = await fetch(`http://127.0.0.1:8000/${user}/${trip}/mysplits/`);
            const splits = await resSplits.json();
            setSplits(splits)
        };
        fetchData();
    }, [])




    const DisplayList = () => {
        console.log(splits);
        return splits.map((split) => <DisplayItem split={split} user={user} trip={trip} />)
    }

    return (
        <>
            <SideBar trip={trip} user={user} />

            <div style={{
                position: "fixed", backgroundColor: "#F6AD52", color: "#000000", minHeight: '2.77em',
                top: '3em', width: '100%', zIndex: '3'
            }}>
                <div style={{ fontSize: "1.5em", textAlign: "center", fontWeight: "2em", maxHeight: "60px", marginLeft: "3%", paddingTop: ".5%", paddingBottom: ".3%" }}>PENDING PAYMENTS
                </div>
            </div>
            <div style={{
                position: "fixed", backgroundColor: "#FFFFFF", color: "#000000", minHeight: '4em',
                top: '5em', width: '100%', zIndex: '1', left: '330px',
            }}>
            </div>



            <Container className="pt-3" style={{ marginTop: '15%', marginBottom: '30%' }}>
                <div >
                    {DisplayList()}
                </div>

                <div style={{
                    position: "fixed", backgroundColor: "#FFFFFF", color: "#000000", minHeight: '8em',
                    bottom: '0em', width: '100%', zIndex: '1', left: '330px',
                }}>
                    <Button variant="warning" style=
                        {{ position: 'fixed', backgroundColor: "#FF900B", fontSize: "20px", color: "#000000", borderRadius: '20px', borderColor: "#FFFFFF", width: "250px", height: "50px", left: "600px", bottom: '34px', boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
                        onClick={() => {
                            navigate('/newsplit',
                                {
                                    state: {
                                        trip: trip,
                                        user: user
                                    }
                                }
                            )
                        }}>+ ADD NEW SPLIT</Button>
                </div>
            </Container >
            <div style={{ position: 'fixed', top: "95px", zIndex: "-10" }}>
                <img src={bgm} style={{ width: "85%" }} />
            </div>
        </>
    );
}

export default PendingPayments;