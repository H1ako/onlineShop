// styles
import "./Navbar.scss"
// icons
import {
  TruckIcon,
  LocationMarkerIcon,
  ShoppingBagIcon,
  HeartIcon,
  BellIcon,
  CogIcon,
} from "@heroicons/react/solid"
import {
  InformationCircleIcon,
  ViewListIcon,
  LogoutIcon,
} from "@heroicons/react/outline"
import logo from "../../static/images/logo.svg"
// global
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
// components
import Search from "../Search/Search"
import SignBtns from "../SignBtns/SignBtns"
// libs
import { getCustomerData } from "../../libs/dataGetters"
import UpdateLocationBtn from "../UpdateLocationBtn/UpdateLocationBtn"
// store
import { updateCustomer, useCustomer } from "../../store/slices/customerSlice"

function Navbar() {
  const dispatch = useDispatch()
  const { customer } = useCustomer()
  const [location, setLocation] = useState("")

  useEffect(() => {
    getCustomerData().then((data) => {
      dispatch(updateCustomer({ customer: data.id ? data : {} }))
    })
  }, [dispatch])

  useEffect(() => {
    setLocation(customer.address ?? "")

    // eslint-disable-next-line
  }, [customer.address])

  return (
    <div className="navbar">
      <div className="navbar__inner">
        <Link to="/" title="Blue | Home Page">
          <img className="navbar__logo" src={logo} alt="" />
        </Link>
        <ul className="navbar__info">
          <li>
            <Link className="info__button" to="/products/" title="categories">
              <ViewListIcon className="navbar__icon" />
              Categories
            </Link>
          </li>
          <li title="information about us">
            <button className="info__button">
              <InformationCircleIcon className="navbar__icon" />
              Help
            </button>
          </li>
        </ul>
        <Search />
        <nav>
          {customer.email ? (
            <ul className="nav__links">
              <li className="navbar__location">
                <button title="your location">
                  <LocationMarkerIcon className="navbar__icon" />
                </button>
                <div className="location__window">
                  <input
                    type="text"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    className="window__address"
                  />
                  <UpdateLocationBtn location={location} />
                </div>
              </li>
              <li>
                <Link to="/notifications" title="your notofications">
                  <BellIcon className="navbar__icon" />
                </Link>
              </li>
              <li>
                <Link to="/favourites" title="your favourites">
                  <HeartIcon className="navbar__icon" />
                </Link>
              </li>
              <li>
                <Link to="/deliveries" title="your delivery">
                  <TruckIcon className="navbar__icon" />
                </Link>
              </li>
              <li>
                <Link to="/cart" title="your cart">
                  <ShoppingBagIcon className="navbar__icon" />
                </Link>
              </li>
              <li className="navbar__customer">
                <Link to="/profile" title="your profile">
                  <img
                    src={customer.picture}
                    className="customer__picture"
                    alt=""
                  />
                </Link>
                <div className="customer__profile">
                  <Link to="/profile">
                    <div className="profile__about">
                      <img
                        src={customer.picture}
                        alt=""
                        className="about__picture"
                      />
                      <div className="about__info">
                        <h5 className="info__id">#{customer.id}</h5>
                        <h4 className="info__name">{`${customer.firstName} ${customer.lastName}`}</h4>
                        <h5 className="info__email">{customer.email}</h5>
                        <h5 className="info__phone">+{customer.phone}</h5>
                      </div>
                    </div>
                  </Link>
                  <ul className="profile__links">
                    <li className="links__link">
                      <Link to="/settings">
                        Settings
                        <CogIcon className="link__icon" />
                      </Link>
                    </li>
                    <li className="links__link">
                      <a href="/api/auth/">
                        Log Out
                        <LogoutIcon className="link__icon" />
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          ) : (
            <SignBtns />
          )}
        </nav>
      </div>
    </div>
  )
}

export default Navbar
