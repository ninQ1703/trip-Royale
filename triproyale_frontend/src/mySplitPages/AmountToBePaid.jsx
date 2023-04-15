import React, { Component } from "react"
import { useEffect, useState } from "react"



class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         users: [],
         user: 0,
         trip: 0,
      };
      this.getList = this.getList.bind(this);
   }

   async componentDidMount() {
      try {
         const user = 1;
         const trip = 1;
         const resUsers = await fetch(`http://127.0.0.1:8000/users/`);
         const users = await resUsers.json();
         this.setState({
            users,
            user,
            trip,
         });
      } catch (e) {
         console.log(e);
      }
   }

   displayPaidInfo = (props) => {
      if (props.paid == true) return <div> PAID </div>
      else return <div> UNPAID</div>
   }


   //function to display the list of pending payments
   getList = (props) => {
      const [list, setlist] = useState({ list: [] });
      useEffect(() => {
         const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/${this.state.user}/${this.state.trip}/mydebt/${props.id}/`)
            const newList = await response.json()
            setlist(newList)
         };

         fetchData();
      }, [])

      if (list.length && props.permit) {
         console.log(list)
         return list.map(item => { console.log(item.paid); return <div>{item.amount} {item.creation_date} <this.displayPaidInfo paid={item.paid}></this.displayPaidInfo></div> });
      } else {
         return null;
      }
   }

   //function to expand view on button click
   getDisplay = (props) => {
      const [display, setDislay] = useState(false);
      function changeDisplay() {
         setDislay(!display)
      }
      return <div>
         <button onClick={changeDisplay}>click here</button>
         <this.getList id={props.id} permit={display}></this.getList>
      </div>

   }

   paidinfo = (props) => {
      console.log("hi")
      const [paid, setPaid] = useState(false)
      useEffect(() => {
         const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/${this.state.user}/${this.state.trip}/ispaidbyowner/${props.id}/`)
            const newPaid = await response.json()
            setPaid(newPaid)
         };

         fetchData();
      }, [])
      console.log(paid)
      return <this.displayPaidInfo paid={paid}></this.displayPaidInfo>
   }

   total = (props) => {
      const [total, setTotal] = useState('0')
      useEffect(() => {
         const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/${this.state.user}/${this.state.trip}/mydebtbyowner/${props.id}/`)
            const newTotal = await response.json()
            setTotal(newTotal)
         };

         fetchData();
      }, [])
      return <p>{total}</p>
   }

   //function to diplay all users
   renderUsers = (props) => {
      const newUsers = this.state.users;

      return newUsers.filter(user => user.id != this.state.user).map(user => (
         <div>
            <p >
               {user.Name}
            </p>
            <this.total id={user.id}></this.total>
            <this.paidinfo id={user.id}></this.paidinfo>
            <this.getDisplay id={user.id}></this.getDisplay>
         </div>
      ));
   };



   render() {
      return (
         <main>
            <h4>
               <ul>
                  <li>Date format</li>
                  <li>Concole.log prints everything two times</li>
               </ul>
            </h4>
            <this.renderUsers>
            </this.renderUsers>
         </main>
      )
   }
}

export default App;