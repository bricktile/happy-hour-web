import Link from 'next/link';
import FolderIcon from '../../public/icons/folder.svg';
import FileIcon from '../../public/icons/file.svg';

export default function({fileList, pathPrefix = ""}) {
  return <ul>
  {fileList.map((file, index) => (
    <li key={file.path}>
      <Link href={`${file.pathPrefix || pathPrefix}/${index}`}>
        <a className="file">
          {file.type === 'directory' ? (
            <FolderIcon className="happy-icon" />
          ) : (
            <FileIcon className="happy-icon" />
          )}
          <span>{file.name}</span>
        </a>
      </Link>
    </li>
  ))}
</ul>
}