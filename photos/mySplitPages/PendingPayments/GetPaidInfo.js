import { useEffect,useState } from "react"


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
    if (paidInfo) return <span>PAID</span>
    else return <span>UNPAID</span>
}

export default GetPaidInfo;