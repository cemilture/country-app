interface FilterOptionsProps {
  onSortChange: (sortOption: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ onSortChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    onSortChange(selectedOption);
  };

  return (
    <div>
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" onChange={handleSortChange}>
        {/* <option value="beginning">---</option> */}
        <option value="name">Name</option>
        <option value="population">Population</option>
      </select>
    </div>
  );
};

export default FilterOptions;
