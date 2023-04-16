import { useEffect, useState } from "react"

const DisplayPaidInfo = (props) => {
    if (props.paid == true) return <div style={{ display: 'inline-block' }}>{props.amount} PAID </div>
    else return <div style={{ display: 'inline-block' }}> {props.amount} UNPAID </div>
}

export default DisplayPaidInfo;