import '../style/dropdown.css'
import DropdownList from './DropdownList.js';
import { useState } from 'react';

function SearchableDropdown(props){
    // search bar
    // dropdown
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [value, setValue] = useState("");
    return(
        <div className="searchable-dropdown">
            <input 
                type="text"
                className="text-input"
                value={value}
                onClick={()=>setDropdownOpen(!dropdownOpen)}
            />
            {
                dropdownOpen &&
                <DropdownList 
                    items={props.items}
                    setValue={setValue}
                    closeDropdown={setDropdownOpen}
                    selectionAction={props.selectionAction}
                />
            }
        </div>
    );
}

export default SearchableDropdown;