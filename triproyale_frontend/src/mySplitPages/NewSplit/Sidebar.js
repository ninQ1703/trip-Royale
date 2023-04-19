import React, { useState } from "react";
import "./Sidebar.css";
import SearchBar from "./SearchBar";


function Sidebar(props) {
    return (
        <div className={props.sidebar ? "sidebar active" : "sidebar"} style={{position:'fixed',zIndex:'6'}}>
            <SearchBar updateList={props.updateList} unselected_list={props.unselected_list} selected_list={props.selected_list} showSidebar={props.showSidebar} />
        </div>
    );
}

export default Sidebar;