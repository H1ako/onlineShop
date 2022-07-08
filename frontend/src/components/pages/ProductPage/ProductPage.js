// styles
import './ProductPage.scss'
// icons
import ScrollDown from '../../../static/images/scroll_down.svg'
// global
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
// components
import HorizontalSlider from '../../HorizontalSlider/HorizontalSlider';
import ProductList from '../../ProductList/ProductList';
import ProductPrice from '../../ProductPrice/ProductPrice';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
// libs
import { getProductData, getProducts } from '../../../libs/dataGetters';

function ProductPage() {
  const { productId } = useParams()
  const [ isScrolled, setIsScrolled ] = useState(false)
  const [ productData, setProductData ] = useState({})
  const [ fromThisBrandList, setFromThisBrandList ] = useState([])

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
    getProductData(productId)
    .then(product => {
      setProductData(product)

        getProducts(3, [`brand : ${product.brand}`], true)
        .then(products => {
          setFromThisBrandList(products)
        })
    })

    
    // eslint-disable-next-line
  }, [])

  return (
    <div className="product-page" onWheel={scrollHandler}>
      <img src={ScrollDown} alt="" className='scroll-down'/>
      {productData.thumbnail &&
        <HorizontalSlider pictures={productData.images.length ? productData.images : [{id: 'thumbnail', image: productData.thumbnail, product: productData.id}]} />
      }
      <main>
        <div className="main-info">
          <h5 className='main-info__id'>{productData.id}</h5>
          <h4 className='main-info__author'>{productData.author}</h4>
          <h1 className='main-info__name'>{productData.name}</h1>
          <ul className="main-info__tags">
              {productData.tags && productData.tags.map(tag => (
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
                {productData.description}
              </p>
              {recommendationsList.length > 0 &&
                <div className="additional-page__recommendations">
                  <h3 className='recommendations__heading'>Maybe you'll like this</h3>
                  <ProductList products={recommendationsList} />
                </div>
              }
              {fromThisBrandList.length > 0 &&
                <div className="additional-page__brand-similarities">
                  <h3 className='brand-similarities__heading'>From this brand</h3>
                  <ProductList products={fromThisBrandList} />
                </div>
              }
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
              price={productData.price}
              productId={productData.id}
              isFavourite={productData.isFavourite}
              inCart={productData.inCart}
              discount={productData.discount}
              discountPrice={productData.discountPrice}
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