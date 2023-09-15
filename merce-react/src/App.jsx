import { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirm
    }

    axios.post("http://localhost:8000/api/registration", userData).then((response) => {
      console.log(response.status, response.data.message, response.data.token);
    });
  }

  return (
    <>
      <div>
      <form onSubmit={handleSubmit}>
          <label>
             Name:
            <input type="text" name="name" onChange={handleChange}/>
          </label>
          <label>
            Email:
            <input type="email" name="email" onChange={handleChange}/>
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={handleChange}/>
          </label>
          <label>
          Password_Confirm:
            <input type="password" name="password_confirm" onChange={handleChange}/>
          </label>
          <button type="submit">Registr</button>
        </form>
      </div>
    </>
  )
}

export default App
