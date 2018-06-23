import React from "react";
import { connect } from "react-redux";

import { Checklist } from "../models";
import { updateTask } from "../actions";

class FetchContainer extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <h1>
          Fetch Checklists (connected){" "}
          {this.props.loading === true ? "loading..." : ""}
        </h1>
        <h2 style={{ padding: 10, border: "1px solid #f2f2f2" }}>
          {this.props.error && <div>Error!</div>}

          {this.props.checklists &&
            this.props.checklists.map(checklist => {
              const checklistDiv = (
                <div key={checklist.id}>
                  {checklist.id} - {checklist.name}
                </div>
              );

              const taskList = (
                <ul>
                  {checklist.tasks.map(task => (
                    <li>
                      {task.description}
                      <input
                        value={this.state[task.id]}
                        onChange={e =>
                          this.setState({
                            [task.id]: e.target.value
                          })
                        }
                      />
                      <button
                        onClick={() => {
                          this.props.updateTask({
                            ...task,
                            description: this.state[task.id]
                          });
                        }}
                      >
                        submit
                      </button>
                    </li>
                  ))}
                </ul>
              );
              return [checklistDiv, taskList];
            })}
        </h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { resources } = state;
  return {
    loading: state.dataReducer.loading,
    error: state.dataReducer.error,
    checklists: Checklist.query(resources)
      .all()
      .includes(["tasks"])
      .toObjects()
  };
};

const mapDispatchToProps = dispatch => ({
  updateTask: task => updateTask(dispatch, task)
});

export default connect(mapStateToProps, mapDispatchToProps)(FetchContainer);
