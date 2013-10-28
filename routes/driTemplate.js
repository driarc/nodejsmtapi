'use strict';

var cheerio = require('cheerio')
  , fs = require('graceful-fs')
  , walk = require('walk')
  , moment = require('moment')
  , config = require('../config.js')
  , HashMap = require('hashmap').HashMap
  , lookupDir = config.LOOKUP_DIR
  , $ = undefined;

exports.buildTemplate = function(req, res) {
	console.log('buildTemplate hit!, parameters are ' + JSON.stringify(req.body));
	var parameters = req.body;

	buildTemplate(parameters, function(results) {
		console.log(JSON.stringify(results));
		res.send(results);
		res.end();
	});
}

function buildTemplate(parameters, callback) {
	var masterWml = parameters.wmlfilename;
	var results = {};
	results.success = false;
	console.log('**driTemplate.buildTemplate** Getting file contents of - ' + masterWml);
	var masterContents = findAndReadFile(lookupDir, masterWml);

	// find [[<wmlFileName>]] tags and replace with contents of <wmlFileName>.wml
	var regex = new RegExp('\\[\\[', 'g')
	  , nextWml = ''
	  , masterPath = ''
	  , result;

	console.log('**driTemplate.buildTemplate** Starting to handle [[<wml>]] tags');
	while ((result = regex.exec(masterContents))) {
		nextWml = result.substr(2, result.indexof(']]'));  // remove [[ and ]]
		console.log('**driTemplate.buildTemplate** Replacing ' + result + ' tag.');
		masterContents.replace(result, findAndReadFile(lookupDir, nextWml + '.wml'));
	}
	console.log('**driTemplate.buildTemplate** Finished handling [[<wml>]] tags');

	// in here cheerio can take the entire codefile and modify it through it's jQuery interface
	$ = cheerio.load(masterContents, {
	    ignoreWhitespace: true,
	    xmlMode: false
	});

	// save codeFile aggregation under original <masterWml>.html in the same directory as <masterWml>.wml
	masterPath = findAndReadFile(lookupDir, masterWml, true);
	fs.writeFile(masterPath + '/' + masterWml + '.html', masterContents, function(err) {
		if (err) { throw err; }
		console.log('**driTemplate.buildTemplate** Created ' + masterPath + '/' + masterWml + '.html file.');

		results.success = true;
		results.htmlfile = masterPath + '/' + masterWml + '.html';
	});

	callback(results);
}

function buildAllTemplates() {  // don't know if we want to do this as there will be master wml files and partial wml files.
	var walker  = walk.walk(lookupDir, { followLinks: false });

	walker.on('file', function(path, fileStats, next) {
		if (fileStats.name.endsWith('.wml')) { buildTemplate({wmlfilename:fileStats.name}); }
	    next();
	});
}

function findAndReadFile(startDir, fileName, returnPath) {
	returnPath = returnPath || false;
	var walker = walk.walk(startDir, {followLinks: false });	
	walker.on('file', function(path, fileStats, next) {
		if (fileStats.name.substr(0, fileStats.name.indexof('.'))) {
			if (returnPath) { return path; }
			else { return fs.readFileSync(path + '/' + fileStats.name); }
		}
	});
}