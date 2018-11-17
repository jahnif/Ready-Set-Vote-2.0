import * as React from "react";
import Dropdown from "react-dropdown"
import 'react-dropdown/style.css'
;

class Endorsements extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public onSubmit = (event: any): void => {
    event.preventDefault();
    // TODO: functionality later
    return;
  }

  public render() {

    const options = ['The Seattle Times', 'The Stranger', 'King County Democrats'];

    return(
      <div className="dashboard-right">
        <div className="dashboard-item">Endorsements</div>
        <Dropdown options={options} onChange={this.onSubmit} placeholder="Choose a Publication" />
      </div>
    )
  }

}

export default Endorsements;
