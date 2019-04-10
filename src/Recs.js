const path = require("path")

module.exports = class Recs {
  constructor(vscode){
    this.vscode = vscode
    this.rootPath = this.vscode.workspace.rootPath
    this.recsRootPath = `${this.rootPath}/app/assets/stylesheets/recs`
  }

  toWorkspaceRelativePath(fullPath){
    return path.relative(this.rootPath, fullPath)
  }
}

