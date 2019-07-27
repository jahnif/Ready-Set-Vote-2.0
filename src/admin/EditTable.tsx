import * as React from "react";

const tableStyles = {
  marginLeft: "auto",
  marginRight: "auto",
  width: "75%"
};
class EditTable extends React.Component {
  constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <table style={tableStyles}>
        <tr>
          <th>Img</th>
          <th>Candidate</th>
          <th>Seat</th>
          <th>Edit</th>
        </tr>
        <tr>
          <td>Test</td>
          <td>Test</td>
          <td>Test</td>
          <td>Test</td>
        </tr>
        <tr>
          <td>Test</td>
          <td>Test</td>
          <td>Test</td>
          <td>Test</td>
        </tr>
        <tr>
          <td>Test</td>
          <td>Test</td>
          <td>Test</td>
          <td>Test</td>
        </tr>
      </table>
    );
  }
}

export default EditTable;
