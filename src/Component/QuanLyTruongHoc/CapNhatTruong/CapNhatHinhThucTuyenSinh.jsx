import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { history } from '../../../App'
import { ACCESS_TOKEN, DOMAIN } from '../../../Utils/Setting'

export default function CapNhatHinhThucTuyenSinh(props) {

    const { id } = props

    let [school, setschool] = useState()
    const [major, setmajor] = useState([])
    const [admisstions, setadmisstions] = useState([])
    const [address, setaddress] = useState([])
    const [listPT, setlistPT] = useState([])
    //const [newListAdmission, setNewListAdmission] = useState();
    const [loading, setLoading] = useState(false);

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
                setadmisstions(result.data.university.admissions) //admission
                setaddress(result.data.university.addresses)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const getPTAPI = async () => {
        await axios({
            url: `${DOMAIN}admissionForm/admissionForms`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                console.log(result.data.addmissionForms);
                setlistPT(result.data.addmissionForms)

            })
            .catch((error) => {
                console.log(error);
            })
    }
    const createAPI = async (value) => { //cho rename
        await axios({
            url: `${DOMAIN}uniAdmission`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            },
            data: {
                universityId: id,
                admissionId: value
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
            url: `${DOMAIN}uniAdmission`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            },
            data: {
                universityId: id,
                admissionId: value
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
    const renderPT = () => {

        let render = listPT.map((mj, index) => {
            return (<div>
                <div className="row">

                    <div className="col-1">
                        {renderPT2(mj)}
                    </div>
                    <div className="col-1">
                        {index + 1}
                    </div>
                    <div className="col-4">
                        {mj.method}
                    </div>
                    <div className="col-6">
                        {mj.description}
                    </div>

                </div>
                <hr />
            </div>
            )
        })
        return render;
    }
    const renderPT2 = (mj) => {

        if (admisstions.some(adm => adm.admission.id === mj.id)) {
            return (
                <input type="checkbox" onChange={() => handleChangeCheckBox(mj.id, true)} checked />
            )
        } else {
            return (
                <input type="checkbox" onChange={() => handleChangeCheckBox(mj.id, false)} />
            )
        }
    }
    useEffect(() => {
        getSchool('')
        getPTAPI()
    }, [])

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-1">

                    </div>
                    <div className="col-1">
                        Số thứ tự
                    </div>
                    <div className="col-4" style={{ marginLeft: '10px' }}>
                        Tên hình thức
                    </div>
                    <div className="col-5" style={{ marginLeft: '10px' }}>
                        Mô tả
                    </div>
                </div>
                <hr />
            </div>
            {renderPT()}
        </div>
    )
}
