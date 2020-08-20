import React, {Component} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import Main from './components/main'
import SignIn from './components/login'
import SignUp from './components/signup'
import axios from 'axios';
import qs from 'querystring'
import ProtectedRoute from './ProtectedRoute'
import LandingPage from './landingPage'
import NotFound from './notFound'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn:false,
            user:{}
        }
        this.handleSignup = this.handleSignup.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.checkLogin = this.checkLogin.bind(this)
    }

    handleSignup(data){
        localStorage.setItem('TOKEN',data.token)
        this.setState({loggedIn:true,user:data})
    }

    handleLogin(data){
        if(data.token){
            localStorage.setItem('TOKEN',data.token)
        }
        this.setState({loggedIn:true,user:data})
    }

    handleLogout = ()=>{
        localStorage.removeItem('TOKEN')
        this.setState({loggedIn:false,user:{}})
    }


    /*
    Retrieves the new Updated User, and updates the token
     */
    handleUpdate = (dataProf)=>{
        localStorage.setItem('TOKEN',dataProf.token)
        this.setState({user:{user:dataProf.result}})
    }

    


    checkLogin(){
        const myToken = localStorage.getItem('TOKEN')
        if(myToken){
            const reqBody = {
                token: myToken
            }
            const config={
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                withCredentials:true
            }
            axios.post('/api/whoami',qs.stringify(reqBody),config)
            .then(res =>{
                if(res.data.ok && !this.state.loggedIn){
                    this.setState({
                        loggedIn:true,
                        user:res.data
                    });
                    this.props.history.push('/main')
                }
            }).catch(err=> console.log(err))
        }
    }

    componentDidMount(){
        this.checkLogin()
    }

    render(){
        return (
            <Switch>
                <ProtectedRoute path='/main' component={Main} update={this.handleUpdate} logout={this.handleLogout} loggedIn={this.state.loggedIn} user={this.state.user}/>
                <Route exact path='/login' render={props =>(
                    <SignIn {...props} handleLogin={this.handleLogin} />
                )} />
                <Route exact path='/signup' render={props => (
                    <SignUp {...props} handleSignup={this.handleSignup} />
                )} />
                <Route exact path='/'>
                    <LandingPage/>
                </Route>
                <Route component={NotFound}/>
            </Switch>
                
        )
            
    
}
}

export default withRouter(App);