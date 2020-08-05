const fs = require('fs');
const path = require('path');
const dirTree = require('directory-tree');
const blogConfigs = require('../config/common');
const simpleGit = require('simple-git');

let git = simpleGit({
  baseDir: blogConfigs.REPO_LOCAL_PATH
});

const RESROUCE_REG = /\.(jpe?g|png|gif|ico|webp|jp2|pdf)$/i
async function isDirExist(pathStr) {
	try {
		await fs.promises.access(pathStr);
		return true;
	} catch (e) {
		return false;
	}
}

function readFiles(pathStr) {
	return dirTree(pathStr, {
		exclude: /\.(gitignore|bin|init\.sh)$|(newdaily(\.sh)?|push(\.sh)?)$/,
	});
}

async function start() {
	let isRepoExists = await isDirExist(blogConfigs.REPO_LOCAL_PATH);
	if (!isRepoExists) {
    git = await git.clone(blogConfigs.GIT, blogConfigs.REPO_LOCAL_PATH);
  }
  await git.pull()

	const fileTree = dirTree(
		blogConfigs.REPO_LOCAL_PATH,
		{ exclude: /\.(git|gitignore|bin|init\.sh)$|(newdaily(\.sh)?|push(\.sh)?)$/ },
		(item) => {
			if(item.type === "file") {
        if(RESROUCE_REG.test(item.extension)) {
          return item
        }
        item.content = fs.readFileSync(item.path).toString()
      }
      return item
		}
  );
  
  fs.writeFileSync(blogConfigs.BLOG_FILE_TREE, `module.exports = ${JSON.stringify(fileTree)}`)
}

start();
