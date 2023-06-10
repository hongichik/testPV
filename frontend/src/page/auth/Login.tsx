import { Link } from "react-router-dom";
import "../../css/common.scss";
import authAPI from '../../api/authAPI';
import Cookie from "../../utils/cookie";
import authStore from "../../mobX/AuthStore";
import { observer } from 'mobx-react';
import SweetAlert from "../../utils/sweetalert";

const Login = observer(() => {
    const currentPath = window.location.pathname;



    const submitFrom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };
        const formData = new FormData();
        formData.append('email', target.email.value);
        formData.append('password', target.password.value);

        const data = await authAPI.login(formData);

        if (data.success) {
            Cookie.SetCookie('accessToken', data.data.token);
            authStore.setUser(data.data.data);
            authStore.setIsLogin(true);
            console.log(data.data.data);
        }
        else {
            SweetAlert.AlertError("Thông báo", data.message)
        }

    };

    return (
        <div className="bg-white py-5">
            <div className="container d-flex justify-content-center flex-column">

                <div className="d-flex w-100 justify-content-center btn-a">
                    <Link to={'/login'} className={`fs-25 mb-5 ${currentPath === '/login' ? 'active' : ''}`}>Đăng nhập</Link>
                    <Link to={'/register'} className={`fs-25 mb-5 ${currentPath === '/register' ? 'active' : ''}`}>Đăng ký</Link>
                </div>
                <form className="w-500px mx-auto" onSubmit={submitFrom}>
                    <div className="form-outline mb-4">
                        <label className="form-label" >Email</label>
                        <input type="email" name="email" required className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" required className="form-control" />
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <Link to={"/passwordReset"}>Quên mật khẩu</Link>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Đăng nhập</button>

                </form>
            </div>

        </div>

    );
});

export default Login;