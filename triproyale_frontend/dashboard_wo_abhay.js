
import React from 'react';
import { NewTrip } from './Create_trip/newTrip';
import Scehduler from './Scheduler/Scheduler';
import { DashB } from './DashBoard/dshb.js';
import PendingPayments from './mySplitPages/PendingPayments/PendingPayments';
import AmountToBePaid from './mySplitPages/AmountToBePaid/AmountToBePaid';
import TotalExpenses from './mySplitPages/TotalExpenses/totalExpenses';
import Gallery from './photos_frontend/photos';
import { ChatPage } from './Chat/General_chat';
import { BrowserRouter } from 'react-router-dom';
import NewSplit from './mySplitPages/NewSplit/NewSplits';

function App() {
  const user = 1;
  const trip = 0;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashB user={user} />} />
        <Route path="/scheduler" element={<Scehduler trip={trip} user={user} />} />
        <Route path="/newtrip" element={<NewTrip />} />
        <Route path="/chat" element={<ChatPage user={user} trip={trip} />} />
        <Route path='/gallery' element={<Gallery user={user} trip={trip} />} />
        <Route path='/expenses/myexpenses' element={<TotalExpenses user={user} trip={trip} />} />
        <Route path='/expenses/amounttobepaid' element={<AmountToBePaid user={user} trip={trip} />} />
        <Route path='/expenses/pendingpayments' element={<PendingPayments user={user} trip={trip} />} />
        <Route path='/newsplit' element={<NewSplit user={user} trip={trip} />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;