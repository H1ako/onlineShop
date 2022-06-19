// styles
import './ProductPage.scss'
// global
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
// components
import HorizontalSlider from '../../HorizontalSlider/HorizontalSlider';
import ProductList from '../../ProductList/ProductList';
import ProductPrice from '../../ProductPrice/ProductPrice';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

function ProductPage() {
  const { productId } = useParams()
  const [ isScrolled, setIsScrolled ] = useState(false)
  const [ productInfo, setProductInfo ] = useState({})

  const getProductInfo = async () => {
    await fetch(`/api/products/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // 'X-CSRF-Token': document.querySelector('[name=csrfmiddlewaretoken]').value,
        }
    })
    .then(data => data.json())
    .then(data => {
      if (data.product !== undefined) {
        setProductInfo(data.product)
      }
    })
  }

  const recommendationsList = [
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
    }
  ]

  const fromThisBrandList = [
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
    }
  ]

  const scrollHandler = e => {
    // scroll down
    if (e.deltaY > 0) {
      setIsScrolled(true)
    }
     // scroll up
    else if (e.deltaY < 0) {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    getProductInfo()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="product-page" onWheel={scrollHandler}>
      {productInfo.images &&
        <HorizontalSlider pictures={productInfo.images} />
      }
      <main>
        <div className="main-info">
          <h5 className='main-info__id'>{productInfo.id}</h5>
          <h4 className='main-info__author'>{productInfo.author}</h4>
          <h1 className='main-info__name'>{productInfo.name}</h1>
          <ul className="main-info__tags">
              {productInfo.tags && productInfo.tags.map(tag => (
                <li key={tag.id}>{tag.name}</li>
              ))}
          </ul>
        </div>
        <TransitionGroup component='div' className={'page-wrapper'}>
          <CSSTransition
            key={isScrolled}
            unmountOnExit
            timeout={200}
            classNames='fade'
          >
          {isScrolled ?
            <section className="additional-page">
              <p className="additional-page__description">
                {productInfo.description}
              </p>
              <div className="additional-page__recommendations">
                <h3 className='recommendations__heading'>Maybe you'll like this</h3>
                <ProductList products={recommendationsList} />
              </div>
              <div className="additional-page__brand-similarities">
                <h3 className='brand-similarities__heading'>From this brand</h3>
                <ProductList products={fromThisBrandList} />
              </div>
            </section>
          :
            <section className="main-page">
              <p className="main-page__additional-info">
                  Стандартная посадка<br/>
                  Шнуровка и ремешок на липучке<br/>
                  Верх из кожи<br/>
                  Текстильная подкладка<br/>
                  Резиновая подметка<br/>
                  Цвет модели: Core Black / Core Black / Carbon
              </p>          
              <ProductPrice
              price={productInfo.price}
              productId={productInfo.id}
              isFavourite={productInfo.isFavourite}
              inCart={productInfo.inCart}
              discount={productInfo.discount}
              discountPrice={productInfo.discountPrice}
              />
            </section>
          }
          </CSSTransition>
        </TransitionGroup>
      </main>
    </div>
  );
}

export default ProductPage