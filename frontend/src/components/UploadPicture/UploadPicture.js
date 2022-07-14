// styles
import "./UploadPicture.scss"
// global
import { useEffect, useId, useState } from "react"

function UploadPicture({ setPicture, picture = "" }) {
  const id = useId()
  const [pictureDisplay, setPictureDisplay] = useState(picture)

  const pictureHandler = (event) => {
    const file = event.target.files[0]
    const value = URL.createObjectURL(file)

    setPicture(file)
    setPictureDisplay(value)
  }

  useEffect(() => {
    if (typeof picture !== "object") {
      setPictureDisplay(picture)
    }
  }, [picture])

  return (
    <div className="upload-picture">
      <input
        onChange={pictureHandler}
        className="upload-picture__input"
        id={`upload-picture-${id}`}
        type="file"
        accept=".png, .jpg, .jpeg"
      />
      <label htmlFor={`upload-picture-${id}`}>
        <img src={pictureDisplay} alt="" className="upload-picture__picture" />
      </label>
    </div>
  )
}

export default UploadPicture
