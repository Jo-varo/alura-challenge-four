import { toast } from 'react-hot-toast';
import { type idVidCat } from '../../../types';

interface Params {
  isLight: boolean
  idItem: idVidCat
  type: 'category' | 'video'
  deleteItem: (id: idVidCat) => void
}

export const toastHandleDelete = ({
  isLight,
  idItem,
  type,
  deleteItem
}: Params): void => {
  toast(
    (t) => (
      <div>
        <p className={`${isLight ? 'text-black' : 'text-white'} mb-3`}>
          ¿Estas seguro de eliminar{' '}
          {type === 'category' ? 'la categoría' : 'el video'}?
        </p>
        <div className="flex items-center justify-evenly px-4">
          <button
            className="bg-red-500 hover:bg-red-700 px-3 py-2 text-white rounded-sm mx-2"
            onClick={() => {
              deleteItem(idItem);
              toast.dismiss(t.id);
              const successDeleted = toast.success(
                `${
                  type === 'category'
                    ? 'Categoría eliminada'
                    : 'Video eliminado'
                }`,
                {
                  className: !isLight ? 'bg-neutral-800 text-white' : ''
                }
              );
              setTimeout(() => {
                toast.dismiss(successDeleted);
              }, 800);
            }}
          >
            Eliminar
          </button>
          <button
            className="bg-slate-600 hover:bg-slate-800 px-3 py-2 text-white rounded-sm mx-2"
            onClick={() => {
              toast.dismiss(t.id);
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    ),
    {
      style: {
        background: isLight ? '#ededed' : '#202020'
      }
    }
  );
};
