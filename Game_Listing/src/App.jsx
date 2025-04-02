import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/SideBar'
import GameCard from './components/GameCard'
import GameList from './components/GameList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Sidebar/>
      <GameCard/>
      <GameList/>
    </>
  )
}

export default App
