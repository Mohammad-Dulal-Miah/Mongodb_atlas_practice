import React, { useState } from 'react'

const AddUser = () => {
  const [user, setUser] = useState({})

  const addNewUser = (e) => {
    e.preventDefault()

    fetch('http://localhost:5000/add/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.acknowledged) {
          alert('user added successfully')
          e.target.reset()
        }
      })
  }

  const handleInputBlur = (e) => {
    const field = e.target.name
    const value = e.target.value
    const newUser = { ...user }
    newUser[field] = value
    setUser(newUser)
  }

  return (
    <div>
      <h2>Please add a new user</h2>
      <form onSubmit={addNewUser}>
        <input
          type="text"
          onBlur={handleInputBlur}
          name="name"
          placeholder="your name"
          required
        />
        <br />
        <input
          type="email"
          onBlur={handleInputBlur}
          name="email"
          placeholder="your email"
          required
        />
        <br />
        <br />
        <button type="submit">Add New User</button>
      </form>
    </div>
  )
}

export default AddUser
