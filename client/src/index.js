import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import deepPurple from '@material-ui/core/colors/deepPurple'
import cyan from '@material-ui/core/colors/cyan'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {Paper} from '@material-ui/core'
import {BrowserRouter}from 'react-router-dom'


const theme = createMuiTheme({
    palette:{
        primary:deepPurple,
        secondary:cyan,
        type:'dark',
        background:{paper:'#303030'}
    }
})


ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <Paper style={{height:"100vh", overflowY:'scroll'} }>
                    <App/>
                </Paper>
            </ThemeProvider>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
)
