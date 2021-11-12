import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { ACCESS_TOKEN, DOMAIN } from '../../Utils/Setting';
import { history } from '../../App';

export default function ThemTruonghoc() {

    const [listdistrict, setlistdistrict] = useState([])
    const [listMajor, setlistMajor] = useState([])
    const [listPT, setlistPT] = useState([])
    const [AddressIndex, setAddressIndex] = useState(1);
    const [imageSelected, setimageSelected] = useState('')
    const [imgURL, setimgURL] = useState('')


    const listUniAPI = async (value) => {
        await axios({
            url: `${DOMAIN}universityManagement`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            },
            data: value
        })
            .then((result) => {
                console.log(result.data.universityId);
                history.push(`/admin/capNhatTruongHoc/${result.data.universityId}`) //chuyen tduong link
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const formik = useFormik({
        initialValues: {
            code: '',
            name: '',
            email: '',
            facebook: '',
            website: '',
            description: '',
            lastYearBenchmark: '',
            minFee: '',
            maxFee: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required('Không được bỏ trống')
                .min(10, 'Tên trường quá ngắn'),
            code: Yup.string()
                .required('Không được bỏ trống')
                .min(1, 'Mã trường không hợp lệ'),
            lastYearBenchmark: Yup.string()
                .required('Không được bỏ trống'),
            minFee: Yup.string()
                .required('Không được bỏ trống'),
            maxFee: Yup.string()
                .required('Không được bỏ trống'),
            website: Yup.string()
                .required('Không được bỏ trống')
                .matches(/(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, 'Địa chỉ trang web này không hợp lệ'),
            email: Yup.string()
                .required('Không được bỏ trống')
                .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email không hợp lệ'),
            facebook: Yup.string()
                .required('Không được bỏ trống')
                .matches(/(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/, 'Link Fanpage không hợp lệ'),
        }),
        onSubmit: (values) => {
            console.log('values sd', values)
            listUniAPI(values);
        }
    })
    return (
        <div className="container" >
            <h1 style={{ textAlign: 'center' }}>Thêm trường học mới</h1>
            <form onSubmitCapture={formik.handleSubmit} style={{ margin: '10px 50px' }}>
                <h3 className="title" style={{ margin: '20px 0' }}>Thông tin trường</h3>
                <div className="form-row" style={{ marginTop: '10px' }}>
                    <div className="form-group col-md-7">
                        <label>Tên trường</label>
                        <input type="text" className="form-control" name="name" placeholder="Tên Trường" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.name && formik.touched.name ?
                            (<div className="text text-danger">{formik.errors.name}</div>) : null}
                    </div>
                    <div className="form-group col-md-3">
                        <label>Mã trường</label>
                        <input type="text" className="form-control" name="code" placeholder="Mã trường" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.code && formik.touched.code ?
                            (<div className="text text-danger">{formik.errors.code}</div>) : null}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label>Mức học phí cơ bản</label>
                        <input type="number" className="form-control" name="minFee" placeholder="" min="0" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.minFee && formik.touched.minFee ?
                            (<div className="text text-danger">{formik.errors.minFee}</div>) : null}
                    </div>
                    <div className="form-group col-md-5">
                        <label>Mức học phí tối đa</label>
                        <input type="number" className="form-control" name="maxFee" placeholder="" min="0" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.maxFee && formik.touched.maxFee ?
                            (<div className="text text-danger">{formik.errors.maxFee}</div>) : null}
                    </div>
                </div>
                <div className="form-group">
                    <label>Mô tả</label>
                    <textarea type="text" className="form-control" style={{ width: '83%' }} name="description" placeholder="Mô tả" onChange={formik.handleChange} />
                </div>
                <h3 className="tilte" style={{ margin: '20px 0' }}>Thông tin tuyển sinh</h3>
                {/* <div className="form-group">
                    {renderPT()}
                </div> */}
                <div className="form-group">
                    <label>Điểm chuẩn năm ngoái</label>
                    <input type="number" style={{ width: '83%' }} className="form-control" name="lastYearBenchmark" min="1" max="32" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.lastYearBenchmark && formik.touched.lastYearBenchmark ?
                        (<div className="text text-danger">{formik.errors.lastYearBenchmark}</div>) : null}
                </div>
                <h3 className="title" style={{ margin: '20px 0', width: '83%' }}>Thông tin liên lạc</h3>
                {/* <div className="form-group">
                    <label>Số điện thoại</label>
                    <input type="text" style={{ width: '83%' }} className="form-control" name="sdt" placeholder="Số điện thoại" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.sdt && formik.touched.sdt ?
                        (<div className="text text-danger">{formik.errors.sdt}</div>) : null}
                </div> */}
                <div className="form-group">
                    <label>Trang chủ chính thức</label>
                    <input type="text" style={{ width: '83%' }} className="form-control" name="website" placeholder="Link trang chủ" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.website && formik.touched.website ?
                        (<div className="text text-danger">{formik.errors.website}</div>) : null}
                </div>
                <div className="form-group">
                    <label>Email liên lạc</label>
                    <input type="text" style={{ width: '83%' }} className="form-control" name="email" placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.email && formik.touched.email ?
                        (<div className="text text-danger">{formik.errors.email}</div>) : null}
                </div>
                <div className="form-group">
                    <label>Fanpage trên Facebook</label>
                    <input type="text" style={{ width: '83%' }} className="form-control" name="facebook" placeholder="Link Fanpage" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.facebook && formik.touched.facebook ?
                        (<div className="text text-danger">{formik.errors.facebook}</div>) : null}
                </div>
                {/* <label>Chuyên ngành</label> */}
                {/* <div className="table-container">
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-bordered" style={{ width: '83%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Chuyên ngành</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderMajor()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}
                {/* <div>
                    <input type="file" name="images" id="images" onChange={(e) => {
                        setimageSelected(e.target.files[0])
                    }}
                        accept="image/png, image/jpeg, image/gif, image/jpg" />
                    <button className="btn btn-success" onClick={() => {
                        handleChangeFile()
                    }}>upload</button>
                    <img className="ml-5 mb-5" src={imgURL} alt="..." />
                </div> */}
                <div className="text-center">
                    <button className="btn btn-outline-success" type="submit">Thêm trường</button>
                </div>
            </form>
        </div>
    )
}