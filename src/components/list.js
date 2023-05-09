import { useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "./modal";


function List({title, getData}) {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [showModal, setShowModal] = useState(false)

  function logout() {
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  }

  return (
    <div className='title-wrapper'>
      <div className='title'>
        <h1>{title}</h1>
      </div>

      <div className='button-wrapper'>
        <div className='button'>
          <button className='add'onClick={() => setShowModal(true)}>Add</button>
          <button className='logout' onClick={logout}>Log Out</button>
        </div>
      </div>

      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData}/>}
    </div>
  );
}

export default List;