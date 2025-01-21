import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate из react-router-dom
import styles from '../styles/Header.module.css';

const Header = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState(""); // Состояние для текста поиска
    const navigate = useNavigate(); // Хук для навигации

    // Обработчик изменения в поле поиска
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Обработчик отправки формы поиска
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Останавливаем стандартную отправку формы
        onSearch(searchQuery); // Вызов переданной функции
    };

    // Обработчик для выхода
    const handleLogout = () => {
        // Логика выхода (например, очистка токенов, данных и т.п.)
        // Перенаправление на страницу авторизации
        navigate('/login'); // Перенаправляем на страницу входа (предполагается, что это '/login')
    };

    return (
        <header className={styles.header}>
            <img src="/images/logo.svg" alt="logo" className={styles.logo} />
            <div className={styles.searchContainer}>
                <form onSubmit={handleSearchSubmit} className={styles.form}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Поиск"
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        <img src="/images/search-icon.svg" alt="search" className={styles.searchIcon} />
                    </button>
                </form>
            </div>
            <div className={styles.box}>
                <div className={styles.exit} onClick={handleLogout}>Выйти</div>
                <img 
                    src="/images/Frame 13594.svg" 
                    alt="exit" 
                    className={styles.exitIcon} 
                    onClick={handleLogout} // Добавляем обработчик клика на иконку
                />
            </div>
        </header>
    );
};

export default Header;
