/* eslint-disable react/prop-types */

import { useState } from "react"


function LoginPage({ onLogin }) {
  const [username, setName] = useState()
  const [password, setPassword] = useState()

  function handleClick() {
    onLogin(username, password)
  }
  return (
    <div className="d-flex mt-5 justify-content-center align-items-center">
      <div className="form-container p-4 border rounded shadow bg-light">
        <h3 className="text-secondary mb-3">Login</h3>
        <div className="mb-3">
          <label className="form-label text-dark">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-dark">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage







