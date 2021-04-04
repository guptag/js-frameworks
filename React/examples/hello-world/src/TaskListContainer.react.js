import TaskItem from "./TaskItem.react";
import useTasksReducer from "./data/useTasksReducer";
import AddTask from "./AddTask.react";
import { useState, useEffect } from "react";

import TasksService from "./data/TasksService";

export default function TaskListContainer() {
  const { tasks, dispatch } = useTasksReducer();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      const initialTasks = await TasksService.fetchTasks();
      dispatch({ type: "load", tasks: initialTasks });
      setIsLoading(false);
    }
    loadTasks();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskItem
              task={task}
              onUpdate={(description) => {
                dispatch({
                  type: "editDescription",
                  id: task.id,
                  description,
                });
              }}
              onDelete={() => {
                console.log("on delete");
                dispatch({
                  type: "delete",
                  id: task.id,
                });
              }}
            />
          </li>
        ))}
      </ul>
      <AddTask
        onAddNew={(desc) => {
          dispatch({
            type: "add",
            description: desc,
          });
        }}
      />
    </>
  );
}
