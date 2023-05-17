import {useState} from 'react'
import {useCookies} from 'react-cookie'



function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [loggedInStatus, setLoggedInStatus] = useState(true)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  // console.log(cookies);
  

  function viewLoggedIn(status) {
    setError(null)
    setLoggedInStatus(status)
  }

  async function handleSubmit(e, endpoint) {
    e.preventDefault()
    if (!loggedInStatus && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const response = await fetch(`https://dpa-todoapp.herokuapp.com/${endpoint}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })
    const data = await response.json()
    if (data.detail){
      setError(data.detail)
    }
    else {
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)

      window.location.reload()
    }
    
  }

  return (
    <div className='auth-wrapper'>
      <div className='auth'>
        <form>
          <h2>{loggedInStatus ? 'Please log in' : 'Please sign up'}</h2>
          <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
          <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
          {!loggedInStatus && <input type='password' placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)}/>}
          <input type='submit' onClick={(e) => handleSubmit(e, loggedInStatus ? 'login' : 'signup')}/>
          {error && <p>{error}</p>}
        </form>

        <div className='auth-buttons'>
          <button onClick={() => viewLoggedIn(false)}>Sign Up</button>
          <button onClick={() => viewLoggedIn(true)}>Login</button>
        </div>
      </div>
    </div>
  );
}
  
export default Auth;