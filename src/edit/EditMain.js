import React, { useState, useEffect } from 'react';
import styles from '../styles/EditMain.module.css'; // Путь к стилям для компонента редактирования
import axios from 'axios';

const EditMain = ({ onClose, onEdit, projectData }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [categories, setCategories] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    };

    // Загружаем данные для редактирования
    useEffect(() => {
        if (projectData) {
            setName(projectData.movie.name);
            setLink(projectData.movie.poster.link);
            setCategories(projectData.movie.categories.join(', ')); // Преобразуем категории в строку
            setSortOrder(projectData.sortOrder || 0);
        }
    }, [projectData]);

    // Обработчик отправки формы
    const handleEditProject = (e) => {
        e.preventDefault();

        // Проверка обязательных полей
        if (!name || !link || !categories || sortOrder === null) {
            setError('Все поля обязательны для заполнения.');
            return;
        }

        const updatedData = {
            movie: {
                name,
                poster: { link },
                categories: categories.split(',').map(category => category.trim()), // Преобразуем строку обратно в массив категорий
            },
            sortOrder,
        };

        setLoading(true);

        // Отправка PUT-запроса для обновления проекта
        axios.put(`http://api.ozinshe.com/core/V1/movies_main/${projectData.id}`, updatedData, { headers })
            .then((response) => {
                console.log('Проект обновлен:', response.data);
                onEdit(response.data); // Передаем обновленные данные родительскому компоненту
                onClose(); // Закрываем модалку
            })
            .catch((e) => {
                setLoading(false);
                setError('Произошла ошибка при обновлении проекта. Попробуйте еще раз.');
                console.error('Ошибка при обновлении проекта:', e);
            });
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Редактировать проект</h2>
                    <button type="button" className={styles.closeButton} onClick={onClose}>
                        <img src="/images/close-icon.svg" alt="close" style={{ width: '24px', height: '24px' }} />
                    </button>
                </div>
                <div className={styles.divider}></div>

                {/* Ошибка */}
                {error && <p className={styles.error}>{error}</p>}

                {/* Поля для редактирования */}
                <input
                    className={styles.inputContainer}
                    type="text"
                    placeholder="Название проекта"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading} // Блокируем поля, если идет загрузка
                />

                <input
                    className={styles.inputContainer}
                    type="text"
                    placeholder="Ссылка на изображение"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    disabled={loading} // Блокируем поля, если идет загрузка
                />

                <input
                    className={styles.inputContainer}
                    type="text"
                    placeholder="Категории (через запятую)"
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                    disabled={loading} // Блокируем поля, если идет загрузка
                />

                <input
                    className={styles.inputContainer}
                    type="number"
                    placeholder="Порядок сортировки"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    disabled={loading} // Блокируем поля, если идет загрузка
                />

                <div className={styles.buttonContainer}>
                    <button
                        className={styles.saveButton}
                        type="button"
                        onClick={handleEditProject}
                        disabled={loading || !name || !link || !categories || sortOrder === null} // Блокируем кнопку, если не все поля заполнены
                    >
                        {loading ? 'Обновление...' : 'Сохранить'}
                    </button>
                    <button className={styles.cancelButton} type="button" onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditMain;
