import axios from 'axios';
const API =axios.create({baseURL: "http://localhost:3000"});
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization=
        `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});


export const fetchPost=(id)=> API.get(`/posts/${id}`);

export const fetchPosts=(page)=> API.get(`/posts?page=${page}`); 

export const fetchPostsBySearch=(searchQuery)=>{
    console.log('search query: '+searchQuery.search);
    return API.get(`/posts/search?searchQuery=${searchQuery.search|| 'none'}&tags=${searchQuery.tags|| 'none'}`);
}

export const createPost=(post)=> API.post('/posts',{creator: post.creator,title: post.title,message: post.message,tags:post.tags,selectedFile:post.selectedFile});
export const updatePost=(id,data)=>  API.patch(`/posts/${id}`,data)
export const deletePost=(id)=> API.delete(`/posts/${id}`);
export const likePost=(id)=>  API.patch(`/posts/${id}/likePost`);

export const comment=(value,id)=>  API.post(`/posts/${id}/commentPost`,{value});

export const signIn=(formData)=> API.post('/user/signin',formData);
export const signUp=(formData)=> API.post('/user/signup',formData);