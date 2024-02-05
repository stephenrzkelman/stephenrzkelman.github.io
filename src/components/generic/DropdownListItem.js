function DropdownListItem(props){
    return(
        <div 
            className={`dropdown-list-item${props.active ? "-active" : ""}`}
            onClick={
                ()=>{
                    props.closeDropdown();
                    props.setValue(props.value);
                    props.selectionAction(props.value);
                }
            }
            ref={props.active ? props.cursorRef : null}
        >
            {props.children}
        </div>
    ); 
}

export default DropdownListItem;