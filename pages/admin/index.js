import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Admin.module.css'
import {firestore, docToJson} from '../../lib/firebase'

export async function getServerSideProps() {
    const query = firestore.collection('vegetables');
    const ref = await query.get()
    const vegetables = ref.docs.map(docToJson);
  
      return {
        props: {vegetables},
      }
  }
  

export default function Admin({vegetables}) {
    const List = vegetables.map((vegetable) => {
        return (
            <li key={vegetable.id}>
                <Link href={`/admin/${vegetable.id}`}>
                    {vegetable.name}
                </Link>
            </li>
        )
    });

    return (
        <div className={styles.container}>
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <h1>Admin</h1>
            <ul>
                {List}
            </ul>
        </div>
    )
}
