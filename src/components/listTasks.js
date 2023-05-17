import { useState } from "react";
import Modal from "./modal";



function ListTasks({getData, task}) {
  const [showModal, setShowModal] = useState(false)

  async function deleteTask() {
    try {
      const response = await fetch(`https://dpa-todoapp.herokuapp.com/todos/${task.id}`, {
        method: "DELETE",
      })
      if (response.status === 200) {
        getData()
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <li className="task-wrapper">
      <div className="task-info">
        <p>{task.title}</p>
      </div>

      <div className="button">
        <button onClick={() => setShowModal(true)}>Update</button>
        <button onClick={deleteTask}>Delete</button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}
    </li>
  );
}

export default ListTasks;