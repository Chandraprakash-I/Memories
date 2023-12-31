import * as api from '../api/index.js';
import { FETCH_ALL,FETCH_BY_SEARCH,CREATE,UPDATE,DELETE,LIKE,START_LOADING,END_LOADING,FETCH_POST,COMMENT } from '../constants/actionTypes.js';
//Action Creators

export const getPost=(id)=> async (dispatch)=>{ 
    try{
        dispatch({type: START_LOADING});
        const {data}=await api.fetchPost(id);
        dispatch({type: FETCH_POST,payload: data});
        dispatch({type: END_LOADING});
    }catch(error){
        console.log(error.message);
    }
}

export const getPosts=(page)=> async (dispatch)=>{ 
    try{
        dispatch({type: START_LOADING});
        const {data}=await api.fetchPosts(page);
        dispatch({type: FETCH_ALL,payload: data});
        dispatch({type: END_LOADING});
    }catch(error){
        console.log(error.message);
    }
}

export const getPostsBySearch=(searchQuery)=> async (dispatch)=>{
    try{
        
        console.log("here inside getPostsBySearch :"+searchQuery.search);
        const{data:{data}}=await api.fetchPostsBySearch(searchQuery);
        console.log('data recived : '+data);
        dispatch({type: FETCH_BY_SEARCH,payload: data});
        console.log(data);
    }catch(error){
        console.log(error);
    }
}

export const createPost=(post,history)=>async(dispatch)=>{ 
    try{
        dispatch({type: START_LOADING});
        console.log(post.creator);
      console.log('inside createPosts')
        const {data} =await api.createPost(post);
        history.push(`/posts/${data._id}`);
        dispatch({type: CREATE,payload: data});
        
    }catch(error){
        console.log(error.message);
    }
}

export const updatePost=(id,up)=>async (dispatch)=>{
     
    try{
        console.log('inside updatePost');
        console.log('up:'+up.title);
     console.log('id :'+id);
        const {data}=await api.updatePost(id,up);
        dispatch({type: UPDATE,payload: data})
        
    }catch(error){
        console.log(error.message);
    }
}

export const deletePost=(id)=>async (dispatch)=>{
    try{
        await api.deletePost(id);
        dispatch({type: DELETE,payload: id});
    }catch(error){
        console.log(error);
    }
}

export const likePost=(id)=>async(dispatch)=>{
    console.log('inside like post');
    try{
       
        await api.likePost(id).then((data)=>{
           console.log(data.data);
           dispatch({type: LIKE,payload: data.data})
        });
       
        
    }catch(error){
        console.log(error);
    }

}

export const commentPost=(value,id)=>async(dispatch)=>{
    try{
       const {data}= await api.comment(value,id);
      dispatch({type: COMMENT,payload: data});
      return data.comments;
    }catch(error){
        console.log(error);
    }
}