import React, { Fragment, useEffect, useState } from 'react'
import { Table, Tag, Space, Input, message } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN, DOMAIN } from '../../../Utils/Setting';

export default function DanhSachHocSinh() {


    const [hocSinh, setHocSinh] = useState([])

    const listStudent = async (value) => {
        await axios({
            url: `${DOMAIN}userManagement/students?Email=${value}&FullName=${value}&Phone=${value}&Page=1&Limit=1000`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                console.log(result.data)
                setHocSinh(result.data.students);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const DeleteUser = async (id, value) => {
        await axios({
            url: `${DOMAIN}userManagement`,
            method: 'PUT',
            data: {
                "id": id,
                "isActive": value
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {

                console.log(result);

                if (value === true) {
                    message.success('Cập nhật thành công')
                } else {
                    message.error('Xóa thành công')
                }
                listStudent('')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        listStudent('');
    }, [])

    const columns = [
        {
            title: 'Avatar',
            key: 'avatar',
            render: (text, nguoi) => (
                <Fragment >
                    <div style={{ height: '50px' }}>
                        <img src={nguoi?.avatar} alt="avartar" width="50" height="50" onError={(e) => {
                            e.target.onError = null;
                            e.target.src = `https://lh3.googleusercontent.com/a-/AOh14GiDmAV-nb-j6RqXiDCe5eVUBNIcpW0iie8DnPbY=s96-c`
                        }} />
                    </div>
                </Fragment>
            ),
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'ten',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Trường cấp 3',
            dataIndex: 'oldSchool',
            key: 'oldSchool',
        },
        {
            title: 'Hoạt động',
            key: 'isActive',
            render: (text, ntv) => (
                <Fragment>
                    {ntv.isActive ? (<p className="text-success">Hoạt động</p>) : (<p className="text-danger">Ngưng hoạt động</p>)}
                </Fragment>
            ),
        },
        {
            title: 'Chức năng',
            key: 'action',
            width: '10%',
            render: (text, nguoi) => (
                <Fragment>
                    <div className="d-flex" style={{ justifyContent: 'space-around' }}>
                        <NavLink to={"/admin/capNhatHocSinh/" + nguoi.id} className="btn btn-outline-primary mr-2">
                            <i className="fa fa-user"></i>
                        </NavLink>
                        {nguoi.isActive ? (<button className="btn btn-outline-danger mr-2" onClick={() => {
                            if (window.confirm('Bạn có chắc muốn xóa người này')) {
                                DeleteUser(nguoi.id, !nguoi.isActive)
                            }
                        }}>
                            <i className="fa fa-trash-alt"></i>
                        </button>) : (
                            <button className="btn btn-outline-success mr-2" onClick={() => {
                                if (window.confirm('Bạn có chắc muốn khôi phục người này')) {
                                    DeleteUser(nguoi.id, !nguoi.isActive)
                                }
                            }}>
                                <i className="fa fa-recycle"></i>
                            </button>
                        )}
                    </div>
                </Fragment>
            ),
        },
    ];



    const onSearch = (value) => {
        listStudent(value)
    }
    const { Search } = Input;

    return (
        <div>
            <div>
                <h2 className="text-center">Danh Sách học sinh</h2>
            </div>
            <div className="text-right mb-3">
                <Space >
                    <Search placeholder="tên, email, số điện thoại" onSearch={onSearch} enterButton />
                </Space>
            </div>
            <div>
                <Table columns={columns} dataSource={hocSinh} />
            </div>
        </div>
    )
}
