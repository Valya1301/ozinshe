import React from 'react';
import axios from 'axios';
import styles from '../styles/Delete.module.css'; // Импорт стилей для модального окна

const DeleteProjects = ({ project, onDelete, onClose }) => {
    // Обработчик для удаления проекта
    const handleDelete = async () => {
        if (project) {
            try {
                // Получаем токен из localStorage (или другого места хранения)
                const token = localStorage.getItem('authToken');
                if (!token) {
                    console.error('Токен авторизации не найден');
                    alert('Пожалуйста, авторизуйтесь для удаления проекта.');
                    return;
                }

                // Выполняем запрос на удаление проекта
                const response = await axios.delete(`http://api.ozinshe.com/core/V1/movies/${project.id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,  // Используем токен из localStorage
                    }
                });

                console.log('Фильм удален:', response);

                // Если запрос успешен, вызываем onDelete для обновления списка в родительском компоненте
                onDelete(project.id); // Обновляем родительский компонент (Projects)
                onClose(); // Закрываем модальное окно
            } catch (err) {
                console.error("Ошибка при удалении проекта:", err);
                alert('Ошибка при удалении проекта. Пожалуйста, попробуйте позже.');
            }
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Удалить проект?</h2>
                    <button 
                        className={styles.closeButton} 
                        onClick={onClose} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <img src="/images/💚 Icon (8).svg" alt="close" style={{ width: '24px', height: '24px' }} />
                    </button>
                </div>
                <div className={styles.divider}></div>
                <h1 className={styles.h1}>Вы действительно хотите удалить проект?</h1>

                <div className={styles.buttonContainer}>
                    {/* Кнопка для подтверждения удаления */}
                    <button className={styles.addButton} onClick={handleDelete}>
                        Да, удалить
                    </button>
                    {/* Кнопка для отмены удаления */}
                    <button className={styles.cancelButton} onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProjects;
