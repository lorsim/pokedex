import { useState } from 'react'
import { alpha, makeStyles } from '@material-ui/core/styles'
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
    Button,
    TextField
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
 
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
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'blue',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    },
    searchContainer: {
        display: 'flex',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        paddingLeft: '20px',
        paddingRight: '20px',
        marginTop: '5px',
        marginBottom: '5px',
    },
    searchIcon: {
        alignSelf: 'flex-end',
        marginBottom: '5px',
    },
    searchInput: {
        width: '200px',
        margin: '5px',
    }
}));
  

  const PokemonList = ({ pokemons, pokemonDetails }) => {
   
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [filter, setFilter] = useState('') 

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
      
    const handleSearchChange = (event) => {
       setFilter(event.target.value) 
    }
    return (
        <>
            <div className="container">
              <div className="left-content">
                <h1>Pokemons</h1>
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <div className={classes.searchContainer}>
                                        <SearchIcon className={classes.searchIcon}/>
                                        <TextField onChange={handleSearchChange} className={classes.searchInput}/>
                                    </div>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableHeaderCell}>Avatar</TableCell>
                                    <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                                    <TableCell className={classes.tableHeaderCell}>Type</TableCell>
                                    <TableCell className={classes.tableHeaderCell}>Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pokemons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                    row.name.includes(filter) &&
                                    <TableRow key={row.index}>
                                        <TableCell>
                                            <Grid container>
                                                <Grid item lg={10}>
                                                    <Typography className={classes.name}> <img src={row.sprites.other.dream_world.front_default} alt={row.name} /></Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="primary" variant="subtitle2">{row.name}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                className={classes.name}
                                            >{row.types[0].type.name}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                className={classes.status}
                                            ><Button onClick={()=>pokemonDetails(row)}>View</Button></Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TablePagination
                                    rowsPerPageOptions={[10, 20, 50]}
                                    component="div"
                                    count={pokemons.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage} />
                            </TableFooter>
                        </Table>
                    </TableContainer>
              </div>
            </div>
        </>
    )
}

export default PokemonList
