const MainTemplate = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <main className="bg-black text-white overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        {children}
      </div>
    </main>
  );
};

export default MainTemplate;
