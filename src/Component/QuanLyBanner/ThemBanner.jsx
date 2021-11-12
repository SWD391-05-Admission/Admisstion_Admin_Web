import axios from 'axios';
import React, { useState } from 'react'

export default function ThemBanner() {

    const [imageSelected, setimageSelected] = useState('')
    const [imgURL, setimgURL] = useState('')

    const handleChangeFile = () => {

        const formData = new FormData();
        formData.append('file', imageSelected);
        formData.append('upload_preset', 'zrmkskln');

        axios.post('https://api.cloudinary.com/v1_1/lamhi1301/upload', formData)
        .then((result) => {
            setimgURL(result.data.secure_url);
            console.log(result.data.secure_url)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <input type="file" name="hinhAnh" id="hinhAnh" onChange={(e) => {
                setimageSelected(e.target.files[0])
            }}
                accept="image/png, image/jpeg, image/gif, image/jpg" />
            <button className="btn btn-success" onClick={handleChangeFile}>upload</button>
            <br />
            <img className="mt-5" src={imgURL} alt=".." width="200" height="300" />
        </div>
    )
}
