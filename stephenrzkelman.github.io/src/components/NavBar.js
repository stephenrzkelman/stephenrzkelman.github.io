import { Link } from 'react-router-dom';
import styles from '../styles/components/NavBar.module.css';

function NavBar() {
    return (
        <div className={styles.navbar}>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/other">Other</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
