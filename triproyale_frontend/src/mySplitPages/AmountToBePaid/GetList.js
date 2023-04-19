import { useEffect, useState } from "react"
import DisplayPaidInfo from "./DisplayPaidInfo";
import formatDate from "../month";
import { TbTriangleInvertedFilled } from "react-icons/tb"
import { ImAirplane } from "react-icons/im";
import { MdLocalHotel, MdLocalDining, MdHiking } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi"
import { BsBoundingBoxCircles } from "react-icons/bs"

const GetList = (props) => {
    const [list, setlist] = useState({ list: [] });
    const tags = {
        travel: <ImAirplane size="1.5em" />,
        stay: <MdLocalHotel size="1.5em" />,
        dining: <MdLocalDining size="1.5em" />,
        shopping: <HiShoppingCart size="1.5em" />,
        adventure: <MdHiking size="1.5em" />,
        others: <BsBoundingBoxCircles size="1.5em" />
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/mydebt/${props.id}/`)
            const newList = await response.json()
            setlist(newList)
        };

        fetchData();
    }, [])

    if (list.length) {
        console.log(list)
        return list.map(item => {
            console.log(item.paid);
            return <div style={{ display: 'flex', paddingLeft: "1%", paddingRight: '1%', width:'80%',alignItems: 'center', border: '1px solid black', backgroundColor: "#FFE193 ", width: '94vh', height: '6vh', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px' }}>
                <div style={{paddingLeft:'2%'}}>{tags[item.tag]}</div>
                <div style={{paddingLeft:'2%'}}></div>{formatDate(item.creation_date)}
                <DisplayPaidInfo paid={item.paid} amount={item.amount} /></div>
        });
    } else {
        return null;
    }
}

export default GetList;