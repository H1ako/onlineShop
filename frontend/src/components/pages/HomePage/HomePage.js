// styles
import './HomePage.scss'
// components
import HorizontalSlider from '../../HorizontalSlider/HorizontalSlider';
import ProductCard from '../../ProductCard/ProductCard';
import ProductList from '../../ProductList/ProductList';

function HomePage() {
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

  const recommendations = [
    {
      id: 1,
      name: 'Raf Simons',
      price: '40000руб.',
      thumbnail: '/static/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      isFavourite: true,
      inCartNumber: 1
    },
    {
      id: 2,
      name: 'Roof Simpsons',
      price: '400000руб.',
      thumbnail: '/static/images/kros.png',
      isFavourite: true,
      inCartNumber: 0
    },
    {
      id: 3,
      name: 'Raf Simons',
      price: '40000руб.',
      thumbnail: '/static/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      isFavourite: false,
      inCartNumber: 1
    },
    {
      id: 4,
      name: 'Roof Simpsons',
      price: '400000руб.',
      thumbnail: '/static/images/kros.png',
      isFavourite: false,
      inCartNumber: 0
    },
    {
      id: 5,
      name: 'Raf Simons',
      price: '40000руб.',
      thumbnail: '/static/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      isFavourite: true,
      inCartNumber: 1
    },
    {
      id: 6,
      name: 'Roof Simpsons',
      price: '400000руб.',
      thumbnail: '/static/images/kros.png',
      isFavourite: true,
      inCartNumber: 0
    }
  ]

  const saleList = [
    {
      id: 1,
      name: 'Raf Simons',
      price: '40000руб.',
      thumbnail: '/static/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      isFavourite: true,
      inCartNumber: 1,
      discount: 100,
      discountPrice: '0руб.'
    },
    {
      id: 2,
      name: 'Roof Simpsons',
      price: '400000руб.',
      thumbnail: '/static/images/kros.png',
      isFavourite: true,
      inCartNumber: 0,
      discount: 1,
      discountPrice: '394000руб.'
    },
    {
      id: 3,
      name: 'Raf Simons',
      price: '40000руб.',
      thumbnail: '/static/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      isFavourite: false,
      inCartNumber: 1,
      discount: 50,
      discountPrice: '20000руб.'
    },
    {
      id: 4,
      name: 'Roof Simpsons',
      price: '400000руб.',
      thumbnail: '/static/images/kros.png',
      isFavourite: false,
      inCartNumber: 0,
      discount: 50,
      discountPrice: '20000руб.'
    },
    {
      id: 5,
      name: 'Raf Simons',
      price: '40000руб.',
      thumbnail: '/static/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      isFavourite: true,
      inCartNumber: 1,
      discount: 50,
      discountPrice: '20000руб.'
    },
    {
      id: 6,
      name: 'Roof Simpsons',
      price: '400000руб.',
      thumbnail: '/static/images/kros.png',
      isFavourite: true,
      inCartNumber: 0,
      discount: 50,
      discountPrice: '20000руб.'
    }
  ]

  const historyList = [
    {
      id: 1,
      name: 'Raf Simons',
      price: '40000руб.',
      thumbnail: '/static/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      isFavourite: true,
      inCartNumber: 1,
      discount: 100,
      discountPrice: '0руб.'
    },
    {
      id: 2,
      name: 'Roof Simpsons',
      price: '400000руб.',
      thumbnail: '/static/images/kros.png',
      isFavourite: true,
      inCartNumber: 0,
      discount: 1,
      discountPrice: '394000руб.'
    },
    {
      id: 3,
      name: 'Raf Simons',
      price: '40000руб.',
      thumbnail: '/static/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      isFavourite: false,
      inCartNumber: 1,
      discount: 50,
      discountPrice: '20000руб.'
    },
    {
      id: 4,
      name: 'Roof Simpsons',
      price: '400000руб.',
      thumbnail: '/static/images/kros.png',
      isFavourite: false,
      inCartNumber: 0,
      discount: 50,
      discountPrice: '20000руб.'
    },
    {
      id: 5,
      name: 'Raf Simons',
      price: '40000руб.',
      thumbnail: '/static/images/19-krossovki-adidas-x-raf-simons-ozweego-iii-759x500.jpg',
      isFavourite: true,
      inCartNumber: 1,
      discount: 50,
      discountPrice: '20000руб.'
    },
    {
      id: 6,
      name: 'Roof Simpsons',
      price: '400000руб.',
      thumbnail: '/static/images/kros.png',
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
                productDiscount={recProduct.discount}
                productDiscountPrice={recProduct.discountPrice}
              />
            )}
          </ul>
        </section>
        <section className="sale">
          <h3>Sale</h3>
          <ul className="sale__list">
            {saleList.map(recProduct => 
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
          <ProductList products={historyList} />
        </section>
      </main>
    </div>
  );
}

export default HomePage