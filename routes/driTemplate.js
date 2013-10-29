'use strict';
var cheerio = require('cheerio')
  , $ = undefined
  , fs = require('graceful-fs')
  , find = require('findit')
  , config = require('../config.js')
  , lookupDir = config.LOOKUP_DIR
  , masterContents = {code:''}
  , htmlPath
  , response
  , responseData = {};

exports.buildTemplate = function(req, res) {
	console.log('**********START***********driTemplate.buildTemplate************START*************');

	var parameters = req.body
	  , response = res;

	getWmlTags(parameters.wmlfilename, function(tags, masterPath) {
		console.log('**driTemplate.buildTemplate** retrieved [[<wml>]] tags from => ' + masterPath);
		console.log('**driTemplate.buildTemplate** [[<wml>]] tags found => ' + JSON.stringify(tags));

		for (var i = 0; i < tags.length; i++) {
			var nextWml = tags[i].replace('[[', '').replace(']]', '');
			findAndReadFile(lookupDir, nextWml, tags[i], replaceWmlTag);
		}

		htmlPath = masterPath.replace('.wml', '.html');
		responseData.filepath = htmlPath;
	});
}

// get [[<wml>]] tags from contents of master wml file
function getWmlTags(filename, callback) {
	findAndReadFile(lookupDir, filename, '', function(file) {
		masterContents.code = file.contents
		var regex = new RegExp('\\[\\[.*]]', 'g')
		  , wmlTags = []
		  , result;

		while ((result = regex.exec(masterContents.code))) { wmlTags.push(result.toString()); }

		callback(wmlTags, file.path);
	});
}

// replace [[<wml>]] tags with contents of <wml>.wml
function replaceWmlTag(file) {
	masterContents.code = masterContents.code.replace(file.tag, file.contents);
	changedContents();
}

// check code contents when changed and save when all [[<wml>]] tags have been processed
function changedContents() {
	if (masterContents.code !== '' && masterContents.code.indexOf('[[') === -1) {
		fs.writeFile(htmlPath, masterContents.code, function(err) {
			if (err) {
				console.log('**driTemplate.buildTemplate** Error creating file => ' + JSON.stringify(err));
				responseData.error = err;
			}
			else { console.log('**driTemplate.buildTemplate** Successfully created file => ' + htmlPath); }

			console.log('***********END**********driTemplate.buildTemplate************END*************');
			response.send(responseData);
			response.end();
		});
	}
}

// find a file recursively and return it's path and contents
function findAndReadFile(startDir, fileName, tag, callback) {
	var finder = find(startDir);
	finder.on('file', function(file, stat) {
		if (file.endsWith(fileName + '.wml')) {
			var results = { path:file, contents:fs.readFileSync(file).toString() };
			if (tag && tag !== '') results.tag = tag;
			callback(results);
		}
	});
}