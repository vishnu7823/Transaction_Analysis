const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://vishnu7823:Classic350%24@vishnu-cluster.wayza86.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=Transctionanalysis', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(cors()); 
// Define routes
app.use('/api', require('../Routes/index'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
