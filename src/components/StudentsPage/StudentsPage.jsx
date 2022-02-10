import  React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Typography,
    TablePagination,
    TableFooter,
    Button
} from '@material-ui/core';




function StudentsTable(student) {
    const history = useHistory();
    const students = useSelector((store) => store.students);
    // const params= useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_STUDENTS'
        });
    }, [])

    const handleLoadProfileClick = () => {
        dispatch({ type: 'GET_STUDENT', payload: student.id});
        history.push(`/user/${student.id}`);
        };
    

    const useStyles = makeStyles((theme) => ({
        table: {
        minWidth: 650,
        },
        tableContainer: {
            borderRadius: 15,
            margin: '10px 10px',
            maxWidth: 950
        },
        tableHeaderCell: {
            fontWeight: 'bold',
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.getContrastText(theme.palette.primary.dark)
        },
        
        name: {
            fontWeight: 'bold',
            color: theme.palette.secondary.dark
        },
    }));

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
        
    return (
        <div className='container'>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Cohort</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Profile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => {
                            return (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        <Typography>{student.name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{student.cohort}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{student.email}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" size="small" sx={{ float: 'right', marginRight: '40px' }} onClick={()=>{handleLoadProfileClick()}}>Load Profile</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    {/* <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={students.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableFooter> */}
                </Table>
            </TableContainer>
    </div>
);
}


export default StudentsTable;