// styles
import './DeliveriesList.scss'
// icons
import { BadgeCheckIcon, BanIcon, TruckIcon } from '@heroicons/react/outline';
// global
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { getDeliveries } from '../../libs/dataGetters'
import { cancelDelivery } from '../../libs/actionPosters';

function DeliveriesList({
    amount='all',
    setTotalCost=null
}) {
  const [ deliveries, setDeliveries ] = useState([])

  const updateDeliveries = () => {
    getDeliveries(amount)
    .then(data => {
        setDeliveries(data.deliveries)

        if (setTotalCost !== null) {
            setTotalCost(data.totalCost)
        }
    })
  }

  const cancelHandler = (deliveryId) => {
    cancelDelivery(deliveryId)
    .then(() => updateDeliveries())
  }

  useEffect(() => {
    updateDeliveries()
    
    // eslint-disable-next-line
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
            <h4 className="info__arrival-date">Arrival Date{delivery.arrivalDate}</h4>
            <h4 className="info__address">To: {delivery.address}</h4>
            <div className="delivery__product-info">
                <Link to={`/products/${delivery.product?.id}`} className="product-info__name">{delivery.product?.name}</Link>
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
                <h4 className="info__arrival-date">Arrival Date: {delivery.arrivalDate}</h4>
                <h4 className="info__address">To: {delivery.address}</h4>
                <button onClick={() => cancelHandler(delivery.id)} className="info__cancel">Cancel</button>
            </div>
            <div className="delivery__product-info">
                <Link to={`/products/${delivery.product?.id}`} className="product-info__name">{delivery.product?.name}</Link>
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
                <Link to={`/products/${delivery.product?.id}`} className="product-info__name">{delivery.product?.name}</Link>
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