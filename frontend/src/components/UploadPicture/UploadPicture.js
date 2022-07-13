// styles
import './UploadPicture.scss'
// global
import { useId, useState } from 'react'


function UploadPicture({ setPicture }) {
    const id = useId()
    const [pictureDisplay, setPictureDisplay] = useState('')

    const pictureHandler = (event) => {
        const file = event.target.files[0]
        const value = URL.createObjectURL(file)

        setPicture(file)
        setPictureDisplay(value)
    }

    return (
        <div className='upload-picture'>
            <input
                onChange={pictureHandler}
                className='upload-picture__input'
                id={`upload-picture-${id}`}
                type="file"
                accept=".png, .jpg, .jpeg"
            />
            <label htmlFor={`upload-picture-${id}`}>
                <img src={pictureDisplay} alt='' className='upload-picture__picture' />
            </label>
        </div>
    )
}

export default UploadPicture