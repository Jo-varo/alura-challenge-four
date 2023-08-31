import { BiX, BiCheck } from 'react-icons/bi';
import type {
  Category,
  ListOfCategories,
  ListOfVideos,
  Video,
  idVidCat
} from '../../../types';

interface TableProps {
  data: ListOfCategories | ListOfVideos
  headers: Array<{ title: string, width: string }>
  categories?: ListOfCategories
  type?: 'category' | 'video'
  removeItem: (id: idVidCat) => void
  editItem: (item: Category | Video) => void
}

const Table = ({
  data,
  headers,
  categories,
  removeItem,
  editItem
}: TableProps): JSX.Element => {
  const categoryName = (categCode: string): string => {
    const category = categories?.find(({ code }) => code === categCode);
    return category != null ? category.name : 'unknown';
  };

  const tableData = (
    name: string,
    value: string | boolean
  ): string | JSX.Element => {
    if (name === 'category') {
      if (typeof value === 'string') return categoryName(value);
    }
    if (name === 'isFeatured') {
      return value === true
        ? (
        <BiCheck className="w-10 h-10 mx-auto" />
          )
        : (
        <BiX className="w-10 h-10 mx-auto" />
          );
    }
    if (value === '') return '-';
    return String(value);
  };

  return (
    <table className="mx-auto my-10 border-4 border-blue-600 w-full table-fixed">
      <thead>
        <tr>
          {headers.map(({ title, width }, i) => (
            <th key={`th-${i}`} className="table-data-header" style={{ width }}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, ...obj }) => (
          <tr key={id}>
            {Object.entries(obj).map(([name, value], i) => (
              <td key={`td-${i}`} className="table-data-cell">
                {tableData(name, value)}
              </td>
            ))}
            <td className="table-data-cell text-center">
              <p
                className="hover:underline cursor-pointer font-bold select-none"
                onClick={() => {
                  editItem({ id, ...obj });
                }}
              >
                Editar
              </p>
            </td>
            <td className="table-data-cell text-center">
              <p
                className="hover:underline cursor-pointer font-bold select-none"
                onClick={() => {
                  removeItem(id);
                }}
              >
                Remover
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TableData = ({
  name,
  value
}: {
  name: string
  value: string | boolean
}): JSX.Element => {
  let result;
  if (name === 'isFeatured') {
    result =
      value === true
        ? (
        <BiCheck className="w-10 h-10 mx-auto" />
          )
        : (
        <BiX className="w-10 h-10 mx-auto" />
          );
  }
  if (value === ' ') result = '-';

  return <td className="table-data-cell">{result ?? String(value)}</td>;
};

export default Table;
