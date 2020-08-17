import React from 'react'
import Head from 'next/head'
import blogFileTree from '../config/_fileTree.config'
import Container from '../components/container'
import FileList from '../components/file-list'

export default function Home() {
  const users = blogFileTree.children.map((file) => ({
    ...file,
    pathPrefix: file.type === 'directory' ? '/user' : '/post'
  }))
  return (
    <div className="container">
      <Head>
        <title>Happy Hour</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <h1>Happy Hour</h1>
          <p className="subtitle">
            onehoureveryday -- Learning one hour every day.
          </p>
          <FileList fileList={users} />
        </Container>
      </main>

      <footer></footer>
      <style jsx>{`
        h1,
        .subtitle {
          text-align: center;
        }
      `}</style>
    </div>
  )
}
