import React, { useState, useEffect } from 'react';
import styles from '../styles/AddAge.module.css';
import axios from 'axios';

const EditAge = ({ onClose, onEdit, ageData }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [movieCount, setMovieCount] = useState(0);
    const [fileId, setFileId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const headers = {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    };

    // Загружаем данные для редактирования
    useEffect(() => {
        if (ageData) {
            setName(ageData.name);
            setLink(ageData.link);
            setMovieCount(ageData.movieCount);
            setFileId(ageData.fileId || 0);  // В случае если fileId может быть null или не определен
        }
    }, [ageData]);

    // Обработчик отправки формы
    const handleEditAge = (e) => {
        e.preventDefault();

        // Проверка обязательных полей
        if (!name || !link || !movieCount || !fileId) {
            setError('Все поля обязательны для заполнения.');
            return;
        }

        const updatedData = { name, link, movieCount, fileId };
        setLoading(true);

        // Отправка PUT-запроса для обновления возраста
        axios.put(`http://api.ozinshe.com/core/V1/category-ages/${ageData.id}`, updatedData, { headers })
            .then((response) => {
                console.log('Возраст обновлен:', response.data);
                onEdit(response.data); // Передаем обновленные данные родительскому компоненту
                onClose(); // Закрываем модалку
            })
            .catch((e) => {
                setLoading(false);
                setError('Произошла ошибка при обновлении возраста. Попробуйте еще раз.');
                console.error('Ошибка при обновлении возраста:', e);
            });
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Редактировать возраст</h2>
                    <button type="button" className={styles.closeButton} onClick={onClose}>
                        <img src="/images/💚 Icon (9).svg" alt="close" style={{ width: '24px', height: '24px' }} />
                    </button>
                </div>
                <div className={styles.divider}></div>

                {/* Ошибка */}
                {error && <p className={styles.error}>{error}</p>}

                {/* Поля для редактирования */}
                <input
                    className={styles.inputContainer}
                    type="text"
                    placeholder="Название"
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
                    type="number"
                    placeholder="Количество фильмов"
                    value={movieCount}
                    onChange={(e) => setMovieCount(Number(e.target.value))}
                    disabled={loading} // Блокируем поля, если идет загрузка
                />

                <input
                    className={styles.inputContainer}
                    type="number"
                    placeholder="File ID"
                    value={fileId}
                    onChange={(e) => setFileId(Number(e.target.value))}
                    disabled={loading} // Блокируем поля, если идет загрузка
                />

                <div className={styles.buttonContainer}>
                    <button
                        className={styles.addButton}
                        type="button"
                        onClick={handleEditAge}
                        disabled={loading || !name || !link || !movieCount || !fileId} // Блокируем кнопку, если не все поля заполнены
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

export default EditAge;
