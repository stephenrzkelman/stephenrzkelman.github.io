import DropdownListItem from "./DropdownListItem.js";

function DropdownList(props){
    return(
        // wrapper for absolute positioning
        <div style={{position:"relative"}}>
            <div className="dropdown-list">
                {
                    props.items.map(
                        (item)=>
                        <DropdownListItem
                            value={item}
                            setValue={props.setValue}
                            closeDropdown={props.closeDropdown}
                            selectionAction={props.selectionAction}
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