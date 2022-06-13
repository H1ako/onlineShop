// styles
import './HorizontalSlider.scss'
// icons
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon, ArrowsExpandIcon } from '@heroicons/react/outline'
// global
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
// components
import Lightbox from '../Lightbox/Lightbox'

function HorizontalSlider({
  withLinks=false, // should img be with a <a> wrapper or not
  pictures // list of pictures with .image and .product
}) {

  const [isChanging, setIsChanging] = useState(true)
  const [currentPictureId, setCurrentPictureId] = useState(0)
  const [isLightboxOpened, setIsLightboxOpened] = useState(false)
  const changingInterval = useRef()

  // creating a new picture changing interval
  const setChangingInterval = () => {
    const interval = setInterval(() => {
      setCurrentPictureId(currentId => currentId === pictures.length - 1 ? 0 : currentId + 1)
    }, 3000)
    changingInterval.current = interval
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

    if (!isChanging) return
    
    if (changingInterval.current) { // clear prev interval
      clearInterval(changingInterval.current)
    }
    setChangingInterval()
  }

  useEffect(() => {
    if (isChanging && !changingInterval.current) {
      setChangingInterval()
    }
    else if (!isChanging) {
      clearInterval(changingInterval.current)
      changingInterval.current = null
    }
    
    return () => clearInterval(changingInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChanging])

  return (
    <div className="horizontal-slider">
      <ul className="horizontal-slider__pictures" style={{"--currentIndex": currentPictureId}}>
        {
          pictures.map(picture => (
            <li key={picture.product?.id}>
              <Link to={`/products/${picture.product?.id}`}>
                <img src={picture.image} alt='' title='click to open product page' />
              </Link>
            </li>
          ))
        }
      </ul>
      <div className="horizontal-slider__tools">
        <button onClick={() => changeCurrentPicture(-1)} title='previous image'>
          <ChevronLeftIcon className='tools__icon left-arrow' />
        </button>
        {
          isChanging ?
          <button onClick={() => setIsChanging(false)} title='stop changing images'>
            <PauseIcon className='tools__icon pause' />
          </button>
          :
          <button onClick={() => setIsChanging(true)} title='continue changing images'>
            <PlayIcon className='tools__icon play' />
          </button>
        }
        <button onClick={() => changeCurrentPicture(1)} title='next image'>
          <ChevronRightIcon className='tools__icon right-arrow' />
        </button>
        <button onClick={() => setIsLightboxOpened(state => !state)} title='open full image'>
          <ArrowsExpandIcon className='tools__icon expand' />
        </button>
      </div>
      <div className="horizontal-slider__arrows">
        <div className="arrows__left-area">
          <button onClick={() => changeCurrentPicture(-1)} title='previous image'>
            <ChevronLeftIcon className='arrows__icon left-arrow' />
          </button>
        </div>
        <div className="arrows__right-area">
          <button onClick={() => changeCurrentPicture(1)} title='next image'>
            <ChevronRightIcon className='arrows__icon right-arrow' />
          </button>
        </div>          
      </div>
      {
        isLightboxOpened &&
        <Lightbox
          isChanging={isChanging}
          setIsChanging={setIsChanging}
          currentPicture={pictures[currentPictureId]}
          closeLightbox={() => setIsLightboxOpened(false)}
          changeCurrentPicture={changeCurrentPicture}
        />
      }
    </div>
  );
}

export default HorizontalSlider