const express = require('express');
const app = express()

app.use(require('./login'))
app.use(require('./register'))
app.use(require('./upload'))
app.use(require('./home'))
app.use(require('./post'))
app.use(require('./search'))
app.use(require('./delete'))
app.use(require('./update'))
app.use(require('./whoami'))
app.use(require('./updatePP'))
app.use(require('./updateLikes'))
app.use(require('./searchPostsByUser'))
app.use(require('./searchUser'))
app.use(require('./postMessage'))
app.use(require('./updateProfile'))

module.exports = app;