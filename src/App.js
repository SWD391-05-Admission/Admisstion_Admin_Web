
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import AdminTemplate from './Templates/AdminTemplate';
import 'antd/dist/antd.css';
import QuanLyNguoiDung from './Component/QuanLyNguoiDung/QuanLyNguoiDung';
import Login from './Pages/Login';
import ThemNguoiDung from './Component/QuanLyNguoiDung/ThemNguoiDung';
import DanhSachTruongHoc from './Component/QuanLyTruongHoc/DanhSachTruongHoc';
import ThemTruonghoc from './Component/QuanLyTruongHoc/ThemTruonghoc';
import CapNhatHocSinh from './Component/QuanLyNguoiDung/QuanLyHocSinh/CapNhatHocSinh';
import CapNhatNguoiTuVan from './Component/QuanLyNguoiDung/QuanLyNguoiTuVan/CapNhatNguoiTuVan';
import CapNhatQuanTriVien from './Component/QuanLyNguoiDung/QuanLyQuanTriVien/CapNhatQuanTriVien';
import ThemBanner from './Component/QuanLyBanner/ThemBanner';
import QuanLyBanner from './Component/QuanLyBanner/QuanLyBanner';
import CapNhatTruongHoc from './Component/QuanLyTruongHoc/CapNhatTruongHoc';
import ChiTietTruongHoc from './Component/QuanLyTruongHoc/ChiTietTruongHoc';
import DanhSachHocSinh from './Component/QuanLyNguoiDung/QuanLyHocSinh/DanhSachHocSinh';
import DanhSachNguoiTuVan from './Component/QuanLyNguoiDung/QuanLyNguoiTuVan/DanhSachNguoiTuVan';
import DanhSachQuanTriVien from './Component/QuanLyNguoiDung/QuanLyQuanTriVien/DanhSachQuanTriVien';
import DanhSachTalkShow from './Component/QuanLyTalkShow/DanhSachTalkShow';
import QuanLyTruongCu from './Component/QuanLyTruongHoc/QuanLyTruongCu';
import ChiTietTalkShow from './Component/QuanLyTalkShow/ChiTietTalkShow';

export const history = createBrowserHistory();

function App() {
  return (

    <Router history={createBrowserHistory}>
      <Switch>

        <Route exact  path="/" component={Login}/>
        <AdminTemplate path="/admin/danhSachTruongHoc" component={DanhSachTruongHoc} />
        <AdminTemplate path="/admin/themTruongHoc" component={ThemTruonghoc} />

        <AdminTemplate path="/admin/themNguoiDung" component={ThemNguoiDung} />
        <AdminTemplate path="/admin/quanLyHocSinh" component={DanhSachHocSinh} />
        <AdminTemplate path="/admin/quanLyNguoiTuVan" component={DanhSachNguoiTuVan} />
        <AdminTemplate path="/admin/quanLyQuanTriVien" component={DanhSachQuanTriVien} />

        <AdminTemplate path="/admin/themBanner" component={ThemBanner} />
        <AdminTemplate path="/admin/quanLyBanner" component={QuanLyBanner} />

        <AdminTemplate path="/admin/danhSachTalkShow" component={DanhSachTalkShow} />

        <AdminTemplate path="/admin/capNhatHocSinh/:id" component={CapNhatHocSinh} />
        <AdminTemplate path="/admin/capNhatNguoiTuVan/:id" component={CapNhatNguoiTuVan} />
        <AdminTemplate path="/admin/capNhatQuanTriVien/:id" component={CapNhatQuanTriVien} />
        <AdminTemplate path="/admin/capNhatTruongHoc/:id" component={CapNhatTruongHoc} />
        <AdminTemplate path="/admin/chiTietTruongHoc/:id" component={ChiTietTruongHoc} />
        <AdminTemplate path="/admin/chiTietTalkShow/:id" component={ChiTietTalkShow} />
        <AdminTemplate path="/admin/quanLyTruongCu" component={QuanLyTruongCu} />

        <AdminTemplate path="/admin" component={DanhSachHocSinh} />


      </Switch>
    </Router>
  );
}

export default App;
