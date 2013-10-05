exports.todo = function (app, acl) {
    var items = [{name:"item1"}];
    app.get("/api/todo/items", acl.middleware(), function(req, res){
        res.json(items);
        res.end();
    });
    app.post("/api/todo/item/add", acl.middleware(), function(req, res){
        items.push({name:req.body.name});
        res.end();
    });
};