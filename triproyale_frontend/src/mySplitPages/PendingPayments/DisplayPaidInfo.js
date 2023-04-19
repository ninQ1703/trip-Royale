import { useEffect,useState } from "react"
import {TiTick} from "react-icons/ti"

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
    if (paid == true) return <span style={{paddingRight:'3%', paddingLeft:'2%'}}><TiTick color='green'/></span>
    else return <button style={{textDecoration:'none', backgroundColor:'transparent',borderWidth:'0px', color: '#8B0000', paddingRight:'3%'}} onClick={(event) => handleClick(props.item)}>
    due
</button>;
}

export default DisplayPaidInfo;