import './Lightbox.scss'

import { Link } from 'react-router-dom'

import { ChevronLeftIcon, ChevronRightIcon, XIcon, ExternalLinkIcon, PlayIcon, PauseIcon } from '@heroicons/react/outline'

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
        <div className="lightbox-area__lightbox">
            <div className="lightbox__btns">
                {changeCurrentPicture &&
                    <ChevronLeftIcon className='btns__icon left-arrow' onClick={() => changeCurrentPicture(-1)} />
                }
                {setIsChanging !== null && isChanging ?
                    <PauseIcon className='btns__icon left-arrow' onClick={() => setIsChanging(false)} />
                :
                    <PlayIcon className='btns__icon left-arrow' onClick={() => setIsChanging(true)} />
                }
                
                {changeCurrentPicture &&
                    <ChevronRightIcon className='btns__icon right-arrow' onClick={() => changeCurrentPicture(1)} />
                }
                <Link to={`/products/${currentPicture.product?.id}`} >
                    <ExternalLinkIcon className='btns__icon link' />
                </Link>
                <XIcon className='btns__icon close' onClick={closeLightbox} />
            </div>
            <div className="lightbox__picture">
                {changeCurrentPicture &&
                    <div className="picture__arrows">
                        <div className="arrows__left-area" onClick={() => changeCurrentPicture(-1)}>
                            <ChevronLeftIcon className='arrows__icon left-arrow' />
                        </div>
                        <div className="arrows__right-area" onClick={() => changeCurrentPicture(1)}>
                            <ChevronRightIcon className='arrows__icon right-arrow' />
                        </div>          
                    </div>
                }
                <img src={currentPicture.image} alt='' />
            </div>
        </div>
    </div>
  );
}

export default Lightbox