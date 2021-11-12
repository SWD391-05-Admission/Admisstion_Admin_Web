import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { ACCESS_TOKEN, DOMAIN } from '../../../Utils/Setting'
import * as Yup from 'yup'
import { Table } from 'antd'
import { Fragment } from 'react'
import { render } from 'react-dom/cjs/react-dom.development'

export default function CapNhatHinh(props) {
    const { id } = props

    let [school, setschool] = useState()
    const [listImage, setlistImage] = useState([])
    const [imageSelected, setimageSelected] = useState('')
    const [imgURL, setimgURL] = useState('')

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
                console.log(result.data.university.images)
                setlistImage(result.data.university.images)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        getSchool()
    }, [])

    const createAPI = async (value) => { //cho rename
        await axios({
            url: `${DOMAIN}uniAddress`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            },
            data: {

                // admissionId: value,
                universityId: id,
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
    const handleChangeFile = async () => {

        const formData = new FormData();
        formData.append('file', imageSelected);
        formData.append('upload_preset', 'zrmkskln');
        console.log(imageSelected)

        await axios.post('https://api.cloudinary.com/v1_1/lamhi1301/upload', formData)
            .then((result) => {
                setimgURL(result.data.secure_url);
                console.log(result.data.secure_url)
                formik.setFieldValue('images', result.data.secure_url)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Hình ảnh',
            key: 'src',
            render: (text, img) => (
                <Fragment>
                    <img src={img.src} alt={img.alt} height="200px" />
                </Fragment>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'alt',
            key: 'alt',
            width: '20%'
        },
        {
            title: 'Chức năng',
            key: 'action',
            width: '10%',
            render: (list) => (
                <button className="btn btn-outline-success mr-2" style={{ justifyContent: 'space-around' }}>
                    <input className="custom-file-input" type="file"></input>
                    Update
                </button>
            )
        }

    ];
    const formik = useFormik({
        initialValues: {
            images: '',
            alt: '',
            isLogo: false
        }, validationSchema: Yup.object().shape({
            image: Yup.string().required('Vui lòng chọn hình ảnh'),
            alt: Yup.string().required('Vui lòng mô tả cho hình ảnh')
        }), onSubmit: (values) => {
            console.log(values)
        }
    })
    return (
        <div>
            
            <div>
                <Table dataSource={listImage} columns={columns} />
            </div>
        </div>
    )
}
