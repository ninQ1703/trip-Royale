import React, { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      dining: 0,
      stay: 0,
      adventure: 0,
      shopping: 0,
      travel: 0,
      others: 0,
      users: []
    };
  }

  async componentDidMount() {
    try {
      const user = 3;
      const res1 = await fetch('http://localhost:8000/mytotaldebt/'+user+'/');
      const resDining = await fetch('http://localhost:8000/mydebtbytag/' + user + '/dining/');
      const resStay = await fetch('http://localhost:8000/mydebtbytag/' + user + '/stay/');
      const resAdventure = await fetch('http://localhost:8000/mydebtbytag/' + user + '/adventure/');
      const resShopping = await fetch('http://localhost:8000/mydebtbytag/' + user + '/shopping/');
      const resTravel = await fetch('http://localhost:8000/mydebtbytag/' + user + '/travel/');
      const resOthers = await fetch('http://localhost:8000/mydebtbytag/' + user + '/others/');
      const total = await res1.json();
      const dining = await resDining.json();
      const stay = await resStay.json();
      const adventure = await resAdventure.json();
      const shopping = await resShopping.json();
      const travel = await resTravel.json();
      const others = await resOthers.json();
      this.setState({
        total,
        dining,
        travel,
        shopping,
        adventure,
        others,
        stay,
      });
    } catch (e) {
      console.log(e);
    }
  }

  renderTotal = () => {
    const total = this.state.total
    return total;
  }
  renderDining = () => { return this.state.dining };
  renderStay = () => this.state.stay;
  renderAdventure = () => this.state.adventure;
  renderShopping = () => this.state.shopping;
  renderTravel = () => this.state.travel;
  renderOthers = () => this.state.others;
  render() {
    return (
      <main>
        <p>TOTAL : {this.renderTotal()}</p>
        <p>DINING : {this.renderDining()}</p>
        <p>STAY : {this.renderStay()}</p>
        <p>ADVENTURE : {this.renderAdventure()}</p>
        <p>SHOPPING : {this.renderShopping()}</p>
        <p>TRAVEL : {this.renderTravel()}</p>
        <p>OTHERS : {this.renderOthers()}</p>
      </main>
    )
  }
}

export default App;