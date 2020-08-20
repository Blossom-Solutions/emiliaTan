import React from 'react';
import {AppBar,  Toolbar, makeStyles, Grid , Button, Menu , MenuItem} from '@material-ui/core';
import logo from '../logo.png'
import {Link,Redirect} from 'react-router-dom'

import Search from './Search'

const useStyles = makeStyles(theme => (
    {
        offset: theme.mixins.toolbar
    }
))

const NavBar = ({userProf,setQueryString,onMainClick,logout}) => {
    const classes = useStyles();

    const [anchorEl,setAnchorEl] = React.useState(null)

    function handleSearch(query) {
        setQueryString(query)
        onMainClick()
    }

    const handleMenu = e =>{
        setAnchorEl(e.currentTarget)
    }

    const handleClose = e =>{
        setAnchorEl(null)
    }

    return (
    <div className={classes.offset}> 
        <AppBar position="fixed" color="primary">
            <Toolbar>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item xs={6} sm={4} >
                        <Link to="/main" onClick={onMainClick} ><img src={logo} style={{height:'60px'}}/></Link>
                    </Grid>
                    <Grid item  xs={4} sm={6}  >
                        <Search  onSearch={handleSearch}/>
                    </Grid>
                    <Grid item  xs={2} sm={2}>
                        <Button onClick={handleMenu}  color="secondary">Menu</Button>
                        <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >
                            <MenuItem > <Link to={`/main/profile/${userProf._id}`} style={{color:'white',textDecoration:'none'}}>Profile</Link></MenuItem>
                            <MenuItem onClick={logout}>Log Out</MenuItem>
                            <MenuItem><Link to="/main/post" style={{textDecoration:'none',color:'white'}} >Post</Link></MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default NavBar