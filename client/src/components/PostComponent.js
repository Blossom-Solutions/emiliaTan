import React from 'react'
import {Grid} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import Chip from '@material-ui/core/Chip';
import {Link} from 'react-router-dom'
import axios from 'axios'
import qs from 'querystring'
import Tooltip from '@material-ui/core/Tooltip'
import {withRouter} from 'react-router-dom'
import UpdateDialog from './updateDialog'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

 function PostComponent({post,usr,handleDel}) {

    const [disableLike,setDisableLike] = React.useState(false)
    const [liked,setLiked] = React.useState('white')
    const [likes,setLikes] = React.useState(post.likes.length)
    const [somePost,setSomePost] = React.useState(post)

    const  handleLike = async () =>{
        if(!somePost.likes.includes(usr._id)){
            await axios.put(`/api/post/${somePost.id?somePost.id:somePost._id}`,
            qs.stringify({likes:usr._id}),
            {headers:{'Content-Type':'application/x-www-form-urlencoded'}})
            .then(res => {
                setLiked('crimson')
                setLikes(res.data.post.likes.length)
                setSomePost(res.data.post)
            })
            .catch(err =>console.log(err))
        } else{
            
            await axios.put(`/api/post/likes/${somePost.id?somePost.id:somePost._id}`,
            qs.stringify({likes:usr._id}),
            {headers:{'Content-Type':'application/x-www-form-urlencoded'}}
            )
            .then(res=>{
                setLiked('white')
                setLikes(res.data.post.likes.length)
                setSomePost(res.data.post)
            })
            .catch(err=> console.log(err))
        }
    }

   

    React.useEffect(()=>{
       if(somePost !== null) {
        if(somePost.likes.includes(usr._id)){
            setLiked('crimson')
        } else{
            setLiked('white')
        }
    }})

    const handleDelete = async ()=>{
        await axios.delete(`/api/posts/${somePost.id || somePost._id}`)
        .then(res => {
            handleDel(post)
            setSomePost(null)})
        .catch(err=> console.log(err))
    }
    if(somePost !== null){
    return (
        <Grid item xs={12} sm={6} key={somePost.id}>
            <Card variant="outlined" style={{boxShadow:'2px 2px #888888',marginTop:'10px'}}>
                <CardHeader avatar={
                    <Avatar src={somePost.publisherPic}></Avatar>
                }
                action={somePost.publisherId===usr._id ?
                    <PopupState variant="popover" >
                        {(popupState) => (
                            <React.Fragment>
                            <IconButton {...bindTrigger(popupState)}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem style={{padding:0}}><UpdateDialog update={setSomePost} post={somePost} closeMenu={popupState.close}/></MenuItem>
                                <MenuItem onClick={handleDelete} style={{color:'crimson'}}>Delete</MenuItem>
                            </Menu>
                            </React.Fragment>
                        )}
                        </PopupState>
                    
                    : null
                }
                title={somePost.title}
                subheader={<Link to={`/main/profile/${somePost.publisherId}`}>{`@${somePost.publisher}`}</Link>}
                />
                <Tooltip title="show full picture" placement="bottom" arrow><Link to={`/main/posts/${somePost._id? somePost._id : somePost.id}`}><CardMedia image={somePost.filepath} style={{height:'0',paddingTop:'75%'}}>
                </CardMedia></Link></Tooltip>
                <CardContent>
                {somePost.tags[0] ? somePost.tags.map(tag => <Chip color="secondary" label={tag}/>):<Chip color="secondary" label="No tags ☹"/>}
                <Typography variant="body1" color="textPrimary" component="p" style={{height:'6em',overflow:'hidden'}}>{somePost.description}</Typography>
                
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={handleLike} disabled={disableLike} style={{color:liked}} >
                        <FavoriteIcon/>
                    </IconButton>
                    
                    <Typography variant="caption" color="textSecondary" display="inline" align="right">{`${somePost.likes ? likes:0} Likes   ${somePost.comments ? somePost.comments.length:0} comments`}</Typography>
                </CardActions>
                
            </Card>
        </Grid>
    )
}
  else{return <div></div>}
 }

export default withRouter(PostComponent)