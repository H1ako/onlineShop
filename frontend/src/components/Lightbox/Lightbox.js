import './Lightbox.scss'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon, ArrowsExpandIcon, XIcon, ExternalLinkIcon } from '@heroicons/react/outline'

function Lightbox({
    changeCurrentPicture,
    closeLightbox,
    currentPicture
}) {

  return (
    <div className="lightbox-area">
        <div className="lightbox-area__lightbox">
            <div className="lightbox__btns">
                <ChevronLeftIcon className='btns__icon left-arrow' onClick={() => changeCurrentPicture(-1)} />
                <ChevronRightIcon className='btns__icon right-arrow' onClick={() => changeCurrentPicture(1)} />
                <Link to={`/products/${currentPicture.product?.id}`} >
                    <ExternalLinkIcon className='btns__icon link' />
                </Link>
                <XIcon className='btns__icon close' onClick={closeLightbox} />
            </div>
            <div className="lightbox__picture">
                <div className="picture__arrows">
                    <div className="arrows__left-area" onClick={() => changeCurrentPicture(-1)}>
                        <ChevronLeftIcon className='arrows__icon left-arrow' />
                    </div>
                    <div className="arrows__right-area" onClick={() => changeCurrentPicture(1)}>
                        <ChevronRightIcon className='arrows__icon right-arrow' />
                    </div>          
                </div>
                <img src={currentPicture.image} alt='' />
            </div>
        </div>
    </div>
  );
}

export default Lightbox