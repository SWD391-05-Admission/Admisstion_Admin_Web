import React, { Fragment, useEffect, useState } from 'react'
import { Table, Space, Input } from 'antd';
import axios from 'axios';
import { ACCESS_TOKEN, DOMAIN } from '../../Utils/Setting';
import { NavLink } from 'react-router-dom';

export default function DanhSachTruongHoc() {


    const [listUni, setlistUni] = useState([])

    
    const listUniAPI = async (value) => {
        await axios({
            url: `${DOMAIN}universityManagement/universities?Page=1&Limit=100`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                console.log(result.data.admins);
                setlistUni(result.data.admins)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        listUniAPI('')
    }, [])


    const columns = [
        {
            title: 'Mã trường',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Tên trường',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Điểm năm trước',
            dataIndex: 'lastYearBenchmark',
            key: 'lastYearBenchmark',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
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
                        <NavLink to={"/admin/capNhatTruongHoc/" + ntv.id} className="btn btn-outline-warning mr-2">
                            <i className="fa fa-wrench"></i>
                        </NavLink>
                        <NavLink to={"/admin/chiTietTruongHoc/" + ntv.id} className="btn btn-outline-primary mr-2">
                            <i className="fa fa-info ml-1 mr-1"></i>
                        </NavLink>
                    </div>
                </Fragment>
            ),
        },
    ];


    const onSearch = (value) => {
        console.log(value);
    }
    const { Search } = Input;

    return (
        <div>
            <div>
                <h2 className="text-center">Danh Sách trường học</h2>
            </div>
            <div className="text-right mb-3">
                <Space >
                    <Search placeholder="Tìm kiếm" onSearch={onSearch} enterButton />
                    <NavLink to="/admin/themTruongHoc" className="btn btn-success">Thêm trường học</NavLink>
                </Space>
            </div>
            <div>
                <Table columns={columns} dataSource={listUni} />
            </div>
        </div>
    )
}
