import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';

function SideBar() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleME = () => setOpen(!open);
  return (
    <>
      <Button variant="warning" onClick={handleShow} style={{backgroundColor:'#E28616',borderWidth:'0px',boxShadow:'1px 1px 1px 1px grey'}}>
        -
      </Button>

      <Offcanvas show={show} onHide={handleClose} backdrop="static" style={{backgroundColor:'#AD6207'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{color:'white'}}>PKP+2</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ListGroup style={{borderWidth:'0px'}}>
            <ListGroup.Item variant="warning" style={{backgroundColor:'#AD6207',borderWidth:'0px',color:'white'}}>SCHEDULER</ListGroup.Item>
            <ListGroup.Item variant="warning" style={{backgroundColor:'#AD6207',borderWidth:'0px',color:'white'}}>FIND NEARBY PLACES</ListGroup.Item>
            <ListGroup.Item variant="warning" style={{backgroundColor:'#AD6207',borderWidth:'0px',color:'white'}}>SPLIT BILL</ListGroup.Item>
            <ListGroup.Item variant="warning" style={{backgroundColor:'#AD6207',borderWidth:'0px',color:'white'}}>
                MY EXPENSES
                <Button variant="warning" onClick={handleME} style={{backgroundColor:"#AD6207", borderWidth:'0px',borderColor:"#AD6207",color:'white'}}>v</Button>
                <Collapse in={open}>
                    <div >
                     <ListGroup>
                        <ListGroup.Item variant="warning" style={{backgroundColor:'#AD6207',borderWidth:'0px',color:'white'}}>EXPENSES</ListGroup.Item>
                        <ListGroup.Item variant="warning" style={{backgroundColor:'#AD6207',borderWidth:'0px',color:'white'}}>AMOUNT TO BE PAID</ListGroup.Item>
                        <ListGroup.Item variant="warning" style={{backgroundColor:'#AD6207',borderWidth:'0px',color:'white'}}>PENDING PAYMENT</ListGroup.Item>
                     </ListGroup>
                    </div>
                </Collapse>
            </ListGroup.Item>
            <ListGroup.Item variant="warning" style={{backgroundColor:'#AD6207',borderWidth:'0px',color:'white'}}>PHOTOS</ListGroup.Item>
            <ListGroup.Item variant="warning" style={{backgroundColor:'#AD6207',borderWidth:'0px',color:'white'}}>CHAT</ListGroup.Item>
            <ListGroup.Item variant="warning" style={{backgroundColor:'#AD6207',borderWidth:'0px',color:'white'}}>SETTINGS</ListGroup.Item>
        </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;