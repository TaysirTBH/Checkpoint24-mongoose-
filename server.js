const express= require('express');
const app = express();
require('dotenv').config({ path: './config/.env' })

app.use(express.json());
//routes
app.use('/person', require('./routes/personRoutes'))

//routes
//app.use('/user', require('./routes/userRoutes'));


//connect database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {  
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then((res)=> console.log('database connected'))
    .catch((err) => console.log(err));

//create server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => 
        err ? console.log(err) 
        :console.log(`Server is running on port ${PORT}`));
