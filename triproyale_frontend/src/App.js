import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";
import DashB from "./DashBoard/dshb"
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import NewSplit from './mySplitPages/NewSplit/NewSplits';
import { NewTrip } from './Create_trip/newTrip';
import Scehduler from './Scheduler/Scheduler';
import PendingPayments from './mySplitPages/PendingPayments/PendingPayments';
import AmountToBePaid from './mySplitPages/AmountToBePaid/AmountToBePaid';
import TotalExpenses from './mySplitPages/TotalExpenses/totalExpenses';
import Gallery from './photos_frontend/photos';
import { ChatPage } from "./Chat/General_chat";
import { useGetLoggedUserQuery } from "./services/userAuthApi";
function App() {
  const { access_token } = useSelector(state => state.auth)
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const userId = data?.id
  const user = 0;
  const trip = 0;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={!access_token ? <LoginReg /> : <Navigate to="/dashboard" />} />
            <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
            <Route path="/dashboard" element={access_token ? <DashB /> : <Navigate to="/login" />} />
            <Route path="/scheduler" element={<Scehduler trip={trip} user={user} />} />
            <Route path="/newtrip" element={<NewTrip />} />
            <Route path="/chat" element={<ChatPage user={user} trip={trip} />} />
            <Route path='/gallery' element={<Gallery user={user} trip={trip} />} />
            <Route path='/expenses/myexpenses' element={<TotalExpenses user={user} trip={trip} />} />
            <Route path='/expenses/amounttobepaid' element={<AmountToBePaid user={user} trip={trip} />} />
            <Route path='/expenses/pendingpayments' element={<PendingPayments user={user} trip={trip} />} />
            <Route path='/newsplit' element={<NewSplit user={user} trip={trip} />} />

          </Route>
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// export default App;

// import React from 'react';
// import logo from './logo.svg';
// import { NewTrip } from './Create_trip/newTrip';
// import Scehduler from './Scheduler/Scheduler';
// import { DashB } from './DashBoard/dshb.js';
// import PendingPayments from './mySplitPages/PendingPayments/PendingPayments';
// import AmountToBePaid from './mySplitPages/AmountToBePaid/AmountToBePaid';
// import TotalExpenses from './mySplitPages/TotalExpenses/totalExpenses';
// import Gallery from './photos_frontend/photos';
// import { useState } from 'react';
// import { ChatPage } from './Chat/General_chat';
// import { BrowserRouter } from 'react-router-dom';
// import { browserHistory, Router, Route, Routes } from 'react-router';
// // import SideBar from '../SideBar/Sidebar';
// import NewSplit from './mySplitPages/NewSplit/NewSplits';
// import SideBar from './SideBar/Sidebar';

// // import { groupsData } from './groupsData.js';
// // import "react-bootstrap/dist/react-bootstrap.min.js";
// {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link> */ }
// function App() {
//   const user = 1;
//   const trip = 0;

//   // console.log(trip);

//   return (
//     <BrowserRouter>
//       {/* <SideBar/> */}
//       <Routes>
//         <Route path="/" element={<DashB user={user} />} />
//         <Route path="/scheduler" element={<Scehduler trip={trip} user={user} />} />
//         <Route path="/newtrip" element={<NewTrip />} />
//         <Route path="/chat" element={<ChatPage user={user} trip={trip} />} />
//         <Route path='/gallery' element={<Gallery user={user} trip={trip} />} />
//         <Route path='/expenses/myexpenses' element={<TotalExpenses user={user} trip={trip} />} />
//         <Route path='/expenses/amounttobepaid' element={<AmountToBePaid user={user} trip={trip} />} />
//         <Route path='/expenses/pendingpayments' element={<PendingPayments user={user} trip={trip} />} />
//         <Route path='/newsplit' element={<NewSplit user={user} trip={trip} />} />

//         {/* <Route path="contact" element={<Contact />} />
//           <Route path="*" element={<NoPage />} /> */}
//       </Routes>
//     </BrowserRouter>
//     // Scehduler() 
//     // <Scehduler user={3} trip={2}/> 
//     // <DashB username="Himani Panwar" groupsData={groupsData}/>
//     // <DashB username="Himani Panwar" />
//     // <NewTrip />
//     // <SideBar />
//     // <ChatPage />

//   );
// }

export default App;