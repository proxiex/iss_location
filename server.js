const express = require('express');
const path = require('path');

const app = express();

console.log(__dirname+'/dist')
app.use(express.static(path.join(__dirname+'/dist')));
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname+'/dist/index.html'));
})

const port = process.env.PORT || 8080;

app.listen(port);
console.log('Server listening on PORT: ', port);
