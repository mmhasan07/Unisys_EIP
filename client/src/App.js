import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ProtectedRoute, LoginSignupProtectedRoute } from './utils/ProtectedRoutes'
import ReduxDemo from './ReduxDemo'
import MySQL from './pages/MySQL'
import MongoDB from './pages/MongoDB'
import Navbar from './components/Navbar'
import ViewSqlTable from './pages/ViewSqlTable'
import ViewMongoDocument from './pages/ViewMongoDocument'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path = "/login" element = {<LoginSignupProtectedRoute component = {Login}/>}/>
          <Route path = "/signup" element = {<LoginSignupProtectedRoute component = {Signup}/>}/>
          <Route path = "/" element = {<ProtectedRoute component = {Home}/>}/>
          <Route path = "/mongo" element = {<ProtectedRoute component = {MongoDB}/>}/>
          <Route path = "/mysql" element = {<ProtectedRoute component = {MySQL}/>}/>
          <Route path = "/mysql/viewTable/:tableName" element = {<ProtectedRoute component = {ViewSqlTable}/>}/>
          <Route path = "/mongo/viewTable/:documentName" element = {<ProtectedRoute component = {ViewMongoDocument}/>}/>

          {/* ********** Redux Demo ******************* */}
          <Route path = "/test" element = {<ReduxDemo/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
