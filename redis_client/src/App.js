import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ProtectedRoute, LoginSignupProtectedRoute } from './utils/ProtectedRoutes'
import ReduxDemo from './ReduxDemo'
import MySQL from './pages/MySQL'
import PgSql from './pages/PgSql'
import MongoDB from './pages/MongoDB'
import Navbar from './components/Navbar'
import ViewSqlTable from './pages/ViewSqlTable'
import ViewMongoDocument from './pages/ViewMongoDocument'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ViewPgSqlTable from './pages/ViewPgSqlTable'
import Features from './pages/Features'
import AllChannels from './components/AllChannels'
import CreateChannel from './components/CreateChannel'
import Subscribe from './components/Subscribe'
import Publish from './components/Publish'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <ToastContainer />
      <Routes>
          <Route path = "/login" element = {<LoginSignupProtectedRoute component = {Login}/>}/>
          <Route path = "/signup" element = {<LoginSignupProtectedRoute component = {Signup}/>}/>
          <Route path = "/" element = {<ProtectedRoute component = {Home}/>}/>
          <Route path = "/mongo" element = {<ProtectedRoute component = {MongoDB}/>}/>
          <Route path = "/mysql" element = {<ProtectedRoute component = {MySQL}/>}/>
          <Route path = "/pgsql" element = {<ProtectedRoute component = {PgSql}/>}/>
          <Route path = "/features" element = {<ProtectedRoute component = {Features}/>}/>
          <Route path = "/allChannels" element = {<ProtectedRoute component = {AllChannels}/>}/>
          <Route path = "/createChannel" element = {<ProtectedRoute component = {CreateChannel}/>}/>
          <Route path = "/publish" element = {<ProtectedRoute component = {Publish}/>}/>
          <Route path = "/subscribe" element = {<ProtectedRoute component = {Subscribe}/>}/>
          <Route path = "/mysql/viewTable/:tableName" element = {<ProtectedRoute component = {ViewSqlTable}/>}/>
          <Route path = "/pgsql/viewTable/:tableName" element = {<ProtectedRoute component = {ViewPgSqlTable}/>}/>
          <Route path = "/mongo/viewTable/:documentName" element = {<ProtectedRoute component = {ViewMongoDocument}/>}/>

          {/* ********** Redux Demo ******************* */}
          <Route path = "/test" element = {<ReduxDemo/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
