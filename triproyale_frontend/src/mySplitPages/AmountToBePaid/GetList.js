import { useEffect, useState } from "react"
import DisplayPaidInfo from "./DisplayPaidInfo";
const GetList = (props) => {
    const [list, setlist] = useState({ list: [] });
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
            return <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: "1%", paddingRight: '1%', alignItems: 'center', marginLeft: '6%', border: '1px solid black', backgroundColor: "#FFE193 ", width: '94vh', height: '6vh', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px' }}>{item.creation_date}
                <DisplayPaidInfo paid={item.paid} amount={item.amount} /></div>
        });
    } else {
        return null;
    }
}

export default GetList;