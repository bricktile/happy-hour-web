import Head from 'next/head';
import Link from 'next/link';
import Container from '../../components/container';
import FileList from '../../components/file-list';
import ReactMarkdown from 'react-markdown';

import blogFileTree from '../../config/_fileTree.config';

export default function ({ fileItem = {}, prefix }) {
	let node = null;
	if (fileItem.extension === '.md') {
		node = <ReactMarkdown source={fileItem.content} />;
	} else if (fileItem.type === 'directory') {
		node = (
			<FileList fileList={fileItem.children} pathPrefix={`/post/${prefix}`} />
		);
	} else {
		node = `This file is not supported to preview!`;
	}
	return (
		<>
			<Head>
				{/* 如果是undefined的话，会报错 */}
				<title>{`${fileItem.name}`}</title>
			</Head>
			<main>
				<Container>
					<h1>{fileItem.name}</h1>
					{node}
				</Container>
			</main>
		</>
	);
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	const [userId] = params.path;
	let fileItem = blogFileTree;
	params.path.forEach((index) => {
		fileItem = fileItem.children[index];
	});

	return { props: { fileItem, prefix: params.path.join('/') } };
	// Fetch necessary data for the blog post using params.id
}
