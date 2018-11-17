import * as React from "react";

import Links from './Links';


class Admin extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Links />
      </div>

    )
  }
}

export default Admin;