import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
  }, [])

  const handleDelete = (user) => {
    const agree = window.confirm(`Are you want delete ${user.name}`)
    if (agree) {
      //console.log('We will delete this user')
      fetch(`http://localhost:5000/user/${user._id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert('Data deleted successfully')

            const newUser = users.filter((usr) => usr._id !== user._id)
            setUsers(newUser)
          }
        })
    }
  }

  return (
    <div>
      <h2>Total user: {users.length}</h2>
      <div>
        {users.map((user) => (
          <div
            style={{
              border: '1px solid black',
              padding: '10px',
              margin: '200px',
            }}
          >
            <p>{user.name}</p> <p>{user.email}</p>
            <Link to={`/update/${user._id}`}> <button>Update</button></Link><br />
            <button onClick={() => handleDelete(user)}>X</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
