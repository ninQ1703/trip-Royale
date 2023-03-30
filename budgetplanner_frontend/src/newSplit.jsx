import React, { Component } from "react"
import { useEffect, useState } from "react"



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    createForm = () => {
        const [split, setSplit] = useState({
            id: "",
            owner: "",
            amount: "",
            creation_date: "",
            tag: "",

        });
        const [tag, setTag] = useState('others');
        const [Tamount, setTAmount] = useState("0");
        const [userAvail, setUserAvail] = useState([]);
        const [userSel, setUserSel] = useState([]);
        const [selUserIn, setSelUserIn] = useState('');

        useEffect(() => {
            const fetchData = async () => {
                const resUsers = await fetch(`http://127.0.0.1:8000/users/`);
                let users = await resUsers.json();
                users.forEach((user) => { if (user.id === 1) user.first_name = "you"; user.last_name = ""; user.amount = "0" })
                setUserAvail(users.filter((user) => user.id !== 1));
                setUserSel(users.filter((user) => user.id === 1));
            };
            fetchData();
        }, [])
        const AddUser = () => {
            if (selUserIn == null) return;
            const updateUserAvail = userAvail.filter((user) => user.id != selUserIn);
            const newUser = userAvail.filter((user) => user.id == selUserIn);
            setUserAvail(updateUserAvail);
            var updateUserSel = [
                ...userSel,
                newUser[0]
            ]
            updateUserSel = [...updateUserSel].sort((a, b) =>
                a.first_name + a.last_name > b.first_name + b.last_name ? 1 : -1,
            );
            setUserSel(updateUserSel);
        }

        const RemoveUser = (id) => {
            if (id == null) return;
            const updateUserSel = userSel.filter((user) => user.id != id);
            let newUser = userSel.filter((user) => user.id == id);
            newUser.amount = "0";
            setUserSel(updateUserSel);
            let updateUserAvail = [
                ...userAvail,
                newUser[0]
            ]
            updateUserAvail = [...updateUserAvail].sort((a, b) =>
                a.first_name + a.last_name > b.first_name + b.last_name ? 1 : -1,
            );
            setUserAvail(updateUserAvail);
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            fetch(`http://127.0.0.1:8000/newsplit/`, {
                method: 'POST',
                body: JSON.stringify({
                    tag: tag,
                    owner: 1,
                    amount: Tamount,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then((post) => {
                    userSel.map((user) => {
                        fetch(`http://127.0.0.1:8000/newsplitdist/`, {
                            method: 'POST',
                            body: JSON.stringify({
                                split: post.id,
                                debtor: user.id,
                                amount: user.amount,
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
        };
        return (
            <div><div>
                <form onSubmit={handleSubmit}>
                    <select onChange={(event) => setTag(event.target.value)}>
                        <option value="travel">travel</option>
                        <option value="shopping">shopping</option>
                        <option value="stay">stay</option>
                        <option value="adventure">adventure</option>
                        <option value="dining">dining</option>
                        <option selected value="others">others</option>
                    </select>
                    <input type="number" min="0" step="0.01" onChange={(event) => setTAmount(event.target.value)} />
                    <div>
                        <select onChange={(event) => setSelUserIn(event.target.value)}>
                            {userAvail.map((user) =>
                                <option value={user.id} >
                                    {user.first_name} {user.last_name}
                                </option>)}
                        </select>
                        <button onClick={() => AddUser()}>ADD</button>
                        {/* <ul>{userAvail.map((user) => <li>{user.first_name} {user.last_name}</li>)}</ul> */}
                        <ul>{userSel.map((user) => <div><li>{user.first_name} {user.last_name} {user.amount}</li>
                            <button onClick={() => RemoveUser(user.id)}>Delete</button>
                        </div>)}</ul>
                    </div>
                    <button type="submit">Add Post</button>
                </form>
            </div>
                <div >{split.id}
                </div>
            </div>

        );
    };


    render() {
        return (
            <main>
                <this.createForm>
                </this.createForm>
            </main>
        )
    }
}

export default App;


