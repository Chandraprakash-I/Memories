import React,{useState} from "react";
import useStyles from './styles.js';
import {Card,CardActions,CardContent,CardMedia,Button,Typography,ButtonBase} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined.js';
import DeleteIcon from '@material-ui/icons/Delete.js'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz.js'
import moment from 'moment';
import { useDispatch } from "react-redux";
import {deletePost,getPosts,likePost} from "../../../actions/posts.js"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";


const Post=({post,setPatchId})=>{
    // console.log('post '+ post.selectedFile);
    const [likes,setLikes]=useState(post?.likes);
    const classes=useStyles();
    const dispatch=useDispatch();
    const history=useHistory();
    const user=JSON.parse(localStorage.getItem('profile'));

    const userId=user?.result?.googleId || user?.result?._id;
    const hasLikedPost=post.likes.find((like)=> like===(user?.result?.googleId || user?.result?._id));

    const openPost=()=>{
        console.log("opening post");
        history.push(`/posts/${post._id}`);
    }
    const handleLike=()=>{
        dispatch(likePost(post._id))
        if(hasLikedPost){
            setLikes(post.likes.filter((id)=>id !== userId ))
        }else{
            setLikes([...post.likes,userId])
        }
    }

    const Likes=()=>{
        if(likes.length>0){
            return likes.find((like)=>like === (user?.result?.googleId || user?.result?._id))
            ?(
                <><ThumbUpAltIcon fontSize="small"/>&nbsp;{likes.length>2?`you and ${likes.length-1} others`  : `${likes.length} like${likes.length >1 ? 's':""}`}</>

                
            ):
            (
            <><ThumbUpAltOutlined fontSize="small"/>&nbsp;{likes.length} {likes.length===1 ? 'Like':'Likes'}</>
            )
        }
        return <><ThumbUpAltOutlined fontSize="small"/>&nbsp;Like</>
    }
   
    return (
       <Card className={classes.card} elevation={6}>
        <ButtonBase
        className={classes.cardAction}
        onClick={openPost}>

       
         <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">
                        {post.name}
                    </Typography>
                    <Typography variant="body2">
                        {moment(post.createdAt).fromNow()}
                    </Typography>

                </div>
                {/* <div className={classes.overlay2}>
                {(user?.result?.googleId === post?.creator || user?.result?._id == post?.creator)&&(
                             <Button style={{color: 'white'}} size='small' onClick={()=>{
                                setPatchId(post._id);
                            }}>
                                <MoreHorizIcon fontSize="medium"/>
                            </Button>
                        )}
                   
                </div> */}
                



                <div className={classes.overlay2} name="edit">

   {(user?.result?.googleId === post?.creator || user?.result?._id == post?.creator)&&(
                           <Button
                           onClick={(e) => {
                             e.stopPropagation();
                             setPatchId(post._id);
                           }}
                           style={{ color: 'white' }}
                           size="small"
                         >
                           <MoreHorizIcon fontSize="default" />
                         </Button>
                        )}
  </div>





                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">
                        {post.tags.map((tag)=> `#${tag} `)}
                    </Typography>
                </div>   
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                    <CardContent>
                    <Typography  variant="body2" color="textSecondary" >{post.message}</Typography>
                    </CardContent>

                    </ButtonBase>
                    <CardActions className={classes.cardActions}>
                        <Button size="small" color="primary" onClick={handleLike}
                        disabled={!user?.result}>
                            <Likes />
                        </Button>
                        {(user?.result?.googleId === post?.creator || user?.result?._id == post?.creator)&&(
                            <Button size='small' color='primary' onClick={()=> dispatch(deletePost(post._id))}>
                                <DeleteIcon fontSize="small"/>Delete
                            </Button>
                        )}
                       
                    </CardActions>
        
       </Card>
    );
}

export default Post;