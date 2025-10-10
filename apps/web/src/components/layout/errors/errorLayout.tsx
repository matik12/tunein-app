const ErrorLayout = () => (
  <div className="text-center text-white space-y-4 pt-20">
    <h1 className="text-4xl font-extrabold">Unexpected Error</h1>
    <p className="text-lg">
      Unexpected error occurred. Please{' '}
      <button
        className="font-medium text-blue-600 underline hover:no-underline cursor-pointer"
        onClick={() => window.location.reload()}
      >
        refresh
      </button>{' '}
      the page and try again.
    </p>
  </div>
);

export default ErrorLayout;
