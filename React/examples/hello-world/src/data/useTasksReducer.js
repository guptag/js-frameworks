import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      if (action.description.trim() === "") {
        return state;
      }
      const maxId = state.reduce((acc, task) => {
        return task.id > acc ? task.id : acc;
      }, 0);
      return [
        ...state,
        { id: maxId + 1, description: action.description, status: "Active" },
      ];

    case "editDescription":
      const editIndex = state.findIndex((task) => task.id === action.id);
      if (editIndex >= 0) {
        return [
          ...state.slice(0, editIndex),
          { ...state[editIndex], description: action.description },
          ...state.slice(editIndex + 1),
        ];
      }
      return state;

    case "delete":
      console.log(action.id);
      let deleteIndex = state.findIndex((task) => task.id === action.id);
      if (deleteIndex >= 0) {
        state.splice(deleteIndex, 1);
        return [...state];
      }
      return state;

    default:
      throw new Error();
  }
}

export default function useTasksReducer() {
  const defaultTasks = [
    /*{ id: 0, description: "task1", status: "Active" },
    { id: 1, description: "task2", status: "Active" },*/
  ];
  const [tasks, dispatch] = useReducer(reducer, defaultTasks);
  return { tasks, dispatch };
}
