import Total from './Total';
import Paidinfo from './PaidInfo';
import GetList from './GetList';
import { Collapse } from 'react-collapse';
import { useEffect, useState } from "react"
import { TbTriangleInvertedFilled } from "react-icons/tb"
const DisplayItem = (props) => {
    const closedd = <TbTriangleInvertedFilled style={{ transform: 'rotate(270deg)' }} color="#FF900B " name='closedd' />
    const opened = <TbTriangleInvertedFilled color="#FF900B " name='opened' />
    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState(closedd)
    const [total, setTotal] = useState('0')
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/mydebtbyowner/${props.item.id}/`)
            const newTotal = await response.json()
            setTotal(newTotal)
        };

        fetchData();
    }, [])
    function changeDisplay() {
        console.log(icon.props.name)
        if (icon.props.name === "opened") setIcon(closedd);
        else setIcon(opened)
        setOpen(!open);
    }
    const DisplayUserAmount = () => {
        if (total) {
            return <div style={{ marginLeft: '35%', display: 'flex', alignItems: 'flex-start', width: '70%' }}>
                {/* <div> */}
                <button onClick={() => { changeDisplay() }} style={{ backgroundColor: 'transparent', border: '0px', marginTop: '2%', marginRight: '2%', display: 'inline' }}>{icon}</button>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ boxShadow: "0px 0px 5px  ", border: '1px solid black', backgroundColor: "#FF900B ", width: '100%', height: '7vh', marginTop: '1%', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginLeft: '3%' }}>{props.item.name}</div>
                        <Total id={props.item.id} user={props.user} trip={props.trip} />
                        <Paidinfo id={props.item.id} user={props.user} trip={props.trip} />
                    </div>
                    <Collapse isOpened={open} style={{ display: 'flex' }}>
                        <div style={{ width: '90%' }}><GetList id={props.item.id} user={props.user} trip={props.trip} /></div>
                    </Collapse>
                </div>

            </div>
        } else return null;
    }
    console.log(total);
    console.log(props.item.name);
    return <>
        {DisplayUserAmount()}
    </>

}

export default DisplayItem;