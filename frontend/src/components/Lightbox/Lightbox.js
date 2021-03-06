// styles
import './Lightbox.scss'
// icons
import { ChevronLeftIcon, ChevronRightIcon, XIcon, ExternalLinkIcon, PlayIcon, PauseIcon } from '@heroicons/react/outline'
// global
import { Link } from 'react-router-dom'

function Lightbox({
    changeCurrentPicture,
    isChanging,
    setIsChanging,
    closeLightbox,
    currentPicture
}) {

  if (currentPicture.image == null) return (<></>)

  return (
    <div className="lightbox-area">
        <div className="lightbox-area__btns">
            {changeCurrentPicture &&
                <button onClick={() => changeCurrentPicture(-1)} title='previous image'>
                    <ChevronLeftIcon className='btns__icon left-arrow' />
                </button>
            }
            {setIsChanging !== null && isChanging ?
                <button onClick={() => setIsChanging(false)} title='stop changing images'>
                    <PauseIcon className='btns__icon left-arrow' />
                </button>
            :
                <button onClick={() => setIsChanging(true)} title='continue changing images'>
                    <PlayIcon className='btns__icon left-arrow' />
                </button>
            }
            {changeCurrentPicture &&
                <button onClick={() => changeCurrentPicture(1)} title='next image'>
                    <ChevronRightIcon className='btns__icon right-arrow' />
                </button>
            }
            <Link to={`/products/${currentPicture.product}`} title='product page' >
                <ExternalLinkIcon className='btns__icon link' />
            </Link>
            <button onClick={closeLightbox} title='close window'>
                <XIcon className='btns__icon close' />
            </button>
        </div>
        <div className="lightbox-area__lightbox">
            {changeCurrentPicture &&
                <div className="lightbox__arrows">
                    <button className="arrows__left-area" onClick={() => changeCurrentPicture(-1)} title='previous image'>
                        <ChevronLeftIcon className='arrows__icon left-arrow' />
                    </button>
                    <button className="arrows__right-area" onClick={() => changeCurrentPicture(1)} title='next image'>
                        <ChevronRightIcon className='arrows__icon right-arrow' />
                    </button>          
                </div>
            }
            <img className='lightbox__picture' src={currentPicture.image} alt='' />
        </div>
    </div>
  );
}

export default Lightbox