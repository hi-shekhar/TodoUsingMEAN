var todoElements = require('../model/user');

var todoElement = new todoElements();

module.exports = function (router) {
    router.post('/pushItem', function (req, res) {
        todoElement.itemArray.push(req.body.listitem);
        todoElement.save(function (err) {
            if (err) {
                res.json({
                    "success": false, "message": err
                });
            }
            else {
                res.json({
                    "success": true, "message": "Element added to array", "item": todoElement.itemArray
                });
            }
        });
    });

    router.post('/delItem', function (req, res) {
        var deletedValue = todoElement.itemArray[req.body.index];
        todoElement.itemArray.splice(req.body.index, 1);
        todoElement.save(function (err) {
            if (err) {
                res.json({
                    "success": false, "message": err
                });
            }
            else {
                res.json({ "success": true, "message": "Element deleted", "item": todoElement.itemArray , "deletedValue" : deletedValue });
            }
        });
    });

    router.post('/update',function(req,res){
        
        todoElement.tempItemArray[req.body.currentIndex] = todoElement.itemArray[req.body.updateIndex];
        todoElement.save(function(err){
            if (err) {
                res.json({
                    "success": false, "message": err
                });
            }
            else {
                res.json({ "success": true, "message": "Temp Array Updated", "item": todoElement.tempItemArray});
            }
        });
    });

    router.post('/changedData',function(req,res){
        todoElement.itemArray[req.body.updateIndex] = req.body.changedValue;
        todoElement.save(function(err){
            if (err) {
                res.json({
                    "success": false, "message": err
                });
            }
            else {
                res.json({ "success": true, "message": "Element Updated", "item": todoElement.itemArray});
            }
        });
    });

    router.post('/confirmed',function(req,res){
        todoElement.itemArray[req.body.updateIndex] = req.body.confirmedValue;
        todoElement.save(function(err){
            if (err) {
                res.json({
                    "success": false, "message": err
                });
            }
            else {
                res.json({ "success": true, "message": "Element Updated confirmed", "item": todoElement.itemArray});
            }
        });
    });
    //dataCancelChange

    router.post('/cancel',function(req,res){
        todoElement.itemArray.splice(req.body.cancelIndex, 1, todoElement.tempItemArray[req.body.cancelCurrentIndex]);
        todoElement.save(function(err){
            if (err) {
                res.json({
                    "success": false, "message": err
                });
            }
            else {
                res.json({ "success": true, "message": "Element Updated confirmed", "item": todoElement.itemArray});
            }
        });
    });
    return router;
}