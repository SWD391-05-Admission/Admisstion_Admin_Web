import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { ACCESS_TOKEN, DOMAIN } from '../../Utils/Setting';
import axios from 'axios';

const { TabPane } = Tabs;
export default function ChiTietTruongHoc(props) {


    const { id } = props.match.params;
    let [school, setschool] = useState()
    const [major, setmajor] = useState([])
    const [admisstion, setadmisstion] = useState([])
    const [address, setaddress] = useState([])
    const [listImage, setListImage] = useState([])
    const getStudent = async () => {
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
                setListImage(result.data.university.images)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getStudent(id)
    }, [])

    const renderMajor = () => {
        return major.map((mj, index) => {
            {
                return <div>
                    <div className="row">
                        <div className="col-2">
                            {index + 1}
                        </div>
                        <div className="col-10">
                            {mj.major.name}
                        </div>
                    </div>
                    <hr />
                </div>
            }
        })
    }

    const renderadmissions = () => {
        return admisstion.map((ad, index) => {
            return <div>
                <div className="row">
                    <div className="col-2">
                        {index + 1}
                    </div>
                    <div className="col-4">
                        {ad.admission.method}
                    </div>
                    <div className="col-6">
                        {ad.admission.description}
                    </div>
                </div>
                <hr />
            </div>
        })
    }

    const renderCoso = () => {
        return address.map((address, index) => {
            return <div>
                <div className="row">
                    <div className="col-2">
                        {index + 1}
                    </div>
                    <div className="col-4">
                        {address.address}
                    </div>
                    <div className="col-6">

                        {address.district.name}
                    </div>
                </div>
                <hr />
            </div>
        })
    }
    const renderHinh = () => {
        return listImage.map((image, index) => {
            return <div>
                <div className="" > </div>
            </div>
        })
    }
    return (
        <div className="container">
            <h2>Th??ng tin tr?????ng</h2>
            <div>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Th??ng tin tr?????ng" key="1">
                        <div>
                            <div className="row">
                                <div className="col-4">
                                    <div>
                                        <img width="300" height="400" src={school?.images[0].src} alt="" />
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-6">
                                            <div>
                                                <h5>Th??ng tin</h5>
                                            </div>
                                            <hr />
                                            <div>
                                                M?? tr?????ng : {school?.code}
                                            </div>
                                            <hr />
                                            <div>
                                                T??n tr?????ng: {school?.name}
                                            </div>
                                            <hr />
                                            <div>
                                                ??i???m chu???n n??m tr?????c: {school?.lastYearBenchmark}
                                            </div>
                                            <hr />
                                            <div>
                                                H???c ph?? t???i thi???u: {school?.minFee} VN??
                                            </div>
                                            <hr />
                                            <div>
                                                H???c ph?? t???i ??a: {school?.maxFee} VN??
                                            </div>
                                            <hr />
                                            <div>
                                                M?? t???: {school?.description}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div>
                                                <h5>Li??n h???</h5>
                                            </div>
                                            <hr />
                                            <div>
                                                Email : {school?.email}
                                            </div>
                                            <hr />
                                            <div>
                                                Facebook: <a href="fb.com" target="_blank">{school?.facebook}</a>
                                            </div>
                                            <hr />
                                            <div>
                                                Trang web: <a target="_blank" href={school?.website}>{school?.website}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Th??ng tin ng??nh" key="2">
                        <div>
                            <div className="row">
                                <div className="col-2">
                                    S??? th??? t???
                                </div>
                                <div className="col-10">
                                    T??n ng??nh
                                </div>
                            </div>
                            <hr />
                        </div>
                        {renderMajor()}
                    </TabPane>
                    <TabPane tab="H??nh th???c tuy???n sinh" key="3">
                        <div>
                            <div className="row">
                                <div className="col-2">
                                    S??? th??? t???
                                </div>
                                <div className="col-4">
                                    T??n h??nh th???c
                                </div>
                                <div className="col-6">
                                    M?? t???
                                </div>
                            </div>
                            <hr />
                        </div>
                        {renderadmissions()}
                    </TabPane>
                    <TabPane tab="C?? s???" key="4">
                        <div>
                            <div className="row">
                                <div className="col-2">
                                    S??? th??? t???
                                </div>
                                <div className="col-4">
                                    ?????a ch???
                                </div>
                                <div className="col-6">
                                    Qu???n
                                </div>
                            </div>
                            <hr />
                        </div>
                        {renderCoso()}
                    </TabPane>
                    <TabPane tab="H??nh" key="5">
                        <div>
                            <div className="row">
                                <div className="col-2">
                                    S??? th??? t???
                                </div>
                                <div className="col-4">
                                    ?????a ch???
                                </div>
                                <div className="col-6">
                                    Qu???n
                                </div>
                            </div>
                            <hr />
                        </div>
                        {renderHinh()}
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}
