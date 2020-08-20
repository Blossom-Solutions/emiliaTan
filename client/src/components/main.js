import React, {Component} from 'react'
import {Grid} from '@material-ui/core'
import NavBar from './navbar'
import Home from './home'
import { Route} from 'react-router-dom';
import Post from './post'
import ShowPosts from './showPosts';
import Profile from './profile.js'


class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            queryString: '',
            isOther: false
        }
        
    }

    isOtherFunc = () =>{
        if(!this.state.isOther){
        this.setState({isOther:true})
        }
    }

    isMainFunc = () =>{
        if(this.state.isOther){
            this.setState({isOther:false})
        }
    }

   

    

    

    render(){
        return (
            
                <Grid container direction="column" >
                    
                    <Grid item>
                        <NavBar onProfClick={this.toggleProf} userProf={this.props.user} onMainClick={this.isMainFunc} logout={this.props.logout} setQueryString={(qs) => {
                            this.setState({
                                queryString: qs
                            })
                        }}/>
                    </Grid>
                    <Grid item container >
                        <Grid item xs={false} sm={2}/>
                        <Grid item xs={12} sm={8}>
                                <Route path="/main/profile/:id" render={props=> <Profile {...props}   onUpdate={this.props.update} usr={this.props.user} isOther={this.isOtherFunc} />}/>
                                <Route path="/main/post"  component={()=> <Post usr={this.props.user} mainFunc={this.isMainFunc} isOtherFunc={this.isOtherFunc}/>}/>
                                <Route path="/main/posts/:id"  render={(props)=> <ShowPosts {...props} usr={this.props.user} isOther={this.isOtherFunc} />}/>
                                {!this.state.isOther  ? <Home usr={this.props.user} query={this.state.queryString}/>:<div></div> }
                        </Grid>
                        <Grid item xs={false} sm={2}/>
                        
                    </Grid>
                </Grid>
        )
            
    
}
}

export default Main;