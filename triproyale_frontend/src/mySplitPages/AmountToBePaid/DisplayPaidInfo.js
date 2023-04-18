import { useEffect, useState } from "react"

const DisplayPaidInfo = (props) => {
    if (props.paid == true) return <div style={{ display: 'inline-block', marginRight: '3%' }}>{props.amount} PAID </div>
    else return <>
                    <div style={{marginLeft:'auto', paddingRight:'3%'}}> 
                        {props.amount} Rs
                    </div>
                    <div style={{ color: '#8B0000', paddingRight:'3%'}}>
                        due
                    </div>
                </>
}

export default DisplayPaidInfo;