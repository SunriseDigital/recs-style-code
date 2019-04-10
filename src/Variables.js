const path = require("path")
const fs = require("fs")
const Recs = require('./Recs')

module.exports = class Variables extends Recs {
  constructor(vscode){
    super(vscode)
    this.variablesPath = `${this.recsRootPath}/variables`
  }

  isValidPath(filePath){
    if(filePath.startsWith(this.variablesPath)){
      return true
    }

    this.vscode.window.showErrorMessage(`${this.toWorkspaceRelativePath(filePath)} is not variables file.`)
    return false
  }

  getSiteCodeFolder(currentFilePath){
    return path.relative(this.variablesPath, currentFilePath).split(path.sep)[0]
  }

  otherExistsSiteCodePaths(currentFilePath){
    return this.otherSiteCodePaths(currentFilePath).filter(path => {
      try {
        fs.accessSync(path, fs.constants.R_OK)
        return true
      } catch (err) {
        this.vscode.window.showErrorMessage(`${this.toWorkspaceRelativePath(path)} does not exist.`)
        return false
      }
    })
  }

  otherSiteCodePaths(currentFilePath){
    const currentFolder = this.getSiteCodeFolder(currentFilePath)
    return fs.readdirSync(`${this.variablesPath}`).filter(f => {
			if(!fs.lstatSync(`${this.variablesPath}/${f}`).isDirectory()) return false
			if(f == currentFolder) return false
			return true
		}).map(folder => {
      return currentFilePath.split(`${this.variablesPath}/${currentFolder}/`).join(`${this.variablesPath}/${folder}/`)
    })
  }
}

