import React from 'react';
import styles from '../styles/Delete.module.css'; // Импорт стилей для модального окна

const DeleteAges = ({ onClose, onDelete, age }) => {
    const handleDelete = () => {
        onDelete(age); // Передаем весь объект age для удаления
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Удалить возраст</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <img src="/images/💚 Icon (9).svg" alt="close" style={{ width: '24px', height: '24px' }} />
                    </button>
                </div>
                <div className={styles.divider}></div>
                <h1 className={styles.h1}>Вы уверены, что хотите удалить возраст: <strong>{age.name}</strong>?</h1>
                <div className={styles.buttonContainer}>
                    <button onClick={handleDelete} className={styles.addButton}>Да, удалить</button>
                    <button onClick={onClose} className={styles.cancelButton}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAges;
