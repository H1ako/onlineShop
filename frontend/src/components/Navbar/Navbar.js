import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import './Navbar.scss'

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__inner">
        <img className='navbar__logo' src="/images/logo.svg" alt="" />
        <ul className='navbar__info'>
          <li>
            <object className='navbar__icon' data="/images/categories.svg" type="image/svg+xml" />
            Categories
          </li>
          <li>
            <object className='navbar__icon' data="/images/help.svg" type="image/svg+xml" />
            Help
          </li>
        </ul>
        <Search />
        <nav>
          <ul>
            <li>
              <object className='navbar__icon' data="/images/location.svg" type="image/svg+xml" />
            </li>
            <li>
              <Link to='/notifications'>
                <object className='navbar__icon' data="/images/notifications.svg" type="image/svg+xml" />
              </Link>
            </li>
            <li>
              <Link to='/favourites'>
                <object className='navbar__icon' data="/images/favourites.svg" type="image/svg+xml" />
              </Link>
            </li>
            <li>
              <Link to='/delivery'>
                <object className='navbar__icon' data="/images/delivery.svg" type="image/svg+xml" />
              </Link>
            </li>
            <li>
              <Link to='/cart'>
                <object className='navbar__icon' data="/images/cartBag.svg" type="image/svg+xml" />
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