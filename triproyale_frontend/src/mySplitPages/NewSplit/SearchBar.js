import React, { useState } from "react";
import { Helmet } from "react-helmet";
// import Button from "react-bootstrap/esm/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import './SearchBar.css'
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
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(results)
        setSearchResults(results);
    };

    const DisplaySearchItems = () => {
        if (searchResults.length) {
            return <div style={{}}>
                {searchResults.map((item) => (
                    <div style={{ margin: '13px', fontSize: '20px' }} class="unselected">{item.name}
                        <button style={{ marginTop: '-9%', borderWidth: "0px", backgroundColor: "transparent", marginLeft: "80%", display: "flex" }} onClick={(e) => handleRemove(item.id, e)}>
                            <span class="changeColor">
                                <AiOutlinePlusCircle size="1.5em" />
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        }
        else
            return <div>
                {props.unselected_list.map((item) => (
                    <div style={{ margin: '13px', fontSize: '20px' }} class="unselected">
                        {item.name}
                        <button style={{ marginTop: '-9%', borderWidth: "0px", backgroundColor: "transparent", marginLeft: "80%", display: "flex" }} onClick={(e) => handleRemove(item.id, e)}>
                            <span class="changeColor">
                                <AiOutlinePlusCircle size="1.5em" />
                            </span>
                        </button>
                    </div>
                ))}
            </div>
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                onChange={handleChange}
                value={searchTerm}
                style={{ margin: '6px', alignSelf: 'center' }}
            />
            {DisplaySearchItems()}
            <button style={{ position: 'absolute', bottom: "8%", width: '100px', height: '40px', marginLeft: "35%", color: '#FFFFFF', color: 'black', borderWidth: '1px', borderColor: 'grey', borderRadius: "6px" }} onClick={props.showSidebar}>CANCEL</button>
        </div>
    );
};

export default SearchBar;
