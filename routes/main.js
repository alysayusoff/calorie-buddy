module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index.html", {
            title: "CalorieBuddy"
        });
    });
    app.get("/about", function (req, res) {
        res.render("about.html", {
            title: "About CalorieBuddy"
        });
    });
    app.get("/addfood", function (req, res) {
        res.render("insert.html", {
            title: "Add Food Information"
        });
    });
    app.post("/foodadded", function (req, res) {
        // saving data in database
        let sqlquery = "INSERT INTO ingredients (name, val, unit, cal, carb, fat, protein, salt, sugar) VALUES (?,?,?,?,?,?,?,?,?)";
        // execute sql query
        let newrecord = [req.body.name, req.body.val, req.body.unit, req.body.cal, req.body.carb, req.body.fat, req.body.protein, req.body.salt, req.body.sugar];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                res.send("Record failed to be added.");
                return console.error(err.message);
            } else
                res.send("Food has been added to database!");
        });
    });
    app.get("/search", function (req, res) {
        res.render("search.html", {
            title: "Search Food Information"
        });
    });
    app.get("/search-result", function (req, res) {
        //searching in the database
        let sqlquery = "SELECT * FROM ingredients WHERE name like '%" + req.query.keyword + "%' ORDER BY name";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                return console.error("No ingredient found with the keyword you have entered" + req.query.keyword + "error: " + err.message);
            } else {
                if (result.length == 0) {
                    res.send(req.query.keyword + " not found in database!");
                }
                else {
                    res.render("list.html", { availableFood: result });
                }
            }
        });
    });
    app.get("/update", function (req, res) {
        //searching in the database
        let sqlquery = "SELECT * FROM ingredients WHERE id = " + req.query.update;
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                return console.error("No ingredient found with the keyword you have entered"
                    + req.query.keyword + "error: " + err.message);
            } else {
                res.render("update.html", { availableFood: result });
            }
        });
    });
    app.post("/foodupdated", function (req, res) {
        //updating data in database
        let sqlquery = "UPDATE ingredients SET name = ?, val = ?, unit = ?, cal = ?, carb = ?, fat = ?, protein = ?, salt = ?, sugar = ? WHERE id = ?";
        let newrecord = [req.body.name, req.body.val, req.body.unit, req.body.cal, req.body.carb, req.body.fat, req.body.protein, req.body.salt, req.body.sugar, req.body.id];
        // execute sql query
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                res.send("Food failed to update.");
            } else
                res.send("Food has been updated!");
        });
    });
    app.get("/list", function (req, res) {
        // query database to get all the books
        let sqlquery = "SELECT * FROM ingredients ORDER BY name";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect("/");
            } else
                res.render("list.html", { availableFood: result });
        });
    });
    app.post("/delete", function (req, res) {
        //delete data in database
        let sqlquery = "DELETE FROM ingredients WHERE id = " + req.body.delete;
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.send("Record failed to be deleted.");
            } else
                res.send("Record has been deleted!");
        });
    });
    /*app.get("/recipe", function (req, res) {
        // query database to get all the books
        let sqlquery = "SELECT * FROM ingredients ORDER BY name";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect("/");
            } else
                res.render("recipe.html", { availableFood: result });
        });
    });*/
}