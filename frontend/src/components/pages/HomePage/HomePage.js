import './HomePage.scss'

import HorizontalSlider from '../../HorizontalSlider/HorizontalSlider';

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

  return (
    <div className="home-page">
      <header>
        <HorizontalSlider withLinks={true} pictures={pictures} />
      </header>
      <main>
        <section className="advertisment">
          <ul className='advertisment__list'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
        <section className='recommendations'>
          <ul className='recommendations__list'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
        <section className="sale">
          <ul className="sale__list">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
        <section className="history">
          <ul className="history__list">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default HomePage