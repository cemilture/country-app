interface FilterOptionsProps {
  onSortChange: (sortOption: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ onSortChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    onSortChange(selectedOption);
  };

  return (
    <div className="filter-options-container">
      <label className="filter-label" htmlFor="sort"></label>
      <select className="filter-select" id="sort" onChange={handleSortChange}>
        <option value="name">Name (a-z)</option>
        <option value="population">Population (desc.)</option>
      </select>
    </div>
  );
};

export default FilterOptions;
