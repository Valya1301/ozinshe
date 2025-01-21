import React from 'react';
import styles from '../styles/Sidebar.module.css'; // Убедитесь, что путь к стилям правильный
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={styles.list}>
            <div onClick={() => navigate("/projects")} className={`${styles.box1} ${location.pathname === "/projects" ? styles.active : ''}`}>
                {location.pathname === "/projects" && (
                    <img
                        className={styles.selectorIcon}
                        src="/images/Selector (2).svg"
                        alt="selector icon"
                    />
                )}
                <div className={styles.indicator} />
                <img className={styles.icons} src="/images/Dashboard.svg" alt="dashboard icon" />
                <div className={styles.text1}>Проекты</div>
            </div>
            <div onClick={() => navigate("/Main")} className={`${styles.box1} ${location.pathname === "/Main" ? styles.active : ''}`}>
                {location.pathname === "/Main" && (
                    <img
                        className={styles.selectorIcon}
                        src="/images/Selector (2).svg"
                        alt="selector icon"
                    />
                )}
                <div className={styles.indicator} />
                <img className={styles.icons} src="/images/💚 Icon - L.svg" alt="home icon" />
                <div className={styles.text1}>Проекты на главной</div>
            </div>
            <div onClick={() => navigate("/Categories")} className={`${styles.box1} ${location.pathname === "/Categories" ? styles.active : ''}`}>
                {location.pathname === "/Categories" && (
                    <img
                        className={styles.selectorIcon}
                        src="/images/Selector (2).svg"
                        alt="selector icon"
                    />
                )}
                <div className={styles.indicator} />
                <img className={styles.icons} src="/images/💚 Icon - L (1).svg" alt="categories icon" />
                <div className={styles.text1}>Категории</div>
            </div>
            <div onClick={() => navigate("/Users")} className={`${styles.box1} ${location.pathname === "/Users" ? styles.active : ''}`}>
                {location.pathname === "/Users" && (
                    <img
                        className={styles.selectorIcon}
                        src="/images/Selector (2).svg"
                        alt="selector icon"
                    />
                )}
                <div className={styles.indicator} />
                <img className={styles.icons} src="/images/💚 Icon - L (2).svg" alt="users icon" />
                <div className={styles.text1}>Пользователи</div>
            </div>
            <div onClick={() => navigate("/Roles")} className={`${styles.box1} ${location.pathname === "/Roles" ? styles.active : ''}`}>
                {location.pathname === "/Roles" && (
                    <img
                        className={styles.selectorIcon}
                        src="/images/Selector (2).svg"
                        alt="selector icon"
                    />
                )}
                <div className={styles.indicator} />
                <img className={styles.icons} src="/images/💚 Icon - L (3).svg" alt="roles icon" />
                <div className={styles.text1}>Роли</div>
            </div>
            <div onClick={() => navigate("/Genres")} className={`${styles.box1} ${location.pathname === "/Genres" ? styles.active : ''}`}>
                {location.pathname === "/Genres" && (
                    <img
                        className={styles.selectorIcon}
                        src="/images/Selector (2).svg"
                        alt="selector icon"
                    />
                )}
                <div className={styles.indicator} />
                <img className={styles.icons} src="/images/💚 Icon - L (4).svg" alt="genres icon" />
                <div className={styles.text1}>Жанры</div>
            </div>
            <div onClick={() => navigate("/Ages")} className={`${styles.box1} ${location.pathname === "/Ages" ? styles.active : ''}`}>
                {location.pathname === "/Ages" && (
                    <img
                        className={styles.selectorIcon}
                        src="/images/Selector (2).svg"
                        alt="selector icon"
                    />
                )}
                <div className={styles.indicator} />
                <img className={styles.icons} src="/images/💚 Icon - L (5).svg" alt="ages icon" />
                <div className={styles.text1}>Возрасты</div>
            </div>
        </div>
    );
};

export default Sidebar;
