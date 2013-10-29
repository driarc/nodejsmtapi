'use strict';

var cheerio = require('cheerio')
  , $ = undefined
  , fs = require('graceful-fs')
  , find = require('findit')
  , config = require('../config.js')
  , WatchJS = require("watchjs")
  , watch = WatchJS.watch
  , unwatch = WatchJS.unwatch
  , lookupDir = config.LOOKUP_DIR
  , masterContents = {code:''}
  , htmlPath
  , response;

watch(masterContents, 'code', function(prop, action, newvalue, oldvalue) {
	console.log("I see a change in masterContents.code !!  newvalue is => " + newvalue + " oldvalue is => " + oldvalue + " prop is => " + prop + " action is => " + action);
	// if (masterContents.code !== '' && masterContents.code.indexOf('[[') === -1) {
	// 	console.log('**driTemplate.buildTemplate** Attempting to create file => ' + htmlPath);

	// 	fs.writeFile(htmlPath, masterContents.code, function(err) {
	// 		if (err) { throw err; }

	// 		console.log('**driTemplate.buildTemplate** Created file => ' + htmlPath);

	// 		response.send({results:'Finished'});
	// 		response.end();
	// 	});
	// }
	// else { return false; }
});

exports.buildTemplate = function(req, res) {
	response = res;
	console.log('buildTemplate hit!, parameters are ' + JSON.stringify(req.body));
	var parameters = req.body;

	getWmlTags(parameters.wmlfilename, function(tags, masterPath) {
		console.log('tags found => ' + JSON.stringify(tags));

		for (var i = 0; i < tags.length; i++) {
			var nextWml = tags[i].replace('[[', '').replace(']]', '');
			findAndReadFile(lookupDir, nextWml, tags[i], replaceWmlTag);
		}

		// save codeFile aggregation under original <masterWml>.html in the same directory as <masterWml>.wml
		htmlPath = masterPath.replace('.wml', '.html');
	});
}

function getWmlTags(filename, callback) {
	findAndReadFile(lookupDir, filename, '', function(file) {
		masterContents.code = file.contents;

		var regex = new RegExp('\\[.*]', 'g')
		  , wmlTags = []
		  , result;

		console.log('**driTemplate.buildTemplate** Starting to gather [[<wml>]] tags');
		while ((result = regex.exec(masterContents.code))) {
			wmlTags.push(result.toString());
		}
		console.log('**driTemplate.buildTemplate** Finished gathering [[<wml>]] tags');

		callback(wmlTags, file.path);
	});
}

function replaceWmlTag(file) {
	console.log('replaceWmlTag recieved this file => ' + file.path + ' and tag => ' + file.tag);
	masterContents.code.replace(file.tag, file.contents);
}

function findAndReadFile(startDir, fileName, tag, callback) {
	var finder = find(startDir);
	finder.on('file', function(file, stat) {
		if (file.endsWith(fileName + '.wml')) {
			if (typeof callback === 'function') {
				var results = { path:file, contents:fs.readFileSync(file).toString() };
				if (tag && tag !== '') results.tag = tag;
				callback(results);
			}
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