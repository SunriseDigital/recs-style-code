// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const Variables = require('./Variables')
const fs = require("fs")

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const variables = new Variables(vscode)


	let disposable = vscode.commands.registerCommand('recsStyleCode.openCurrentVariables', function () {
		const currentFilePath = vscode.window.activeTextEditor.document.fileName

		variables.otherExistsSiteCodePaths(currentFilePath).forEach(targetPath => {
			vscode.workspace.openTextDocument(targetPath).then(doc => {
				vscode.window.showTextDocument(doc, {preview: false});
		  });
		})
	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('recsStyleCode.copyCurrentVariableToAll', function () {
		const currentFilePath = vscode.window.activeTextEditor.document.fileName

		const copiedFiles = []
		variables.otherSiteCodePaths(currentFilePath).forEach(targetPath => {
			fs.copyFileSync(currentFilePath, targetPath);
			copiedFiles.push(variables.toWorkspaceRelativePath(targetPath))
		})

		vscode.window.showInformationMessage(`
			The file was copied ${copiedFiles.length} files...

			${copiedFiles.join("\n")}
		`.replace(/^\s+/igm, ''))
	});

	context.subscriptions.push(disposable)
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
