import React, { useEffect, useState } from 'react'
import { Table  } from 'antd';
import axios from 'axios';
import { ACCESS_TOKEN, DOMAIN } from '../../Utils/Setting';

export default function DanhSachTruongCu() {

    const [listOldSchool, setlistOldSchool] = useState()

    const listOldAPI = async () => {
        await axios({
            url: `${DOMAIN}oldSchool/oldSchools`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            }
        })
            .then((result) => {
                console.log(result.data.oldSchools);
                setlistOldSchool(result.data.oldSchools)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
       listOldAPI()
    }, [])



    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },
        {
            title: 'Tên trường',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
          },
        
      ];
      
    return (
        <div>
            <h2 className="text-center">Danh sách trường cấp 3</h2>
            <Table columns={columns} dataSource={listOldSchool} />
        </div>
    )
}