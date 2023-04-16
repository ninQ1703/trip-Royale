import DisplayPaidInfo from './DisplayPaidInfo';
import { useEffect, useState } from "react"

const Paidinfo = (props) => {
    console.log("hi")
    const [paid, setPaid] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/ispaidbyowner/${props.id}/`)
            const newPaid = await response.json()
            setPaid(newPaid)
        };

        fetchData();
    }, [])
    console.log(paid)
    return <DisplayPaidInfo paid={paid} user={props.user} trip={props.trip} />
}

export default Paidinfo;