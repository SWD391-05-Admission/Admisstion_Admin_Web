import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import * as Yup from 'yup'
import { ACCESS_TOKEN, DOMAIN } from '../../../Utils/Setting'

export default function CapNhatNganh(props) {

    const { id } = props

    let [school, setschool] = useState()
    const [major, setmajor] = useState([])
    const [admisstion, setadmisstion] = useState([])
    const [address, setaddress] = useState([])
    const [listMajor, setListMajor] = useState([])
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
    const getListMajor = async () => {
        await axios({
            url: `${DOMAIN}major/majors`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                //console.log(result.data.majors);
                setListMajor(result.data.majors);
            })
            .catch((error) => {
                console.log(error);
            })
    }   
    useEffect(() => {
        getSchool('');
        getListMajor();
    }, []);
    const createAPI = async (value) => { //cho rename
        await axios({
            url: `${DOMAIN}uniMajor`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            },
            data: {
                universityId: id,
                majorId: value
            }
        })
            .then((result) => {
                console.log(result.data.universityId);
                getSchool();
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const deleteAPI = async (value) => { //cho rename
        await axios({
            url: `${DOMAIN}uniMajor`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            },
            data: {
                universityId: id,
                majorId: value
            }
        })
            .then((result) => {
                console.log(result.data.universityId);
                getSchool();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleChangeCheckBox = (id, checked) => {
        if (checked) {
            console.log(checked)
            deleteAPI(id)
        } else {
            console.log(checked)
            createAPI(id)
        }
    }
    const renderNganh = () => {

        let render = listMajor.map((mj, index) => {
            console.log('mj', mj)
            return (<div>
                <div className="row">

                    <div className="col-2">
                        {renderCheckbox(mj)}
                    </div>
                    <div className="col-2">
                        {index + 1}
                    </div>
                    <div className="col-8">
                        {mj.name}
                    </div>
                </div>
                <hr />
            </div>
            )
        })
        return render;
    }
    const renderCheckbox = (mj) => {

        if (major.some(adm => adm.major.id === mj.id)) {
            return (
                <input type="checkbox" onChange={() => handleChangeCheckBox(mj.id, true)} checked />
            )
        } else {
            return (
                <input type="checkbox" onChange={() => handleChangeCheckBox(mj.id, false)} />
            )
        }
    }

    const formik = useFormik({
        initialValues: {
            nganh: school?.majors
        },
        validationSchema: Yup.object().shape({
            nganh: Yup.array().min(1, 'Ít nhất phải có 1 hình thức')
        }),
        onSubmit: (values) => {
            console.log('values', values)
        }
    })
    return (
        <div className="container">
            <div>
                <div className="row">
                <div className="col-2">
                        
                    </div>
                    <div className="col-2">
                        Số thứ tự
                    </div>
                    <div className="col-8">
                        Tên ngành
                    </div>
                </div>
                <hr />
            </div>
            {renderNganh()}
        </div>
    )
}
