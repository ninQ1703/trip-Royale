import React, { Component } from "react"
import { useEffect, useState } from "react"
// import { format } from 'date-fns'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splits: [],
    };
    this.getList = this.getList.bind(this);
  }

  async componentDidMount() {
    try {
      const resSplits = await fetch(`http://127.0.0.1:8000/mysplits/1/`);
      const splits = await resSplits.json();
      this.setState({
        splits,
      });
    } catch (e) {
      console.log(e);
    }
  }

  //get debtor of a particular split distribution
  getUser = (props) => {
    const [user, setUser] = useState({ user: [] });

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`http://127.0.0.1:8000/users/${props.id}/`);
        const newUser = await response.json();
        setUser(newUser);
      };
      fetchData();
    }, [])

    if (user.length) {
      return <span>{user[0].first_name} {user[0].last_name}</span>
    } else {
      return null;
    }
  }

  //function to display the list of split distribution
  getList = (props) => {
    const [splitlist, setsplitlist] = useState({ splitlist: [] });
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`http://127.0.0.1:8000/mysplits/1/${props.id}/`)
        const newsplitList = await response.json()
        setsplitlist(newsplitList)
      };

      fetchData();
    }, [])

    function DisplayPaidInfo(item) {
      if (item.paid) return <span> PAID</span>;
      else return <span> UNPAID</span>;
    }

    if (splitlist.length && props.permit) {
      console.log(splitlist)
      return splitlist.map(item => (
        <div>
          <this.getUser id={item.debtor}></this.getUser>  {item.amount}
          <DisplayPaidInfo item={item}></DisplayPaidInfo>
        </div>));
    } else {
      return null;
    }

  }

  //function to expand view on button click 
  getDisplay = (props) => {
    const [display, setDislay] = useState(false);
    function changeDisplay() {
      setDislay(!display)
    }
    return <div>
      <button onClick={changeDisplay}>click here</button>
      <this.getList id={props.id} permit={display}></this.getList>
    </div>

  }

  //paid info of a single split
  getPaidInfo = (props) => {
    const [paidInfo, setpaidinfo] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        const resPaid = await fetch(`http://127.0.0.1:8000/paid/${props.id}/`)
        const newPaidInfo = await resPaid.json()
        setpaidinfo(newPaidInfo)
      };
      fetchData();
    }, [])
    if (paidInfo) return <span>PAID</span>
    else return <span>UNPAID</span>
  }

  //function to diplay all my splits
  renderSplits = (props) => {
    const newSplits = this.state.splits;

    return newSplits.map(split => (
      <div>
        <span >
          {split.amount} {split.creation_date} <this.getPaidInfo id={split.id}></this.getPaidInfo>
        </span>
        <this.getDisplay id={split.id}></this.getDisplay>
      </div>
    ));
  };


  render() {
    return (
      <main>
        <h4><ul><li>the paid unpaid info corresponding each distribution is not printing right</li><li>date not in desired format</li></ul></h4>
        <this.renderSplits>
        </this.renderSplits>
      </main>
    )
  }
}

export default App;