import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import qs from 'querystring'


export default function UpdateDialog(props){
    const [open,setOpen] = useState(false)
    const [title,setTitle] = useState(props.post.title)
    const [description,setDescription] = useState(props.post.description)
    const [tags,setTags] = useState(props.post.tags.join(' '))
    const handleOpen = ()=>{
        setOpen(true)
        
    }

    const handleClose = ()=>{
        setOpen(false)
        props.closeMenu()
    }

    const changeTitle = (e)=>{
        setTitle(e.target.value)
    }

    const changeDescription = (e)=>{
        setDescription(e.target.value)
    }

    const changeTags = (e)=>{
        setTags(e.target.value)
    }

    const handleUpdate = async ()=>{
        let body ={
            title: title,
            description:description,
            tags:tags
        }
        let config ={
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }

        await axios.put(`/api/posts/${props.post.id?props.post.id:props.post._id}`,qs.stringify(body),config)
        .then(res=>{
            props.update(res.data)
            handleClose()
        })
        .catch(err=> console.log(err))
    }

    return(
        <div>
            <Button disableElevation disableFocusRipple disableRipple  onClick={handleOpen}>Edit</Button>
            <Dialog 
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>Modify your post here</DialogContentText>
                    <TextField required fullWidth label="Post Title"  variant="filled" value={title} onChange={changeTitle} />
                    <TextField required fullWidth label="Post Tags" variant="filled" value={tags} onChange={changeTags} />
                    <TextField required fullWidth multiline rows={4} variant="filled" label="Post Description" value={description} onChange={changeDescription} />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}