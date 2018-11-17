import * as React from "react";

import Header from '../Header';
import Links from './Links';


class Admin extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Header />
        <Links />
      </div>

    )
  }
}

export default Admin;