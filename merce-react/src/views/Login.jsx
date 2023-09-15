import React from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login()
{

    const emailRef = React.useRef();
    const passwordRef = React.useRef();

    const [errors, setErrors] = React.useState(null);

    const {setUser, setToken} = useStateContext();


    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        setErrors({});

        axiosClient.post('/login', payload).then((response) => {
            setUser({
                name: response.data.user.name
            });
            setToken(response.data.token);
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 401) {
                if (response.data.errors) setErrors(response.data.errors);
                else  setErrors({email: [response.data.message]});
            }
        });
    }

    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <h1>Login</h1>
                    {errors && 
                    <div>
                        {
                            Object.keys(errors).map(key => (
                                <p key={key}>{errors[key]}</p>
                            ))
                        }
                    </div>
                    }
                    <input type="email" ref={emailRef} placeholder="Email"/>
                    <input type="password" ref={passwordRef} placeholder="Password"/>
                    <button>Login</button>
                    <p>
                        Not registered? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}