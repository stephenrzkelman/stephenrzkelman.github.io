function Stat(props) {
    return(
        <div className="stat">
            <div className="stat-text">
                {props.statName}
            </div>
            <div className="stat-num">
                {props.statValue}
            </div>
            <div 
                style={{width: `${1+Math.min(1,props.statValue/600)*9}rem`}} 
                className={`barchart-bar barchart-rank-${Math.min(6,Math.ceil(props.statValue/100))}`}
            ></div>
        </div>
    )
}

export default Stat;