import '../style/dropdown.css'
import DropdownList from './DropdownList.js';
import { useState } from 'react';

function SearchableDropdown(props){
    // search bar
    // dropdown

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [value, setValue] = useState("");

    function name_startswith(pokemon_name){
        return pokemon_name.toString().toLowerCase().startsWith(value.toLowerCase());
    }

    function name_includes(pokemon_name){
        return (
            pokemon_name.toString().toLowerCase().includes(value.toLowerCase()) && 
            !name_startswith(pokemon_name)
        );
    }

    function filteredItems(){
        let startswith_items = props.items.sort().filter(name_startswith);
        let includes_items = props.items.sort().filter(name_includes);
        return startswith_items.concat(includes_items)
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
                    items={filteredItems()}
                    setValue={setValue}
                    closeDropdown={setDropdownOpen}
                    selectionAction={props.selectionAction}
                />
            }
        </div>
    );
}

export default SearchableDropdown;