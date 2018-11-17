import * as React from "react";
import Dropdown from "react-dropdown"
import 'react-dropdown/style.css';
;

class Endorsements extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public onSubmit = (event: any): void => {
    event.preventDefault();
    // functionality later
    return;
  }

  public render() {

    const options = ['The Seattle Times', 'The Stranger', 'King County Democrats'];

    return(
      <div>
        <h1>Endorsements</h1>
        <Dropdown options={options} onChange={this.onSubmit} placeholder="Choose a Publication" />
      </div>
    )
  }

}

export default Endorsements;
