import React, { Component } from "react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
const CreateForm = (props) => {
   const [tag, setTag] = useState('others');
   const [Tamount, setTAmount] = useState("0");
   const [userAvail, setUserAvail] = useState([]);
   const [userSel, setUserSel] = useState([]);
   const [selUserIn, setSelUserIn] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         const resUsers = await fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/attendees`);
         let users = await resUsers.json();
         // console.log(users)

         users.forEach((user) => { if (user.id === props.user) { user.Name = "you"; } user.amount = "0" })
         setUserAvail(users.filter((user) => user.id !== props.user));
         setUserSel(users.filter((user) => user.id === props.user));
      };
      fetchData();
   }, [])
   const AddUser = () => {
      if (selUserIn == null || selUserIn == undefined) return;
      const updateUserAvail = userAvail.filter((user) => user.id != selUserIn);
      const newUser = userAvail.filter((user) => user.id == selUserIn);
      setUserAvail(updateUserAvail);
      var updateUserSel = [
         ...userSel,
         newUser[0]
      ]
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
         a.Name> b.Name ? 1 : -1,
      );
      setUserAvail(updateUserAvail);
   }

   const setAmount = (id, amount) => {
      let updateUserSel = [...userSel]
      updateUserSel.map((user) => { if (user.id == id) { user.amount = amount } });
      setUserSel(updateUserSel);
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/newsplit/`, {
         method: 'POST',
         body: JSON.stringify({
            trip: props.trip,
            tag: tag,
            owner: props.user,
            amount: Tamount,
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      })
         .then((res) => res.json())
         .then((post) => {
            userSel.map((user) => {
               fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/newsplitdist/`, {
                  method: 'POST',
                  body: JSON.stringify({
                     split: post.id,
                     debtor: user.id,
                     amount: user.amount,
                  }),
                  headers: {
                     'Content-type': 'application/json; charset=UTF-8',
                  },
               })
            })

         })
         .then((res) => res.json()).then((data) => navigate('/expenses/pendingpayments'))
   };
   return (
      <div>

         <form onSubmit={handleSubmit}>

            {/* select a tag field */}
            <select onChange={(event) => { setTag(event.target.value) }}>
               <option disabled selected value >--select a tag--</option>
               <option value="travel">travel</option>
               <option value="shopping">shopping</option>
               <option value="stay">stay</option>
               <option value="adventure">adventure</option>
               <option value="dining">dining</option>
               <option value="others">others</option>
            </select>

            {/* enter total amount */}
            <input type="number" min="0" step="1" onChange={(event) => setTAmount(event.target.value)} /><br></br>

            {/* select a user to be added */}
            <div>
               <select onChange={(event) => setSelUserIn(event.target.value)}>
                  <option disabled selected value="notAllowed">--select a friend--</option>
                  {userAvail.map((user) =>
                     <option value={user.id} >
                        {user.Name}
                     </option>)}
               </select>

               {/* add user button */}
               <button type="button" onClick={() => AddUser()}>ADD</button>

               {/* added users */}
               <ul>{userSel.map((user) => {
                  return <div>
                     <li>{user.Name}
                        <input type="number" min="0.00" /*pattern='d\+\.\d\d$'*/ step="1" defaultValue={user.amount} onChange={(event) => { setAmount(user.id, event.target.value); }} />
                        {/* {user.amount} */}
                     </li>
                     <button type="button" onClick={() => RemoveUser(user.id)}>Delete</button>
                  </div>
               })}
               </ul>

               {/* submit button */}
            </div>
            <button type="submit">Add Split</button>

         </form>
      </div>

   );
};


const NewSplit = (props) => {
   return <>
      <CreateForm user={props.user} trip = {props.trip} />
      <h3>Errors to deal with</h3>
      <ul>
         <li>decide the format of the select friend field? option, list??</li>
         <li>after adding one user, it should set back to --select a friend--</li>
         <li>Disable add button for no user selected</li>
         <li>add an split equally option</li>
         <li>if the sum of all is not equal to total, give an error and ask user to continue or not</li>
         <li>if usr choses to continue then make the total sum equal to sum total</li>

      </ul>
   </>


}

export default NewSplit;


