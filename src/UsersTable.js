import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Avatar, Button} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

function UsersTable({users, setUsers, page, setPage}) {
    const navigate = useNavigate();

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleRowClick = (userId) => {
        navigate({
            pathname: `/users/${userId}`,
        });
    }

    useEffect(() => {
        const retrieveUsers = (page) => {
            fetch('https://reqres.in/api/users?page='+page)
                .then(response => response.json())
                .then(json => {
                    let data = json.data;
                    data.forEach(user => {
                        user.name = user.first_name + ' ' + user.last_name;
                    });
                    data.forEach(user => {
                        delete user.first_name;
                        delete user.last_name;
                    });
                    setUsers(data);
                });
        }

        retrieveUsers(page);
    }, [page, setUsers]);

    return (
        <div>
            <h1>Users</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Avatar</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell><Avatar alt={row.name} src={row.avatar} /></TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right"><Button onClick={() => handleRowClick(row.id)}>View Details</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination className="pagination" sx={{ mt: 2}} count={2} page={page} onChange={handleChange} />
        </div>
    )
}

export default UsersTable;