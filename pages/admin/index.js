import {Button, Icon, Grid, Form, List} from 'semantic-ui-react'
import Head from 'next/head'
import Link from 'next/link'
import {useState} from 'react'
import toast from 'react-hot-toast';
import kebabCase from 'lodash.kebabcase';
import styles from '@styles/Admin.module.css'
import {firestore, docToJson} from '@lib/firebase'


export async function getServerSideProps() {
    const query = firestore.collection('vegetables').orderBy('name');
    const ref = await query.get();
    const vegetables = ref.docs.map(docToJson);
  
    return {
        props: {vegetables},
    }
}
  

export default function Admin(data) {
    const [vegetables, setVegetables] = useState(data.vegetables);
    
    const deleteVegetable = (id, index) => {
        firestore.collection('vegetables').doc(id).delete();
        
        const newVegetables = [...vegetables]
        newVegetables.splice(index, 1);

        setVegetables(newVegetables);
    } 

    const ListItem = vegetables.map((vegetable, index) => {
        return (
            <List.Item key={vegetable.id}>
                <List.Icon name="delete" size="large" verticalAlign="middle" onClick={() => deleteVegetable(vegetable.id, index)}/>
                <List.Content>
                    <Link href={`/admin/${vegetable.id}`}>
                        {vegetable.name}
                    </Link>
                </List.Content>
            </List.Item>
        )
    });

    return (
        <div className={styles.container}>
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <h1>Admin</h1>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <CreateForm/>
                    </Grid.Column>
                    <Grid.Column>
                        <List floated="right" divided>
                            {ListItem}
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}


function CreateForm() {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [icon, setIcon] = useState('');
    const [months, setMonths] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    const changeName = (_, {value}) => {
        setName(value);
        setSlug(encodeURI(kebabCase(value)));
    }

    const changemonth = (_, {value}) => {
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
        const data = {
            name,
            slug,
            icon,
            months
        };
        
        await ref.set(data);

        toast.success('Success created!');
    }

    return (
        <Form onSubmit={submitForm}>
            <h2>Create</h2>
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

                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Form.Field>
                            <label>Icon</label>
                            <Form.Input placeholder='icon' value={icon} onChange={(_, {value}) => setIcon(value)}/>
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
                            <Form.Checkbox label="June" value={6} checked={months.includes(6)} onChange={changemonth} />
                            <Form.Checkbox label="July" value={7} checked={months.includes(7)} onChange={changemonth} />
                            <Form.Checkbox label="August" value={8} checked={months.includes(8)} onChange={changemonth} />
                        </Form.Group>
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Group grouped>
                            <label>Fall</label>
                            <Form.Checkbox label="September" value={9} checked={months.includes(9)} onChange={changemonth} />
                            <Form.Checkbox label="October" value={10} checked={months.includes(10)} onChange={changemonth} />
                            <Form.Checkbox label="November" value={11} checked={months.includes(11)} onChange={changemonth} />
                        </Form.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Button type='submit' content='Submit' primary />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>
    )
}