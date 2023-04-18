import { useEffect,useState } from "react"
import {TiTick} from "react-icons/ti"

const GetPaidInfo = (props) => {
    const [paidInfo, setpaidinfo] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const resPaid = await fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/paid/${props.id}/`)
            const newPaidInfo = await resPaid.json()
            setpaidinfo(newPaidInfo)
        };
        fetchData();
    }, [])
    if (paidInfo) return <span style={{paddingRight:'3%'}}><TiTick color='green'/></span>
    else return <span style={{paddingRight:'5.5%'}} ></span>
}

export default GetPaidInfo;