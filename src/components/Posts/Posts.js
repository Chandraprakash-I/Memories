import React from "react";
import Post from "./Post/Post.js"
import useStyles from './styles.js';
import { useSelector } from "react-redux";
import { CircularProgress ,Grid} from "@material-ui/core";
const Posts=({setPatchId})=>{
  const {posts,isLoading}=useSelector((state)=> state.posts);
const classes=useStyles();
// console.log(posts);

if(!posts.length && !isLoading) return 'NO POSTS';
    return (
        isLoading ? <CircularProgress/>:(
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          
            {posts?.map((post)=>{
              return (<Grid key={post._id} item xs={12} sm={12} lg={3} md={6}>
                <Post post={post} setPatchId={setPatchId}/>
              </Grid>)
            })}
        </Grid>)
       
    );
}

export default Posts;