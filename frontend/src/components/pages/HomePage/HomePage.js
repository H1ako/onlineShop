import './HomePage.scss'

import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon, ArrowsExpandIcon } from '@heroicons/react/outline'
import { useState } from 'react';
import { Link } from 'react-router-dom'

function HomePage() {
  const [bgIsChanging, setBgIsChanging] = useState(true)

  return (
    <div className="home-page">
      <header>
        <div className="bg-picture">
          <ul className="bg-picture__pictures">
            <li>
              <Link to="/product/">
                <img src="/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg" alt="" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="tools">
          <ChevronLeftIcon className='tools__icon left-arrow' />
          {
            bgIsChanging ?
            <PauseIcon className='tools__icon pause' onClick={() => setBgIsChanging(false)} />
            :
            <PlayIcon className='tools__icon play' onClick={() => setBgIsChanging(true)} />
          }
          <ChevronRightIcon className='tools__icon right-arrow' />
          <ArrowsExpandIcon className='tools__icon expand' />
        </div>
        <div className="arrows">
          <div className="arrows__left-area">
            <ChevronLeftIcon className='arrows__icon left-arrow' />
          </div>
          <div className="arrows__right-area">
            <ChevronRightIcon className='arrows__icon right-arrow' />
          </div>          
        </div>
      </header>
      <main>
        <section className="advertisment">
          <ul className='advertisment__list'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
        <section className='recommendations'>
          <ul className='recommendations__list'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
        <section className="sale">
          <ul className="sale__list">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
        <section className="history">
          <ul className="history__list">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default HomePage