let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

//connect to a database
mongoose.connect('mongodb://test:test@ds159489.mlab.com:59489/todoapp');

//create a schema
let todoSchema = new mongoose.Schema({
    item: String
});

//model
let Todo = mongoose.model('Todo',todoSchema );
/*et itemOne = <4Todo({item: 'buy flowers'}).save(function (err) {
    if(err) throw err;
    console.log('items saved');
});*/

let urlencodedParser = bodyParser.urlencoded({extended: false});

//let data = [{item: 'get some milk'}, {item: 'make coffee'}, {item: 'take a nap'}];
/* GET home page. */
router.get('/', function(req, res, next) {
    //get data from mongodb and pass it to a view
    Todo.find({}, function (err, data) {            //{} -> all items or one item: 'buy flowers;
        if(err) throw err;
        res.render('todo', { todos: data});
    });

});

router.post('/',urlencodedParser, function (req, res) {
    //get data from a view and add it to mongodb
    let newTodo = Todo(req.body).save(function (err, data) {
       if(err) throw err;
       res.json(data);
    });
});

router.delete('/:item', function (req, res) {
    //delete requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err, data) {
        if (err) throw err;
        res.json(data);
    });
    /* data = data.filter(function (<4todo) {
        return <4todo.item.replace(/ /g, '-') !== req.params.item;
     });
     res.json(data);*/
});

module.exports = router;
