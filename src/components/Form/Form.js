import React ,{useEffect, useState} from "react";
import {TextField,Button,Typography,Paper} from '@material-ui/core';
import useStyles from './styles.js';
import FileBase from 'react-file-base64';
import { useDispatch,useSelector } from "react-redux";
import { createPost ,updatePost} from "../../actions/posts.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";

const Form=({patchId,setPatchId})=>{
    const history=useHistory();
    const [postData,setPostData]=useState({
        title: '',message: '',tags:'',selectedFile: ''
    });
    let p=useSelector((state)=> patchId?state.posts.posts.find((e)=>e._id===patchId):null);
        
     useEffect(()=>{
        if(p) setPostData(p);
    },[p])
    const classes=useStyles();
    const dispatch=useDispatch();

    const user=JSON.parse(localStorage.getItem('profile'));

    const handleSubmit=async (event)=>{
        console.log('inside handle submit');
        event.preventDefault();
        console.log('patchId :'+patchId);
     
        if(!patchId){
            dispatch(createPost({...postData,name: user?.result?.name},history));
        }else{
           
            dispatch(updatePost(patchId,{...postData,name: user?.result?.name})).then(()=>{
                history.push('/');
            });
           
        }
        clear();
    };
    if(!user?.result?.name){
        return(
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please SignIn to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }
    const clear=()=>{
        setPatchId(null);
        setPostData({title:'',message: '',tags: '',selectedFile: ''});
    }
    return (
       <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
            <Typography variant="h6">{patchId? 'Editing':'Creating'} a Creating memory</Typography>

            {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}
            onChange={(e)=>setPostData({...postData,creator: e.target.value})}/> */}

            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
            onChange={(e)=>setPostData({...postData,title: e.target.value})}/>

            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message}
            onChange={(e)=>setPostData({...postData,message: e.target.value})}/>

            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}
            onChange={(e)=>setPostData({...postData,tags: e.target.value.split(',')})}/>

            <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({base64})=> setPostData({...postData,selectedFile: base64})}/>
            
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>

            <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

        </form>
       </Paper>
    );
}

export default Form;