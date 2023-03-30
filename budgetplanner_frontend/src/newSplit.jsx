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
        const [debtors, setDebtors] = useState([{
            amount: Tamount,
            debtor: 1,
            paid: false,
        }])
        const [debtor, setDebtor] = useState('');
        const [Damount, setDamount] = useState("0");

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
                    setSplit(post)
                    fetch(`http://127.0.0.1:8000/newsplitdist/`, {
                        method: 'POST',
                        body: JSON.stringify({
                            split: post.id,
                            debtor: debtor,
                            amount: Damount,
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
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
                    <input type="number" onChange={(event) => setDebtor(event.target.value)} />
                    <input type="number" onChange={(event) => setDamount(event.target.value)} />
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


