import React from "react";
import { connect } from "react-redux";
import { fetchChecklists } from "../actions/";

class Container extends React.Component {
  render() {
    return (
      <div>
        <h1>Container component (connected)</h1>
        <div>
          <button onClick={() => this.props.fetchChecklists()}>fetch</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fetchChecklists: () => dispatch(fetchChecklists)
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
