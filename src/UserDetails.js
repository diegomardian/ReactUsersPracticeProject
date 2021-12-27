import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Button} from "@mui/material";

function UserDetails() {
    const [user, setUser] = useState({});
    const {userId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://reqres.in/api/users/${userId}`)
            .then(res => res.json())
            .then(json => {
                setUser({
                    id: json.data.id,
                    name: json.data.first_name + ' ' + json.data.last_name,
                    email: json.data.email,
                    avatar: json.data.avatar,
                })
            })
    }, [userId])

    return (
        <div>
            <h1>User</h1>
            <h2>{user.name}</h2>
            <img src={user.avatar} alt={user.name}/>
            <p>{user.email}</p>
            <Button onClick={() => {navigate({ pathname: "/" })}}>Back to Users</Button>
        </div>
    );
}

export default UserDetails;