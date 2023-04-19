import { useEffect, useState } from "react"

const Total = (props) => {
    const [total, setTotal] = useState('0')
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/${props.user}/${props.trip}/mydebtbyowner/${props.id}/`)
            const newTotal = await response.json()
            setTotal(newTotal)
        };

        fetchData();
    }, [])
    return <div style={{ display: 'inline-block', marginLeft: 'auto',marginRight:'3%' }}>{total} Rs</div>
}

export default Total;