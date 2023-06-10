import "../../css/common.scss";
import authAPI from '../../api/authAPI';
import { observer } from 'mobx-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SweetAlert from '../../utils/sweetalert';

const PasswordResetUpdate = observer(() => {
    const location = useLocation();
    const dataFromLocation = location.state?.data;
    const navigate = useNavigate();
    const submitFrom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            token: { value: string };
            password: { value: string };
            password_confirmation: { value: string };
        };
        const formData = new FormData();
        if (dataFromLocation !== undefined) {
            formData.append('email', dataFromLocation);
          }
        formData.append('token', target.token.value);
        formData.append('password', target.password.value);
        formData.append('password_confirmation', target.password_confirmation.value);

        const data = await authAPI.passwordResetUpdate(formData);
        if(data.success)
        {
            SweetAlert.AlertSuccess("Thông báo","Đổi mật khẩu thành công");
            navigate('/login');
        }
        else
        {
            SweetAlert.AlertSuccess("Thông báo","Đổi mật khẩu thất bại");
            navigate('/login');
        }

    };

    useEffect(() => {
        if (!dataFromLocation) {
            navigate('/');
        } 
      });
    return (
        <div className="bg-white py-5">
            <div className="container d-flex justify-content-center flex-column">

                <h3 className="mx-auto pb-5">Khôi phục mật khẩu</h3>
                <form className="w-500px mx-auto" onSubmit={submitFrom}>
                    <div className="form-outline mb-4">
                        <label className="form-label">code</label>
                        <input type="text" name="token" required className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" required className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">password confirmation</label>
                        <input type="password" name="password_confirmation" required className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Gửi mã</button>
                </form>
            </div>
        </div>

    );
});

export default PasswordResetUpdate;