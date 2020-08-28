import Link from 'next/link'
import Homepage from '../../public/icons/home.svg'
export default function Layout(props) {
  return (
    <main>
      <div className="header-bar">
        <Link href="/">
          <a>
            <Homepage />
          </a>
        </Link>
      </div>
      <div className="container">{props.children}</div>
      <style jsx>{`
        .container {
          padding: 20px 20px 60px;
          max-width: 960px;
          margin: 0 auto;
          padding: 40px 30px;
          margin: auto;
        }
        .header-bar {
          display: block;
          padding: 20px 30px;
          border-bottom: 1px solid #e8e8e8;
          font-size: 24px;
        }
      `}</style>
    </main>
  )
}
