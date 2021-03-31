import Head from 'next/head'
import Image from 'next/image'
import styles from '@styles/Home.module.css'
import {firestore, docToJson} from '@lib/firebase';
import {Icon} from 'semantic-ui-react'
import {useState} from 'react';


export async function getServerSideProps() {
  const date = new Date();

  const query = firestore.collection('vegetables').orderBy('name');
  const ref = await query.get();
  const vegetables = ref.docs.map(docToJson);

  return {
      props: {vegetables},
  }
}


export default function Home({vegetables}) {
  const translation = require('../public/translations.json');
  const language = 'dk';

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [title, setTitle] = useState(translation[`${month}-title`][language]);

  const description = translation[`${month}-description`][language];
  
  const sortedVegetables = [];
  for(let i = 1; i < 13; i++) {
    sortedVegetables.push(vegetables.filter((item) => item.months.includes(i)));
  }

  const monthLists = sortedVegetables.map((items, index) => {
    return (
      <ul className={(month === index + 1) ? styles.active : styles.hidden} key={index}>
        <List vegetables={items}/>
      </ul>
    )
  });


  const onNavbarClick = (direction) => {
    if (direction === 'next') {
      setMonth(month + 1);
    } else {
      setMonth(month - 1);
    }
    
    setTitle(translation[`${month}-title`][language]);
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Grønsager i sæson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav className={styles.navbar}>
          <button onClick={() => onNavbarClick('prev')}>
            <Icon name='chevron left' size='large'color='grey' />
          </button>
          <h1 className={styles.title}>{title}</h1>
          <button onClick={() => onNavbarClick('next')}>          
            <Icon name='chevron right' size='large' color='grey'/>
          </button>
        </nav>
        <p className={styles.description}>{description}</p>

        <div className={styles.content}>
          <div>
            {monthLists}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> and <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </footer>
    </div>
  )
}


function List({vegetables}) {
  const list = vegetables.map((item, index) => {
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
    );
  });

  return list;
}
