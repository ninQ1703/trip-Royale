import React, { Component } from "react"
import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import bgm from './bgm.png'
import { ImAirplane } from "react-icons/im";
import { MdLocalHotel, MdLocalDining,MdHiking } from "react-icons/md";
import {HiShoppingCart} from "react-icons/hi"
import {BsBoundingBoxCircles} from "react-icons/bs"
import { useLocation } from "react-router-dom";

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
   return <div style={{ backgroundColor: "#FF900B ", width: "80vh", border: "1px solid black", borderTopLeftRadius: 8, borderTopRightRadius: 8, marginLeft: "50%", height: '7vh', position: 'relative', zIndex: '5' }}>
      <div>

         <div style={{ display: 'flex',paddingLeft: "3%", paddingRight: '1%', paddingTop: '2%', alignItems: 'center' }}>
            <div>TOTAL</div>
            <div style={{ marginLeft: 'auto' ,paddingRight:'3%'}}>{amount} Rs</div>
         </div>

      </div>
   </div>
}



const RenderTag = (props) => {
   const [amount, setAmount] = useState(0);
   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch(`http://localhost:8000/${props.user}/${props.trip}/mydebtbytag/${props.item.tag}/`);
         const newAmount = await response.json();
         setAmount(newAmount);
      };
      fetchData();
   }, [])
   console.log(amount);
   //  console.log(tag);
   return <div style={{ border: "1px solid black", height: '7vh', display: 'flex', paddingLeft: "3%", paddingRight: '1%' ,alignItems:'center'}}>
      <span>
         {props.item.icon}
      </span>

      <div style={{ paddingLeft:'3%'}}>{props.item.TAG}</div>
      <div style={{ marginLeft: 'auto' ,paddingRight:'3%'}}>{amount} Rs</div>
   </div>
}



const TotalExpenses = (props) => {
   const location = useLocation();
    const { trip } = location.state;
    const { user } = location.state;

   const tags = [
      {
         tag: "travel",
         TAG: "TRAVEL",
         icon: <ImAirplane size="1.5em"/>
      },
      {
         tag: "stay",
         TAG: "STAY",
         icon: <MdLocalHotel  size="1.5em"/>
      },
      {
         tag: "dining",
         TAG: "DINING",
         icon: <MdLocalDining size="1.5em"/>
      },
      {
         tag: "shopping",
         TAG: "SHOPPING",
         icon: <HiShoppingCart size="1.5em"/>
      },
      {
         tag: "activities",
         TAG: "ACTIVITES",
         icon: <MdHiking size="1.5em"/>
      },
      {
         tag: "others",
         TAG: "OTHERS",
         icon: <BsBoundingBoxCircles size="1.5em"  />
      }
   ]
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
            <div style={{ fontSize: "1.5em", textAlign: "center", fontWeight: "2em", maxHeight: "60px", marginLeft: "3%", paddingTop: ".5%", paddingBottom: ".3%" }}>TOTAL EXPENSES
            </div>
         </div>
         <div style={{
            position: "fixed", backgroundColor: "#FFFFFF", color: "#000000", minHeight: '3em',
            top: '5em', width: '100%', zIndex: '1'
         }}>
         </div>



         <div style={{ marginTop: '10%' }}>
            <Col>
               <RenderTotal user={user} trip={trip} />
               <div style={{ height: "10%", backgroundColor: "#FFE193", width: "80vh", border: "0.5px solid black", borderBottomLeftRadius: 8, borderBottomRightRadius: 8, marginLeft: "50%", position: 'relative', zIndex: '5' }}>
                  <RenderTag user={user} trip={trip} item={tags[0]} />
                  <RenderTag user={user} trip={trip} item={tags[1]}/>
                  <RenderTag user={user} trip={trip} item={tags[2]} />
                  <RenderTag user={user} trip={trip} item={tags[3]} />
                  <RenderTag user={user} trip={trip} item={tags[4]}/>
                  <RenderTag user={user} trip={trip} item={tags[5]}/>
               </div>
            </Col>
         </div>
         <div style={{ position: 'absolute', left: '40px', top: "100px", zIndex: "-10" }}>
            <img src={bgm} style={{ width: "80%" }} />
         </div>
      </>
   );

}


export default TotalExpenses;