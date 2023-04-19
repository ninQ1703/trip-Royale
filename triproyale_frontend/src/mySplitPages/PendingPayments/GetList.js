import { useEffect,useState } from "react"
import GetUser from "./GetUser";
import DisplayPaidInfo from "./DisplayPaidInfo"

const GetList = (props) => {
    const [splitlist, setsplitlist] = useState({ splitlist: [] });
    const [paid, setPaid] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/mysplits/${props.id}/`)
            const newsplitList = await response.json()
            setsplitlist(newsplitList)
        };

        fetchData();
    }, [])


    if (splitlist.length) {
        console.log(splitlist)
        return splitlist.map(item => (
            <div style={{ display: 'flex', paddingLeft: "1%", paddingRight: '1%', width:'80%',alignItems: 'center', border: '1px solid black', backgroundColor: "#FFE193 ", width: '94vh', height: '6vh', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px' }}>
                <GetUser id={item.debtor} user={props.user} trip={props.trip} />  
                <div style={{marginLeft:'auto', paddingRight:'3%'}}>{item.amount} Rs</div>
                <DisplayPaidInfo item={item} user={props.user} trip={props.trip}></DisplayPaidInfo>

            </div>));
    } else {
        return null;
    }

}

export default GetList;