'use strict';

var cheerio = require('cheerio')
  , $ = undefined
  , fs = require('graceful-fs')
  , find = require('findit')
  , config = require('../config.js')
  , lookupDir = config.LOOKUP_DIR
  , masterContents = {code:''}
  , htmlPath
  , response;

exports.buildTemplate = function(req, res) {
	response = res;
	var parameters = req.body;

	getWmlTags(parameters.wmlfilename, function(tags, masterPath) {
		console.log('**driTemplate.buildTemplate** retrieved [[<wml>]] tags from => ' + masterPath);
		console.log('**driTemplate.buildTemplate** [[<wml>]] tags found => ' + JSON.stringify(tags));

		for (var i = 0; i < tags.length; i++) {
			var nextWml = tags[i].replace('[[', '').replace(']]', '');
			findAndReadFile(lookupDir, nextWml, tags[i], replaceWmlTag);
		}

		htmlPath = masterPath.replace('.wml', '.html');
	});
}

function changedContents() {
	if (masterContents.code !== '' && masterContents.code.indexOf('[[') === -1) {
		// save codeFile aggregation under <masterWml>.html in the same directory as <masterWml>.wml
		fs.writeFile(htmlPath, masterContents.code, function(err) {
			if (err) { throw err; }
			console.log('**driTemplate.buildTemplate** Created file => ' + htmlPath);

			response.send({results:'Finished'});
			response.end();
		});
	}
}

function getWmlTags(filename, callback) {
	findAndReadFile(lookupDir, filename, '', function(file) {
		masterContents.code = file.contents;

		var regex = new RegExp('\\[.*]', 'g')
		  , wmlTags = []
		  , result;

		while ((result = regex.exec(masterContents.code))) {
			wmlTags.push(result.toString());
		}

		callback(wmlTags, file.path);
	});
}

function replaceWmlTag(file) {
	masterContents.code = masterContents.code.replace(file.tag, file.contents);
	changedContents();
}

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