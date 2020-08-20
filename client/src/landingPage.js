import React from 'react'
import {Link} from 'react-router-dom'
import landingBackground from './landingBackground.jpg'
import {Grid,Typography,Button, List, ListItem,ListItemAvatar,ListItemText,Avatar} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import AddAPhotoTwoToneIcon from '@material-ui/icons/AddAPhotoTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles= makeStyles({
    palette:{
        text:{
            secondary:'#fff'
        }
    }
})

export default function LandingPage(){
    const classes = useStyles()
    return(
        <div style={{background:`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${landingBackground})`,height:'100vh',backgroundRepeat:'no-repeat',backgroundSize:'cover',overflow:'auto'}} >
            <Grid container direction="column" alignItems="center" className="mask rgba-black-light" spacing={3}>
                <Grid item >
                    <Typography variant="h4"  style={{marginTop:'30px',textShadow:'2px 2px #000'}}>
                        Welcome to Emilia-Tan!
                    </Typography>
                    
                </Grid>
                <Grid item>
                    <Typography variant="body1" align="center" color='textPrimary' style={{textShadow:'2px 2px #000',width:'90vw'}}>
                        Emilia-Tan is an Image Posting website, fully developed in ReactJS<br/>
                        You can Post any photo you want! GIFs Incluided 😃<br/>
                        Here's What you can do with Emilia-Tan
                    </Typography>
                    
                </Grid>
                <Grid item>
                    <List  style={{backgroundColor:'rgba(0,0,0,0.5)'}}> 
                        <ListItem>
                            <ListItemAvatar>
                                
                                    <AddAPhotoTwoToneIcon/>
                                
                            </ListItemAvatar>
                            <ListItemText secondaryTypographyProps={{color:'textPrimary'}}  primary="Upload Your Photos" secondary="You can upload everything you want, be it Pictures or even GIFS!"  />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <AccountCircleTwoToneIcon/>
                            </ListItemAvatar>
                            <ListItemText secondaryTypographyProps={{color:'textPrimary'}}  primary="Customize Your Profile" secondary="Upload your own profile pictures, change your username, and your friends can comment on your profile!"/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <SearchTwoToneIcon/>
                            </ListItemAvatar>
                            <ListItemText secondaryTypographyProps={{color:'textPrimary'}}  primary="Search what you like" secondary="You can search anything!, dogs, airplanes, landscapes. You name it, we get it"/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <FavoriteIcon/>
                            </ListItemAvatar>
                            <ListItemText secondaryTypographyProps={{color:'textPrimary'}} primary="Spread the love" secondary="If you like what you are seeing, leave the poster a Heart , we are sure he'll love it"/>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item>
                <Typography align="center" style={{textShadow:'2px 2px black'}} variant="overline">So... What are you waiting for? Jump in with us 💖</Typography>
                </Grid>
                <Grid item>
                    <Link to="/login"><Button variant="contained" color="secondary" style={{marginRight:'5px'}} >Log In</Button></Link>
                    <Link to="/signup"><Button variant="contained" color="secondary"  >Sign Up</Button></Link>
                </Grid>
            </Grid>
        </div>
    )
}