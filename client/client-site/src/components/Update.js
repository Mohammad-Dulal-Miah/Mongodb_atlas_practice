import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Update = () => {
  const { id } = useParams()
  const [singleUser, setSingleUser] = useState({});
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch(`http://localhost:5000/find/user/${id}`)
      .then((res) => res.json())
      .then((data) => setSingleUser(data))
  }, [id]);


  const addUpdateUser = (e) => {
    e.preventDefault();
    //console.log(user);

    fetch(`http://localhost:5000/user/update/${singleUser._id}`, {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        if(data.modifiedCount>0){
            alert('Update successfully');
        }
      });
   
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
      <h2>Update the user: {singleUser.name}</h2>

      <form onSubmit={addUpdateUser}>
        <input
          type="text"
          onChange={handleInputBlur}
          defaultValue={singleUser.name}
          name="name"
          placeholder="your name"
          required
        />
        <br />
        <input
          type="email"
          onChange={handleInputBlur}
          defaultValue={singleUser.email}
          name="email"
          placeholder="your email"
          required
        />
        <br />
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  )
}

export default Update
