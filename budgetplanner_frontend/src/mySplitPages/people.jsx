import React, { Component } from "react"
import { useEffect, useState } from "react"



class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }


   createList = () => {
      const [userAvail, setUserAvail] = useState([]);
      const [userSel, setUserSel] = useState([]);
      const [selUserIn, setSelUserIn] = useState('');
      const [selUserOut, setSelUserOut] = useState('');
      useEffect(() => {
         const fetchData = async () => {
            const resUsers = await fetch(`http://127.0.0.1:8000/users/`);
            let users = await resUsers.json();
            users.forEach((user) => { if (user.id === 1) user.first_name = "you"; user.last_name = ""; user.amount = "0" })
            setUserAvail(users.filter((user) => user.id !== 1));
            setUserSel(users.filter((user) => user.id === 1));
         };
         fetchData();
      }, [])

      const AddUser = () => {
         if (selUserIn == null) return;
         const updateUserAvail = userAvail.filter((user) => user.id != selUserIn);
         const newUser = userAvail.filter((user) => user.id == selUserIn);
         setUserAvail(updateUserAvail);
         var updateUserSel = [
            ...userSel,
            newUser[0]
         ]
         updateUserSel = [...updateUserSel].sort((a, b) =>
            a.first_name + a.last_name > b.first_name + b.last_name ? 1 : -1,
         );
         setUserSel(updateUserSel);
      }

      const RemoveUser = (id) => {
         if (id == null) return;
         const updateUserSel = userSel.filter((user) => user.id != id);
         let newUser = userSel.filter((user) => user.id == id);
         newUser.amount = 0;
         setUserSel(updateUserSel);
         let updateUserAvail = [
            ...userAvail,
            newUser[0]
         ]
         updateUserAvail = [...updateUserAvail].sort((a, b) =>
            a.first_name + a.last_name > b.first_name + b.last_name ? 1 : -1,
         );
         setUserAvail(updateUserAvail);
      }

      const setAmount = (id,amount) =>{
         let updateUserSel = userSel
         // for(let i = 0;i < updateUserSel.length;i++){
         //    if(updateUserSel[i]['id']==id){
         //       updateUserSel[i]['amount'] = amount;
         //    }
         // }
         updateUserSel.map((user)=>{if(user.id==id){user.amount=amount}});
         setUserSel(updateUserSel);
      }

      return <div>
         <select onChange={(event) => setSelUserIn(event.target.value)}>
            {userAvail.map((user) =>
               <option value={user.id} >
                  {user.first_name} {user.last_name}
               </option>)}
         </select>
         <button onClick={() => AddUser()}>ADD</button>
         {/* <ul>{userAvail.map((user) => <li>{user.first_name} {user.last_name}</li>)}</ul> */}
         <ul>{userSel.map((user) => <div><li>{user.first_name} {user.last_name} 
         <input type="number" min="0.00" step="0.01" onChange={(event) => setAmount(user.id,event.target.value)}/>
         </li>
            <button onClick={() => RemoveUser(user.id)}>Delete</button>
         </div>)}</ul>
      </div>
   }


   render() {
      return (
         <main>
            <this.createList></this.createList>
         </main>
      )
   }
}

export default App;


