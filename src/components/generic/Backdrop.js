import '../../style/dropdown.css'

function Backdrop(props) {
    return (<div className="backdrop"
        onClick={props.closeDropdown}
    />);
}

export default Backdrop;