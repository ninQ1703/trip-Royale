import React, { Component } from "react"
import { useEffect, useState } from "react"



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.getList = this.getList.bind(this);
  }

  async componentDidMount() {
    try {
      const resUsers = await fetch(`http://127.0.0.1:8000/users/`);
      const users = await resUsers.json();
      this.setState({
        users,
      });
    } catch (e) {
      console.log(e);
    }
  }

  //function to display the list of epnding payments
  getList = (props) => {
    const [list, setlist] = useState({ list: [] });

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`http://127.0.0.1:8000/mydebt/6/${props.id}/`)
        const newList = await response.json()
        setlist(newList)
      };

      fetchData();
    }, [])


    if (list.length && props.permit) {
      console.log(list)
      return list.map(item => (<div><p>{item.amount} {item.creation_date}</p></div>));
    } else {
      return null;
    }

  }


  //function to expand view on button click
  getDisplay = (props) => {
    const [listText, setlistText] = useState('');
    const [display, setDislay] = useState(false);
    function changeDisplay() {
      setDislay(!display)
    }
    return <div>
      <button onClick={changeDisplay}>click here</button>
      <this.getList id={props.id} permit={display}></this.getList>
    </div>

  }

  //function to diplay all users
  renderUsers = (props) => {
    const [listText, setlistText] = useState('');
    const [display, setDislay] = useState(false);
    const newUsers = this.state.users;

    return newUsers.filter(user => user.id != 6).map(user => (
      <div>
        <p >
          {user.first_name}
        </p>
        <this.getDisplay id = {user.id}></this.getDisplay>
      </div>
    ));
  };



  render() {
    return (
      <main>
        <h4><ul><li>Date format</li></ul></h4>
        <this.renderUsers>
        </this.renderUsers>
      </main>
    )
  }
}

export default App;