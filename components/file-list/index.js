import Link from 'next/link'
import FolderIcon from '../../public/icons/folder.svg'
import FileIcon from '../../public/icons/file.svg'

export default function FileList({ fileList, pathPrefix = '' }) {
  return (
    <ul>
      {fileList.map((file, index) => (
        <li key={file.path}>
          <Link href={`${file.pathPrefix || pathPrefix}/${index}`}>
            <a className="file">
              {file.type === 'directory' ? (
                <span className="happy-icon">
                  <FolderIcon />
                </span>
              ) : (
                <span className="happy-icon">
                  <FileIcon />
                </span>
              )}
              <span>{file.name}</span>
            </a>
          </Link>

          <style jsx>
            {`
              ul {
                list-style: none;
                padding-left: 0px;
              }
              li {
                margin: 15px 0;
                font-size: 22px;
              }
              li:hover {
                color: #444;
              }

              .file {
                display: flex;
                align-items: center;
              }

              .happy-icon {
                margin-right: 20px;
              }
            `}
          </style>
        </li>
      ))}
    </ul>
  )
}
