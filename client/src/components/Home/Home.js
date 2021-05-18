import { Container, Grid, Grow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/postsActions'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import useStyles from './styles'


const Home = () => {
    const [currentId, setCurrentId] = useState(0) // null at the start
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());

    }, [dispatch])

    
    return (
        <Grow in>
                <Container >
                    <Grid className={classes.gridContainer} container justify='space-between'  alignItems='stretch'  spacing={3}>
                        <Grid item xs={12} md={7} sm={12}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12}   md={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home
