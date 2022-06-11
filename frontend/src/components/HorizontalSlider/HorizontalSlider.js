// styles
import './HorizontalSlider.scss'
// global
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
// icons
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon, ArrowsExpandIcon } from '@heroicons/react/outline'
// components
import Lightbox from '../Lightbox/Lightbox'

function HorizontalSlider({
  withLinks=false, // should img be with a <a> wrapper or not
  pictures // list of pictures with .image and .product
}) {

  const [isChanging, setIsChanging] = useState(true)
  const [currentPictureId, setCurrentPictureId] = useState(0)
  const [isPictureExpanded, setIsPictureExpanded] = useState(false)
  const changingInterval = useRef()

  const openLightbox = () => {
    setIsChanging(false)
    setIsPictureExpanded(true)
  }

  const closeLightbox = () => {
    setIsChanging(true)
    setIsPictureExpanded(false)
  }

  // change main picture
  const changeCurrentPicture = move => {
    let nextPictureNumber = currentPictureId + move

    if (nextPictureNumber > pictures.length - 1) {
      nextPictureNumber = 0
    }
    else if (nextPictureNumber <= -1) {
      nextPictureNumber = pictures.length - 1
    }

    setCurrentPictureId(nextPictureNumber)
  }



  useEffect(() => {
    if (isChanging && !changingInterval.current) {
      const interval = setInterval(() => {
        setCurrentPictureId(currentId => currentId === pictures.length - 1 ? 0 : currentId + 1)
      }, 3000)

      changingInterval.current = interval
    }
    else if (!isChanging) {
      clearInterval(changingInterval.current)
      changingInterval.current = null
    }
    
    return () => clearInterval(changingInterval)
  }, [isChanging])

  return (
    <div className="horizontal-slider">
      <ul className="horizontal-slider__pictures" style={{"--currentIndex": currentPictureId}}>
        {
          pictures.map(picture => (
            <li key={picture.product?.id}>
              <Link to={`/products/${picture.product?.id}`}>
                <img src={picture.image} alt='' />
              </Link>
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
        <Lightbox
          isChanging={isChanging}
          setIsChanging={setIsChanging}
          currentPicture={pictures[currentPictureId]}
          closeLightbox={closeLightbox}
          changeCurrentPicture={changeCurrentPicture}
        />
      }
    </div>
  );
}

export default HorizontalSlider