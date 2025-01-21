import React from 'react';
import styles from '../styles/Delete.module.css'; // Импорт стилей для модального окна

const DeleteCategories = ({ onClose, state, onCloseModal }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Удалить категорию?</h2>
                    <button className={styles.closeButton} onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <img src="/images/💚 Icon (8).svg" alt="close" style={{ width: '24px', height: '24px' }} />
                    </button>
                </div>
                <div className={styles.divider}></div>
                <h1 className={styles.h1}>Вы действительно хотите удалить категорию?</h1>

                <div className={styles.buttonContainer}>
                    <button onClick={() => onClose(state.id)} className={styles.addButton} >Да, удалить</button>
                    <button onClick={() => onCloseModal()} className={styles.cancelButton} >Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCategories;
