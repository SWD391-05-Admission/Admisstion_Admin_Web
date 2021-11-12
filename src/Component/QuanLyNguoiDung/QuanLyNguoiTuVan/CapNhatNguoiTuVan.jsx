import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ACCESS_TOKEN, DOMAIN } from '../../../Utils/Setting';
import { message, Tabs } from 'antd';
export default function CapNhatNguoiTuVan(props) {

    const { TabPane } = Tabs;


    const { id } = props.match.params;
    let [student, setstudent] = useState()

    const getStudent = async () => {
        await axios({
            url: `${DOMAIN}userManagement/counselor?Id=${id}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {

                setstudent(result.data.counselor);
                console.log('counselor', result.data.counselor)


            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getStudent(id)
    }, [])

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
                getStudent('')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="container">
            <h2>Thông tin người tư vấn {student?.fullName}</h2>
            <div className="row">
                <div className="col-4">
                    <div className="avatar text-center mt-4">
                        <img src={student?.avatar} alt="avartar" width="200" height="200" onError={(e) => {
                            e.target.onError = null;
                            e.target.src = `https://lh3.googleusercontent.com/a-/AOh14GiDmAV-nb-j6RqXiDCe5eVUBNIcpW0iie8DnPbY=s96-c`
                        }} />
                    </div>
                </div>
                <div className="col-8">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Thông tin cá nhân" key="1">
                            <div>
                                <div className="row">
                                    <div className="col-5">
                                        Họ và Tên:
                                    </div>
                                    <div className="col-7">
                                        {student?.fullName}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-5">
                                        Email:
                                    </div>
                                    <div className="col-7">
                                        {student?.email}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-5">
                                        Số điện thoại:
                                    </div>
                                    <div className="col-7">
                                        {student?.phone}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-5">
                                        Mô tả:
                                    </div>
                                    <div className="col-7">
                                        {student?.description}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-5">
                                        Trạng thái:
                                    </div>
                                    <div className="col-7">
                                        {student?.isActive ? (<h5 className="text-success">Đang hoạt động</h5>) : (<h5 className="text-danger">Ngừng hoạt động</h5>)}
                                    </div>
                                </div>
                                <hr />
                                <div className="text-right">
                                    {student?.isActive ?
                                        (<button className="btn btn-outline-danger" onClick={() => {
                                            if (window.confirm('bạn có chắc muốn xóa người này')) {
                                                DeleteUser(student.id, !student.isActive)
                                            }
                                        }}>Xóa người dùng</button>) :
                                        (<button className="btn btn-outline-success" onClick={() => {
                                            if (window.confirm('bạn có chắc muốn khôi phục người này')) {
                                                DeleteUser(student.id, !student.isActive)
                                            }
                                        }}>khôi phục người dùng</button>)}
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
