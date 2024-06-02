import { useState } from 'react';
import LoginPage from './assets/LoginPage'
import Order from './assets/Order';
import DarkModeToggle from './assets/DarkModeToggle'



const users = [
  { "username": "user1", "password": "password1" },
  { "username": "user2", "password": "password2" }
];


function App() {

  const [valid, setValid] = useState(false)

  function checkLoginDetails(username, password) {
    const user = users.find((u) => u.username === username && u.password === password)
    if (user) {
      setValid(true)
    } else {
      alert('Invalid username or password');
  
    }
  }

  return (
    <div className='App'>
      <DarkModeToggle/>
      {valid ? <Order /> : <LoginPage onLogin={checkLoginDetails} />}
    </div>
  )
}

export default App



