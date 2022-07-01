// styles
import './ProfilePage.scss'
// icons
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
import SmallDeliveryList from '../../SmallDeliveryList/SmallDeliveryList';


function ProfilePage() {
    const dispatch = useDispatch()
    const { customer } = useCustomer()
  
    useEffect(() => {
      getCustomerData()
      .then(data => {
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
          <SmallDeliveryList
            amount={3}
          />
        </section>
      </main>
      <footer>
        <HistoryList />
      </footer>
    </div>
  );
}

export default ProfilePage