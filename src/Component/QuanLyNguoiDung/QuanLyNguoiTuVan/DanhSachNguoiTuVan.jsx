import React, { Fragment, useEffect, useState } from 'react'
import { Table, Tag, Space, Input } from 'antd';
import axios from 'axios';
import { ACCESS_TOKEN, DOMAIN } from '../../../Utils/Setting';
import { NavLink } from 'react-router-dom';

export default function DanhSachNguoiTuVan() {

    const [listNTV, setlistNTV] = useState([])

    const listConsule = async (value) => {
        await axios({
            url: `${DOMAIN}userManagement/counselors?Email=${value}&FullName=${value}&Phone=${value}&Page=1&Limit=1000`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                setlistNTV(result.data.counselors);

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
                    alert('cập nhật thành công')
                } else {
                    alert('xóa thành công')
                }
                listConsule('')
            })
            .catch((error) => {
                console.log(error);
            })
    }


    let columns = [
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
            key: 'email',
            width: '20%'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '30%'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: '20%'
        },
        {
            title: 'Hoạt động',
            key: 'isActive',
            render: (text, ntv) => (
                <Fragment>
                    {ntv.isActive ? (<p className="text-success">Hoạt động</p>) : (<p className="text-danger">Ngưng hoạt động</p>)}
                </Fragment>
            ),
            width: '20%'
        },
        {
            title: 'Chức năng',
            key: 'action',
            width: '10%',
            render: (text, ntv) => (
                <Fragment>
                    <div className="d-flex" style={{ justifyContent: 'space-around' }}>
                        <NavLink to={"/admin/capNhatNguoiTuVan/" + ntv.id} className="btn btn-outline-primary mr-2">
                            <i className="fa fa-user"></i>
                        </NavLink>
                        {ntv.isActive ? (<button className="btn btn-outline-danger mr-2" onClick={() => {
                            if (window.confirm('Bạn có chắc muốn xóa người này')) {
                                DeleteUser(ntv.id, !ntv.isActive)
                            }
                        }}>
                            <i className="fa fa-trash-alt"></i>
                        </button>) : (
                            <button className="btn btn-outline-success mr-2" onClick={() => {
                                if (window.confirm('Bạn có chắc muốn khôi phục người này')) {
                                    DeleteUser(ntv.id, !ntv.isActive)
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


    useEffect(async () => {
        await listConsule('');
    }, [])

    






    const onSearch = (value) => {
        listConsule(value);
    }
    const { Search } = Input;

    return (
        <div>
            <div>
                <h2 className="text-center">Danh Sách người tư vấn</h2>
            </div>
            <div className="text-right mb-3">
                <Space >
                    <Search placeholder="Tên, email, số điện thoại" onSearch={onSearch} enterButton />
                </Space>
            </div>
            <div>
                <Table columns={columns} dataSource={listNTV} />
            </div>
        </div>
    )
}
