// styles
import './HorizontalSlider.scss'
// global
import { useState, useEffect } from 'react'
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
  const slides = pictures.map(picture => (
    <Link key={picture.product?.id} to={`/products/${picture.product?.id}`}>
      <img src={picture.image} alt='' />
    </Link>
  ))

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
    console.log(currentPictureId)
    setCurrentPictureId(nextPictureNumber)
  }



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPictureId(currentId => currentId === pictures.length - 1 ? 0 : currentId + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
  }, [currentPictureId])

  return (
    <div className="horizontal-slider">
      <ul className="horizontal-slider__pictures">
        <li className="pictures__prev">
          {/* {slides[]} */}
        </li>
        <li className="pictures__current">
          {slides[currentPictureId]}
        </li>
        <li className="pictures__next">

        </li>
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