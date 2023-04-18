import './App.css';
import * as React from 'react';
import PendingPayments from './mySplitPages/PendingPayments/PendingPayments';
import AmountToBePaid from './mySplitPages/AmountToBePaid/AmountToBePaid';
import TotalExpenses from './mySplitPages/TotalExpenses/totalExpenses';
import Gallery from './photos_frontend/photos';
import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom';
import { Link
 } from 'react-router-dom';
import SideBar from './SideBar/Sidebar';
import NewSplit from './mySplitPages/NewSplit/NewSplits';

function App() {
    const user = 1;
    const trip = 1;
    return (
        <>
        <BrowserRouter>
        <SideBar/>
        <div>
            <Routes >
                {/* <Route path='/' element={<SideBar/>}/> */}
                {/* <Route path='/recommendations' element={}/> */}
                <Route path='/' element={<Navigate replace to='/gallery'/>}/>
                <Route path='/gallery' element={<Gallery user={user} trip={trip}/>}/>
                <Route path='/expenses/myexpenses' element={<TotalExpenses user={user} trip={trip}/>}/>
                <Route path='/expenses/amounttobepaid' element={<AmountToBePaid user={user} trip={trip}/>}/>
                <Route path='/expenses/pendingpayments' element={ <PendingPayments user={user} trip={trip}/>}/>
                <Route path='/newsplit' element={<NewSplit user={user} trip={trip}/>}/>
            </Routes>
        </div>
            
        </BrowserRouter>
        {/* <NewSplit user={user} trip={trip}/> */}
        {/* <Gallery user={user} trip={trip}/>  */}
        {/* <TotalExpenses user={user} trip={trip}/>  */}
        {/* <AmountToBePaid user={user} trip={trip}/> */}
        {/* <NewSplit user={user} trip={trip}/> */}
        </>
    );
}

export default App;