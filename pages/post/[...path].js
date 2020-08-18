import Head from 'next/head'
import unified from 'unified'
import parse from 'remark-parse'
import highlight from 'remark-highlight.js'
import html from 'remark-html'

import Container from '../../components/container'
import FileList from '../../components/file-list'

import blogFileTree from '../../config/_fileTree.config'

export default function Post({ fileItem = {}, prefix }) {
  let node = null
  if (fileItem.extension === '.md') {
    node = null
    let a = unified()
      .use(parse)
      .use(highlight)
      .use(html)
      .processSync(fileItem.content)
    node = <div dangerouslySetInnerHTML={{ __html: a.contents }}></div>
  } else if (fileItem.type === 'directory') {
    node = (
      <FileList fileList={fileItem.children} pathPrefix={`/post/${prefix}`} />
    )
  } else {
    node = `This file is not supported to preview!`
  }
  return (
    <>
      <Head>
        {/* 如果是undefined的话，会报错 */}
        <title>{`${fileItem.name || ''}`}</title>
      </Head>
      <main className="markdown-body">
        <Container>
          <h1>{fileItem.name}</h1>
          {node}
        </Container>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  let fileItem = blogFileTree
  params.path.forEach((index) => {
    fileItem = fileItem.children[index]
  })

  return { props: { fileItem, prefix: params.path.join('/') } }
}
