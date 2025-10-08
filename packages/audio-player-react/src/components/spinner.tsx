const Spinner = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-spin rounded-full h-8 w-8 border-b-2 border-white ${className}`}
  ></div>
);

export default Spinner;
