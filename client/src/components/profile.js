import React, {useState, useEffect, useReducer ,useRef} from 'react';
import {Grid,Typography,Tabs,Tab,TextField,Button,Dialog,DialogActions,CircularProgress,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';
import axios from 'axios';
import qs from 'querystring';
import PostComponent from './PostComponent';
import Comment from './comment';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';




function reducer(state,{field,value}){
    return {
        ...state,
        [field]:value
    }
  }

export default function Profile(props) {

    const [userProfile,setUserProfile] = useState({
        username:'',
        createdAt:'',
        profPic:'',
        bio:'',
        comments:[],
    })
    const [userPosts,setUserPosts] = useState([])
    const [value,setValue] = useState(0)
    const [message,setMessage] = useState('')
    const [openDialog,setOpenDialog] = useState(false)
    const [loading,setLoading] = useState(false)
    const [profilePicture,setProfilePicture] = useState(null)
    const [data,dispatch] = useReducer(reducer,{
        username:'',
        bio:''
    })

    const someId = useRef(props.match.params.id)

    const onDelete = (del)=>{
        userPosts.splice(userPosts.indexOf(del),1)
        setUserPosts(userPosts)
    }

    const handlePicture = e =>{
        setProfilePicture(e.target.files[0])
    }

    const handleTabs = (event,newValue)=>{
        setValue(newValue)
    }

    const onProfileUpdate =(e)=>{
        dispatch({field:e.target.name,value:e.target.value})
    }

    const onProfileDialoge = ()=>{
        setOpenDialog(true)
    }

    const onProfileDialogueClose = ()=>{
        setOpenDialog(false)
    }

    const onProfileSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        if(profilePicture !== null){
            const formData = new FormData();
            formData.append('newPic',profilePicture)
            await axios.put(`/api/user/${props.match.params.id}/profilePicture`,formData)
            .catch(err=>console.log(err))
        }
        let body ={
            username:data.username,
            bio:data.bio
        }
        let config ={
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        }
        await axios.put(`/api/user/${props.match.params.id}`,qs.stringify(body),config)
        .then(res =>{
            setLoading(false)
            let newUser = res.data.res
            newUser.comments = newUser.comments.reverse()
            setUserProfile(newUser)
            props.onUpdate(res.data)
            onProfileDialogueClose()
        })
        .catch(err => console.log(err))
        
    }

    

    const handleMessageSubmit = e =>{
        if(e.key==='Enter'){
            let body ={
                message:message,
                id:props.usr_id,
                usrPic:props.usr.profPic,
                username:props.usr.username
            }
            let config={
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }

            axios.put(`/api/users/${props.match.params.id}/comments`,qs.stringify(body),config)
            .then(res =>{
                let userData = res.data
                userData.comments = userData.comments.reverse()
                setUserProfile(userData)
                setMessage('')
            })
            .catch(err=>console.log(err))
        }
    }

    function UserPosts(props){
        const {del,user, post,value,index,...other} = props;
        
        return(
            <Grid container direction="row" spacing={2} style={{minWidth:'70vw'}}
            hidden={value!==index}
            >   
                
                {value===index && (
                    post.length ? post.map(element=> <PostComponent handleDel={del} usr={user} post={element} />) : <p>This user hasn't posted yet.</p>
                )}
            </Grid >
        )
    }

    function UserComments(props){
        const {comments,value,index} = props;

        const handleMessage = e =>{
            setMessage(e.target.value)
        }

        return(
            <Grid item hidden={value!==index}>
                {value===index &&(
                    <TextField onKeyPress={handleMessageSubmit} style={{marginBottom:'15px'}} autoFocus onChange={handleMessage} value={message} fullWidth label="Leave a comment" />
                )}
                {
                    value===index && (
                        comments.length? comments.map(element => <Comment comment={element} />) : <p>This user Doesn't Have Any Comments Yet 😔 Leave him one!</p>
                    )
                }
            </Grid>
        )
    }



    

    useEffect(()=>{
        props.isOther()
        let id = props.match.params.id
        const fetchUser = async (id) =>{
            await axios.get(`/api/users/${id}`)
            .then(res =>{
                let userData = res.data.user
                userData.comments = userData.comments.reverse()
                setUserProfile(userData)
                dispatch({field:'username',value:userData.username})
                dispatch({field:'bio',value:userData.bio})
            })
            .catch(err=>console.log(err))
        }

        const fetchUserPost = async (id) =>{
            await axios.get(`/api/users/${id}/posts`)
            .then(res =>setUserPosts(res.data.posts))
            .catch(err=>console.log(err))
        }
        fetchUser(id);
        fetchUserPost(id);
        

    },[props.match.params.id])

   

    return (
        <Grid container direction="column" alignItems="center" justify="center" spacing={3}>
            <Grid item>
                <img src={userProfile.profPic} className="rounded-circle img-fluid" alt={userProfile.username} style={{marginTop:'10px',width:'200px',height:'200px',objectFit:'cover',border:'3px solid purple'}}/>
            </Grid>
            <Grid item>
                <Typography variant="h6" color="primary">{`@${userProfile.username}`}</Typography>
            </Grid>
            <Grid item>
                <Button variant="text" color="secondary" component="span">
                    <InsertEmoticonOutlinedIcon/>
                    My Bio
                </Button>
            </Grid>
            <Grid item >
                <Typography variant="body1" align="center" >{userProfile.bio}</Typography>
            </Grid>
            <Grid item>
                {props.usr._id === props.match.params.id ? <Button variant="outlined" color="secondary" onClick={onProfileDialoge}>update your profile</Button> : null}
            </Grid>
            <Dialog open={openDialog} onClose={onProfileDialogueClose}>
                <DialogTitle>Update your Profile</DialogTitle>
                <DialogContent>
                    <form onSubmit={onProfileSubmit}>
                        <TextField fullWidth value={data.username} name="username" onChange={onProfileUpdate} label="Username"/>
                        <TextField autoFocus fullWidth value={data.bio} name="bio" onChange={onProfileUpdate} label="Bio" multiline rows={4}/>
                        <input id="profile-file" name="file" 
                        accept="image/*" type="file" style={{display:'none'}} 
                        onChange={handlePicture}/>
                        <label htmlFor="profile-file" style={{marginTop:'10px'}}>
                            <Button variant="contained" color="primary" component="span">
                                Upload Image
                            </Button>
                        </label>
                        <Button type="submit" variant="contained" color="secondary">Update</Button>
                    </form>
                </DialogContent>
            </Dialog>
            {loading && <div style={{
                        width: "100%",
                        height: "100",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                        }} ><CircularProgress /></div> }
            <Grid item>
                <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleTabs}
                >
                    <Tab label="Posts" />
                    <Tab label="Comments" />
                </Tabs>
                
            </Grid>
            <UserPosts del={onDelete} user={props.usr}value={value} post={userPosts} index={0} />
            <UserComments comments={userProfile.comments} value={value} index={1} />
            
        </Grid>
    )
}