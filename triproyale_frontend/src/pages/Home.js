import { Grid } from "@mui/material";
import homepage from "./HomePage.png"

const Home = () => {
  return <>
    {/* <div style={{position:"absolute", top:"0px",width:"100%", backgroundColor:'#E28616',  height:'60px', zIndex:"2"}}>
      home
    </div> */}
    <div style={{position: 'fixed', top:"30px", zIndex:"0", overflowY:'hidden'}}>
      <img src={homepage} style={{ width:'100%'}}/>
    </div>
    {/* <div style={{ position: 'fixed', top: "90px", zIndex: "-10" }}>
      <img src={homepage} style={{ height: "100%" }} />
    </div> */}
  </>;
};

export default Home;
