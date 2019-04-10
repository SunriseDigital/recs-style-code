// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require("fs");
const path = require("path")

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const rootPath = vscode.workspace.rootPath
	const recsRootPath = `${rootPath}/app/assets/stylesheets/recs`
	const variablesPath = `${recsRootPath}/variables`

	let disposable = vscode.commands.registerCommand('recsStyleCode.openCurrentVariables', function () {
		const currentFilePath = vscode.window.activeTextEditor.document.fileName
		const currentFolder = path.relative(variablesPath, currentFilePath).split(path.sep)[0]
		
		fs.readdirSync(`${variablesPath}`).filter(f => {
			if(!fs.lstatSync(`${variablesPath}/${f}`).isDirectory()) return false
			if(f == currentFolder) return false
			return true
		}).forEach(function(folder){
			const targetPath = currentFilePath.split(`${variablesPath}/${currentFolder}/`).join(`${variablesPath}/${folder}/`)
			vscode.workspace.openTextDocument(targetPath).then(doc => {
				vscode.window.showTextDocument(doc, {preview: false});
		  });
		})
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
