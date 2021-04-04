import TaskItem from "./TaskItem.react";
import useTasksReducer from "./data/useTasksReducer";
import AddTask from "./AddTask.react";

export default function TaskListContainer() {
  const { tasks, dispatch } = useTasksReducer();

  return (
    <>
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
