const Votes = ({ count, userVote = 0, handleVote = () => {}}) => {
  return (
    <div className="border flex items-center rounded-full">
      <button
        aria-label="Vote up"
        className={`p-1 text-rose-700 rounded-l-full active:bg-rose-100 ${userVote === 1 ? 'bg-rose-200' : null}`}
        onClick={() => {handleVote(1)}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z" clipRule="evenodd" />
        </svg>
      </button>
      <span className="px-2">{count + userVote}</span>
      <button
        aria-label="Vote down"
        className={`p-1 text-rose-700 rounded-r-full active:bg-rose-100 ${userVote === -1 ? 'bg-rose-200' : null}`}
        onClick={() => {handleVote(-1)}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default Votes;
