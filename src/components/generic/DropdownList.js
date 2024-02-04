import DropdownListItem from "./DropdownListItem.js";

function DropdownList(props){
    return(
        // wrapper for absolute positioning
        <div style={{position:"relative"}}>
            <div className="dropdown-list">
                {
                    props.items.map(
                        (item, index)=>
                        <DropdownListItem
                            value={item}
                            setValue={props.setValue}
                            closeDropdown={props.closeDropdown}
                            selectionAction={props.selectionAction}
                            active={props.cursor===index}
                        >
                            {item}
                        </DropdownListItem>
                    )
                }
            </div>
        </div>
    );
}

export default DropdownList;