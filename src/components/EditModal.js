import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";


const EditModal = (props) => {

    const[text,setText] = useState(props.text);

    const updateHandler = async()=>{
        const modifiedTask = {
            isChecked: false,
            text:text,
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
          props.closeModal();
          props.refresh();
    }

  return (
    <>
      <Modal show={true} onHide={props.closeHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type="text" className="col form-control" value={text} onChange={(e)=>setText(e.currentTarget.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={updateHandler}>
            Update Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
