import React,{useEffect, useState} from "react";
import {Avatar,Paper,Button,Typography,Container,Grid, TextField} from "@material-ui/core";

import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from "./Input"
// import {GoogleLogin} from 'react-google-login';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from "react-redux";
import {gapi} from 'gapi-script';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {signup,signin} from "../../actions/auth.js"
export const Auth=()=>{
    let clientId="725407432219-44vjfsfatd1g7cbvq4aai1o8597j7iof.apps.googleusercontent.com";

    const [showPassword,setShowPassword]=useState(false);
    
    const classes=useStyles();
    const [isSignup,setisSignup]=useState(false);
    const dispatch=useDispatch();
    const history=useHistory();
    const initialState={firstName: '',lastName: '',email: '',password: '',confirmPassword: ''};
    const [formData,setFormData]=useState(initialState);
    useEffect(()=>{
        gapi.load("client:auth2",()=>{
            gapi.auth2.init({clientId:clientId})
        })
    })
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log("after clicking signup: ")
        console.log("data :"+formData);
        if(isSignup){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))
        }
    }
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const switchMode=()=>{
        setisSignup((prev)=> !prev);
    }
    const googleSuccess=async (res)=>{
        const result=res?.profileObj;
        const token=res?.tokenId;
        try{
            console.log({type: 'AUTH',data:{result,token}});
            dispatch({type: 'AUTH',data:{result,token}});
            history.push('/');
        }catch(error){
            console.log(error);
        }
       
    }
    const googleFailure=(error)=>{
        console.log("Google Sign In was unsuccessful. Try again later");
        console.log(error);
    }
    const handleShowPassword=()=>setShowPassword((prev)=>!prev);
    return (
       <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                
            </Avatar>
            <Typography variant="h5">{isSignup? 'Sign Up':'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        
                          <>
                          {isSignup && (
                            <>
                          <Input name="firstName"
                           label="First Name"
                           handleChange={handleChange}
                           autoFocus
                           half
                           />

                           <Input name="lastName"
                           label="Last Name"
                           handleChange={handleChange}
                           half
                           />
                           </>)}
                           
                           <Input name="email"
                           label="Email Address"
                           handleChange={handleChange}
                           type="email"
                           />

                           <Input name="password"
                           label="Password"
                           handleChange={handleChange}
                           type={showPassword?"text":"password"}
                           handleShowPassword={handleShowPassword}
                           />
                           {isSignup && <Input name="confirmPassword"
                           label="Repeat Password"
                           handleChange={handleChange}
                           type="password"/>}

                           

                           <Button type="submit" fullWidth variant="contained"
                           color="primary"
                           className={classes.submit} onClick={handleSubmit}>
                            {isSignup?'Sign Up':'Sign In'}
                           </Button>

                           <GoogleLogin
                                clientId={clientId}
                                // render={(renderProps)=>(
                                //     <Button className={classes.submit} 
                                //     // startIcon={<Google/>}
                                //     color="primary"
                                //     fullWidth 
                                //     onClick={renderProps.onClick}
                                //     disabled={renderProps.disabled}
                                    
                                //     variant="contained">
                                //         Google Sign In
                                //     </Button>
                                // )}
                                buttonText="Login with Google"
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy={'single_host_origin'}

                            />
                            {/* <GoogleLogin
                                onSuccess={credentialResponse => {
                                    googleSuccess(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                useOneTap
                                />; */}

                           <Grid container justify="flex-end">
                             <Button onClick={switchMode}>
                                {isSignup?"Already have a account? Sign In": "Don't have a account SignUp"}
                             </Button>
                           </Grid>
                          </>
                           
                            
                           
                           
                        
                    }
                  
                </Grid>
            </form>
        </Paper>
       </Container>
    )
}