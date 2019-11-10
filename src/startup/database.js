
const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb+srv://thiago:0123654@nodestr-gau4c.azure.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => console.log('Connected to Mongo!'));
};