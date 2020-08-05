import Head from 'next/head';
import Container from '../../components/container';
import FileList from '../../components/file-list';

import blogFileTree from '../../config/_fileTree.config';

export default function ({ name, children, id }) {
	return (
		<>
			<Head>
				<title>{name}'s Blog</title>
			</Head>
			<main>
				<Container>
					<h1>{name}'s Blog</h1>
					<FileList fileList={children} pathPrefix={`/post/${id}`} />
				</Container>
			</main>
		</>
	);
}

export async function getStaticPaths() {
	return {
		paths: blogFileTree.children.map((_, index) => ({
			params: { id: `${index}` },
		})),
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	return { props: { ...blogFileTree.children[params.id], id: params.id } };
}
