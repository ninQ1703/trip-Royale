import {useState} from "react";
function Dropdown({selected,setSelected}){
    const [isActive,setIsActive]=useState(false);
    const options=[{name:"Dining", value:"dining"},{name:"Travel", value:"travel"},{name:"Stay", value:"stay"},{name:"Adventure", value:"adventure"},{name:"Shopping", value:"shopping"},{name:"Others", value:"others"}];
    return (
        <div className="dropdown">
            <div classname="dropdown-btn" onClick={(e)=>
            setIsActive(!isActive)}>
                {selected}
                <span className="fas fa-caret-down"></span>
                </div>
                {isActive &&(
            <div className="dropdown-content">
                {options.map((option)=>(
                    <div 
                    onClick={(e)=>{
                        setSelected(option);
                        setIsActive(false);
                    }}
                     className="dropdown-item"
                     >
                        {option.name}
                        </div>
                ))}
            </div>
            )}
        </div>
    );
}

export default Dropdown;