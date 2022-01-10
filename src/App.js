import { useEffect, useState, useCallback, useContext } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import EmptyTasks from "./components/EmptyTasks";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Tasks from "./components/Tasks";
import { TaskContext } from "./context/GlobalState";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const tasksCtx = useContext(TaskContext);
  const fetchTasksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://to-do-list-f9f3d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json"
      );
      if (!response.ok) throw new Error("Could not fetch data");
      const data = await response.json();
      let loadedTasks = [];
      for (const key in data) {
        loadedTasks.push({
          id: key,
          text: data[key].text,
          isChecked: data[key].isChecked,
        });
      }
      tasksCtx.setTasks(loadedTasks.reverse());
      
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchTasksHandler();
    console.log(tasksCtx.tasks);
  }, [fetchTasksHandler]);

  return (
    <div
      className="container-sm mt-5 col-lg-6 col-md-6 col-md-6 container justify-content-center card p-4"
      style={{ borderRadius: "1rem" }}
    >
      <Header />
      <AddTask refresh={fetchTasksHandler}/>
      {!isLoading && tasksCtx.tasks.length > 0 && <Tasks tasks={tasksCtx.tasks}/>}
      {!isLoading && tasksCtx.tasks.length === 0 && <EmptyTasks />}
      {isLoading && <Loading />}
      {!isLoading && error && <p>{error}</p>}
    </div>
  );
}

export default App;
