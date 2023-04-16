import { useEffect,useState } from "react"

const DisplayPaidInfo = (props) => {
    const [paid, setPaid] = useState(props.item.paid)

    const handleClick = (item) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paid: true, })
        };
        fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/markpaid/${item.id}/`, requestOptions)
            .then(response => response.json()).then((data) => setPaid(data.paid))
    }
    console.log(paid);
    if (paid == true) return <span> PAID</span>;
    else return <button onClick={(event) => handleClick(props.item)}> UNPAID</button>;
}

export default DisplayPaidInfo;