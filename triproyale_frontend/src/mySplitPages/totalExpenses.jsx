import React, { Component } from "react"
import { useEffect, useState } from "react"
import './App.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import mm from './Manage_money_bro.png'

const RenderTotal = (props) => {
   const [amount, setAmount] = useState(0);
   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch(`http://localhost:8000/${props.user}/${props.trip}/mytotaldebt/`);
         const newAmount = await response.json();
         setAmount(newAmount);
      };
      fetchData();
   }, [])
   console.log(amount);
   return <div style={{ backgroundColor: "#FF900B ", width: "80vh", border: "1px solid black", borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: "-39%", marginLeft: "40%", height: '7vh', position: 'relative', zIndex: '5' }}>
      <div>

         <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: "1%", paddingRight: '1%', paddingTop: '2%', alignItems: 'center' }}>
            <div>TOTAL</div>
            <div>{amount}</div>
         </div>

      </div>
   </div>
}



const RenderTag = (props) => {
   const [amount, setAmount] = useState(0);
   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch(`http://localhost:8000/${props.user}/${props.trip}/mydebtbytag/${props.tag}/`);
         const newAmount = await response.json();
         setAmount(newAmount);
      };
      fetchData();
   }, [])
   console.log(amount);
   //  console.log(tag);
   return <div style={{ border: "1px solid black", height: '7vh', display: 'flex', justifyContent: 'space-between', paddingLeft: "1%", paddingRight: '1%', alignItems: 'center' }}>
      <div>{props.TAG}</div>
      <div>{amount}</div>
   </div>
}



function App() {
   const user = 1;
   const trip = 1;

   return (
      <>
         <div>
            <div style={{
               position: "relative", backgroundColor: "#E28616", color: "#FFFFFF",
               minHeight: '3em',
               margin: '0'
            }}>
               <div style={{ fontSize: "2em", fontWeight: "2em", float: "left", maxHeight: "60px", marginLeft: "3%" }}>TripRoyale
               </div>
            </div>
            <div style={{
               position: "relative", backgroundColor: "#F6AD52", color: "#000000", minHeight: '2.77em',
               margin: '0'
            }}>
               <div style={{ fontSize: "1.5em", textAlign: "center", fontWeight: "2em", maxHeight: "60px", marginLeft: "3%", paddingTop: ".5%", paddingBottom: ".3%" }}>EXPENSES
               </div>
            </div>


            <div style={{ marginTop: '8%' }}>
               <Card style={{ backgroundColor: "#FF900B", opacity: .4, width: "50%", height: "65vh", width: "90vh", marginLeft: "30%", marginTop: "4%", position: 'relative', zIndex: '1' }}>
                  <Card.Body>
                     <Card.Text >{""}</Card.Text>
                  </Card.Body>
               </Card>

               <Col>
                  <Row><img
                     src={mm} height={400} width={400} style={{ marginLeft: "10%", marginTop: "-29%", position: 'relative', zIndex: '3' }}
                     alt="logo"
                  />
                     <RenderTotal user={user} trip={trip} />
                     <div style={{ backgroundColor: "#FFE193", width: "80vh", border: "0.5px solid black", borderBottomLeftRadius: 8, borderBottomRightRadius: 8, marginLeft: "40%", position: 'relative', zIndex: '5' }}>
                        <RenderTag user={user} trip={trip} tag="travel" TAG="TRAVEL" />
                        <RenderTag user={user} trip={trip} tag="stay" TAG="STAY" />
                        <RenderTag user={user} trip={trip} tag="dining" TAG="DINING" />
                        <RenderTag user={user} trip={trip} tag="shopping" TAG="SHOPPING" />
                        <RenderTag user={user} trip={trip} tag="adventure" TAG="ACTIVITIES" />
                        <RenderTag user={user} trip={trip} tag="others" TAG="OTHERS" />
                     </div>
                     <Card style={{ backgroundColor: "#FFFFFF", width: "50%", height: "40vh", width: "65vh", marginLeft: "36%", marginTop: "-15%", position: 'relative', zIndex: '2' }}>
                        <Card.Body>
                           <Card.Text >{""}</Card.Text>
                        </Card.Body>
                     </Card>
                  </Row>
               </Col>
            </div>
         </div>
      </>
   );

}


export default App;