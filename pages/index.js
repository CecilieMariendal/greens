import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Grønsager i sæson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>FRUGT & GRØNT I SÆSON</h1>
        <p className={styles.description}>Se hvonår danske frugt og grønt er i sæson 🥦</p>

        <div className={styles.content}>
          <h2>Januar</h2>
          <p>Grønkål, gulerødder, hvidkål, Jordskokker, kartofler, kinakål, løg, pastinakker, persillerod, porrer, rosenkål, rødbeder, rødkål, selleri</p>
               
          <h2>Februar</h2>
          <p>Grønkål, gulerødder, hvidkål, jordskokker, kartofler, løg, pastinakker, persillerod, porrer, rosenkål, rødbeder, rødkål, selleri</p>

          <h2>Marts</h2>
          <p>Agurk, feldsalat, grønkål, gulerødder, hvidkål, jordskokker, kartofler, løg, pastinakker, persillerod, porrer, purløg, rosenkål, rødbeder, rødkål, selleri, tomater, østershatte</p>

          <h2>April</h2>
          <p>Agurk, gulerødder, hvidkål, jordskokker, kartofler, løg, persille, porrer, rabarber, radiser, ramsløg, rosenkål, rødbeder, salat, selleri, spinat, tomater, østershatte</p>

          <h2>Maj</h2>
          <p>Agurk, forårsløg, persille, rabarber, radiser, salat, spinat, tomater</p>

          <h2>Juni</h2>
          <p>Agurk, asparges, bladbeder, blomkål, broccoli, gulerødder, jordbær, kartofler, kinakål, løg, persille, radiser, salat, spidskål, spinat, tomater, ærter</p>

          <h2>Juli</h2>
          <p>Agurk, bladbeder, blomkål, broccoli, bær, gulerødder, hindbær, jordbær, jordskokker, kartofler, kinakål, kirsebær, løg, persille, rabarber, radiser, salat, spidskål, squash, tomater, ærter</p>

          <h2>August</h2>
          <p>Agurk, asier, bladbeder, bladselleri, blomkål, blommer, broccoli, bær, bønner, gulerødder, hindbær, hvidkål, jordskokker, kartofler, kinakål, løg, majs, persille, porrer, pærer, rabarber, radiser, rødbeder, rødkål, salat, spidskål, spinat, squash, tomater, vindruer, æbler, ærter</p>
          
          <h2>September</h2>
          <p>Agurk, asier, bladbeder, bladselleri, blomkål, blommer, broccoli, bønner, grønkål, gulerødder, hvidkål, jordskokker, kartofler, kinakål, løg, majs, pastinakker, persille, persillerod, porrer, pærer, radiser, rosenkål, rødbeder, rødkål, salat, selleri, spinat, squash, tomater, vindruer, æbler</p>
          
          <h2>Oktober</h2>
          <p>Agurk, asier, bladbeder, bladselleri, blomkål, broccoli, grønkål, gulerødder, hvidkål, jordskokker, kartofler, kinakål, løg, majs, pastinakker, persille, persillerod, porrer, pærer, radiser, rosenkål, rødbeder, rødkål, salat, selleri, spidskål, spinat, squash, tomater, valnødder, vindruer, æbler</p>

          <h2>November</h2>
          <p>Blomkål, græskar, grønkål, gulerødder, hvidkål, jordskokker, kartofler, kinakål, løg, pastinakker, persillerod, porrer, pærer, rosenkål, rødbeder, rødkål, salat, selleri, tomater, æbler</p>
          
          <h2>December</h2>
          <p>Blomkål, grønkål, gulerødder, hvidkål, jordskokker, kartofler, kinakål, løg, pastinakker, persillerod, porrer, pærer, rosenkål, rødbeder, rødkål, selleri, æbler</p>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
