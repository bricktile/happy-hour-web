export default function (props) {
  return (
    <div className="container">
      {props.children}
      <style>{`
    .container {
      max-width: 960px;
      padding: 40px 30px;
      margin: auto;
    }
    `}</style>
    </div>
  )
}
