import '../../style/dropdown.css'
import Backdrop from './Backdrop.js';
import DropdownList from './DropdownList.js';
import { useState } from 'react';
import { mod } from '../../utils.js'

function SearchableDropdown(props){
    // search bar
    // dropdown

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [value, setValue] = useState("");
    const [cursor, setCursor] = useState(0);

    function closeDropdown(){
        setDropdownOpen(false);
    }

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

    function handleKeyDown(e){
        let items = filteredItems();
        let len = items.length
        if(e.key === 'ArrowDown'){
            setCursor((cursor + 1).mod(len));
        }
        else if(e.key === 'ArrowUp'){
            setCursor((cursor - 1).mod(len));
        }
        else if(e.key === 'Enter'){
            setValue(items[cursor]);
            props.selectionAction(items[cursor])
            closeDropdown();
            setCursor(0);
        }
        else{
            setDropdownOpen(true);
        }
    }

    return(
        <div className="searchable-dropdown">
            <input 
                type="text"
                className="text-input"
                value={value}
                onClick={()=>{setDropdownOpen(!dropdownOpen);}}
                onChange={(e)=> {
                    setCursor(0);
                    setValue(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder={props.placeholder}
            />
            {
                dropdownOpen && 
                <Backdrop closeDropdown={closeDropdown}/>
            }
            {
                dropdownOpen &&
                <DropdownList 
                    items={filteredItems()}
                    setValue={setValue}
                    closeDropdown={closeDropdown}
                    selectionAction={props.selectionAction}
                    cursor={cursor}
                />
            }
        </div>
    );
}

export default SearchableDropdown;