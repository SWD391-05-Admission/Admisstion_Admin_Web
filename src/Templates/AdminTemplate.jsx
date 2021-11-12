import React, { useState } from 'react'
import { Route, Redirect } from 'react-router';
import { Dropdown, Layout, Menu, message } from 'antd';
import { history } from './../App'
import {
    UserOutlined,
    HomeOutlined,
    UnorderedListOutlined,
    UserAddOutlined,
    FileAddOutlined,
    LogoutOutlined,
    GatewayOutlined
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { ACCESS_TOKEN, USER_LOGIN } from '../Utils/Setting';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminTemplate(props) {

    const [state, setstate] = useState({ costateed: false })

    const onCollapse = collapsed => {
        console.log(collapsed);
        let a = !collapsed
        setstate({ a });
    };
    const onClick = ({ key }) => {
        message.info(`Đăng xuất thành công`);
    };
    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item>
                <a className="text-danger" onClick={() => {
                    if (window.confirm('bạn có chắc muốn đăng xuất')) {
                        localStorage.removeItem(ACCESS_TOKEN);
                        history.push('/');
                        window.location.reload();
                    }
                }}>
                    Đăng xuất
                </a>
            </Menu.Item>
        </Menu>
    );
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return <Redirect to='/' />
    }
    return <Route exact path={props.path} render={(propsRoute) => {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider width="250" collapsible onCollapse={onCollapse}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px' }}>
                        <h5 className="text-white">Menu chức năng</h5>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Quản lý người dùng">
                            <Menu.Item key="1" icon={<UnorderedListOutlined />}>
                                <NavLink to="/admin/quanLyHocSinh">Quản lý học sinh</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                                <NavLink to="/admin/quanLyNguoiTuVan">Quản lý người tư vấn</NavLink>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<UnorderedListOutlined />}>
                                <NavLink to="/admin/quanLyQuanTriVien">Quản lý quản trị viên</NavLink>
                            </Menu.Item>
                            {/* <Menu.Item key="4" icon={<UserAddOutlined />}>
                                <NavLink to="/admin/themNguoiDung">Thêm Người dùng</NavLink>
                            </Menu.Item> */}
                        </SubMenu>
                        <SubMenu key="sub2" icon={<HomeOutlined />} title="Quản lý trường học">
                            <Menu.Item key="5" icon={<UnorderedListOutlined />}>
                                <NavLink to="/admin/danhSachTruongHoc">Danh sách trường học</NavLink>
                            </Menu.Item>
                            <Menu.Item key="6" icon={<UnorderedListOutlined />}>
                                <NavLink to="/admin/quanLyTruongCu">Danh sách trường cũ</NavLink>

                            </Menu.Item>

                            {/* <Menu.Item key="6" icon={<FileAddOutlined />}>
                                <NavLink to="/admin/themTruongHoc">Thêm trường học</NavLink>
                            </Menu.Item> */}
                        </SubMenu>
                        <SubMenu key="sub3" icon={<GatewayOutlined />} title="Quản lý talkshow">
                            <Menu.Item key="7" icon={<UnorderedListOutlined />}>
                                <NavLink to="/admin/danhSachTalkShow">Danh sách talkshow</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<GatewayOutlined />} title="Quản lý banner">
                            <Menu.Item key="8" icon={<UnorderedListOutlined />}>
                                <NavLink to="/admin/quanLyBanner">Danh sách banner</NavLink>
                            </Menu.Item>
                        </SubMenu>


                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-11">
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                        <h3 className="text-white">Admisstion Admin Web</h3>
                                    </div>
                                </div>
                                <div className=" col-1">
                                    <Dropdown overlay={menu}>
                                        <a className="ant-dropdown-link text-white" onClick={e => e.preventDefault()}>
                                            Admin
                                        </a>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <props.component {...propsRoute} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }} />
}
