import React, {useState, useEffect} from 'react'
import {Grid,Typography,Button} from '@material-ui/core'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import axios from 'axios';


export default function Profile(props) {

    const [file,setFile] = useState(null)

    useEffect(()=>{
        props.isOther()
    },[])

    const handleFile = (event)=>{
        setFile(event.target.files[0])
    }

    function onSubmit(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append('newPic',file);
        axios.put(`/api/user/${props.usr._id}`,formData)
        .then(res =>{ 
        props.updateProf(res.data)
        })
        .catch(err=>console.log(err))
        
    }

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <img src={props.usr.profPic} style={{height:'200px',width:'200px',borderRadius:'100%',marginTop:'20px',border:'2px solid gray'}}/>
            </Grid>
            <Grid item>
                <form onSubmit={onSubmit}>
                    <input type="file" accept="image/*" onChange={handleFile} id="updatePP" style={{display:'none'}}/>
                    <label htmlFor="updatePP">
                        <Button  color="secondary" component="span"><AddPhotoAlternateIcon/></Button>
                    </label>
                    <Button type="submit">update</Button>
                </form>
            </Grid>
            <Grid item>
                <Typography>{`@${props.usr.username}`}</Typography>
            </Grid>
        </Grid>
    )
}