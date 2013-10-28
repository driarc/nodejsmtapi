'use strict';

var cheerio = require('cheerio')
  , fs = require('graceful-fs')
  , find = require('findit')
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
	var wmlFile = findAndReadFile(lookupDir, masterWml);
	var masterContents = wmlFile.contents;
	console.log('** retrieved contents of ' + masterWml + '.wml are => ' + masterContents);

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
	htmlPath = wmlFile.path.replace('.wml', '.html');
	console.log('htmlPath was resolved as ' + htmlPath);
	fs.writeFile(htmlPath, masterContents, function(err) {
		if (err) { throw err; }
		console.log('**driTemplate.buildTemplate** Created ' + htmlPath + ' file.');

		results.success = true;
		results.htmlfile = htmlPath;
	});

	callback(results);
}

function buildAllTemplates() {  // don't know if we want to do this as there will be master wml files and partial wml files.
	// TODO : change from walk to find code
	var walker  = walk.walk(lookupDir, { followLinks: false });

	walker.on('file', function(path, fileStats, next) {
		if (fileStats.name.endsWith('.wml')) { buildTemplate({wmlfilename:fileStats.name}); }
	    next();
	});
}

function findAndReadFile(startDir, fileName) {
	var finder = find(startDir);
	finder.on('file', function(file, stat) {
		if (file.endsWith(fileName + '.wml')) {
			return { path:file, contents:fs.readFileSync(file) };
		}
	});

	// var walker = walk.walk(startDir, {followLinks: false });	
	// walker.on('file', function(path, fileStats, next) {
	// 	console.log('** walker walking on ' + path + fileStats.name + ' **');
	// 	if (fileStats.name === fileName + '.wml')
	// 		if (returnPath) { return path; }
	// 		else {
	// 			console.log('**driTemplate.buildTemplate** Getting file contents of ' + path + fileStats.name);
	// 			return fs.readFileSync(path + fileStats.name);
	// 		}
	// 	}
	// });
}