import faker from 'faker';
import React from 'react';
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
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
}));

let students = [];
for(let i=0;i<14;i++) {
    students[i] = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        cohort: faker.company.companyName(),
    }
}

function StudentTable() {
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
                <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                <TableCell className={classes.tableHeaderCell}>Cohort</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.name}>
                <TableCell>
                    <Grid container>
                        <Grid item lg={10}>
                            <Typography className={classes.name}>{row.name}</Typography>
                        </Grid>
                    </Grid>
                    </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                    <Typography color="primary" variant="subtitle2">{row.jobTitle}</Typography>
                    <Typography color="textSecondary" variant="body2">{row.company}</Typography>
                </TableCell>
                <Button>Load Profile</Button>
            </TableRow>
            ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
    </Table>
    </TableContainer>
);
}

export default StudentTable;