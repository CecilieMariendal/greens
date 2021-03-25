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
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
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
        <h1 className={styles.title}>FRUGT & GRØNT I SÆSON</h1>
        <p className={styles.description}>Se hvonår danske frugt og grønt er i sæson 🥦</p>

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
