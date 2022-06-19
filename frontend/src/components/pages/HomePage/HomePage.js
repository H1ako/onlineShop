// styles
import './HomePage.scss'
// components
import HorizontalSlider from '../../HorizontalSlider/HorizontalSlider';
import ProductCard from '../../ProductCard/ProductCard';
import ProductList from '../../ProductList/ProductList';
import { useState, useEffect } from 'react';
import { getProducts, getViewHistory } from '../../../libs/dataGetters';
import { login } from '../../../libs/dataPosters';

function HomePage() {
  const [ viewHistory, setViewHistory ] = useState([])
  const [ saleProducts, setSaleProducts ] = useState([])
  const [ recommendationList, setRecommendationList ] = useState([])

  const pictures = [
    {
      image: '/static/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      product: {
        id: 1
      }
    },
    {
      image: '/static/images/kros.png',
      product: {
        id: 2
      }
    },
    {
      image: '/static/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      product: {
        id: 3
      }
    },
    {
      image: '/static/images/kros.png',
      product: {
        id: 4
      }
    }
  ]

  useEffect(() => {
    // for recommendations list
    getProducts(6)
    .then(data => setRecommendationList(data))

    // for sale list
    getProducts(6, ['sale'])
    .then(data => setSaleProducts(data))
    
    login()

    // for view history
    getViewHistory()
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
          <ProductList products={viewHistory} />
        </section>
      </main>
    </div>
  );
}

export default HomePage