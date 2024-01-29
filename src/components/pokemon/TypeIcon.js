function TypeIcon(props){
    return(
        <div className={`type-icon type-cell type-${props.type.toLowerCase()}`}>
            {props.type}
        </div>
    )
}

export default TypeIcon