import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const AuthorFooter = (): JSX.Element => {
  return (
    <div className="bot-footer">
      <span className='mr-2'>Desarrollado por</span>
      <a
        className="author-credits"
        href="https://github.com/Jo-varo"
        target="_blank"
        rel="noreferrer"
      >
        <div className="author-contact">
          <AiFillGithub className="mr-1 text-xl" />
          Jo-Varo
        </div>
      </a>
      <a
        className="author-credits"
        href="https://www.linkedin.com/in/jovaro/"
        target="_blank"
        rel="noreferrer"
      >
        <div className="author-contact">
          <AiFillLinkedin className="mr-1 text-xl" />
          Jorge Vargas
        </div>
      </a>
    </div>
  );
};

export default AuthorFooter;
