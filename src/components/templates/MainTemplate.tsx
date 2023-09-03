import { useTheme } from '../../context/themeContext';

const MainTemplate = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => {
  const { isLight } = useTheme()
  return (
    <main className={`${isLight ? 'bg-neutral-100 text-black' : 'bg-black text-white'} overflow-hidden `}>
      <div className="max-w-[1300px] mx-auto">
        {children}
      </div>
    </main>
  );
};

export default MainTemplate;
