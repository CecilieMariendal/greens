import Head from 'next/head'
import {useState} from 'react'
import toast from 'react-hot-toast'
import kebabCase from 'lodash.kebabcase'
import styles from '@styles/Edit.module.css'
import {firestore, docToJson} from '@lib/firebase'


export async function getServerSideProps() {
    const query = firestore.collection('vegetables').orderBy('name');
    const ref = await query.get();
    const vegetables = ref.docs.map(docToJson);
  
    return {
        props: {vegetables},
    }
}
  

export default function Create(data) {
    const [vegetables, setVegetables] = useState(data.vegetables);

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [icon, setIcon] = useState('');
    const [months, setMonths] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    const changeName = ({target}) => {
        setName(target.value);
        setSlug(encodeURI(kebabCase(target.value)));
    }

    const changeIcon = (event) => {
        const fullPath = event.target.value

        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }

        setIcon(filename.split('.')[0]);
    }

    const changemonth = ({target}) => {
        const value = parseInt(target.value);
        
        const index = months.indexOf(value);
        const newArray = [...months];
        
        if (index !== -1) {
            newArray.splice(index, 1)
        } else {
            newArray.push(value);
        }
        
        setMonths(newArray);
    }

    const submitForm = async (event) => {
        event.preventDefault();

        const uid = Math.random().toString(36).substring(2);
        const ref = firestore.collection('vegetables').doc(uid)
        const data = {name, slug, icon, months};
        
        await ref.set(data);

        toast.success('Success created!');
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <h1>Create</h1>

            <form onSubmit={submitForm}>
                <fieldset>
                    <legend>General</legend>
                    
                    <label htmlFor="name" className={styles.inputField}>
                        Name
                        <input type="text" name="name" value={name} onChange={changeName}/>
                        <span></span>
                    </label>

                    <label htmlFor="icon" className={styles.inputField}>
                        Icon
                        <input type="file" name="icon" onChange={changeIcon}/>
                        <span></span>
                    </label>
                </fieldset>

                <fieldset className={styles.fieldset}>
                    <legend>Months</legend>

                    <div>
                        <h3>Winter</h3>
                        <label>December <input type="checkbox" value="12" checked={months.includes(12)} onChange={changemonth}/></label>
                        <label>January <input type="checkbox" value="1" checked={months.includes(1)} onChange={changemonth}/></label>
                        <label>February <input type="checkbox" value="2" checked={months.includes(2)} onChange={changemonth}/></label>
                    </div>
                    
                    <div>
                        <h3>Spring</h3>
                        <label >March <input type="checkbox" value="3" checked={months.includes(3)} onChange={changemonth}/></label>
                        <label>April <input type="checkbox" value="4" checked={months.includes(4)} onChange={changemonth}/></label>
                        <label>May <input type="checkbox" value="5" checked={months.includes(5)} onChange={changemonth}/></label>
                    </div>
                    
                    <div>
                        <h3>Summer</h3>
                        <label>June <input type="checkbox" value="6" checked={months.includes(6)} onChange={changemonth}/></label>
                        <label>July <input type="checkbox" value="7" checked={months.includes(7)} onChange={changemonth}/></label>
                        <label>August <input type="checkbox" value="8" checked={months.includes(8)} onChange={changemonth}/></label>
                    </div>
                    
                    <div>
                        <h3>Fall</h3>
                        <label>October <input type="checkbox" value="10" checked={months.includes(10)} onChange={changemonth}/></label>
                        <label>September <input type="checkbox" value="9" checked={months.includes(9)} onChange={changemonth}/></label>
                        <label>November <input type="checkbox" value="11" checked={months.includes(11)} onChange={changemonth}/></label>
                    </div>
                </fieldset>

                <button type="submit">Submit</button>
            </form>
            
            <div>
                <h2>Final</h2>
                <ul>
                    <li>Slug: {slug}</li>
                    <li>Icons: {icon ?? null}</li>
                </ul>
            </div>
        </div>
    )
}
