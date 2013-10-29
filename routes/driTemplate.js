'use strict';

var cheerio = require('cheerio')
  , fs = require('graceful-fs')
  , find = require('findit')
  , config = require('../config.js')
  , lookupDir = config.LOOKUP_DIR
  , $ = undefined
  , masterContents;

exports.buildTemplate = function(req, res) {
	console.log('buildTemplate hit!, parameters are ' + JSON.stringify(req.body));
	var parameters = req.body;

	getWmlTags(parameters.wmlfilename, function(tags) {
		console.log('tags found => ' JSON.stringify(tags));
		for (var i = 0; i < tags.length; i++) {
			var nextWml = tags[i].replace('[[', '').replace(']]', '');
			findAndReadFile(lookupDir, nextWml, replaceWmlTag(file, tags[i]));
		}

		// save codeFile aggregation under original <masterWml>.html in the same directory as <masterWml>.wml
		var htmlPath = file.path.replace('.wml', '.html');
		console.log('**driTemplate.buildTemplate** Attempting to create file => ' + htmlPath);
		fs.writeFile(htmlPath, masterContents, function(err) {
			if (err) { throw err; }

			console.log('**driTemplate.buildTemplate** Created file => ' + htmlPath);

			res.end();
		});
	});
}

function getWmlTags(filename, callback) {
	findAndReadFile(lookupDir, filename, function(file) {
		masterContents = file.contents.toString();

		var regex = new RegExp('\\[.*]', 'g')
		  , wmlTags = []
		  , result;

		console.log('**driTemplate.buildTemplate** Starting to gather [[<wml>]] tags');
		while ((result = regex.exec(masterContents))) {
			wmlTags.push(result.toString());
		}
		console.log('**driTemplate.buildTemplate** Finished gathering [[<wml>]] tags');

		callback(wmlTags);
	});
}

function replaceWmlTag(file, tag) {
	console.log('replaceWmlTag recieved this file => ' + file.path + ' and tag => ' + tag);
	masterContents.replace(tag, file.contents);
}

function findAndReadFile(startDir, fileName, callback) {
	var finder = find(startDir);
	finder.on('file', function(file, stat) {
		if (file.endsWith(fileName + '.wml')) {
			callback({ path:file, contents:fs.readFileSync(file).toString() });
		}
	});
}

// function buildTemplate(parameters, callback) {
// 	var masterWml = parameters.wmlfilename;

// 	findAndReadFile(lookupDir, masterWml, function(file) {
// 		var wmlFile = file;
// 		var masterContents = wmlFile.contents;

// 		console.log('** retrieved contents of ' + masterWml + '.wml => ' + masterContents);

// 		// // find [[<wmlFileName>]] tags and replace with contents of <wmlFileName>.wml
// 		// var regex = new RegExp('\\[.*]', 'g')
// 		//   , nextWml = ''
// 		//   , masterPath = ''
// 		//   , result;

// 		// console.log('**driTemplate.buildTemplate** Starting to handle [[<wml>]] tags');

// 		// while ((result = regex.exec(masterContents))) {
// 		// 	var stringResult = result.toString();
// 		// 	var nextWml = stringResult.replace('[[', '').replace(']]', '');
			
// 		// 	findAndReadFile(lookupDir, nextWml, function(file) {
// 		// 		var stringContents = file ? file.contents.toString() : '';
// 		// 		masterContents.replace(stringResult, file.contents.toString());
// 		// 	});
// 		// }

// 		// console.log('**driTemplate.buildTemplate** Finished handling [[<wml>]] tags');

// 		// in here cheerio can take the entire codefile and modify it through it's jQuery interface
// 		$ = cheerio.load(masterContents, {
// 		    ignoreWhitespace: true,
// 		    xmlMode: false
// 		});

// 		// save codeFile aggregation under original <masterWml>.html in the same directory as <masterWml>.wml
// 		var htmlPath = wmlFile.path.replace('.wml', '.html');
// 		fs.writeFile(htmlPath, masterContents, function(err) {
// 			if (err) { throw err; }

// 			console.log('**driTemplate.buildTemplate** Created ' + htmlPath + ' file.');
// 		});

// 		callback();
// 	});
// }