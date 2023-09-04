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
  type,
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

  const tableDataStyle =
    'border border-gray-700 overflow-hidden p-1 md:p-2 text-sm md:text-base';

  return (
    <table
      id={`${type !== undefined ? `${type}-table` : ''}`}
      className="mx-auto my-5 md:my-10 border-4 border-blue-600 w-full md:table-fixed"
    >
      <thead>
        <tr>
          {headers.map(({ title, width }, i) => (
            <th
              key={`th-${i}`}
              className="border-4 border-blue-600 p-1 md:p-3 text-base md:text-xl"
              style={{ width }}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, ...obj }) => (
          <tr key={id}>
            {Object.entries(obj).map(([name, value], i) => (
              <td key={`td-${i}`} className={tableDataStyle}>
                {tableData(name, value)}
              </td>
            ))}
            <td className={`text-center ${tableDataStyle}`}>
              <p
                className="hover:underline cursor-pointer font-bold select-none py-3"
                onClick={() => {
                  editItem({ id, ...obj });
                }}
              >
                Editar
              </p>
            </td>
            <td className={`text-center ${tableDataStyle}`}>
              <p
                className="hover:underline cursor-pointer font-bold select-none py-3"
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

export default Table;
