function DropdownListItem(props){
    return(
        <div 
            className="dropdown-list-item"
            onClick={
                ()=>{
                    props.closeDropdown();
                    props.setValue(props.value);
                    props.selectionAction(props.value);
                }
            }
        >
            {props.children}
        </div>
    ); 
}

export default DropdownListItem;