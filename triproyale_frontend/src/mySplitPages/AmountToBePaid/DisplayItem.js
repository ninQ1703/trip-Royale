import Total from './Total';
import Paidinfo from './PaidInfo';
import GetList from './GetList';
import { Collapse } from 'react-collapse';
import { useEffect, useState } from "react"

const DisplayItem = (props) => {
    const closedd = <div name='closedd' style={{
        color: 'white',
        width: '0px',
        height: '0px',
        border: '8px solid black',
        borderRadius: '7px',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: '#FF900B',
        borderBottomColor: 'transparent'
    }}></div>
    const opened = <div name='opened' style={{
        color: 'white',
        width: '0px',
        height: '0px',
        border: '8px solid black',
        borderRadius: '7px',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: '#FF900B',
        borderLeftColor: 'transparent'
    }}></div>
    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState(closedd)


    function changeDisplay() {
        console.log(icon.props.name)
        if (icon.props.name === "opened") setIcon(closedd);
        else setIcon(opened);

        setOpen(!open);
    }

    console.log(props.item.Name);
    return <>
        <div style={{ marginLeft: '35%' }}>
            {/* <div> */}
            <button onClick={() => { changeDisplay() }} style={{ backgroundColor: 'transparent', border: '0px', margin: '.1%' }}>{icon}</button>

            <div style={{ boxShadow: "0px 0px 5px  ", display: "inline-block", border: '1px solid black', backgroundColor: "#FF900B ", width: '100vh', height: '7vh', marginTop: '1%', borderRadius: '10px' }}>
                {props.item.Name}
                <Total id={props.item.id} user={props.user} trip={props.trip} />
                <Paidinfo id={props.item.id} user={props.user} trip={props.trip} />
            </div>
            <Collapse isOpened={open} style={{}}>
                <GetList id={props.item.id} user={props.user} trip={props.trip} />

            </Collapse>
        </div>
    </>
}

export default DisplayItem;