import React,{useState,useEffect} from 'react';
import {Grid, Card, CardContent, CardHeader, CardActions, Typography, TextField , Avatar, IconButton, Collapse} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx'
import Comment from './comment'
import axios from 'axios'
import qs from 'querystring'
import InsertCommentIcon from '@material-ui/icons/InsertComment';

const useStyles = makeStyles((theme)=>({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  iconButtonLabel: {
    display: 'flex',
    flexDirection: 'row',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  
}))




function ShowPosts(props){

    const classes = useStyles();

    const [post,setPost] = useState([])

    const [expanded, setExpanded] = useState(true);

    const [comment,setComment] = useState('')

    const handleExpandClick = () =>{
        setExpanded(!expanded)
    }

    useEffect(()=>{
        props.isOther()
        const endpoint = `/api/posts/${props.match.params.id}`
        fetch(endpoint).then(f => 
            f.ok?
                f.json().then(res =>{
                    const show = res.post;
                    show.comments = show.comments.reverse()
                    setPost(show)})
                :setPost(() => [])
        )
        
    }, [setPost, props])


    const handleChange = (event)=>{
        setComment(event.target.value)
    } 

    const handleSubmit = async (event)=>{
        if(event.key==='Enter'){
            const body= {
                comment:comment,
                usrId:props.usr._id,
                usrName:props.usr.username,
                usrPic:props.usr.profPic,
            }
            const config ={
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }
            axios.put(`/api/post/comments/${post._id}`,qs.stringify(body),config)
            .then(res =>{
                const show = res.data.post;
                show.comments = show.comments.reverse() 
                setPost(show)
                setComment('')      
            })
            .catch(err => console.log(err))

            

        }
    }

    return (
        <Grid container direction="column" alignItems="center">{post? 
            <Grid container direction="column" alignItems="center">
                <Grid item>
                <img src={post.filepath} style={{width:'100%',border:'3px solid black'}}/>
                </Grid>
            <Grid item>
                
                <Card variant="outlined" style={{minWidth:'70vw',maxWidth:'80vw'}}>
                    <CardHeader title={post.title}  subheader={`@${post.publisher}`}
                    avatar={<Avatar src={post.publisherPic} className={classes.large}></Avatar>}
                    />
                    <CardContent>
                        <Typography variant="h5">{post.description}</Typography>
                    </CardContent>
                    <CardActions>
                        
                        <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                          })}
                          classes={{label:classes.iconButtonLabel}}
                          onClick={handleExpandClick}
                        >
                            <ExpandMoreIcon/>
                            <InsertCommentIcon/>
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <TextField value={comment} onChange={handleChange} onKeyPress={handleSubmit} label="Put your comment here! Up to 80 characters" fullWidth variant="filled" inputProps = {{maxLength:80}}></TextField>
                            {post.comments? post.comments.map(com => <Comment comment={com}/>):<div></div>}
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
            </Grid>
            : 'Not Found'}</Grid>
    )

}

export default ShowPosts