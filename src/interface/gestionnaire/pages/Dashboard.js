import Chartline from "../components/ChartLine";
import Barchart from "../components/BarChart"
import Counter from "../components/Counter"
import '../css/Dashboard.css'

const Dashboard = () => {
    return (
      <div className="container_dashboard">
        <div className="title"> 
          Dashboard  
        </div>
        <Counter/>
        <Chartline/>
        <Barchart/>
      </div>
    );
  };
  
export default Dashboard;