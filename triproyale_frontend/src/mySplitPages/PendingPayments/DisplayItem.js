import { Collapse } from 'react-collapse';
import { useEffect, useState } from "react"
import GetPaidInfo from './GetPaidInfo';
import GetList from './GetList';
import formatDate from '../month';
import { TbTriangleInvertedFilled } from "react-icons/tb"

const DisplayItem = (props) => {
    const closedd = <TbTriangleInvertedFilled style={{ transform: 'rotate(270deg)' }} color="#FF900B " name='closedd' />
    const opened = <TbTriangleInvertedFilled color="#FF900B " name='opened' />
    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState(closedd)

    function changeDisplay() {

        if (icon.props.name == "closedd") setIcon(opened);
        else setIcon(closedd);
        setOpen(!open);
    }
    console.log(props.split);
    return <>
        <div style={{ marginLeft: '35%', display: 'flex', alignItems: 'flex-start', width: '70%' }}>
            {/* <div> */}
            <button onClick={() => { changeDisplay() }} style={{ backgroundColor: 'transparent', border: '0px', marginTop: '2%', marginRight: '2%', display: 'inline' }}>{icon}</button>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ boxShadow: "0px 0px 5px  ", border: '1px solid black', backgroundColor: "#FF900B ", width: '100%', height: '7vh', marginTop: '1%', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginLeft: '3%' }}>{props.split.amount} Rs</div>
                    <div style={{ display: 'inline-block', margin: '10px', marginLeft: 'auto', paddingRight: '0%' }}>
                        {formatDate(props.split.creation_date)}
                    </div>
                    <GetPaidInfo id={props.split.id} user={props.user} trip={props.trip} />
                </div>

                <Collapse isOpened={open} style={{}}>
                    <div style={{ width: '90%' }}><GetList id={props.split.id} user={props.user} trip={props.trip} /></div>
                </Collapse>
            </div>
        </div >
    </>
}

export default DisplayItem;