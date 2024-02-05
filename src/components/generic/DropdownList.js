import DropdownListItem from "./DropdownListItem.js";
import { useRef, useEffect } from "react";

function DropdownList(props){
    const cursorRef = useRef(null);

    function scrollfn(){
        console.log("Called!");
        if(cursorRef.current){
            cursorRef.current.scrollIntoView({block:'nearest'});
        }
    }

    useEffect(()=>scrollfn());

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
                            cursorRef={cursorRef}
                        >
                            {item}
                        </DropdownListItem>
                    )
                }
            </div>
            <div>
                {scrollfn()}
            </div>
        </div>
    );
}

export default DropdownList;