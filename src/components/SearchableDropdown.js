import '../style/dropdown.css'
import DropdownList from './DropdownList.js';
import { useState } from 'react';

function SearchableDropdown(props){
    // search bar
    // dropdown

    const [filterFunction, setFilterFunction] = useState(allowAll);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [value, setValue] = useState("");

    function allowAll(pokemon_name){
        return pokemon_name.toString().toLowerCase().includes(value.toLowerCase());
    }

    return(
        <div className="searchable-dropdown">
            <input 
                type="text"
                className="text-input"
                value={value}
                onClick={()=>{setDropdownOpen(!dropdownOpen); console.log(`value: \"${value}\"`)}}
                onChange={(e)=> {setValue(e.target.value)}}
            />
            {
                dropdownOpen &&
                <DropdownList 
                    items={props.items.sort().filter(allowAll)}
                    setValue={setValue}
                    closeDropdown={setDropdownOpen}
                    selectionAction={props.selectionAction}
                />
            }
        </div>
    );
}

export default SearchableDropdown;