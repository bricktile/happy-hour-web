export default function Layout(props) {
  return (
    <div className="container">
      {props.children}

      <style jsx>{`
        .container {
          max-width: 960px;
          padding: 40px 30px;
          margin: auto;
        }
      `}</style>
    </div>
  )
}
