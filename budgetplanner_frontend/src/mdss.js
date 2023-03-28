import React, { Component } from "react"
import { useEffect, useState } from "react"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list : [],
      users: [],
      number : 1
    };
    // var number = 1;
  }

  async componentDidMount() {
    try {
      const user = 3;
      const resUsers = await fetch(`http://127.0.0.1:8000/users/`);
      const users = await resUsers.json();
      
      this.setState({
        // list,
        users,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async renderList(id){
    const resList = await fetch(`http://127.0.0.1:8000/mydebt/1/${this.state.number}/`);
    const list  = await resList.json();
    return 1;
    // const newList = this.state.list;
    // const number = id;
    // this.setState({number});
    // return (newList.length);
    // return 0;
    // return newList.map (item => (<li>{item.amount}</li>));
  }

  renderUsers = () => {
    const newUsers = this.state.users;
    return newUsers.map(user => (
      <div>
        <p >
          {user.first_name}
        </p>
        <ul>
          
      <button onClick={this.renderList(id)}>Fetch data</button>
        </ul>
      </div>
    ));
  };
  render() {
    return (
      <main>
        <p>{this.renderUsers()}</p>
      </main>
    )
  }
}

export default App;