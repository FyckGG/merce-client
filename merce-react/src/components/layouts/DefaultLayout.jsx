import React from "react"
import { Outlet } from "react-router-dom"
import { useStateContext } from "../../contexts/ContextProvider"
import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom"
import axiosClient from "../../axios-client"

export default function DefaultLayout() 
{

    const {user, token} = useStateContext()
    const {setUser, setToken} = useStateContext();

    React.useEffect(() => {
        axiosClient.get('/user')
        .then((response) => {
            setUser({
                name: response.data.name
            });
        })
    }, [])

    const onLogout = (e) => {
        e.preventDefault()

        axiosClient.post('/logout').then(() =>{
            setUser();
            setToken();
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 401) {
                console.log(response.data.errors);
            }
        });
    }

    if (!token) {
        return <Navigate to='/login'/>
    }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div>
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout}>Logout</a>
                    </div>
                </header>
            </div>
            <main>
                <Outlet/>
            </main>
        </div>)
}