import React, { useState } from 'react';
import styles from '../styles/AddAge.module.css'; // Путь к стилям
import axios from 'axios';

const AddAge = ({ onClose }) => {
    const [name, setName] = useState(""); // Название возраста
    const [image, setImage] = useState(null); // Для предварительного просмотра изображения
    const [error, setError] = useState(''); // Статус ошибок
    const [loading, setLoading] = useState(false); // Статус загрузки

    const headers = {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    };

    const handleAddAge = async (e) => {
        e.preventDefault();

        if (!name || !image) {
            setError('Все поля обязательны для заполнения.');
            return;
        }

        const body = {
            name,
            link: image, // Отправляем base64 строку изображения
        };

        setLoading(true);
        setError(''); // Очистка ошибок перед запросом

        try {
            // Отправляем запрос на сервер
            const response = await axios.post("http://api.ozinshe.com/core/V1/category-ages", body, {
                headers: {
                    ...headers,
                    'Content-Type': 'application/json', // Для JSON-данных
                },
            });
            setLoading(false);
            setError('');
            onClose(); // Закрываем модальное окно после успешного добавления
            alert('Возраст успешно добавлен'); // Добавлено уведомление пользователю
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError('Произошла ошибка при добавлении возраста. Попробуйте еще раз.');
            setLoading(false);
        }
    };

    const handleImageClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImage(e.target.result); // Для предварительного просмотра и хранения изображения в формате base64
                };
                reader.readAsDataURL(file); // Читаем файл как base64 строку
            } else {
                setError('Пожалуйста, выберите изображение.');
            }
        };
        input.click();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Добавить возраст</h2>
                    <button type="button" className={styles.closeButton} onClick={onClose}>
                        <img src="/images/close-icon.svg" alt="close" style={{ width: '24px', height: '24px' }} />
                    </button>
                </div>
                <div className={styles.divider}></div>

                {error && <p className={styles.error}>{error}</p>}

                {/* Ввод названия */}
                <input
                    className={styles.inputContainer}
                    type="text"
                    placeholder="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                />

                {/* Блок для изображения */}
                <div
                    className={styles.imageDropZone}
                    onClick={handleImageClick}
                    style={{ cursor: 'pointer' }}
                >
                    {image ? (
                        <img
                            src={image}
                            alt="Загруженное изображение"
                            className={styles.uploadedImage}
                        />
                    ) : (
                        <>
                            <div className={styles.innerSquare}>
                                <img
                                    src="/images/icon.svg"
                                    alt="Иконка загрузки"
                                    style={{ width: '24px', height: '24px' }}
                                />
                            </div>
                            <p >Перетащите картинку или <span style={{ color: 'blue', fontWeight: 500 }}>загрузите</span></p>
                        </>
                    )}
                </div>

                {/* Кнопки */}
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.addButton}
                        type="button"
                        onClick={handleAddAge}
                        disabled={loading || !name || !image} // Отключаем кнопку, если нет имени или изображения
                    >
                        {loading ? 'Добавление...' : 'Добавить'}
                    </button>
                    <button className={styles.cancelButton} type="button" onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAge;
