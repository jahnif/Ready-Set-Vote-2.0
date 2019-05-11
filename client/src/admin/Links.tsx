import * as React from "react";
import { Link } from "react-router-dom";

class Links extends React.Component {
  public render() {
    return(
      <div>
          <Link to="/admin/voting_districts" className="dashboard-link">Geographic Voting Districts</Link>
          <div className="instructions">Add, Edit, and Delete the list of voting districts which you can later assign to Measures and Seats.</div>

          <Link to="/admin/seats" className="dashboard-link">Seats</Link>
          <div className="instructions">Add, Edit, and Delete the list of Seats to which you can later assign Candidates.</div>

          <Link to="/admin/candidates" className="dashboard-link">Candidates</Link>
          <div className="instructions">Add, Edit, and Delete the list of Candidates running for office.</div>

          <Link to="/admin/measures" className="dashboard-link">Measures</Link>
          <div className="instructions">Add, Edit, and Delete the list of Measures.</div>
        
          <Link to="/admin/endorsers" className="dashboard-link">Endorsers</Link>
          <div className="instructions">Add, Edit, and Delete the list of Publications and other Third-Party Endorsers.</div>
      
      </div>
    )
  }
}

export default Links;