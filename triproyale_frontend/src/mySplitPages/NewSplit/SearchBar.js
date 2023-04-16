import React, { useState } from "react";
// import Button from "react-bootstrap/esm/Button";

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleRemove = (item, event) => {
        event.preventDefault();
        const removedItem = props.unselected_list.filter((user) => user.id == item);
        const updateUserUnsel = props.unselected_list.filter((user) => user.id != item);
        if (searchResults != []) {
            const updateSearchResults = searchResults.filter((user) => user.id != item);
            setSearchResults(updateSearchResults);
        }
        props.updateList([...props.selected_list, removedItem[0]], updateUserUnsel);
    }

    const handleChange = (event) => {
        event.preventDefault();
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        const results = props.unselected_list.filter((item) =>
            item.Name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(results)
        setSearchResults(results);
    };

    const DisplaySearchItems = () => {
        console.log(props.unselected_list[0].Name, searchResults)
        if (searchResults.length) {
            return <ul>
                {searchResults.map((item) => (
                    <li>{item.Name}
                        <button style={{ paddingLeft: "2%", marginTop: "-9%", marginLeft: "80%", height: "32px", width: "32px", borderRadius: "50%", display: "flex" }} onClick={(e) => handleRemove(item.id, e)}>+</button>
                    </li>
                ))}
            </ul>
        }
        else
            return <ul>
                {props.unselected_list.map((item) => (
                    <li>
                        {item.Name}
                        <button style={{ paddingLeft: "2%", marginTop: "-9%", marginLeft: "80%", height: "32px", width: "32px", borderRadius: "50%", display: "flex" }} onClick={(e) => handleRemove(item.id, e)}>+</button>
                    </li>
                ))}
            </ul>
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                onChange={handleChange}
                value={searchTerm}
                style={{margin:'6px',alignSelf:'center'}}
            />
            {DisplaySearchItems()}
            {/* <button style={{position:'absolute',bottom:"8%",width:'100px',height:'40px',marginLeft:"35%",color:'#FFFFFF',color:'black',borderWidth:'1px',borderColor:'grey',borderRadius:"6px"}} onClick={props.showSidebar}>CANCEL</button> */}
        </div>
    );
};

export default SearchBar;
