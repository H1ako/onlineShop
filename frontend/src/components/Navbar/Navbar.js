// styles
import './Navbar.scss'
// icons
import { TruckIcon, LocationMarkerIcon, ShoppingBagIcon, HeartIcon, BellIcon } from '@heroicons/react/solid'
import { InformationCircleIcon, ViewListIcon } from '@heroicons/react/outline'
// global
import { Link } from 'react-router-dom';
// components
import Search from '../Search/Search';

import logo from '../../static/images/logo.svg'

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__inner">
        <Link to='/' title='Blue | Home Page'>
          <img className='navbar__logo' src={logo} alt="" />
        </Link>
        <ul className='navbar__info'>
          <li>
            <button title='categories'>
              <ViewListIcon className='navbar__icon' />
              Categories
            </button>
          </li>
          <li title='information about us'>
            <button>
              <InformationCircleIcon className='navbar__icon' />
              Help
            </button>
          </li>
        </ul>
        <Search />
        <nav>
          <ul>
            <li>
              <button title='your location'>
                <LocationMarkerIcon className='navbar__icon' />
              </button>
            </li>
            <li>
              <Link to='/notifications' title='your notofications'>
                <BellIcon className='navbar__icon' />
              </Link>
            </li>
            <li>
              <Link to='/favourites' title='your favourites'>
                <HeartIcon className='navbar__icon' />
              </Link>
            </li>
            <li>
              <Link to='/delivery' title='your delivery'>
                <TruckIcon className='navbar__icon' />
              </Link>
            </li>
            <li>
              <Link to='/cart' title='your cart'>
                <ShoppingBagIcon className='navbar__icon' />
              </Link>
            </li>
            <li>
              <Link to='/profile' title='your profile'>
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