import * as React from "react";
import { Link } from "react-router-dom";

class Links extends React.Component {
  public render() {
    return(
      <div className='dashboard-links'>
        <Link to="/admin/voting_districts">Geographic Voting Districts</Link>
        <p>Add, Edit, and Delete the list of voting districts which you can later assign to Measures and Seats.</p>
        <Link to="/admin/seats">Seats</Link>
        <p>Add, Edit, and Delete the list of Seats to which you can later assign Candidates.</p>
        
      </div>
    )
  }
}

export default Links;