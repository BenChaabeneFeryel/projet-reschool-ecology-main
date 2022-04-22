import Chartline from "../components/ChartLine";
import Barchart from "../components/BarChart"
import Piechart from "../components/PieChart"
import Counter from "../components/Counter"
import '../css/Dashboard.css'
import { Grid } from '@mui/material'

const Dashboard = () => {
    return (
      <div className="container_dashboard">
        <div className="title"> 
          Dashboard  
        </div>
        <Counter/>
        <Grid container>
          <Grid item xs={6}> 
            <Chartline/> 
          </Grid>
          <Grid item xs={6}> 
            <Barchart/> 
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}> 
            <Piechart/> 
          </Grid>
        </Grid>
      </div>
    );
  };
  
export default Dashboard;