import React, { Fragment, useEffect, useState } from 'react'
import { message, Table, Tabs } from 'antd';
import axios from 'axios';
import { ACCESS_TOKEN, DOMAIN } from '../../Utils/Setting';
import moment from 'moment';
import { NavLink } from 'react-router-dom';


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

export default function DanhSachTalkShow() {

    // const [listTalkShowWaiting, setListTalkShowWaiting] = useState();
    // const [listCancel, setListCancel] = useState()
    // const [listApproved, setListApproved] = useState()
    // const [listFinsh, setListFinsh] = useState()

    const [listWaiting, setlistWaiting] = useState();
    const [listApprove, setlistApprove] = useState();
    const [listUnApprove, setlistUnApprove] = useState();
    const [listCancel, setListCancel] = useState();
    const [listComplete, setListComplete] = useState();

    const getListWaiting = async () => {
        await axios({
            url: `${DOMAIN}approvalManagement/waitingApproveTalkshows`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                console.log('waiting',result.data.talkshows);
                setlistWaiting(result.data.talkshows)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getListApprove = async () => {
        await axios({
            url: `${DOMAIN}approvalManagement/approvedTalkshows` ,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                console.log('approve    ',result.data.talkshows);
                setlistApprove(result.data.talkshows)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const getListUnApprove = async () => {
        await axios({
            url: `${DOMAIN}approvalManagement/unapprovedTalkshows` ,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                console.log('unapprove',result.data.talkshows);
                setlistUnApprove(result.data.talkshows)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const getListCancel = async () => {
        await axios({
            url: `${DOMAIN}approvalManagement/canceledTalkshows` ,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                console.log('cancel',result.data.talkshows);
                setListCancel(result.data.talkshows)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const getListComplete = async () => {
        await axios({
            url: `${DOMAIN}approvalManagement/completedTalkshows` ,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                console.log('complete',result.data.talkshows);
                setListComplete(result.data.talkshows)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //getlistapprved 
    //getlist cancel

    useEffect(() => {
        getListApprove();
        getListWaiting();
        getListUnApprove();
        getListCancel();
        getListComplete();
    }, [])

    const columnsForWaiting = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '2%'
        },
        {
            title: 'H??nh ???nh',
            key: 'image',
            width: '15%',
            render: (text, talkShow) => (
                <Fragment>
                    <img src={talkShow.image} alt="banner" height="100px" />
                </Fragment>
            ),
        },
        {
            title: 'Link',
            key: 'description',
            width: '43%',
            render: (text, talkShow) => (
                <Fragment>
                    <a target="_blank" href={talkShow.urlMeet}>{talkShow.urlMeet}</a>
                </Fragment>
            ),
        },
        {
            title: 'Ng??y b???t ?????u',
            key: 'description',
            render: (text, talkShow) => (
                <Fragment>
                    {moment(talkShow.startDate).format('DD/MM/YYYY')}
                </Fragment>
            ),
        },
        {
            title: 'Ph?? mi???ng d??a',
            key: 'description',
            render: (text, talkShow) => (
                <Fragment>
                    {talkShow.price}
                </Fragment>
            ),
        },
        {
            title: 'Chi ti???t',
            key: 'action',
            width: '10%',
            render: (text, talkShow) => (
                <Fragment>
                    <div className="d-flex" style={{ justifyContent: 'space-around' }}>
                        <NavLink to={"/admin/chiTietTalkShow/" + talkShow.id} className="btn btn-outline-primary mr-2">
                            <i className="fa fa-info ml-1 mr-1"></i>
                        </NavLink>
                    </div>
                </Fragment>
            ),
        },
        {
            title: 'Duy???t b??i',
            key: 'chucNang',
            render: (text, talkShow) => (
                <Fragment>
                    <div className="d-flex" style={{ justifyContent: 'space-around' }}>
                        {/* {talkShow.isTalkShow ? (<button className="btn btn-outline-danger mr-2" onClick={() => { //ko hieu cho isBanner
                            if (window.confirm('B???n c?? ch???c mu???n h???y bu???i t?? v???n n??y')) {
                                CancelTalkShow(talkShow.id)
                            }
                        }}>
                            <i class="fa fa-trash-alt"></i>
                        </button>) : (
                            <button className="btn btn-outline-success mr-2" onClick={() => {
                                if (window.confirm('B???n c?? ch???c ch???p nh???n bu???i t?? v???n n??y')) {
                                    ApprovedTalkShow(talkShow.id)
                                }
                            }}>
                                <i class="fa fa-recycle"></i>
                            </button>
                        )} */}
                        <button className="btn btn-outline-success mr-2" onClick={() => {
                            if (window.confirm('B???n duy???t bu???i t?? v???n n??y')) {
                                ApprovedTalkShow(talkShow.id)
                            }
                        }}>
                            <i class="fa fa-check"></i>
                        </button>
                        {/* <button className="btn btn-outline-danger mr-2" onClick={() => {
                            if (window.confirm('B???n c?? ch???c h???y bu???i t?? v???n n??y')) {
                               //CancelTalkShow(talkShow.id)
                            }
                        }}>
                            <i class="fa fa-trash-alt"></i>
                        </button> */}
                    </div>
                </Fragment>
            ),
        }
    ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '2%'
        },
        {
            title: 'H??nh ???nh',
            key: 'image',
            width: '15%',
            render: (text, talkShow) => (
                <Fragment>
                    <img src={talkShow.image} alt="banner" height="100px" />
                </Fragment>
            ),
        },
        {
            title: 'Link',
            key: 'description',
            width: '43%',
            render: (text, talkShow) => (
                <Fragment>
                    <a target="_blank" href={talkShow.urlMeet}>{talkShow.urlMeet}</a>
                </Fragment>
            ),
        },
        {
            title: 'Ng??y b???t ?????u',
            key: 'description',
            render: (text, talkShow) => (
                <Fragment>
                    {moment(talkShow.startDate).format('DD/MM/YYYY')}
                </Fragment>
            ),
        },
        {
            title: 'Ph?? mi???ng d??a',
            key: 'description',
            render: (text, talkShow) => (
                <Fragment>
                    {talkShow.price}
                </Fragment>
            ),
        },
        {
            title: 'Chi ti???t',
            key: 'action',
            width: '10%',
            render: (text, talkShow) => (
                <Fragment>
                    <div className="d-flex" style={{ justifyContent: 'space-around' }}>
                        <NavLink to={"/admin/chiTietTalkShow/" + talkShow.id} className="btn btn-outline-primary mr-2">
                            <i className="fa fa-info ml-1 mr-1"></i>
                        </NavLink>
                    </div>
                </Fragment>
            ),
        }
    ];

    const ApprovedTalkShow = async (id) => {
        await axios({
            url: `${DOMAIN}approvalManagement`,
            method: 'PUT',
            data: {
                "id": id,
                "isApprove":  true
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => { 
                console.log(result);
                message.success('Duy???t th??nh c??ng')
                getListWaiting();
                getListApprove();
            })
            .catch((error) => {
                console.log(error);
            })
    }
    

    // const ApprovedTalkShow = async (id) => {
    //     await axios({
    //         url: `${DOMAIN}/api/bannerManagermentController/showBanner`,
    //         method: 'PUT',
    //         data: {
    //             "id": id
    //         },
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    //         }
    //     })
    //         .then((result) => {

    //             console.log(result);
    //             message.success('C???p nh???t th??nh c??ng')
    //             getListbannerShow();
    //             getListbannerNotShow();
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    return (
        <div>
            <h2 className="text-center">Danh s??ch bu???i t?? v???n</h2>
            <Tabs defaultActiveKey="1" onChange={callback}>
                
                {/* <TabPane tab="Ch????ng tr??nh tr?? chuy???n ???? ch???p nh???n" key="2">
                    <Table dataSource={listApproved} columns={columns} />
                </TabPane> */}
                <TabPane tab="Bu???i t?? v???n ??ang ch??? duy???t" key="1">
                    <Table dataSource={listWaiting} columns={columnsForWaiting} />
                </TabPane>
                {/* <TabPane tab="Ch????ng tr??nh tr?? chuy???n ???? ho??n th??nh" key="4">
                    <Table dataSource={listFinsh} columns={columns} />
                </TabPane> */}
                <TabPane tab="Bu???i t?? v???n ???? duy???t" key="2">
                    <Table dataSource={listApprove} columns={columns} />
                </TabPane>
                <TabPane tab="Bu???i t?? v???n kh??ng ???????c duy???t" key="3">
                    <Table dataSource={listUnApprove} columns={columns} />
                </TabPane>
                <TabPane tab="Bu???i t?? v???n ???? b??? h???y" key="4">
                    <Table dataSource={listCancel} columns={columns} />
                </TabPane>
                <TabPane tab="Bu???i t?? v???n ???? ho??n th??nh" key="5">
                    <Table dataSource={listComplete} columns={columns} />
                </TabPane>
            </Tabs>

        </div>
    )
}
