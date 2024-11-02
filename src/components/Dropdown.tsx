import React, { useState } from 'react';

interface DropdownItem {
  id: number;
  name: string;
}

interface DropdownProps {
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="dropdown-button">
        Selecionar
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Pesquisar..."
            className="dropdown-search"
          />
          <ul>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <li key={item.id} className="dropdown-item">
                  {item.name}
                </li>
              ))
            ) : (
              <li className="dropdown-item">Nenhum item encontrado</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
