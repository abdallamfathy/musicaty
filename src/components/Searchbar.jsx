import {FiSearch} from "react-icons/fi"

const Searchbar = ()  => (
  <form autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600">
    <div className="flex flex-row justify-start items-center">
      <FiSearch className="w-5 h-5 ml-4"/>
      <input type="search" placeholder="Search" 
      value=""
      name="search-field"
      autoComplete="off"
      id="search-field"
      onChange={() => {}}
      className="flex-1 bg-transparent border-none outline-none p-4 text-white text-base placeholder-gray-500" />
    </div>
  </form>
);

export default Searchbar;
