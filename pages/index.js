import React from 'react'
import Head from 'next/head'
import blogFileTree from '../config/_fileTree.config'
import Container from '../components/container'
import FileList from '../components/file-list'
import GithubIcon from '../public/icons/github.svg'

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
          <a className="header" href="https://github.com/bricktile/happy-hour">
            <h1>
              <span>
                <GithubIcon />
              </span>
              <span>Happy Hour</span>
            </h1>
          </a>
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
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        a,
        a:visited,
        a:active {
          color: #333;
          text-decoration: none;
          align-items: center;
        }
        a:hover {
          text-decoration: none;
          color: #3e75c3;
        }
        .header span {
          margin-right: 10px;
          vertical-align: middle;
        }
      `}</style>
    </div>
  )
}
