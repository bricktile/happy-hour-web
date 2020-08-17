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
}