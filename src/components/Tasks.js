import React, { useState } from "react";
import Task from "./Task";

const ToDoList = (props) => {
  return (
      <div className="mt-3">
    <ul className="overflow-auto list-unstyled">
      {props.tasks.map(task=><Task text={task.text} id={task.id} isChecked={task.isChecked} key={task.id} refresh={()=>{props.refresh()}}/>)}
    </ul>
    </div>
  );
};

export default ToDoList;
