import './Navbar.scss'

import { Link } from 'react-router-dom';
import Search from '../Search/Search';

import { TruckIcon, LocationMarkerIcon, ShoppingBagIcon, HeartIcon, BellIcon } from '@heroicons/react/solid'

import { InformationCircleIcon, ViewListIcon } from '@heroicons/react/outline'

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__inner">
        <Link to='/'>
          <img className='navbar__logo' src="/images/logo.svg" alt="" />
        </Link>
        <ul className='navbar__info'>
          <li>
            <ViewListIcon className='navbar__icon' />
            Categories
          </li>
          <li>
            <InformationCircleIcon className='navbar__icon' />
            Help
          </li>
        </ul>
        <Search />
        <nav>
          <ul>
            <li>
              <LocationMarkerIcon className='navbar__icon' />
            </li>
            <li>
              <Link to='/notifications'>
                <BellIcon className='navbar__icon' />
              </Link>
            </li>
            <li>
              <Link to='/favourites'>
                <HeartIcon className='navbar__icon' />
              </Link>
            </li>
            <li>
              <Link to='/delivery'>
                <TruckIcon className='navbar__icon' />
              </Link>
            </li>
            <li>
              <Link to='/cart'>
                <ShoppingBagIcon className='navbar__icon' />
              </Link>
            </li>
            <li>
              <Link to='/profile'>
                <img className='navbar__user-picture' alt="" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar