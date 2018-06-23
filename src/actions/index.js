import { updateResources, updateResource } from "blue-chip";

export const add = () => ({
  type: "ADD"
});

export const subtract = () => ({
  type: "SUBTRACT"
});

export const fetchChecklists = async (dispatch, state) => {
  dispatch({ type: "LOADING_DATA" });
  try {
    const response = await fetch("/checklists.json", {
      headers: {
        "content-type": "application/json"
      }
    });
    const payload = await response.json();

    updateResources(payload, dispatch);
    dispatch({ type: "LOADING_SUCCESS" });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: "LOADING_DATA" });
  }
};

export const updateTask = (dispatch, { id, ...attributes }) => {
  const resource = {
    id,
    attributes,
    type: "tasks"
  };

  updateResource(resource, dispatch);
};
