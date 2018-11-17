import * as React from "react";

import Endorsements from './Endorsements';
import Links from './Links';


class Admin extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Links />
        <Endorsements />
      </div>

    )
  }
}

export default Admin;