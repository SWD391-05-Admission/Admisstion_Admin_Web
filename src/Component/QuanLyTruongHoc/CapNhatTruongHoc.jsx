import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import CapNhatThongTin from './CapNhatTruong/CapNhatThongTin';
import CapNhatNganh from './CapNhatTruong/CapNhatNganh';
import CapNhatHinhThucTuyenSinh from './CapNhatTruong/CapNhatHinhThucTuyenSinh';
import CapNhatCoSo from './CapNhatTruong/CapNhatCoSo';
import axios from 'axios';
import { ACCESS_TOKEN, DOMAIN } from '../../Utils/Setting';
import CapNhatHinh from './CapNhatTruong/CapNhatHinh';


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}


export default function CapNhatTruongHoc(props) {

    const { id } = props.match.params;
    return (
        <div className="container">
            <h2>Cập nhật thông tin trường</h2>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Cập nhật thông tin" key="1">
                    <CapNhatThongTin id={id} />
                </TabPane>
                <TabPane tab="Cập nhật ngành" key="2">
                    <CapNhatNganh id={id} />
                </TabPane>
                <TabPane tab="Cập nhật hình thức tuyển sinh" key="3">
                    <CapNhatHinhThucTuyenSinh id={id} />
                </TabPane>
                <TabPane tab="Cập nhật cơ sở" key="4">
                    <CapNhatCoSo id={id} />
                </TabPane>
                <TabPane tab="Cập nhật hình" key="5">
                    <CapNhatHinh id={id} />
                </TabPane>
            </Tabs>
        </div>
    )
}
