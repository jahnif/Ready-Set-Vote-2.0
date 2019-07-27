import * as React from "react";
import AdminMenu from "./AdminMenu";
import EditTable from "./EditTable";

class Admin extends React.Component<{}, { editing: boolean }> {
  // TODO: add mobx and AdminStore component for state
  constructor(props: any) {
    super(props);

    this.state = {
      editing: false
    };
  }

  public render() {
    return (
      <div>
        {this.state.editing ? (
          <EditTable />
        ) : (
          <AdminMenu editing={this.state.editing} />
          //   TODO: pass function to toggle editing vs menu instead of state itself
        )}
      </div>
    );
  }
}

export default Admin;
