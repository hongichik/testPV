import { observer } from "mobx-react";
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import authStore from "../mobX/AuthStore";
import { useEffect, useLayoutEffect } from 'react';
import authAPI from '../api/authAPI';
import Cookie from "../utils/cookie";


const Layout = observer(() => {
  const navigate = useNavigate();

  const location = useLocation();
  const allowedURLs = ['/login', '/register', '/passwordReset'];
  useLayoutEffect(() => {
    if (allowedURLs.includes(location.pathname) && authStore.isLogin) {
      navigate('/');
    }
  }, [authStore.isLogin, navigate]);


  const getInfo = async () => {
    if (!Cookie.GetCookie('accessToken') || authStore.isLogin) {
      return;
    }
    const data = await authAPI.info();
    if (data.success) {
      authStore.setUser(data.data);
      authStore.setIsLogin(true);
    }
    else {
      Cookie.RemoveCookie('accessToken');
    }
  }

  const logout = async () => {
    await authAPI.logout();
    authStore.setIsLogin(false);
    Cookie.RemoveCookie('accessToken');
  }
  useEffect(() => {
    getInfo();
  }, [])
  return (
    <div className="w-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to={'/'} className="navbar-brand">Home</Link>

          <button className="navbar-toggler" type="button" aria-expanded="false">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={'/'} className="nav-link active">Category</Link>
              </li>
            </ul>
            <div className="d-flex">


              {!authStore.isLogin ?
                <>
                  <div className="nav-item px-2">
                    <Link to={'/login'} className="nav-link active" >Đăng nhập</Link>
                  </div>
                  <div className="nav-item  px-2">
                    <Link to={'/register'} className="nav-link active">Đăng ký</Link>
                  </div>
                </>
                :
                <>
                  <div className="d-flex">
                    <p className="my-auto pe-4">Họ tên: {authStore.user.name}</p>
                    <p className="my-auto pe-4">Quyền: {authStore.user.role_name}</p>
                    <button onClick={logout} type="button" className="btn btn-primary btn-block">Đăng xuất</button>
                  </div>
                </>
              }

            </div>
          </div>
        </div>
      </nav>
      <div className="mh-100">
        <Outlet />
      </div>
      <footer className="border-top py-3">
        <p className="container">
          Copyright &copy; 2023 All Rights Reserved by pham nguyen hong
        </p>

      </footer>
    </div>
  );
});
export default Layout;