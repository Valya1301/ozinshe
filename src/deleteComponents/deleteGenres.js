// В файле deleteGenres.js
import React from 'react';
import styles from '../styles/Delete.module.css';

const DeleteGenres = ({ onClose, genre, onCloseModal }) => {
    const handleDelete = () => {
        onClose(genre.id);  // Передаем id жанра для удаления
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Удалить жанр?</h2>
                    <button 
                        className={styles.closeButton} 
                        onClick={onCloseModal} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <img src="/images/💚 Icon (8).svg" alt="close" style={{ width: '24px', height: '24px' }} />
                    </button>
                </div>
                <div className={styles.divider}></div>
                <h1 className={styles.h1}>Вы действительно хотите удалить жанр {genre.name}?</h1>
                <div className={styles.buttonContainer}>
                    <button 
                        onClick={handleDelete} 
                        className={styles.addButton}
                    >
                        Да, удалить
                    </button>
                    <button 
                        onClick={onCloseModal} 
                        className={styles.cancelButton}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteGenres;  // Экспорт по умолчанию
