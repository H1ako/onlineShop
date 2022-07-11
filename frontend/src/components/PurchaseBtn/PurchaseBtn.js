// styles
import './PurchaseBtn.scss'
// icons
// libs
import { purchaseProduct } from '../../libs/actionPosters'


function PurhcaseBtn({
    productId,
    amount
}) {
    const btnClickHandler = () => {
        purchaseProduct(productId, amount)
    }

    return (
        <button onClick={btnClickHandler} className='purchase-btn' title='purchase product'>
            Purchase
        </button>
    )
}

export default PurhcaseBtn