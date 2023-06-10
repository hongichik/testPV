import React, { useState } from 'react';
import '../css/App.css';
import { useEffect, useLayoutEffect } from 'react';
import userAPI from '../api/userAPI';
import Filter from '../type/Filter';
import { User } from '../type/UserType';
import authAPI from '../api/authAPI';
import { useNavigate } from 'react-router-dom';
import SweetAlert from '../utils/sweetalert';
import Swal from 'sweetalert2';


const App = () => {
  const [user, setUser] = useState<User[] | null>(null);
  const [filter, setFilter] = useState<Filter>({ 'page': 1 });
  const [isDetail, setIsDetail] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  const checkPermission = async () => {
    const isList = await authAPI.permission('view_all_user');
    if (!isList.success) {
      navigate('/error');
    }
    const isdetail = await authAPI.permission('view_user');
    isdetail ? setIsDetail(true) : setIsDetail(false);
    const isdelete = await authAPI.permission('delete_user');
    isdelete ? setIsDelete(true) : setIsDelete(false);
    const isupdate = await authAPI.permission('edit_user');
    isupdate ? setIsUpdate(true) : setIsUpdate(false);
  };
  useLayoutEffect(() => {
    checkPermission();
  }, [])
  const getUsers = async () => {
    const data = await userAPI.getUsers(filter);
    if (data) {
      setUser(data.data.data);
    }

  }

  const submitFrom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
      orderBy: { value: string };
    };
    setFilter({ ...filter, search: target.search.value, orderBy: target.orderBy.value });

  };
  const btnNextPage = () => {

    if (filter.page === 1) {
      return;
    }
    setFilter({ ...filter, page: filter.page ? filter.page - 1 : 1 });
  }
  const btnBackPage = () => {
    if (user && user.length < 5) {
      return;
    }
    setFilter({ ...filter, page: filter.page ? filter.page + 1 : 1 });
  }
  useEffect(() => {
    getUsers();
  }, [filter])

  const btnDelete = async (id: number) => {
    const data = await userAPI.deleteUser(id);
    if (data) {
      SweetAlert.AlertSuccess("Thông báo", "Xóa thành công");
      user && setUser(user.filter((user) => user.id !== id));
    }
    else {
      SweetAlert.AlertError("Thông báo", "Xóa thất bại");
    }
  }

  const btnDetail = async (id: number) => {
    const data = await userAPI.getUser(id);
    Swal.fire({
      title: "Thông báo",
      html: `
      Họ và tên: ${data.data.name} <br>
      Email: ${data.data.email} <br>
      Loại tài khoản: ${data.data.role_name} <br>
      `,
      showConfirmButton: true,
    })
    console.log(data);
  }

  const update = async (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
    // console.log(e.target.value);
    // const formData = new FormData();
    // formData.append('role', e.target.value);
    const data = await userAPI.updateUser(e.target.value, id);
    if (data)
    {
      SweetAlert.AlertSuccess("Thông báo", "Sửa thành công");
    }
    else
      SweetAlert.AlertError("Thông báo", "Sửa thất bại");
  }
  return (
    <div className='d-flex container justify-content-center mt-5 flex-column'>
      <h3>Quan lý tài khoản</h3>
      <form className="mx-auto d-flex justify-content-end w-100" onSubmit={submitFrom}>
        <div className="form-outline mb-4 mx-3">
          <label className="form-label" >name</label>
          <input type="text" name="search" className="form-control" />
        </div>
        <div className="form-outline mb-4 mx-3">
          <label className="form-label" >Xắp xếp theo</label>
          <select className="form-select" name='orderBy'>
            <option value="created_at,desc">Tăng dần</option>
            <option value="created_at,asc">Giảm dần</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4 my-auto">Lọc</button>

      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" className='w-75'>Họ và tên</th>
            <th scope="col">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((data: User, index: number) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.name}</td>
              <td className='d-flex'>
                {isDetail && <button type="button" onClick={() => btnDetail(data.id)} className="btn me-1 btn-warning">Chi tiết</button>}
                {isDelete && <button onClick={() => btnDelete(data.id)} type="button" className="me-1 btn btn-danger">Xóa</button>}
                {isUpdate &&
                  <>
                    <div className="form-outline">
                      <select className="form-select" onChange={(e) => update(e, data.id)} defaultValue={data.role_slug}>
                        <option value="Admin">Admin</option>
                        <option value="mod">mod</option>
                        <option value="user">user</option>
                        <option value="guide">guide</option>
                      </select>
                    </div>
                  </>
                }
              </td>
            </tr>
          ))}

        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item mx-3">
            <p className='page-link pointer' onClick={() => btnNextPage()}>
              Trang trước
            </p>
          </li>
          <li className="page-item mx-3">
            <p className='page-link pointer' onClick={() => btnBackPage()}>
              Trang sau
            </p>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default App;


