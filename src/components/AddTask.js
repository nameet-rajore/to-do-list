import React, { useContext, useEffect, useRef } from "react";
import { TaskContext } from "../context/GlobalState";

const AddTask = (props) => {
  const addTaskHandler = async (e) => {
    e.preventDefault();
    if(textRef.current.value!==''){
    const task = {
      text: textRef.current.value,
      isChecked: false,
    };
    console.log(e);
    const response = await fetch(
      "https://to-do-list-f9f3d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    //console.log(data);
    props.refresh();
    textRef.current.value = "";
    }
  };

  const {refresh} = props;
  useEffect(() => {
    refresh();
  }, [refresh]);

  const textRef = useRef();

  return (
    <>
      <form className="mt-3 container">
        <div className="row">
          <input
            className=" col form-control"
            placeholder="What do you want to do today?"
            ref={textRef}
          />
          <button
            className=" ms-2 col-auto btn btn-primary"
            type="submit"
            onClick={addTaskHandler}
          >
            Add Task
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTask;
