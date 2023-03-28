import React, { Component } from "react"
import { useEffect, useState } from "react"



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
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
  getList = (props) => {
    // return( <p>hi</p>)
    const [list, setlist] = useState({list : []});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/mydebt/2/${props.id}/`)
            const newList = await response.json()
            setlist(newList)
        };

        fetchData();
    }, [])
    if (list.length) {
        console.log(list)
        return list.map(item => (<p>{item.amount}</p>));
    } else {
        return null;
    }
    
  }
    renderUsers = () => {
    const newUsers = this.state.users;
    return newUsers.map(user => (
      <div>
        <p >
          {user.first_name}
        </p><ul>
        <this.getList id = {user.id}></this.getList>
        </ul>
        
      </div>
    ));
  };
  render() {
    return (
      <main>
        <p>{this.renderUsers()}</p>
        {/* <this.getList></this.getList> */}
      </main>
    )
  }
}

export default App;