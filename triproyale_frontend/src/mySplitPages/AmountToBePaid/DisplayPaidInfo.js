import { useEffect, useState } from "react"
import { TiTick } from "react-icons/ti"

const DisplayPaidInfo = (props) => {
    if (props.paid == true) return <>
        <div style={{ marginLeft: 'auto', paddingRight: '3%' }}>
            {props.amount} Rs
        </div>
        <TiTick color='green' />
        <div style={{ color: '#8B0000', paddingRight: '3%' }}>

        </div>
    </>
    else return <>
        <div style={{ marginLeft: 'auto', paddingRight: '3%' }}>
            {props.amount} Rs
        </div>
        <div style={{ color: '#8B0000', paddingRight: '3%' }}>
            due
        </div>
    </>
}

export default DisplayPaidInfo;