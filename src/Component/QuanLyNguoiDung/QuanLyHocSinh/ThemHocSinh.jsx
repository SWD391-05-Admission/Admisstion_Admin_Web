import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { ACCESS_TOKEN, DOMAIN } from '../../../Utils/Setting';
import * as Yup from 'yup'
import { DatePicker, Switch } from 'antd';
import moment from 'moment';
export default function ThemHocSinh(props) {



    let [student, setstudent] = useState()



    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: student?.fullName,
            email: student?.email,
            address: student?.address,
            oldSchool: student?.oldSchool,
            phone: student?.phone,
            dob: student?.dob,
            isActive: student?.isActive,
            avatar: student?.avatar,
        },
        validationSchema: Yup.object().shape({

        }),
        onSubmit: (value) => {
            console.log(value)
        }
    })

    function onChangeActive(checked) {
        formik.setFieldValue('isActive', checked)
        console.log(checked)
    }
    const handleChangeDatePicker = (value) => {
        console.log('1', value);
        let formatDate = moment(value).format('DD/MM/YYYY');
        console.log('2', formatDate);

        formik.setFieldValue('dob', formatDate)
        console.log('3', formik.values.dob);
    }

    return (
        <div className="container">
            <h2 className="text-center">Thêm học sinh</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="border p-5">
                    
                    <div class="form-group">
                        <label for="">Họ và tên</label>
                        <input onChange={formik.handleChange} type="text"
                            class="form-control" name="fullName" id="" aria-describedby="helpId" value={formik.values.fullName} />
                    </div>
                    <div class="form-group">
                        <label for="">Email</label>
                        <input onChange={formik.handleChange} type="text"
                            class="form-control" name="email" id="" aria-describedby="helpId" value={formik.values.email} />
                    </div>
                    <div class="form-group">
                        <label for="">Địa chỉ</label>
                        <input onChange={formik.handleChange} type="text"
                            class="form-control" name="address" id="" aria-describedby="helpId" value={formik.values.address} />
                    </div>
                    <div class="form-group">
                        <label for="">Trường cấp 3</label>
                        <input onChange={formik.handleChange} type="text"
                            class="form-control" name="oldSchool" id="" aria-describedby="helpId" value={formik.values.oldSchool} />
                    </div>
                    <div class="form-group">
                        <label for="">Số điện thoại</label>
                        <input onChange={formik.handleChange} type="text"
                            class="form-control" name="phone" id="" aria-describedby="helpId" value={formik.values.phone} />
                    </div>
                    <div className="form-group">
                        <label className="mr-3" htmlFor="">Ngày sinh</label>
                        <DatePicker format="DD/MM/YYYY" defaultValue={moment(formik.values.ngayKhoiChieu)} onChange={handleChangeDatePicker} />
                    </div>
                    <div className="form-group">
                        <label className="mr-3" htmlFor="">Hoạt động:</label>
                        <Switch defaultChecked onChange={onChangeActive} />
                    </div>
                    <div className="form-group">
                        <label className="mr-3" htmlFor="">Avatar:</label>
                        <input type="file" />
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-outline-success">Thêm học sinh</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
