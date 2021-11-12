import React from 'react'
import { Tabs } from 'antd';
import ThemHocSinh from './QuanLyHocSinh/ThemHocSinh';
import ThemNguoiTuVan from './QuanLyNguoiTuVan/ThemNguoiTuVan';
import ThemQuanTriVien from './QuanLyQuanTriVien/ThemQuanTriVien';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

export default function ThemNguoiDung() {
    const Demo = () => (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Học sinh" key="1">
                <ThemHocSinh />
            </TabPane>
            <TabPane tab="Người tư vấn" key="2">
                <ThemNguoiTuVan />
            </TabPane>
            <TabPane tab="Quản trị viên" key="3">
                <ThemQuanTriVien />
            </TabPane>
        </Tabs>
    );
    return (
        <div>
            <Demo />
        </div>
    )
}
