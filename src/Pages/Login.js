import React, { useRef, useState } from 'react'
import './Login.css';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import { Link, useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";

import {app} from '../firebase.js'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, getDocs, where } from "firebase/firestore";



function Login() {

  let navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [showProgress, setShowProgress] = useState(false);
  const [showSignInbtn, setShowSignInbtn] = useState(true);


  function loginUser(){

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setShowProgress(true);
    setShowSignInbtn(false)

    const auth = getAuth();
    const db = getFirestore(app);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          let userID = userCredential.user.uid
          // ...

          const q = query(collection(db, "users"), where("userId", "==", userID));
            getDocs(q).then((QuerySnapshot)=>{
                QuerySnapshot.forEach((doc)=>{

                    let userType = doc.data().userType;

                    if (userType === "Admin" ){
                        navigate("/dashboard")
                    }else{
                      navigate("/user/inventory")
                    }             
                    
                })
            })
        })
        .catch((error) => {
   
          setShowProgress(false)
          setShowSignInbtn(true)
          const errorCode = error.code;
          const errorMessage = error.message;
          swal("Login Error!", +"" +errorMessage + "",  "error");

          // ..
    });


  }


  return (
    <div className='login'>

        <video src="https://res.cloudinary.com/ubunifu/video/upload/v1682924681/pexels-rodnae-productions-5699987-3840x2160-24fps_iay0ie.mp4" muted autoPlay loop ></video>
        <div className='opacityLogin'></div>

        <div className='myGeneralContent'>
        <h3>Login</h3>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
        </Form.Group>


        {showSignInbtn && 
                // <button  type="submit" onClick={SignInUser} className='signInbtnn'>
                //     Sign In
                // </button>  
            <Button variant="primary" type="submit" onClick={loginUser}>
            Login
            </Button>
            }

            {showProgress && 
                <Button variant="primary" disabled >
                    <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    <span> Logging in...</span>
                </Button>
            }


        </div>


    </div>
  )
}

export default Login