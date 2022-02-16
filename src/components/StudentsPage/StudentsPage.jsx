import  React, { useEffect } from 'react';
import '../StudentsPage/StudentsPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
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
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip } from '@mui/material';


function StudentsTable(student) {
    const history = useHistory();
    const students = useSelector((store) => store.students);
    const user = useSelector(store => store.user);
    // const params= useParams();
    const dispatch = useDispatch();

    const [cohort, setCohort] = useState('');
    const [editCohort, setEditCohort] = useState(false);

    useEffect(() => {
        dispatch({
            type: 'FETCH_STUDENTS'
        });
    }, [])

    const handleLoadProfileClick = (student) => {
        console.log(student);
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
            backgroundColor: '#25262b',
            color: theme.palette.getContrastText(theme.palette.primary.dark)
        },
        
        name: {
            fontWeight: 'bold',
            color: theme.palette.secondary.dark
        },
    }));

    const classes = useStyles();

    // --- This code would be used for multiple pages on the table ---
    /*
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
 
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    */

    const handleCohort = () => {
        dispatch({
            type: 'CHANGE_COHORT',
            payload: cohort
        })
        setCohort('');
        setEditCohort(false);
    }
        
    return (
        <div className='container'>
            <center>
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
                                    student.access_level < 3 &&
                                    <TableRow key={student.id}>
                                        <TableCell>
                                            <Typography>{student.name}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            {student.cohort ?
                                                student.user_id === user.id ?
                                                    !editCohort ?
                                                        <Tooltip title="Click to edit" arrow>
                                                            <Typography className='specific-cohort' onClick={() => setEditCohort(true)}>
                                                                {student.cohort}
                                                            </Typography>
                                                        </Tooltip>
                                                    :
                                                        student.user_id === user.id &&
                                                        <>
                                                            <input 
                                                                className='skill-input'
                                                                value={cohort}
                                                                onChange={(e) => setCohort(e.target.value)}
                                                            />
                                                            <IconButton>
                                                                <CheckIcon onClick={handleCohort} />
                                                            </IconButton>
                                                            <IconButton>
                                                                <ArrowBackIcon onClick={() => {
                                                                        setEditCohort(false);
                                                                        setCohort('');
                                                                    }} 
                                                                />
                                                            </IconButton>
                                                        </>
                                                :
                                                    <Typography>{student.cohort}</Typography>
                                            :
                                                !editCohort ?
                                                    student.user_id === user.id &&
                                                        <button className='apply-btn' onClick={() => setEditCohort(true)}>
                                                            <IconButton sx={{ height: '25px', width: '20px' }}>
                                                                <AddIcon sx={{ color: 'white' }} />
                                                            </IconButton>
                                                        </button>
                                                :
                                                    student.user_id === user.id &&
                                                        <>
                                                            <input 
                                                                className='skill-input'
                                                                value={cohort}
                                                                onChange={(e) => setCohort(e.target.value)}
                                                            />
                                                            <IconButton>
                                                                <CheckIcon onClick={handleCohort} />
                                                            </IconButton>
                                                            <IconButton>
                                                                <ArrowBackIcon onClick={() => {
                                                                        setEditCohort(false);
                                                                        setCohort('');
                                                                    }} 
                                                                />
                                                            </IconButton>
                                                        </>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{student.email}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <button className='apply-btn' onClick={()=>{handleLoadProfileClick(student)}}>
                                                Load Profile
                                            </button>
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
            </center>
        </div>
    );
}


export default StudentsTable;