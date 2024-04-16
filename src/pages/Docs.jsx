import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/docs/Header";
import Sidnav from "../components/docs/Sidenav";

import styles from "../cdn/css/docs/docs_index.module.css";

function Docs() {
    const [sidenavIsOpen, setSidenavIsOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    console.log(styles);
    useEffect(() => {
        try {
            document.body.setAttribute("theme", theme);
            localStorage.setItem("theme", theme);
        } catch (err) {
            console.error(err);
        }
    }, [theme]);

    return (
        <div className={styles.root}>
            <Header sidenavIsOpen={sidenavIsOpen} setSidenavIsOpen={setSidenavIsOpen} theme={theme} setTheme={setTheme} />
            <div className={styles.content}>
                <Sidnav sidenavIsOpen={sidenavIsOpen} />
                <main>
                    <div>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Docs;