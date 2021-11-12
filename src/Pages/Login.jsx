import React from 'react';
import { firebase } from '../Services/firebase';
import { ACCESS_TOKEN, DOMAIN } from '../Utils/Setting';
import { history } from './../App'
import axios from 'axios'
import { Redirect } from 'react-router';
import { message } from 'antd';



export default function Login() {


    const authLogin = async (token) => {
        await axios({
            url: `${DOMAIN}login`,
            method: 'POST',
            data: {
                "firebaseToken": token,
                "app": "Admin"
            }
        })
            .then(function (response) {
                const accessToken = response.data.token;
                if (accessToken !== null) {
                    localStorage.setItem(ACCESS_TOKEN, accessToken);
                    console.log('access:', accessToken)
                    history.push('/admin');
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log('lỗi', error);
                message.error('Đăng nhập không thành công')
            });
    }


    const SignInWithfirebase = () => {
        const google_provider = new firebase.auth.GoogleAuthProvider();
        console.log(google_provider)
        firebase.auth().signInWithPopup(google_provider)
            .then((result) => {
                firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
                    console.log('uiToken', idToken);
                    // localStorage.setItem(ACCESS_TOKEN, idToken);
                    authLogin(idToken);


                }).catch(function (error) {
                    console.log(error.error);
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }


    if (localStorage.getItem(ACCESS_TOKEN)) {
        return <Redirect to='/admin' />
    }

    return (
        <div>
            <div className="container-flute p-0" style={{ backgroundImage: `url('https://www.sas.com/profile/ui/images/profile-background.gif')`, backgroundSize: 'cover', height: '100vh' }}>
                <div className="m-auto" style={{ width: '500px' }}>
                    <div className="pt-5 pb-5">
                        <h1 className="mb-4 text-white">Admisstion</h1>
                        <div className="mb-5 bg-white" style={{ borderRadius: '10px' }}>
                            <form action="" className="p-5">

                                <h2 className="text-center mb-5">Đăng nhập</h2>
                                <div class="form-group">
                                    <label for="">Số điện thoại</label>
                                    <input type="text"
                                        class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
                                </div>
                                <div class="form-group">
                                    <label for="">Mật khẩu</label>
                                    <input type="password"
                                        class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
                                </div>
                                <a href="">Quên mật khẩu</a>
                                <div class="form-group">
                                    <a href="/home" className="btn btn-block" style={{ backgroundColor: '#ff8224' }}>Đăng nhập</a>
                                </div>

                                <div className="login-buttons">
                                    <button type="button" className="btn btn-danger btn-block" onClick={SignInWithfirebase}>
                                        <i className="fab fa-google-plus-g"></i>Login with google
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
