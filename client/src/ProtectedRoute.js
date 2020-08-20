import React from 'react'
import {Route, Redirect,withRouter} from 'react-router-dom'

const ProtectedRoute =({component: Component, loggedIn,user,...rest})=>{
    return(
        <Route {...rest} render={
            props => {
            if(loggedIn){
                return <Component {...rest} loggedIn={loggedIn} user={user.user} {...props}/>
            } else{
                return <Redirect to={'/'}/>
            }
        }
        }
        />
    )
}

export default withRouter(ProtectedRoute);