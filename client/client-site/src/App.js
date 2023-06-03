import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import AddUser from './components/AddUser'
import Update from './components/Update'

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/update/:id" element={<Update/>}/>
      </Routes>
    </div>
  )
}

export default App
