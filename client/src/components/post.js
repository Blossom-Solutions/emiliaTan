import React, {Component} from 'react';
import {Grid, TextField,Typography, Button, CircularProgress} from '@material-ui/core';
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class Post extends Component{

    constructor(props){
        super(props);
        this.state = {
            title: "",
            author: "",
            tags: "",
            description: "",
            selectedFile: null,
            loading:false
        }
    }

    fileChangedHandler = (event)=>{
        this.setState({selectedFile: event.target.files[0]})
    }

    onChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit = async (e)=>{
        e.preventDefault()
        this.setState({loading:true})
        const formData = new FormData();
        formData.append('title',this.state.title);
        formData.append('author',this.state.author);
        formData.append('tags',this.state.tags);
        formData.append('description',this.state.description);
        formData.append('postImage',this.state.selectedFile);
        formData.append('publisher',this.props.usr.username);
        formData.append('publisherPic',this.props.usr.profPic);
        formData.append('publisherId',this.props.usr._id)
        await axios.post('/api/upload',formData)
        this.setState({loading:false})
        await this.props.history.push('/main')
        await this.props.mainFunc()
       
        
    }


    componentDidMount(){
        this.props.isOtherFunc()
    }

    




    render(){
        return (
            <form onSubmit={this.onSubmit} style={{marginTop:'2em'}}>
                <Grid container direction="column" alignItems="center"  spacing={2}>
                    <Grid item>
                        <Typography variant="h4" color="textPrimary">Post your photo here</Typography>
                    </Grid>
                    <Grid item>
                        <TextField name="title" 
                        value={this.state.title}
                        onChange={this.onChange}
                        fullWidth label="Title"
                         required placeholder="Put your title here~" 
                         variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextField name="tags" label="tags" 
                        value={this.state.tags}
                        fullWidth
                        onChange={this.onChange}
                        variant="outlined" placeholder="Separated by spaces~"/>
                    </Grid>
                    <Grid item>
                        <TextField name="author" label="author" 
                        value={this.state.author}
                        fullWidth
                        onChange={this.onChange}
                        variant="outlined" placeholder="You can give credits here~"/>
                    </Grid>
                    <Grid item>
                        <TextField name="description" label="Description" 
                        value={this.state.description}
                        fullWidth
                        onChange={this.onChange}
                        multiline rowsMax={4} variant="outlined" 
                        placeholder="Put your description here~" />
                    </Grid>
                    <Grid item>
                        <input id="button-file" name="file" 
                        accept="image/*" type="file" style={{display:'none'}} 
                        onChange={this.fileChangedHandler}/>
                        <label htmlFor="button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload Image
                            </Button>
                        </label>
                        <Button type="submit" variant="contained" color="secondary">Post it!</Button>
                    </Grid>
                    {this.state.loading && <div style={{
                        width: "100%",
                        height: "100",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                        }} ><CircularProgress /></div> }
                </Grid>
            </form>
        )
    }
}

export default withRouter(Post)