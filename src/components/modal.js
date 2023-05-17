import { useState } from "react";
import { useCookies } from "react-cookie";



function Modal({mode, setShowModal, getData, task}) {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    date: editMode ? task.date : new Date()
  })

  async function newPost(e) {
    e.preventDefault();
    try {
      const response = await fetch('https://dpa-todoapp.herokuapp.com/todos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        setShowModal(false)
        getData()
      }     
    }
    catch (error) {
      console.error(error);
    }
  }

  async function editPost(e) {
    e.preventDefault();
    try {
      const response = await fetch(`https://dpa-todoapp.herokuapp.com/todos/${task.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        setShowModal(false)
        getData()
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  function handleChange(event) {
    const {name, value} = event.target

    setData(data => ({
      ...data,
      [name]: value
    }))

    console.log(data);
    
  }

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div>
          <h2>{mode} your task</h2>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            placeholder="Task Here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />

          
          <input className="{method}" type="submit" onClick={editMode ? editPost : newPost}/>
        </form>
      </div>
      
    </div>
  );
}
  
export default Modal;