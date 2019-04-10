const path = require("path")
const fs = require("fs")

module.exports = class Variables {
  constructor(vscode){
    this.rootPath = vscode.workspace.rootPath
    this.recsRootPath = `${this.rootPath}/app/assets/stylesheets/recs`
    this.variablesPath = `${this.recsRootPath}/variables`
  }

  getSiteCodeFolder(currentFilePath){
    return path.relative(this.variablesPath, currentFilePath).split(path.sep)[0]
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

