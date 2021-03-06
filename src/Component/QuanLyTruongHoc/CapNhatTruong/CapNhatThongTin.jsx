import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { ACCESS_TOKEN, DOMAIN } from '../../../Utils/Setting'

export default function CapNhatThongTin(props) {

    const { id } = props

    let [school, setschool] = useState()
    const [major, setmajor] = useState([])
    const [admisstion, setadmisstion] = useState([])
    const [address, setaddress] = useState([])
    const getSchool = async () => {
        await axios({
            url: `${DOMAIN}universityManagement/university?Id=${id}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                setschool(result.data.university);
                console.log('admin', result.data.university)
                setmajor(result.data.university.majors)
                setadmisstion(result.data.university.admissions)
                setaddress(result.data.university.addresses)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getSchool('')
    }, [])

    const listUniAPI = async (value) => {
        await axios({
            url: `${DOMAIN}universityManagement`,
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            },
            data: {
                id: id,
                code: value.code,
                name: value.name,
                email: value.email,
                facebook: value.facebook,
                website: value.website,
                description: value.description,
                lastYearBenchmark: value.lastYearBenchmark,
                minFee: value.minFee,
                maxFee: value.maxFee,
                isActive: true,
            }
            
        })
            .then((result) => {
                console.log(result.data.universityId);
                
                //window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: school?.name,
            code: school?.code,
            description: school?.description,
            lastYearBenchmark: school?.lastYearBenchmark,
            minFee: school?.minFee,
            maxFee: school?.maxFee,
            website: school?.website,
            email: school?.email,
            facebook: school?.facebook,
            // images: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required('Kh??ng ???????c b??? tr???ng')
                .min(10, 'T??n tr?????ng qu?? ng???n'),
            code: Yup.string()
                .required('Kh??ng ???????c b??? tr???ng')
                .min(1, 'M?? tr?????ng kh??ng h???p l???'),

            lastYearBenchmark: Yup.string()
                .required('Kh??ng ???????c b??? tr???ng'),
            minFee: Yup.string()
                .required('Kh??ng ???????c b??? tr???ng'),
            maxFee: Yup.string()
                .required('Kh??ng ???????c b??? tr???ng'),
            
            website: Yup.string()
                .required('Kh??ng ???????c b??? tr???ng')
                .matches(/(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, '?????a ch??? trang web n??y kh??ng h???p l???'),
            email: Yup.string()
                .required('Kh??ng ???????c b??? tr???ng')
                .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email kh??ng h???p l???'),
            facebook: Yup.string()
                .required('Kh??ng ???????c b??? tr???ng')
                .matches(/(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/, 'Link Fanpage kh??ng h???p l???'),

        }),
        onSubmit: (values) => {
            console.log('values', values)
            listUniAPI(values)
        }
    })


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div className="form-row" style={{ marginTop: '10px' }}>
                        <div className="form-group col-md-8">
                            <label>T??n tr?????ng</label>
                            <input type="text" className="form-control" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.name && formik.touched.name ?
                                (<div className="text text-danger">{formik.errors.name}</div>) : null}
                        </div>
                        <div className="form-group col-md-4">
                            <label>M?? tr?????ng</label>
                            <input type="text" className="form-control" name="code" value={formik.values.code} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.code && formik.touched.code ?
                                (<div className="text text-danger">{formik.errors.code}</div>) : null}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>M???c h???c ph?? c?? b???n</label>
                            <input type="number" className="form-control" name="minFee" value={formik.values.minFee} min="0" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.minFee && formik.touched.minFee ?
                                (<div className="text text-danger">{formik.errors.minFee}</div>) : null}
                        </div>
                        <div className="form-group col-md-6">
                            <label>M???c h???c ph?? t???i ??a</label>
                            <input type="number" className="form-control" name="maxFee" value={formik.values.maxFee} min="0" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.maxFee && formik.touched.maxFee ?
                                (<div className="text text-danger">{formik.errors.maxFee}</div>) : null}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>??i???m chu???n n??m ngo??i</label>
                        <input type="number" value={formik.values.lastYearBenchmark} className="form-control" name="lastYearBenchmark" min="1" max="32" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.errors.lastYearBenchmark && formik.touched.lastYearBenchmark ?
                            (<div className="text text-danger">{formik.errors.lastYearBenchmark}</div>) : null}
                    </div>
                    <div className="form-group">
                        <label>M?? t???</label>
                        <textarea type="text" className="form-control" name="description" value={formik.values.description} onChange={formik.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Trang ch??? ch??nh th???c</label>
                        <input type="text" style={{ width: '83%' }} className="form-control" name="website" placeholder="Link trang ch???" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.website && formik.touched.website ?
                            (<div className="text text-danger">{formik.errors.website}</div>) : null}
                    </div>
                    <div className="form-group">
                        <label>Email li??n l???c</label>
                        <input type="text" style={{ width: '83%' }} className="form-control" name="email" placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.email && formik.touched.email ?
                            (<div className="text text-danger">{formik.errors.email}</div>) : null}
                    </div>
                    <div className="form-group">
                        <label>Fanpage tr??n Facebook</label>
                        <input type="text" style={{ width: '83%' }} className="form-control" name="facebook" placeholder="Link Fanpage" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.facebook && formik.touched.facebook ?
                            (<div className="text text-danger">{formik.errors.facebook}</div>) : null}
                    </div>

                    <div class="form-group">
                        <label htmlFor=""></label>
                        <button type="submit"
                            className="form-control btn btn-success" >C???p nh???t</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
