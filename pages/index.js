import Head from 'next/head'
import styles from '@styles/Home.module.css'

export default function Home() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const data = [
    "Grønkål, gulerødder, hvidkål, Jordskokker, kartofler, kinakål, løg, pastinakker, persillerod, porrer, rosenkål, rødbeder, rødkål, selleri",
    "Grønkål, gulerødder, hvidkål, jordskokker, kartofler, løg, pastinakker, persillerod, porrer, rosenkål, rødbeder, rødkål, selleri",
    "Agurk, feldsalat, grønkål, gulerødder, hvidkål, jordskokker, kartofler, løg, pastinakker, persillerod, porrer, purløg, rosenkål, rødbeder, rødkål, selleri, tomater, østershatte",
    "Agurk, gulerødder, hvidkål, jordskokker, kartofler, løg, persille, porrer, rabarber, radiser, ramsløg, rosenkål, rødbeder, salat, selleri, spinat, tomater, østershatte",
    "Agurk, forårsløg, persille, rabarber, radiser, salat, spinat, tomater",
    "Agurk, asparges, bladbeder, blomkål, broccoli, gulerødder, jordbær, kartofler, kinakål, løg, persille, radiser, salat, spidskål, spinat, tomater, ærter",
    "Agurk, bladbeder, blomkål, broccoli, bær, gulerødder, hindbær, jordbær, jordskokker, kartofler, kinakål, kirsebær, løg, persille, rabarber, radiser, salat, spidskål, squash, tomater, ærter",
    "Agurk, asier, bladbeder, bladselleri, blomkål, blommer, broccoli, bær, bønner, gulerødder, hindbær, hvidkål, jordskokker, kartofler, kinakål, løg, majs, persille, porrer, pærer, rabarber, radiser, rødbeder, rødkål, salat, spidskål, spinat, squash, tomater, vindruer, æbler, ærter",
    "Agurk, asier, bladbeder, bladselleri, blomkål, blommer, broccoli, bønner, grønkål, gulerødder, hvidkål, jordskokker, kartofler, kinakål, løg, majs, pastinakker, persille, persillerod, porrer, pærer, radiser, rosenkål, rødbeder, rødkål, salat, selleri, spinat, squash, tomater, vindruer, æbler",
    "Agurk, asier, bladbeder, bladselleri, blomkål, broccoli, grønkål, gulerødder, hvidkål, jordskokker, kartofler, kinakål, løg, majs, pastinakker, persille, persillerod, porrer, pærer, radiser, rosenkål, rødbeder, rødkål, salat, selleri, spidskål, spinat, squash, tomater, valnødder, vindruer, æbler",
    "Blomkål, græskar, grønkål, gulerødder, hvidkål, jordskokker, kartofler, kinakål, løg, pastinakker, persillerod, porrer, pærer, rosenkål, rødbeder, rødkål, salat, selleri, tomater, æbler",
    "Blomkål, grønkål, gulerødder, hvidkål, jordskokker, kartofler, kinakål, løg, pastinakker, persillerod, porrer, pærer, rosenkål, rødbeder, rødkål, selleri, æbler", 
  ];

  const date = new Date();
  
  const list = monthNames.map((month, index) => {
    return (
      <>
        <h2 className={(index === date.getMonth()) ? styles.active : ''}>{month}</h2>
        <p>{data[index]}</p>
      </>
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
      </footer>
    </div>
  )
}
