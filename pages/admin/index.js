import {Button, Grid, Form} from 'semantic-ui-react'
import Head from 'next/head'
import Link from 'next/link'
import {useState} from 'react'
import kebabCase from 'lodash.kebabcase';
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
            <CreateForm/>
        </div>
    )
}

function CreateForm() {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [months, setMonths] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    const changeName = (_, {value}) => {
        setName(value);
        setSlug(encodeURI(kebabCase(value)));
    }

    const changemonth = (_, value) => {
        const index = months.indexOf(value);

        const newArray = [...months];
        newArray.splice(index, 1)
        
        if (index > -1) {
            setMonths(newArray);
        }
    }

    const submitForm = async (event) => {
        event.preventDefault();
        const uid = Math.random().toString(36).substring(2);
        
        const ref = firestore.collection('vegetables').doc(uid)

        const data = {name, slug, months};
        
        await ref.set(data);

        // toast.success('Post created!');
    }

    return (
        <Form onSubmit={submitForm}>
            <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                    <Form.Field>
                        <label>Name</label>
                        <Form.Input placeholder='Name' value={name} onChange={changeName} />
                        <p>Slug: {slug}</p>
                    </Form.Field>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={4}>
                    <Grid.Column>
                        <Form.Group grouped>
                            <label>Winter</label>
                            <Form.Checkbox label="December" value={12} checked={months.includes(12)} onChange={changemonth} />
                            <Form.Checkbox label="January" value={1} checked={months.includes(1)} onChange={changemonth} />
                            <Form.Checkbox label="February" value={2} checked={months.includes(2)} onChange={changemonth} />
                        </Form.Group>
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Group grouped>
                            <label>Spring</label>
                            <Form.Checkbox label="March" value={3} checked={months.includes(3)} onChange={changemonth} />
                            <Form.Checkbox label="April" value={4} checked={months.includes(4)} onChange={changemonth} />
                            <Form.Checkbox label="May" value={5} checked={months.includes(5)} onChange={changemonth} />
                        </Form.Group>
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Group grouped>
                            <label>Summer</label>
                            <Form.Checkbox label="June" value={5} checked={months.includes(5)} onChange={changemonth} />
                            <Form.Checkbox label="July" value={6} checked={months.includes(6)} onChange={changemonth} />
                            <Form.Checkbox label="August" value={7} checked={months.includes(7)} onChange={changemonth} />
                        </Form.Group>
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Group grouped>
                            <label>Fall</label>
                            <Form.Checkbox label="September" value={5} checked={months.includes(5)} onChange={changemonth} />
                            <Form.Checkbox label="October" value={6} checked={months.includes(6)} onChange={changemonth} />
                            <Form.Checkbox label="November" value={7} checked={months.includes(7)} onChange={changemonth} />
                        </Form.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>



            <Button type='submit'>Submit</Button>
        </Form>
    )
}