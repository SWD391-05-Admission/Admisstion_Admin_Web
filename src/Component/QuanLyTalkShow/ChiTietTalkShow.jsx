import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { ACCESS_TOKEN, DOMAIN } from '../../Utils/Setting';
import axios from 'axios';
import moment from 'moment';


export default function ChiTietTruongHoc(props) {


    const { id } = props.match.params;
    let [talkShow, setTalkShow] = useState()

    const getTalkShow = async () => {
        await axios({
            url: `${DOMAIN}approvalManagement/talkshow?Id=${id}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {

                setTalkShow(result.data.talkshow);
                console.log('admin', result.data.talkshow)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getTalkShow(id)
    }, [])


    return (
        <div className="container">
            <h2>Thông tin buổi tư vấn</h2>
            <div>

                <div>
                    <div className="row">
                        <div className="col-6">
                            <div>
                                <img width="400px" height="400px" src={talkShow?.image} alt="" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <div>
                                        <h5>Thông tin</h5>
                                    </div>
                                    <hr />
                                    <div>
                                        Mã buổi tư vấn : {talkShow?.id}
                                    </div>
                                    <hr />
                                    <div>
                                        Ngày tạo: {moment(talkShow?.createdDate).format('DD/MM/YYYY')}
                                    </div>
                                    <hr />
                                    <div>
                                        Ngày bắt đầu: {moment(talkShow?.startDate).format('DD/MM/YYYY')}
                                    </div>
                                    <hr />
                                    <div>
                                        Link: <a href= {talkShow?.urlMeet}>{talkShow?.urlMeet}  </a>

                                    </div>
                                    <hr />
                                    <div>
                                        Phí miếng dưa: {talkShow?.price}
                                    </div>
                                    <hr />
                                    <div>
                                        Mô tả: {talkShow?.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
