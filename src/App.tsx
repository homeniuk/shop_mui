import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import BasketList from './components/Basket/BasketList';
import GoodSinglePage from './components/GoodComponents/GoodSinglePage';
import GoodsList from './components/GoodComponents/GoodsList';
import Header from './components/Header';
import Menu from './components/Menu/Menu';
import UserFormLogin from './components/UserComponents/UserFormLogin';
import UserFormRegister from './components/UserComponents/UserFormRegister';

const Mainlayout = () => {
  return (
    <div className="grid-container">
      <div className="header">
        <Header />
      </div>
      <div className="menu">
        {<Menu />}
      </div>
      <div className="content">
        <Outlet />
      </div>
      <div className="footer"></div>
    </div>
  );
};


function App() {
  return (
    <Routes>
      <Route path='/'               element={<Mainlayout/>}>
        <Route index                element={<div>MAIN PAGE</div>} />
        <Route path='login'         element={<UserFormLogin />} />
        <Route path='register'      element={<UserFormRegister />} />
        <Route path='basket'        element={<BasketList />} />
        <Route path='armchairs'     element={<GoodsList section='armchairs'/>} />
        <Route path='tables'        element={<GoodsList section='tables'/>} />
        <Route path=":section/:id"  element={<GoodSinglePage/>}/>
        <Route path='*'             element={<div>Page wasn't found</div>} />
      </Route>
    </Routes >
  );
}

export default App;
