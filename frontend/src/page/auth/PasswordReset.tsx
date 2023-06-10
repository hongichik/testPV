import "../../css/common.scss";
import authAPI from '../../api/authAPI';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

const PasswordReset = observer(() => {
    const navigate = useNavigate();

    const submitFrom = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
        };
        const formData = new FormData();
        formData.append('email', target.email.value);

        authAPI.passwordReset(target.email.value);
        navigate('/passwordResetUpdate', { state: { data: target.email.value } });
    };

    return (
        <div className="bg-white py-5">
            <div className="container d-flex justify-content-center flex-column">

                <h3 className="mx-auto pb-5">Khôi phục mật khẩu</h3>
                <form className="w-500px mx-auto" onSubmit={submitFrom}>
                    <div className="form-outline mb-4">
                        <label className="form-label" >Email</label>
                        <input type="email" name="email" required className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Gửi mã</button>
                </form>
            </div>
        </div>

    );
});

export default PasswordReset;