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
const DisplayPaidInfo = (props) => {
    if (props.paid == true) return <div style={{ display: 'inline-block', marginRight:'3%' }}>PAID </div>
    else return <div style={{ display: 'inline-block' , marginRight:'3%', color:'#8B0000'}}> due </div>
}

export default Paidinfo;