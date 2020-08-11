const fs = require('fs');
const dirTree = require('directory-tree');
const simpleGit = require('simple-git');
const remark = require('remark');
const markdown = require('remark-parse');
const blogConfigs = require('../config/common');

remark()
	.use(markdown, {commonmark: true})
	.process(`- date: 20200209
	- author: xiaojingzhao
	
	## Plan
	
	1. 30min: 你不知道的 js chapter4
	2. 30min: 你不知道的 js chapter5
	
	## Notes
	
	### js 声明提升:
	
	- 编译的时候会处理所有的声明。声明会被提升。
	- 声明和赋值是两个步骤，先声明后赋值。
	- 声明提升时函数优先级高于变量。
	- 函数表达式的声明提升和变量是一样的。
	
	### 闭包：
	
	- 函数能够记住作用域的引用就叫做闭包。`, function (err, file) {
		err && console.error(err);
		console.log(file);
	});

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
