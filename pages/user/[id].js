import Head from 'next/head'
import Container from '../../components/container'
import FileList from '../../components/file-list'

import blogFileTree from '../../config/_fileTree.config'

export default function Main({ name, children = [], id }) {
  return (
    <>
      <Head>
        <title>{name}'s Blog</title>
      </Head>
      <Container>
        <h1>{name}'s Blog</h1>
        <FileList fileList={children} pathPrefix={`/post/${id}`} />
      </Container>
      <style jsx>{`
        h1 {
          margin-bottom: 40px;
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  const paths = []
  blogFileTree.children.forEach((item, index) => {
    if (item.children) {
      paths.push({
        params: { id: `${index}` }
      })
    }
  })
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  return { props: { ...blogFileTree.children[params.id], id: params.id } }
}
