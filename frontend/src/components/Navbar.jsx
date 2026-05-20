import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={styles.nav}>

            <h3>My Shop 🛒</h3>

            <div style={styles.links}>

                <Link to="/" style={styles.link}>Products</Link>
                <Link to="/login" style={styles.link}>Login</Link>

            </div>

        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        background: "#222",
        color: "white"
    },
    links: {
        display: "flex",
        gap: "10px"
    },
    link: {
        color: "white",
        textDecoration: "none"
    }
};