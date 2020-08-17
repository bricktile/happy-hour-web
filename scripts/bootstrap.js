const fs = require('fs');
const dirTree = require('directory-tree');
const simpleGit = require('simple-git');
const remark = require('remark');
const markdown = require('remark-parse');
const highlight = require('remark-highlight.js')
const remark2react = require
const blogConfigs = require('../config/common');


const RESROUCE_REG = /\.(jpe?g|png|gif|ico|webp|jp2|pdf)$/i;
async function isDirExist(pathStr) {
	try {
		await fs.promises.access(pathStr);
		return true;
	} catch (e) {
		return false;
	}
}

async function start() {
	let isRepoExists = await isDirExist(blogConfigs.REPO_LOCAL_PATH);
	let git = simpleGit({});
	if (!isRepoExists) {
		await git.clone(blogConfigs.GIT, blogConfigs.REPO_LOCAL_PATH);
	}
	git = simpleGit({
		baseDir: blogConfigs.REPO_LOCAL_PATH,
	});
	await git.pull();

	const fileTree = dirTree(
		blogConfigs.REPO_LOCAL_PATH,
		{
			exclude: /\.(git|gitignore|bin|init\.sh)$|(newdaily(\.sh)?|push(\.sh)?)$/,
		},
		(item) => {
			if (item.type === 'file') {
				if (RESROUCE_REG.test(item.extension)) {
					return item;
				}
				item.content = fs.readFileSync(item.path).toString();
			}
			return item;
		}
	);

	fs.writeFileSync(
		blogConfigs.BLOG_FILE_TREE,
		`module.exports = ${JSON.stringify(fileTree)}`
	);
}

start();
