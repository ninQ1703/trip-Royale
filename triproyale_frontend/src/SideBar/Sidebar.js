import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';
import {
  Link
} from 'react-router-dom';
import { SlCalender } from "react-icons/sl"
import { GoLocation } from "react-icons/go"
import { CgViewSplit } from "react-icons/cg"
import { BsWallet, BsChevronDoubleDown } from "react-icons/bs"
import { AiOutlineCloudUpload , AiOutlineBars} from "react-icons/ai"
import { BsChatDots } from "react-icons/bs"
import {FaBars} from "react-icons/fa"
function SideBar(props) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleME = () => setOpen(!open);
  return (
    <div style={{ position: 'fixed', zIndex: '4' }}>
      <Button variant="warning" onClick={handleShow} style={{ backgroundColor: 'transparent', borderWidth: '0px', boxShadow: 'none', position: 'fixed', top: '8px', margin: '2px' }}>
        <FaBars size="1.5em" color='white'/>
      </Button>

      <Offcanvas show={show} onHide={handleClose} backdrop="static" style={{ backgroundColor: '#AD6207' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: 'white' }}>{props.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup style={{ borderWidth: '0px' }}>
            <Link to='/scheduler' state={{ trip: props.trip, user: props.user }} style={{ textDecoration: 'none' }}><ListGroup.Item variant="warning" style={{ backgroundColor: '#AD6207', borderWidth: '0px', color: 'white' }}><SlCalender style={{ marginRight: '2%', marginBottom: '1%' }} />SCHEDULER</ListGroup.Item></Link>
            <a href='http://127.0.0.1:8000/' style={{ textDecoration: 'none' }}><ListGroup.Item variant="warning" style={{ backgroundColor: '#AD6207', borderWidth: '0px', color: 'white' }}><GoLocation style={{ marginRight: '2%', marginBottom: '1%' }} />FIND NEARBY PLACES</ListGroup.Item></a>
            <Link to='/newsplit' state={{ trip: props.trip, user: props.user }} style={{ textDecoration: 'none' }}><ListGroup.Item variant="warning" style={{ backgroundColor: '#AD6207', borderWidth: '0px', color: 'white' }}><CgViewSplit style={{ marginRight: '2%', marginBottom: '1%' }} />SPLIT BILL</ListGroup.Item></Link>
            <ListGroup.Item variant="warning" style={{ backgroundColor: '#AD6207', borderWidth: '0px', color: 'white' }}><BsWallet style={{ marginRight: '2%', marginBottom: '1%' }} />
              MY EXPENSES
              <Button variant="warning" onClick={handleME} style={{ backgroundColor: "#AD6207", borderWidth: '0px', borderColor: "#AD6207", color: 'white', marginBottom: '1%' }}><BsChevronDoubleDown style={{ paddingBottom: '2%' }} /></Button>
              <Collapse in={open}>
                <div >
                  <ListGroup>
                    <Link to='/expenses/myexpenses' state={{ trip: props.trip, user: props.user }} style={{ textDecoration: 'none' }}><ListGroup.Item variant="warning" style={{ backgroundColor: '#AD6207', borderWidth: '0px', color: 'white' }}>EXPENSES</ListGroup.Item></Link>
                    <Link to='/expenses/amounttobepaid' state={{ trip: props.trip, user: props.user }} style={{ textDecoration: 'none' }}><ListGroup.Item variant="warning" style={{ backgroundColor: '#AD6207', borderWidth: '0px', color: 'white' }}>AMOUNT TO BE PAID</ListGroup.Item></Link>
                    <Link to='/expenses/pendingpayments' state={{ trip: props.trip, user: props.user }} style={{ textDecoration: 'none' }}><ListGroup.Item variant="warning" style={{ backgroundColor: '#AD6207', borderWidth: '0px', color: 'white' }}>PENDING PAYMENT</ListGroup.Item></Link>
                  </ListGroup>
                </div>
              </Collapse>
            </ListGroup.Item>
            <Link to='/gallery' state={{ trip: props.trip, user: props.user }} style={{ textDecoration: 'none' }}><ListGroup.Item variant="warning" style={{ backgroundColor: '#AD6207', borderWidth: '0px', color: 'white' }}><AiOutlineCloudUpload style={{ marginRight: '2%', marginBottom: '1%' }} />PHOTOS</ListGroup.Item></Link>
            <Link to='/chat' state={{ trip: props.trip, user: props.user }} style={{ textDecoration: 'none' }}><ListGroup.Item variant="warning" style={{ backgroundColor: '#AD6207', borderWidth: '0px', color: 'white' }}><BsChatDots style={{ marginRight: '2%', marginBottom: '1%' }} />CHAT</ListGroup.Item></Link>
          {/* <ListGroup.Item variant="warning" style={{ backgroundColor: '#AD6207', borderWidth: '0px', color: 'white' }}><SlCalender style={{marginRight:'2%',marginBottom:'1%'}}/>SETTINGS</ListGroup.Item> */}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
    </div >
  );
}

export default SideBar;