// styles
import './HomePage.scss'
// components
import HorizontalSlider from '../../HorizontalSlider/HorizontalSlider';
import ProductCard from '../../ProductCard/ProductCard';
import HistoryList from '../../HistoryList/HistoryList';
// global
import { useState, useEffect } from 'react';
// libs
import { getProducts, getViewHistory } from '../../../libs/dataGetters';

function HomePage() {
  const [ viewHistory, setViewHistory ] = useState([])
  const [ saleProducts, setSaleProducts ] = useState([])
  const [ recommendationList, setRecommendationList ] = useState([])

  const pictures = [
    {
      id: 1,
      image: '/static/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      product: 1
    },
    {
      id: 2,
      image: '/static/images/kros.png',
      product: 2
    },
    {
      id: 3,
      image: '/static/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      product: 3
    },
    {
      id: 4,
      image: '/static/images/kros.png',
      product: 4
    }
  ]

  useEffect(() => {
    // for recommendations list
    getProducts(6, [], true)
    .then(data => setRecommendationList(data))

    // for sale list
    getProducts(6, ['price : sale'], true)
    .then(data => setSaleProducts(data))

    // for view history
    getViewHistory(6)
    .then(data => setViewHistory(data))
  }, [])

  return (
    <div className="home-page">
      <header>
        <HorizontalSlider withLinks={true} pictures={pictures} />
      </header>
      <main>
        <section className="advertisment">
          <ul className='advertisment__list'>
            <li className='list__ad'></li>
            <li className='list__ad'></li>
            <li className='list__ad'></li>
            <li className='list__ad'></li>
            <li className='list__ad'></li>
          </ul>
        </section>
        <section className='recommendations'>
          <h3>Maybe you'll like this</h3>
          <ul className='recommendations__list'>
            {recommendationList.map(recProduct => 
              <ProductCard
                key={recProduct.id}
                productId={recProduct.id}
                productInCartNumber={recProduct.inCartNumber}
                productIsFavourite={recProduct.isFavourite}
                productImg={recProduct.thumbnail}
                productName={recProduct.name}
                productPrice={recProduct.price}
                productDiscount={recProduct.discount}
                productDiscountPrice={recProduct.discountPrice}
              />
            )}
          </ul>
        </section>
        <section className="sale">
          <h3>Sale</h3>
          <ul className="sale__list">
            {saleProducts.map(recProduct => 
              <ProductCard
                key={recProduct.id}
                productId={recProduct.id}
                productInCartNumber={recProduct.inCartNumber}
                productIsFavourite={recProduct.isFavourite}
                productImg={recProduct.thumbnail}
                productName={recProduct.name}
                productPrice={recProduct.price}
                productDiscount={recProduct.discount}
                productDiscountPrice={recProduct.discountPrice}
              />
            )}
          </ul>
        </section>
        <section className="history">
          <h3>History</h3>
          <HistoryList histories={viewHistory} />
        </section>
      </main>
    </div>
  );
}

export default HomePage