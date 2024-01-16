function EVSlider(props){
    /* TODO: generalize slider code */
    return(
        <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            {`HP`}
            <input 
                type = "text"
                className = "text-input"
                value={props.hpev}
                onChange={(e)=> props.setHpev(e.target.value)}
                style={{width:"2rem"}}
            />
            {/* TODO:  robust validation for text input */}
            <input 
                type="range"
                min="0"
                max="252"
                step="4"
                className = "slider"
                value={props.hpev}
                onChange={(e)=> props.setHpev(e.target.value)}
            />
        </div>
    )
    
}

export default EVSlider;