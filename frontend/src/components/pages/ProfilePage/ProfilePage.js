// styles
import './ProfilePage.scss'
// icons
import { TruckIcon } from '@heroicons/react/outline';
import { BellIcon, HeartIcon, IdentificationIcon, LocationMarkerIcon, MailIcon, PhoneIcon, UserIcon } from '@heroicons/react/solid';
// global
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// components
import HistoryList from '../../HistoryList/HistoryList';
// libs
import { getCustomerData } from '../../../libs/dataGetters';
// store
import { updateCustomer, useCustomer } from '../../../store/slices/customerSlice';


function ProfilePage() {
    const dispatch = useDispatch()
    const { customer } = useCustomer()
  
    useEffect(() => {
      getCustomerData()
      .then(data => {
        console.log(data)
        dispatch(updateCustomer({customer: data}))
      })
    }, [])

  return (
    <div className="profile-page">
      <main>
        <section className="profile-top">
          <div className="profile-top__content">
            <Link className='content__link' to='/notifications'>
              <BellIcon className='link__icon' />
            </Link>
            <img src={customer.picture} alt="" className="content__picture" />
            <Link className='content__link' to='/favourites'>
              <HeartIcon className='link__icon' />
            </Link>
          </div>
          <Link to='/settings' className="profile-top__btn">
            Settings
          </Link>
        </section>
        <section className="profile-info">
          <h4 className="profile-info__id">
            <IdentificationIcon className='profile-info__icon' />
            #{customer.id}
          </h4>
          <h2 className="profile-info__name">
            <UserIcon className='profile-info__icon' />
            {`${customer.firstName} ${customer.lastName}`}
          </h2>
          <h3 className="profile-info__email">
            <MailIcon className='profile-info__icon' />
            {customer.email}
          </h3>
          <h3 className="profile-info__phone">
            <PhoneIcon className='profile-info__icon' />
            +{customer.phone ?? 'No phone'}
          </h3>
          <h4 className="profile-info__address">
            <LocationMarkerIcon className='profile-info__icon' />
            {customer.address ?? 'No address'}
          </h4>
        </section>
        <section className="last-deliveries">
          <div className="delivery">
            <TruckIcon className='delivery__icon' />
            <div className="delivery__info">
              <h4 className="info__arrival-date">
                Arrival Date: 23 november 2022
              </h4>
              <h4 className="info__delivery-address">
                To: Russia, Udmurt Repablic
              </h4>
            </div>
            <div className="delivery__product-info">
              <h3 className="product-info__name">Raf Simons</h3>
            </div>
            <img src="/media/productPictures/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg" alt="" className="delivery__product-pic" />
          </div>
        </section>
      </main>
      <footer>
        <HistoryList />
      </footer>
    </div>
  );
}

export default ProfilePage