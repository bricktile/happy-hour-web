import Head from 'next/head'
import unified from 'unified'
import parse from 'remark-parse'
import highlight from 'remark-highlight.js'
import html from 'remark-html'

import Container from 'src/components/container'
import FileList from 'src/components/file-list'

import blogFileTree from '@/config/_fileTree.config'

import ArrowIcon from '../../assets/img/icons/arrow.svg'

export default function Post({
  fileItem = {},
  prevItem = {},
  nextItem = {},
  prefix
}) {
  let node = null
  if (fileItem.extension === '.md') {
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
        <title>{`${fileItem.name || ''}`}</title>
      </Head>
      <Container>
        <div className="navigation">
          <div className="navigation-item">
            <span className="prev-icon arrow-icon">
              {prevItem && <ArrowIcon />}
            </span>

            <span>{prevItem && prevItem.name}</span>
          </div>
          <div className="navigation-item">
            <span>{nextItem && nextItem.name}</span>
            <span className="next-icon arrow-icon">
              {nextItem && <ArrowIcon />}
            </span>
          </div>
        </div>
        <h1>{fileItem.name}</h1>
        {node}
      </Container>
      <style jsx>{`
        .container {
          height: 100%;
        }
        .navigation {
          display: flex;
          justify-content: space-between;
          padding: 15px;
        }
        .navigation-item {
          display: flex;
          align-items: center;
        }
        .arrow-icon {
          display: flex;
          align-items: center;
        }
        .next-icon {
          transform: rotate(180deg);
          margin-left: 10px;
        }
        .prev-icon {
          margin-right: 10px;
        }
      `}</style>
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
  let prevItem, nextItem
  const { path = [] } = params
  path.forEach((key, index) => {
    if (index === path.length - 1) {
      prevItem = fileItem.children[Number(key) - 1] || null
      nextItem = fileItem.children[Number(key) + 1] || null
    }
    fileItem = fileItem.children[key]
  })

  return {
    props: { fileItem, prefix: params.path.join('/'), prevItem, nextItem }
  }
}
