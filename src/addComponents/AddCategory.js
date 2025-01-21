import React, { useState } from 'react';
import styles from '../styles/AddCategory.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = ({ onClose }) => {
    const [name, setName] = useState("");  // Название категории
    const [loading, setLoading] = useState(false); // Статус загрузки
    const [error, setError] = useState(null); // Статус ошибок
    const navigate = useNavigate();

    const headers = {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    };

    const handleCategoryCreate = (e) => {
        e.preventDefault();

        // Проверяем, если название не заполнено, то ошибка не будет отправлена
        if (!name) {
            setError("Название категории обязательно!");
            return;
        }

        setLoading(true); // Начинаем загрузку
        setError(null); // Очистка ошибок перед новым запросом

        // Данные для отправки в POST запросе
        const body = {
            name: name,
        };

        // Отправка POST запроса
        axios.post("http://api.ozinshe.com/core/V1/categories", body, { headers })
            .then((response) => {
                // Если запрос успешен, добавляем категорию
                console.log('Категория добавлена:', response.data);
                setLoading(false); // Завершаем загрузку
                setError(null); // Очистка ошибки, если запрос успешен
                onClose(); // Закрываем модалку
                navigate('/categories'); // Перенаправляем на страницу категорий
            })
            .catch((e) => {
                // Обработка ошибки
                setLoading(false); // Завершаем загрузку
                setError('Произошла ошибка при добавлении категории. Попробуйте еще раз.'); // Устанавливаем ошибку
                console.error('Ошибка при добавлении категории:', e);
            });
    };

    return (
        <div className={styles.modalOverlay}>
            <form onSubmit={handleCategoryCreate} className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Добавить категорию</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <img
                            src="\images\💚 Icon (9).svg"
                            alt="close"
                            style={{ width: '24px', height: '24px' }}
                        />
                    </button>
                </div>
                <div className={styles.divider}></div>

                {/* Поле для ввода названия категории */}
                <input
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    type="text"
                    placeholder="Название категории"
                    className={styles.searchInput}
                    required
                />

                {/* Ошибка */}
                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.buttonContainer}>
                    {/* Кнопка для отправки формы */}
                    <button className={styles.addButton} type="submit" disabled={loading}>
                        {loading ? 'Загрузка...' : 'Добавить'}
                    </button>

                    {/* Кнопка для закрытия модального окна */}
                    <button className={styles.cancelButton} onClick={onClose} disabled={loading}>
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCategory;
