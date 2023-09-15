import React from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup()
{
    const nameRef = React.useRef();
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const passwordConfirmationRef = React.useRef(); 
    
    const [errors, setErrors] = React.useState(null);

    const {setUser, setToken} = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        setErrors({});

        axiosClient.post('/registration', payload).then((response) => {
            setUser({
                     name: response.data.user.name
                 });
            setToken(response.data.token);
        })
        .catch(err => {
            const response = err.response;
             if (response && response.status === 401) {
                setErrors(response.data.errors);
            }
        });
    }

    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <h1>Signup</h1>
                    {errors && 
                    <div>
                        {
                            Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))
                        }
                    </div>
                    }
                    <input type="name" ref={nameRef} placeholder="Name"/>
                    <input type="email" ref={emailRef} placeholder="Email"/>
                    <input type="password" ref={passwordRef} placeholder="Password"/>
                    <input type="password" ref={passwordConfirmationRef} placeholder="Confirm password"/>
                    <button type="submit">Signup</button>
                    <p>
                        Already registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}