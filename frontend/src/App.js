// import React from 'react';
// import logo from './logo.svg';
// import homepage from './homepage.png'
// import { NewTrip } from './Create_trip/newTrip';
// import Scehduler from './S_comp/Scheduler';
// import { DashB } from './Dashboard/dshb.js';
// import SideBar from './S_comp/Sidebar';
// // import { groupsData } from './groupsData.js';
// // import "react-bootstrap/dist/react-bootstrap.min.js";
// {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link> */}
// function App() {
//   const user = 1;
//   return (    
//     // Scehduler() 
//     // <Scehduler /> 
//     // <DashB username="Himani Panwar" groupsData={groupsData}/>
//     // <DashB username="Himani Panwar" />
//     // <NewTrip />
//     <SideBar />
// );
// }

// export default App;

import './App.css';
import * as React from 'react';
import PendingPayments from './mySplitPages/PendingPayments/PendingPayments';
import AmountToBePaid from './mySplitPages/AmountToBePaid/AmountToBePaid';
import TotalExpenses from './mySplitPages/TotalExpenses/totalExpenses';
import Gallery from './photos_frontend/photos';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { Link
 } from 'react-router-dom';
// import SideBar from './SideBar/Sidebar';
import NewSplit from './mySplitPages/NewSplit/NewSplit';
import SideBar from './S_comp/Sidebar';

function App() {
    const user = 2;
    const trip = 1;
    return (
        <>
        {/* <div>hello</div> */}
        {/* <BrowserRouter> */}
        {/* <SideBar /> */}
        {/* <div><Routes> */}
                {/* <Route path='/' element={<SideBar/>}/> */}
                {/* <Route path='/gallery' element={<Gallery user={user} trip={trip}/>}/> */}
                {/* <Route path='/expenses/myexpenses' element={<TotalExpenses user={user} trip={trip}/>}/> */}
                {/* <Route path='/expenses/amounttobepaid' element={<AmountToBePaid user={user} trip={trip}/>}/> */}
                {/* <Route path='/expenses/pendingpayments' element={ <PendingPayments user={user} trip={trip}/>}/> */}
                {/* <Route path='/newsplit' element={<NewSplit user={user} trip={trip}/>}/> */}
            {/* </Routes></div> */}
            
        {/* </BrowserRouter> */}
        {/* <NewSplit user={user} trip={trip}/> */}
        <Gallery user={user} trip={trip}/> 
        {/* <PendingPayments user={user} trip={trip}/> */}
        {/* <TotalExpenses user={user} trip={trip}/>  */}
        {/* <AmountToBePaid user={user} trip={trip}/> */}
        </>
    );
}

export default App;