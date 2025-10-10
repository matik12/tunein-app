import SortOption from '../types/sortOption';

type SortControlsProps = {
  sortOptions: SortOption[];
  sortBy: string;
  onSortChange: (key: string) => void;
};

const SortControls = ({ sortOptions, sortBy, onSortChange }: SortControlsProps) => {
  const buttonClassName = 'px-3 py-1 text-sm rounded-md transition-colors cursor-pointer';

  return (
    <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg">
      <span className="text-sm font-semibold text-gray-400 px-2">Sort by:</span>
      {sortOptions.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSortChange(key)}
          className={`${buttonClassName} ${sortBy === key ? 'bg-blue-600 text-white shadow' : 'text-gray-300 hover:bg-slate-700'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SortControls;
