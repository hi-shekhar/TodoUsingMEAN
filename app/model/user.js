var mongoose = require('mongoose');
var todoElementSchema = mongoose.Schema;

var todoSchema = new todoElementSchema({
  itemArray:[],
  tempItemArray:[]
});

// compile our model
module.exports = mongoose.model('todoElement',todoSchema);