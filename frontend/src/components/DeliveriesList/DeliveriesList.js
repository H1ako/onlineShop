// styles
import './DeliveriesList.scss'
// icons
import { BadgeCheckIcon, BanIcon, TruckIcon } from '@heroicons/react/outline';
// global
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { getDeliveries } from '../../libs/dataGetters'

function DeliveriesList({ amount='all' }) {
  const [ deliveries, setDeliveries ] = useState([])

  useEffect(() => {
    getDeliveries(amount)
    .then(data => setDeliveries(data))
  }, [amount])

  function StatusCancelled({delivery}) {
    return (
        <li className="deliveries-list__delivery">
            <div className="delivery__info">
                <div className="info__status">
                    <BanIcon className='status__icon' />
                    Cancelled
                </div>
            </div>
            <h3 className="info__arrival-date">Arrival Date{delivery.arrivalDate}</h3>
            <h3 className="info__address">To: {delivery.address}</h3>
            <div className="delivery__product-info">
                <h2 className="product-info__name">{delivery.product?.name}</h2>
            </div>
            <img src={delivery.product?.thumbnail} alt="" className="delivery__product-pic" />
        </li>
    )
  }

  function StatusDelivering({delivery}) {
    return (
        <li className="deliveries-list__delivery">
            <div className="delivery__info">
                <div className="info__status">
                    <TruckIcon className='status__icon' />
                    On The Way
                </div>
                <h3 className="info__arrival-date">Arrival Date: {delivery.arrivalDate}</h3>
                <h3 className="info__address">To: {delivery.address}</h3>
            </div>
            <div className="delivery__product-info">
                <h2 className="product-info__name">{delivery.product?.name}</h2>
            </div>
            <img src={delivery.product?.thumbnail} alt="" className="delivery__product-pic" />
        </li>
    )
  }

  function StatusDelivered({delivery}) {
    return (
        <li className="deliveries-list__delivery">
            <div className="delivery__info">
                <div className="info__status">
                    <BadgeCheckIcon className='status__icon' />
                    Delivered
                </div>
            </div>
            <h3 className="info__arrival-date">Arrived At: {delivery.arrivalDate}</h3>
            <h3 className="info__address">To: {delivery.address}</h3>
            <div className="delivery__product-info">
                <h2 className="product-info__name">{delivery.product?.name}</h2>
            </div>
            <img src={delivery.product?.thumbnail} alt="" className="delivery__product-pic" />
        </li>
    )
  }

  return (
    <ul className="deliveries-list">
      { deliveries.map(delivery => {
        if (delivery.status === 'delivering') {
            return <StatusDelivering key={delivery.id} delivery={delivery} />
        }
        else if (delivery.status === 'delivered') {
            return <StatusDelivered key={delivery.id} delivery={delivery} />
        }
        else if (delivery.status === 'cancelled') {
            return <StatusCancelled key={delivery.id} delivery={delivery} />
        }
        else {
            return <h1>ERROR</h1>
        }
      })}
    </ul>
  )
}

export default DeliveriesList