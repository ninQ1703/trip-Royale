import { useEffect, useState } from "react";
import ii from './admiandpaisa.png';
import * as React from 'react';
import Dropdown from "./Dropdown";
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import './NewSplit.css';
import { useLocation } from "react-router-dom";
import SideBar from '../../SideBar/Sidebar';



const NewSplit = (props) => {
    const location = useLocation();
    const { trip } = location.state;
    const { user } = location.state;

    const [Tamount, setTAmount] = useState("0");
    const [selected, setSelected] = useState({ name: "ADD TAG", value: "others" });
    const [selected_list, setSelected_list] = useState([]);
    const [unselected_list, setUnselected_list] = useState([{ name: "Anupriya", id: 1, }]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const resUsers = await fetch(`http://127.0.0.1:8000/${user}/${trip}/attendees`);
            let users = await resUsers.json();
            // console.log(users)

            users.forEach((userr) => { if (userr.id === user) { userr.name = "you"; } userr.amount = "0" })
            setUnselected_list(users.filter((userr) => userr.id !== user));
            setSelected_list(users.filter((userr) => userr.id === user));
        };
        fetchData();
    }, [])

    const [openList, setOpenList] = useState(false);

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const updateList = (newList1, newList2) => {
        setSelected_list(newList1);
        setUnselected_list(newList2);
        console.log(newList1, selected_list);
    }

    const RemoveUser = (item) => {
        if (item == null) return;
        const updateUserSel = selected_list.filter((user) => user.id != item);
        let newUser = selected_list.filter((user) => user.id == item);
        setSelected_list(updateUserSel);
        let updateUserAvail = [
            ...unselected_list,
            newUser[0]
        ]
        setUnselected_list(updateUserAvail);
    }
    console.log(unselected_list)

    const handleSubmit = (e) => {
        console.log("hi")
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/${user}/${trip}/newsplit/`, {
            method: 'POST',
            body: JSON.stringify({
                trip: trip,
                tag: selected.value,
                owner: user,
                amount: Tamount,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((post) => {
                selected_list.map((userr) => {
                    fetch(`http://127.0.0.1:8000/${user}/${trip}/newsplitdist/`, {
                        method: 'POST',
                        body: JSON.stringify({
                            split: post.id,
                            debtor: userr.id,
                            amount: userr.amount,
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                })

            })
            .then((res) => res.json())
            .catch((err) => {
                console.log(err.message);
            });
        navigate('/expenses/pendingpayments',
            {
                state: {
                    trip: trip,
                    user: user
                }
            })

    };
    const setAmount = (id, amount) => {
        let updateUserSel = [...selected_list]
        updateUserSel.map((userr) => { if (userr.id == id) { userr.amount = amount } });
        setSelected_list(updateUserSel);
    }
    console.log(selected)
    return <>
        <SideBar trip={trip} user={user} />
        <div style={{ position: 'relative', overflowY: 'hidden' }}>
            <div style={{
                position: "fixed", backgroundColor: "#F6AD52", color: "#000000", minHeight: '2.77em',
                top: '3em', width: '100%', zIndex: '3'
            }}>
                <div style={{ fontSize: "1.5em", textAlign: "center", fontWeight: "2em", maxHeight: "60px", marginLeft: "3%", paddingTop: ".5%", paddingBottom: ".3%" }}>AMOUNT TO BE PAID
                </div>
            </div>

            <div style={{
                position: "fixed", backgroundColor: "#FFFFFF", color: "#000000", minHeight: '3em',
                top: '5em', width: '100%', zIndex: '1'
            }}>
            </div>

            <div style={{ marginTop: '10%' }}>
                <div >
                    <Dropdown selected={selected.name} setSelected={setSelected} />
                </div>

                <h6 style={{ marginLeft: "51%", marginTop: "-5%" }}>AMOUNT</h6>
                <div style={{ marginLeft: '50%', marginTop: "0%" }} >

                    <input type='number' min="0" step="1" style={{ width: "37.5%", }} onChange={(event) => setTAmount(event.target.value)} />
                </div>
                <img
                    src={ii} height={530} width={400} style={{ marginLeft: "0%", marginTop: "-13%", position: 'relative', zIndex: '-1' }}
                    alt="logo"
                />

                <div>
                    <Sidebar updateList={updateList} unselected_list={unselected_list} selected_list={selected_list} sidebar={sidebar} showSidebar={showSidebar} />
                </div>
                <div style={{ marginLeft: '50%', marginTop: "-26%", border: "1px solid black", height: "230px", width: "35%", position: 'relative', borderTopLeftRadius: '14px', borderTopRightRadius: '14 px' }}>
                    <h5 style={{ paddingLeft: "5%", fontSize: "100%" }}>PEOPLE</h5>
                    {/* <ul> */}
                    <div style={{ marginLeft: '0%', overflowY: "scroll", overflowX: 'hidden', height: "170px", width: "100%" }}>
                        {selected_list.map((item) => (
                            <div className="selectedhover" style={{ paddingLeft: "2%", marginTop: "2%", fontSize: "100%" }} >
                                <button style={{ backgroundColor: 'transparent', borderWidth: '0px' }} onClick={(e) => RemoveUser(item.id)}>
                                    <RxCross2 />
                                </button> {item.name}
                                <div>
                                    <input type='number' min="0" step="1" style={{ marginTop: "-5%", width: "80px", display: "flex", height: "25px", marginLeft: "80%" }} defaultValue={item.amount} onChange={(event) => { setAmount(item.id, event.target.value); }} />
                                </div>
                            </div>

                        ))}
                    </div>
                    {/* </ul> */}
                    <Button variant="warning"
                        style={{ border: "1px solid black", backgroundColor: "#FF900B", fontSize: "15px", color: "#000000", borderColor: "#FFFFFF", width: "100%", height: "25px", paddingBottom: '6%', position: "absolute", bottom: '0px' }}
                        onClick={showSidebar}>+ ADD PEOPLE</Button>
                </div>
                <Button variant="contained" style={{ marginTop: "3%", backgroundColor: "#FF900B", marginLeft: "50%", border: "2px solid black", width: "10%" }} onClick={(e) => handleSubmit(e)}>DONE</Button>
            </div>

        </div>
    </>

}

export default NewSplit;