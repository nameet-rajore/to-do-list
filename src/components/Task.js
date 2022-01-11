import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { TaskContext } from "../context/GlobalState";
import EditModal from "./EditModal";

const Task = (props) => {
  const tasksCtx = useContext(TaskContext);
  const [isChecked, setIsChecked] = useState(props.isChecked);
  const [showModal, setShowModal] = useState(false);

  const checkHandler = async () => {
    setIsChecked((prevState) => !prevState);

    const modifiedTask = {
      isChecked: !isChecked,
      text: props.text,
    };

    const response = await fetch(
      "https://to-do-list-f9f3d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/" +
        props.id +
        ".json",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedTask),
      }
    );
  };

  const handleShowModal = ()=>{
    setShowModal(true);
  }

  const handleCloseModal = ()=>{
    setShowModal(false);
  }

  const deleteTaskHandler = async () => {
    const response = await fetch(
      "https://to-do-list-f9f3d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/" +
        props.id +
        ".json",
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      }
    );
    const data = await response.json();
    console.log("After pressing delete" + data);
    tasksCtx.setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== props.id)
    );
  };

  return (
    <>
    {showModal&&ReactDOM.createPortal(<EditModal closeModal={()=>{handleCloseModal()}} id={props.id} text={props.text} refresh={()=>{props.refresh()}}/>, document.getElementById('modal-root'))}
    <li key={props.id}>
      <div className="mb-2 card ps-4 pe-3 p-1 bg-light border-0 text-wrap user-select-none">
        <div className="row align-items-center">
          <div className="form-check col mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              id={props.id}
              checked={isChecked}
              onChange={checkHandler}
            />
            <label
              className={"form-check-label text-wrap text-break".concat(
                " ",
                isChecked ? "text-muted" : ""
              )}
              htmlFor={props.id}
              style={{ textDecorationLine: isChecked && "line-through" }}
            >
              {props.text}
            </label>
          </div>
          <div className="btn-group p-0 col-auto">
            <button
              className="btn btn-sm btn-outline-primary col-auto"
              onClick={handleShowModal}
              disabled={isChecked}
            >Edit</button>
            <button
              className="btn btn-sm btn-outline-danger col-auto"
              onClick={deleteTaskHandler}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
    </>
  );
};

export default Task;
