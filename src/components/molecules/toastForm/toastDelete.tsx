import { toast } from 'react-hot-toast';
import { type idVidCat } from '../../../types';

interface Params {
  isLight: boolean
  idItem: idVidCat
  type: 'category' | 'video'
  deleteItem: (id: idVidCat) => Promise<void>
}

export const toastHandleDelete = ({
  isLight,
  idItem,
  type,
  deleteItem
}: Params): void => {
  const textByType = type === 'category' ? 'la categoría' : 'el video';
  const successByType =
    type === 'category' ? 'Categoría eliminada' : 'Video eliminado';
  const errorByType =
    type === 'category'
      ? 'La categoría no pudo ser eliminada'
      : 'El video no pudo ser eliminado';
  const dismissToasts = (): number =>
    setTimeout(() => {
      toast.dismiss();
    }, 800);

  toast(
    (t) => (
      <div>
        <p className={`${isLight ? 'text-black' : 'text-white'} mb-3`}>
          ¿Estas seguro de eliminar {textByType}?
        </p>
        <div className="flex items-center justify-evenly px-4">
          <button
            className="bg-red-500 hover:bg-red-700 px-3 py-2 text-white rounded-sm mx-2"
            onClick={() => {
              void (async () => {
                toast.dismiss(t.id);
                try {
                  await toast.promise(
                    deleteItem(idItem),
                    {
                      loading: 'Eliminando...',
                      success: <b>{successByType}</b>,
                      error: <b>{errorByType}</b>
                    },
                    {
                      className: !isLight ? 'dark-toast' : ''
                    }
                  );
                  dismissToasts();
                } catch (error) {
                  dismissToasts();
                }
              })();
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
