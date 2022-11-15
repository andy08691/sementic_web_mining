import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import Run from './Run'
import 'bootstrap/dist/css/bootstrap.min.css'
const root = ReactDOM.createRoot(document.getElementById('root'))

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/run' element={<Run />} />
      </Routes>
    </div>
  )
}

root.render(
  <BrowserRouter>
    <Routers />
  </BrowserRouter>
)
