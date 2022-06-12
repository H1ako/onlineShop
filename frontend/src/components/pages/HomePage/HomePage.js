import './HomePage.scss'

import HorizontalSlider from '../../HorizontalSlider/HorizontalSlider';
import { Link } from 'react-router-dom';
import ProductPrice from '../../ProductPrice/ProductPrice';
import ProductCard from '../../ProductCard/ProductCard';

function HomePage() {
  const pictures = [
    {
      image: '/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      product: {
        id: 1
      }
    },
    {
      image: '/images/kros.png',
      product: {
        id: 2
      }
    },
    {
      image: '/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      product: {
        id: 3
      }
    },
    {
      image: '/images/kros.png',
      product: {
        id: 4
      }
    }
  ]

  const recommendations = [
    {
      id: 1,
      name: 'Raf Simons',
      price: '40000руб.',
      thumbnail: '/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      isFavourite: true,
      inCartNumber: 1
    },
    {
      id: 2,
      name: 'Roof Simpsons',
      price: '400000руб.',
      thumbnail: '/images/kros.png',
      isFavourite: true,
      inCartNumber: 0
    },
    {
      id: 3,
      name: 'Raf Simons',
      price: '40000руб.',
      thumbnail: '/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      isFavourite: false,
      inCartNumber: 1
    },
    {
      id: 4,
      name: 'Roof Simpsons',
      price: '400000руб.',
      thumbnail: '/images/kros.png',
      isFavourite: false,
      inCartNumber: 0
    },
    {
      id: 5,
      name: 'Raf Simons',
      price: '40000руб.',
      thumbnail: '/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      isFavourite: true,
      inCartNumber: 1
    },
    {
      id: 6,
      name: 'Roof Simpsons',
      price: '400000руб.',
      thumbnail: '/images/kros.png',
      isFavourite: true,
      inCartNumber: 0
    }
  ]

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
            {recommendations.map(recProduct => 
              <ProductCard
                key={recProduct.id}
                productId={recProduct.id}
                productInCartNumber={recProduct.inCartNumber}
                productIsFavourite={recProduct.isFavourite}
                productImg={recProduct.thumbnail}
                productName={recProduct.name}
                productPrice={recProduct.price}
              />
            )}
            
          </ul>
        </section>
        <section className="sale">
          <h2>Sale</h2>
          <ul className="sale__list">
            <li className='list__product'></li>
            <li className='list__product'></li>
            <li className='list__product'></li>
            <li className='list__product'></li>
            <li className='list__product'></li>
            <li className='list__product'></li>
          </ul>
        </section>
        <section className="history">
          <h2>History</h2>
          <ul className="history__list">
            <li className='list__product'></li>
            <li className='list__product'></li>
            <li className='list__product'></li>
            <li className='list__product'></li>
            <li className='list__product'></li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default HomePage