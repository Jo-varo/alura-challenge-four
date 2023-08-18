const data = [
  {
    id: 1,
    title: 'video 1',
    link: '/',
    poster: '',
    category: 'front-end',
    description: ''
  },
  {
    id: 2,
    title: 'video 2',
    link: '/',
    poster: '',
    category: 'back-end',
    description: ''
  },
  {
    id: 3,
    title: 'video 3',
    link: '/',
    poster: '',
    category: 'innovation/gestion',
    description: ''
  },
  {
    id: 4,
    title: 'video 4',
    link: '/',
    poster: '',
    category: 'front-end',
    description: ''
  },
  {
    id: 5,
    title: 'video 5',
    link: '/',
    poster: '',
    category: 'innovation/gestion',
    description: ''
  }
];

const categoriesData = [
  {
    id: 1,
    name: 'Back End',
    description: 'back end description',
    color: ''
  }
];

const App = (): JSX.Element => {
  console.log(data, categoriesData);
  return (
    <>
      <main className="bg-black text-white overflow-hidden">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="text-3xl font-bold">Videos</h2>
        </div>
      </main>
    </>
  );
};

export default App;
