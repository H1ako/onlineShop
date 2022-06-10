import './HorizontalSlider.scss'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon, ArrowsExpandIcon, XIcon } from '@heroicons/react/outline'
import Lightbox from '../Lightbox/Lightbox'

function HorizontalSlider({
  withLinks=false,
  pictures
}) {

  const [isChanging, setIsChanging] = useState(true)
  const [currentPictureId, setCurrentPictureId] = useState(0)
  const [isPictureExpanded, setIsPictureExpanded] = useState(false)

  const openLightbox = () => {
    setIsChanging(false)
    setIsPictureExpanded(true)
  }

  const closeLightbox = () => {
    setIsChanging(true)
    setIsPictureExpanded(false)
  }

  const changeCurrentPicture = move => {
    let nextPictureNumber = currentPictureId + move

    if (nextPictureNumber > pictures.length - 1) {
      nextPictureNumber = 0
    }
    else if (nextPictureNumber <= -1) {
      nextPictureNumber = pictures.length - 1
    }
    console.log(nextPictureNumber)
    setCurrentPictureId(nextPictureNumber)
  }

  return (
    <div className="horizontal-slider">
      <ul className="horizontal-slider__pictures">
        {
        withLinks ?
          pictures.map(picture => (
            <li key={picture.product?.id}>
              <Link to={`/products/${picture.product?.id}`}>
                <img src={picture.image} alt='' />
              </Link>
              <img src={picture.image} alt='' />
            </li>
          ))
        :
          pictures.map(picture => (
            <li key={picture.product?.id}>
              <img src={picture.image} alt='' />
            </li>
          ))
        }
        
      </ul>
      <div className="horizontal-slider__tools">
        <ChevronLeftIcon className='tools__icon left-arrow' onClick={() => changeCurrentPicture(-1)} />
        {
          isChanging ?
          <PauseIcon className='tools__icon pause' onClick={() => setIsChanging(false)} />
          :
          <PlayIcon className='tools__icon play' onClick={() => setIsChanging(true)} />
        }
        <ChevronRightIcon className='tools__icon right-arrow' onClick={() => changeCurrentPicture(1)} />
        <ArrowsExpandIcon className='tools__icon expand' onClick={openLightbox} />
      </div>
      <div className="horizontal-slider__arrows">
        <div className="arrows__left-area">
          <ChevronLeftIcon className='arrows__icon left-arrow' onClick={() => changeCurrentPicture(-1)} />
        </div>
        <div className="arrows__right-area">
          <ChevronRightIcon className='arrows__icon right-arrow' onClick={() => changeCurrentPicture(1)} />
        </div>          
      </div>
      {
        isPictureExpanded &&
        <Lightbox currentPicture={pictures[currentPictureId]} closeLightbox={closeLightbox} changeCurrentPicture={changeCurrentPicture} />
      }
      
    </div>
  );
}

export default HorizontalSlider