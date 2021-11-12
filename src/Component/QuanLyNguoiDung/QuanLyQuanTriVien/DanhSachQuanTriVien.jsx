import React, { Fragment, useEffect, useState } from 'react'
import { Table, Tag, Space, Input } from 'antd';
import axios from 'axios';
import { ACCESS_TOKEN, DOMAIN } from '../../../Utils/Setting';
import { NavLink } from 'react-router-dom';

export default function DanhSachQuanTriVien() {

    const [listAdmin, setlistAdmin] = useState([])

    const listAdminAPI = async (value) => {
        await axios({
            url: `${DOMAIN}userManagement/admins?Email=${value}&Page=1&Limit=1000`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                console.log(result);
                setlistAdmin(result.data.admins);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        listAdminAPI('');
    }, [])

    const DeleteUser = async (id, value) => {
        await axios({
            url: `${DOMAIN}/api/managerUser/updateUser`,
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
                    alert('Cập nhật thành công')
                } else {
                    alert('Xóa thành công')
                }
                listAdminAPI('')
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
                        <NavLink to={"/admin/capNhatQuanTriVien/" + ntv.id} className="btn btn-outline-primary mr-2">
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



    const onSearch = (value) => {
        listAdminAPI(value)
    }
    const { Search } = Input;

    return (
        <div>
            <div>
                <h2 className="text-center">Danh Sách quản trị viên</h2>
            </div>
            <div className="text-right mb-3">
                <Space >
                    <Search placeholder="Email" onSearch={onSearch} enterButton />
                </Space>
            </div>
            <div>
                <Table columns={columns} dataSource={listAdmin} />
            </div>
        </div>
    )
}
