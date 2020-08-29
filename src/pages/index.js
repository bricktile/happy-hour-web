import React from 'react'
import Head from 'next/head'
import blogFileTree from '@/config/_fileTree.config'
import Container from 'src/components/container'
import FileList from 'src/components/file-list'
import GithubIcon from '../assets/img/icons/github.svg'

export default function Home() {
  const users = blogFileTree.children.map((file) => ({
    ...file,
    pathPrefix: file.type === 'directory' ? '/user' : '/post'
  }))
  return (
    <>
      <Head>
        <title>Happy Hour</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="container">
          <h1>
            <a
              className="header"
              href="https://github.com/bricktile/happy-hour"
            >
              <span>
                <GithubIcon />
              </span>
              <span>Happy Hour</span>
            </a>
          </h1>
          <p className="subtitle">
            onehoureveryday -- Learning one hour every day.
          </p>
          <FileList fileList={users} />
        </div>
      </Container>
      <style jsx>{`
        .container {
          max-width: 680px;
          margin: auto;
        }
        h1,
        .subtitle {
          text-align: center;
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .header span {
          margin-right: 10px;
          vertical-align: middle;
        }
      `}</style>
    </>
  )
}
