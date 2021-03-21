import Head from 'next/head'
import Link from 'next/link'
import styles from '@styles/Admin.module.css'
import {firestore, docToJson} from '@lib/firebase'

export async function getServerSideProps({params}) {
    const query = firestore.collection('vegetables').doc(params.id);
    const vegetable = docToJson(await query.get());
    
    return {
        props: {vegetable},
    }
}
  

export default function Edit({vegetable}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Edit - {vegetable.name}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Link href='/admin'>
                Go back
            </Link>
            <h1>{vegetable.name}</h1>
        </div>
    )
}
