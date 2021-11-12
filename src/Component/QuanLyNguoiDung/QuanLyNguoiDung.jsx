import React from 'react'
import { Tabs } from 'antd';
import DanhSachHocSinh from './QuanLyHocSinh/DanhSachHocSinh';
import DanhSachNguoiTuVan from './QuanLyNguoiTuVan/DanhSachNguoiTuVan';
import DanhSachQuanTriVien from './QuanLyQuanTriVien/DanhSachQuanTriVien';

const { TabPane } = Tabs;

function callback(key) {
    // console.log(key);
}

export default function QuanLyNguoiDung() {

    const Demo = () => (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Học sinh" key="1">
                <DanhSachHocSinh />
            </TabPane>
            <TabPane tab="Người tư vấn" key="2">
                <DanhSachNguoiTuVan />
            </TabPane>
            <TabPane tab="Quản trị viên" key="3">
                <DanhSachQuanTriVien />
            </TabPane>
        </Tabs>
    );

    return (
        <div>
            <Demo />
        </div>
    )
}
