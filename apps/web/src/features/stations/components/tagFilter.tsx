type TagFilterProps = {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
};

const TagFilter = ({ tags, selectedTag, onTagSelect }: TagFilterProps) => {
  const buttonClassName =
    "px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer";

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onTagSelect(null)}
        className={`${buttonClassName} ${!selectedTag ? "bg-blue-600 text-white" : "bg-slate-700 text-blue-300 hover:bg-slate-600"}`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`${buttonClassName} ${selectedTag === tag ? "bg-blue-600 text-white" : "bg-slate-700 text-blue-300 hover:bg-slate-600"}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
