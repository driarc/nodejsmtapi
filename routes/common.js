// Common to All Routes here

// home page :: just for testing
exports.index = function(req, res) {
    res.render('index.html');
};


// test page for testing the executeThis API
exports.test = function(req, res) {
    res.render('testapi.html');
};

// test page for testing the updateThis API
exports.updateWidTest = function(req, res) {
    res.render('updateWidTest.html');
};