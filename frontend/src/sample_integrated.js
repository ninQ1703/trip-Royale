import React, { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendees: [],
      };
  }

    async componentDidMount() {
      try {
        const res1 = await fetch('http://localhost:8000/1/trips/1/schedule/2023-04-05/events');
        const attendees = await res1.json();

        // const res2 = await fetch('http://localhost:8000/api/users/');
        // const userList = await res2.json();
        console.log(attendees);
        this.setState({
          attendees
        });
      } catch (e) {
        console.log(e);
    }
    }
    
    renderItems = () => {
      // const { viewCompleted } = this.state;
      // const newItems = this.state.userList.filter(
      //   item => item.completed === viewCompleted
      // );
      const newItems = this.state.attendees;
      console.log(newItems);
      // const users = this.state.userList;
      
      return newItems.map(item => (
        
        <li>
          <p>
            id: {item.id} <br />
            event: {item.event}<br />
            {/* leader_id: {item.leader.id} leader_name: {item.leader.first_name}<br />
            start date: {item.start_date}<br />
            end date: {item.end_date}<br /> */}
            {/* {item.attendees}<br /> */}
            {/* attendees id/name:
            {item.attendees.map(user => <div>{user.id} {user.first_name} {user.email}</div>)} */}
          </p>
        </li>
      ));
    };

    render() {
      return (
        <main className="content">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
      )
    }
  }
  
export default App;