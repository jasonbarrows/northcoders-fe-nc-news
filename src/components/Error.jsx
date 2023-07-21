const Error = ({ status, message }) => {
  return (
    <div className="py-4 sm:py-8 sm:max-w-2xl mx-auto">
      <div className="mx-4">
        <h1 className="text-2xl sm:text-3xl font-medium">{status}</h1>
        <p className="mt-2 sm:mt-4">{message}</p>
      </div>
    </div>
  );
};

export default Error;
