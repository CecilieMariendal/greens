import Head from 'next/head'
import Image from 'next/image'
import styles from '@styles/Home.module.css'
import {firestore, docToJson} from '@lib/firebase';


export async function getServerSideProps() {
  const date = new Date();

  const query = firestore.collection('vegetables').where('months', 'array-contains', date.getMonth());
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
  
  const list = vegetables.map((item, index) => {
    return (
      <li key={index} className={styles.item}>
        <Image 
          src={`/icon/${item.icon}.svg`}
          alt="Picture of the author"
          width={100}
          height={100}
         />
        <p>{item.name}</p>
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Grønsager i sæson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        <ul className={styles.content}>
          {list}
        </ul>
      </main>

      <footer className={styles.footer}>
        <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <div>Icons made by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </footer>
    </div>
  )
}
