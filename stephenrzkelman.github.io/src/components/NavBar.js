import { Link } from 'react-router-dom';
import styles from '../styles/components/NavBar.module.css';
import { allPages } from '../util';

function NavBar() {
    return (
        <div className={styles.navbar}>
            <ul>
                {
                    allPages().map(
                        ([pageName, _]) => <li>
                            <Link to={pageName.substring(1).toLowerCase()}>
                                {pageName.substring(2)}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default NavBar;
