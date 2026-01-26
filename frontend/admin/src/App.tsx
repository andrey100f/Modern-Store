import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar, Sidebar } from "./components";
import {Ecommerce, Orders } from "./pages";

import { useStateContext } from './contexts/ContextProvider';``

import './App.css'

function App() {
  const { activeMenu } = useStateContext();

  return (
    <div>
      <BrowserRouter>
        <div className="flex relative">
          { activeMenu ? (
            <div className="w-72 fixed sidebar bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0">
              <Sidebar />
            </div>
          )}
          <div className={
            `bg-main-bg min-h-screen w-full ${activeMenu ? "md:ml-72" : "flex-2"}`
          }>
            <div className="fixed md:static bg-main-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              <Routes>
                <Route path="/" element={ <Ecommerce /> } />
                <Route path="/ecommerce" element={ <Ecommerce /> } />

                <Route path="/orders" element={ <Orders /> } />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
