import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import * as Yup from 'yup'
import { ACCESS_TOKEN, DOMAIN } from '../../../Utils/Setting'

export default function CapNhatCoSo(props) {

    const { id } = props
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [listdistrict, setlistdistrict] = useState([])
    const [AddressIndex, setAddressIndex] = useState(1);
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
                setaddress(result.data.university.addresses)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getdistrictAPI = async () => {
        await axios({
            url: `${DOMAIN}district/districts`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                console.log(result.data.districts);
                setlistdistrict(result.data.districts)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getSchool('')
        getdistrictAPI('')
        console.log('address', address)
        //formik.values.diachi.push({ a: 'd', b: 'b' })
        //console.log(formik.values.diachi)
    }, [])

    let element = [];

    const renderAddress = () => {
        for (let i = 0; i < AddressIndex; i++) {
            element.push(
                <div className="form-row" key={i} >
                    <div className="form-group col-md-8" >
                        <label>Địa chỉ {i + 1}</label>
                        <input type="text" value={address[i]?.address} className="form-control" name={`addresses[${i}]`} />

                    </div>
                    <div className="form-group col-md-4" >
                        <label>Quận</label>
                        <select type="text" className="form-control" name={`district[${i}]`} >
                            <option></option>
                            {listdistrict.map((district, index) => {

                                if (address[i]?.district.id === district.id) {
                                    return <option key={index} selected >{district.name}</option>
                                } else {
                                    return <option key={index} >{district.name}</option>
                                }

                            })}
                        </select>

                    </div>
                </div>)
        }
        return element.map((add, index) => {
            return <div key={index}>
                {add}
            </div>
        })
    }

    const formik = useFormik({
        initialValues: {
            diachi: { address: 'a1', districtId: '1' }
        },
        
        onSubmit: (value) => {
            console.log(value)
        }
    })


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

        formik.handleSubmit()
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>

            <div className="text-right">
                <button className="btn btn-success" onClick={showModal}>Thêm địa chỉ</button>
            </div>
            {renderAddress()}
            <Modal title="Thêm cơ sở mới" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-row" key={address.length + 1} >
                            <div className="form-group col-md-7" >
                                <label>Địa chỉ {address.length + 1}</label>
                                <input type="text" value={address[address.length + 1]?.address} className="form-control" name={`diachi.address`} onChange={formik.handleChange} />
                                
                            </div>
                            <div className="form-group col-md-3" >
                                <label>Quận</label>
                                <select type="text" className="form-control" name={`diachi.districtId`} onChange={formik.handleChange} >
                                    
                                    {listdistrict.map((district, index) => {
                                        return <option key={index} value={district.id} >{district.name}</option>
                                    })}
                                </select>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

