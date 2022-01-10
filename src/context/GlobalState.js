import { createContext, useState } from "react";

let initialState = {
  tasks: [],
  setTasks: null,
};

export const TaskContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [tasks, setTasks] = useState(initialState.tasks);

  return (
    <TaskContext.Provider value={{ tasks: tasks, setTasks: (tasks)=>{setTasks(tasks)} }}>
      {props.children}
    </TaskContext.Provider>
  );
};
