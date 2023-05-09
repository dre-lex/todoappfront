import List from "./components/list";
import ListTasks from "./components/listTasks";
import Auth from './components/auth';
import {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';



function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [tasks, setTasks] = useState(null)

  async function getData() {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json()
      
      setTasks(json)
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    } 
  })
  console.log(tasks);

  const sortedByTasks = tasks?.sort((a, b) => a.title - b.title)
  

  return (
    <div className="app">
      {!authToken && <Auth/>}

      {authToken &&
      <> 
        <List title={'Your ToDo List'} getData={getData}/>
        
        <p>{userEmail}</p>
        
        {sortedByTasks?.map((task) => 
          <ListTasks
            key={task.id}
            task={task}
            getData={getData}
          />
        )}
      </>}
    </div>
  );
}

export default App;
