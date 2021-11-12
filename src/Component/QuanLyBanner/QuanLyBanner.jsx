import React, { Fragment, useEffect, useState } from 'react'
import { message, Table, Tabs } from 'antd';
import axios from 'axios';
import { ACCESS_TOKEN, DOMAIN } from '../../Utils/Setting';
import moment from 'moment';


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

export default function QuanLyBanner() {

    const [listBanner, setlistBanner] = useState();
    const [listNotShow, setlistNotShow] = useState()

    const getListbannerShow = async () => {
        await axios({
            url: `${DOMAIN}bannerManagerment/unshownBanners?Page=1&Limit=1000`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                console.log(result.data.banners);
                setlistBanner(result.data.banners)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getListbannerNotShow = async () => {
        await axios({
            url: `${DOMAIN}bannerManagerment/shownBanners?Page=1&Limit=1000`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                console.log(result.data);
                setlistNotShow(result.data.banners)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getListbannerNotShow();
        getListbannerShow();
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Hình ảnh',
            key: 'image',
            render: (text, banner) => (
                <Fragment>
                    <img src={banner.image} alt="banner" height="100px" />
                </Fragment>
            ),
        },
        {
            title: 'Người tạo',
            key: 'description',
            render: (text, banner) => (
                <Fragment>
                    {banner.counselor.fullName}
                </Fragment>
            ),
        },
        {
            title: 'Ngày tạo',
            key: 'description',
            render: (text, banner) => (
                <Fragment>
                    {moment(banner.createdDate).format('DD/MM/YYYY')}
                </Fragment>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },

        {
            title: 'Chức năng',
            key: 'chucNang',
            render: (text, banner) => (
                <Fragment>
                    <div className="d-flex" style={{ justifyContent: 'space-around' }}>
                        {banner.isBanner ? (<button className="btn btn-outline-danger mr-2" onClick={() => {
                            if (window.confirm('Bạn có chắc muốn xóa áp phích này')) {
                                DeleteBanner(banner.id)
                            }
                        }}>
                            <i class="fa fa-trash-alt"></i>
                        </button>) : (
                            <button className="btn btn-outline-success mr-2" onClick={() => {
                                if (window.confirm('Bạn có chắc muốn khôi phục áp phích này')) {
                                    RecycleBanner(banner.id)
                                }
                            }}>
                                <i class="fa fa-recycle"></i>
                            </button>
                        )}
                    </div>
                </Fragment>
            ),
        }
    ];

    const DeleteBanner = async (id) => {
        await axios({
            url: `${DOMAIN}/api/bannerManagermentController/removeBanner`,
            method: 'PUT',
            data: {
                "id": id
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {

                console.log(result);
                message.error('Xóa thành công')
                getListbannerNotShow();
                getListbannerShow();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const RecycleBanner = async (id) => {
        await axios({
            url: `${DOMAIN}/api/bannerManagermentController/showBanner`,
            method: 'PUT',
            data: {
                "id": id
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {

                console.log(result);
                message.success('Cập nhật thành công')
                getListbannerNotShow();
                getListbannerShow();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <h2 className="text-center">Danh sách áp phích</h2>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Áp phích đang được trình chiếu" key="1">
                    <Table dataSource={listNotShow} columns={columns} />
                </TabPane>
                <TabPane tab="Áp phích không được trình chiếu" key="2">
                    <Table dataSource={listBanner} columns={columns} />
                </TabPane>
            </Tabs>
            
        </div>
    )
}