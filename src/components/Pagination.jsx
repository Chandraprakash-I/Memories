import React ,{useEffect} from "react";
import {Pagination,PaginationItem} from '@material-ui/lab';
import usestyles from "./styles.js";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getPosts } from "../actions/posts.js";
const Paginate=({page})=>{
    const {numberOfPages}=useSelector((state)=>state.posts);
    const classes=usestyles();
    const dispatch=useDispatch();
 useEffect(()=>{
    if(page){
        dispatch(getPosts(page));
    }
 },[page]);
    return(
        <Pagination
        elevation={6}
        classes={{ul: classes.ul}}
        count={numberOfPages}
        page={Number(page)||1}
        variant="outlined"
        color="primary"
        renderItem={(item)=>{
            return(<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />)
        }}
        />
    )
}

export default Paginate;