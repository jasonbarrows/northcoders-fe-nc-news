const CommentCount = ({ count }) => {
  return (
    <div className="inline-flex items-center border rounded-full">
      <span className="ml-1.5 p-1.5 text-rose-300" aria-label="Comment count">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="16" height="16" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M3.43 2.524A41.29 41.29 0 0110 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.202 41.202 0 01-5.183.501.78.78 0 00-.528.224l-3.579 3.58A.75.75 0 016 17.25v-3.443a41.033 41.033 0 01-2.57-.33C1.993 13.244 1 11.986 1 10.573V5.426c0-1.413.993-2.67 2.43-2.902z" clipRule="evenodd" />
        </svg>
      </span>
      <span className="mr-1.5 p-1.5">{count}</span>
    </div>
  );
};

export default CommentCount;
