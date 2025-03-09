import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/other">Other</Link>
            </li>
        </ul>
    );
}

export default NavBar;
