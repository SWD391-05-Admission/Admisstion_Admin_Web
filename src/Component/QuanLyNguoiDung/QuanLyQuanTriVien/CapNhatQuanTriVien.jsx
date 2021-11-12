import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ACCESS_TOKEN, DOMAIN } from '../../../Utils/Setting';
import { message, Tabs } from 'antd';
export default function CapNhatQuanTriVien(props) {

    const { TabPane } = Tabs;


    const { id } = props.match.params;
    let [student, setstudent] = useState()

    const getStudent = async () => {
        await axios({
            url: `${DOMAIN}userManagement/admin?Id=${id}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {

                setstudent(result.data.admin);
                console.log('admin', result.data.admin)


            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getStudent(id)
    }, [])

    const DeleteUser = async (id, value) => {
        console.log('oke r ');
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
            <h2>Thông tin quản trị viên {student?.email}</h2>
            <div className="row">
                <div className="col-4">
                    <div className="avatar text-center mt-4">
                        {/* <img src={student?.avatar} alt="avartar" width="200" height="200" onError={(e) => {
                            e.target.onError = null;
                            e.target.src = `https://picsum.photos/200/300`
                        }} /> */}
                        <img src="https://picsum.photos/id/237/200/300" width="200" height="200"  alt="" />
                    </div>
                </div>
                <div className="col-8">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Thông tin cá nhân" key="1">
                            <div>
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
                                        (<button className="btn btn-outline-success" onClick={()=>{
                                            if (window.confirm('bạn có chắc muốn khôi phục người này')) {
                                                DeleteUser(student.id, !student.isActive)
                                            }
                                        }}>Khôi phục người dùng</button>)}
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
