import dataURLToBlob from './dataURLToBlob'
import axios from "axios";


export default function uploadDataURL(dataURL, onprogress) {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        let imageBlob = dataURLToBlob(dataURL);
        formData.append('blogs-images', imageBlob,
            Math.random().toString(36) + '.png');

        axios
            .post('/api/blog/images', formData)
            .then(res => {
                if (res.data.status === 'success') {
                    resolve(res.data.result)
                } else {
                    reject(res.msg || 'Some Error Occurred!')
                }
            })
            .catch(err => {
                reject(err.responseJSON || err.responseText || 'Some Error Occurred!')
            });
    })
}
