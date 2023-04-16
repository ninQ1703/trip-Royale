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
    return <p style={{ display: 'inline-block' }}>{total}</p>
}

export default Total;