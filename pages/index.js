import Head from 'next/head'
import Image from 'next/image'
import styles from '@styles/Home.module.css'
import {firestore, docToJson} from '@lib/firebase';
import {Icon} from 'semantic-ui-react'
import {useState} from 'react';


export async function getServerSideProps() {
  const query = firestore.collection('vegetables').orderBy('name');
  const ref = await query.get();
  const vegetables = ref.docs.map(docToJson);

  const initVegetables = [];
  for(let i = 1; i <= 12; i++) {
    initVegetables.push(vegetables.filter((vegetable) => vegetable.months.includes(i)));
  }

  return {
      props: {initVegetables},
  }
}


export default function Home({initVegetables}) {
  const translation = require('../public/translations.json');
  const language = 'dk';

  const currentMonth = new Date().getMonth() + 1;

  const [month, setMonth] = useState(currentMonth);
  const [title, setTitle] = useState(translation[`${month}-title`][language]);
  const [description, setDescription] = useState(translation[`${month}-description`][language]);
  const [vegetables, setVegetables] = useState(initVegetables[currentMonth]);
  
  const prevMonth = () => {
    const newMonth = (month === 1) ? 12 : month - 1;

    setMonth(newMonth);
    updateNavbar(newMonth);
    updateContent(newMonth);
  }

  const nextMonth = () => {
    const newMonth = (month === 12) ? 1 : month + 1;

    setMonth(newMonth);
    updateNavbar(newMonth);
    updateContent(newMonth);
  }


  function updateNavbar(newMonth) {
    setTitle(translation[`${newMonth}-title`][language]);
    setDescription(translation[`${newMonth}-description`][language]);
  }


  async function updateContent(newMonth) {
    setVegetables(initVegetables[newMonth]);
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Grønsager i sæson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section>
          <nav className={styles.navbar}>
            <button onClick={prevMonth}>
              <Icon name='chevron left' size='large'color='grey' />
            </button>
            <h1 className={styles.title}>{title}</h1>
            <button onClick={nextMonth}>          
              <Icon name='chevron right' size='large' color='grey'/>
            </button>
          </nav>
          <p className={styles.description}>{description}</p>

          <div className={styles.content}>
            <List vegetables={vegetables}/>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> and <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </footer>
    </div>
  )
}


function List({vegetables}) {
  const items = vegetables.map((item, index) => {
    return (
      <li key={index} className={styles.item}>
        <Image 
          src={`/icon/${item.icon ?? 'vegetables'}.svg`}
          alt="Picture of the author"
          width={100}
          height={100}
        />
        <p>{item.name}</p>
      </li>
    )
  })

  return (
    <ul>
      {items}
    </ul>
  );
}
