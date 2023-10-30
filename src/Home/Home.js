import React ,{useEffect,useState} from "react";
import {Container,Grow,Grid,Paper,AppBar,TextField,Toolbar,Button} from '@material-ui/core';
import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form";

// import useStyles from '../styles';

import {getPosts,getPostsBySearch} from '../actions/posts.js';
import {useDispatch} from 'react-redux';

import Pagination from "../components/Pagination.jsx";
import { useHistory,useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ChipInput from "material-ui-chip-input";
import useStyles from './styles.js';

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

export const Home=()=>{
    const classes=useStyles();
    const dispatch=useDispatch();
    const [patchId,setPatchId]=useState(null);
    const query=useQuery();
    const history=useHistory();
    const page=query.get('page')||1;
    const searchQuery=query.get('searchQuery');
    const [search,setSearch]=useState('');
    const [tags,setTags]=useState([]);
    // useEffect(()=>{
    //     dispatch(getPosts());
    // },[patchId,dispatch]);

    const handleKeyPress=(e)=>{
        if(e.keyCode ===13){
            searchPost();
        }
    }

    const searchPost=()=>{
        console.log("inside search post");
        if(search.trim()|| tags){
            console.log(search);
            console.log(tags.join(','));
            dispatch(getPostsBySearch({search,tags: tags.join(',')}));
            history.push(`/posts/search?searchQuery=${search|| 'none'}&tags=${tags.join(',')}`)
        }else{
            history.push('/');
        }
    }

    const handleAdd=(tag)=>setTags([...tags,tag]);
    const handleDelete=(tagToDelete)=>setTags(tags.filter((tag)=>tag!==tagToDelete));
    return(
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing="3">

                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setPatchId={setPatchId}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} >
                        
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e)=> setSearch(e.target.value)}
                            />
                            <ChipInput
                                className={classes.pagination}
                                style={{margin: '10px 0'}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                                
                                />

                                <Button onClick={searchPost}
                                className={classes.searchButton}
                                color="primary"
                                variant="contained">Search</Button>
                        </AppBar>
                   
                        
                    <Form patchId={patchId} setPatchId={setPatchId}/>
                   {
                    (!searchQuery && !tags.length)&&(
                        <Paper  elevation={6}>
                            <Pagination page={page} className={classes.pagination}/>
                        </Paper>
                    )
                   }                                
                   

                </Grid>

            </Grid>
            </Container>
        </Grow>
    );
}
