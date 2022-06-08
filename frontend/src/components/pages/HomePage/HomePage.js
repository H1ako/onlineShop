import './HomePage.scss'

function HomePage() {
  return (
    <div className="home-page">
      <header>
        <div className="tools">

        </div>
        <div className="arrows">
          
        </div>
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