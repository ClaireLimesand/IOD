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




function StudentsTable() {
    const history = useHistory();
    const students = useSelector((store) => store.students);
    const params= useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
        type: 'FETCH_STUDENTS'}),[]})

    // const handleLoadProfileClick = () => {
    // useEffect(() => {
    //     console.log('params.id:', params.id)
    //     dispatch({
    //     type: 'FETCH_STUDENTS',
    //     // payload: params.id
    // });
    // }, [])
    // history.push('/user')};

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
            {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
            <TableRow key={row.name}>
                <TableCell>
                    <Grid container>
                        <Grid item lg={10}>
                            <Typography className={classes.name}>{row.name}</Typography>
                        </Grid>
                    </Grid>
                    </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="body2">{row.cohort}</Typography>
                    <Typography color="primary" variant="subtitle2">{row.email}</Typography>
                    {/* <Button variant="contained" size="small" sx={{ float: 'right', marginRight: '40px' }} onClick={()=>{handleLoadProfileClick()}}>Load Profile</Button> */}
                </TableCell>
            </TableRow>
        })}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="tr"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableFooter>
    </Table>
    </TableContainer>
);
}


export default StudentsTable;