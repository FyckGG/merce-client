import React from "react";
import axiosClient from "../axios-client";

export default function Users()
{
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    // React.useEffect(() => {
    //     getUsers()
    // }, [])


    // const getUsers = () => {

    //     setLoading(true);

    //     axiosClient.get('/users')
    //     .then(({data}) => {
    //         setLoading(false);
    //         console.log(data);
    //     })
    //     .catch(() => {
    //         setLoading(false)
    //     })
    // }

    return (
        <div>Users</div>
    );
}