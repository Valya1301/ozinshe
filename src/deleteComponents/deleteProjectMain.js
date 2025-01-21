import React from 'react';
import styles from '../styles/Delete.module.css';

const DeleteProjectMain = ({ onClose, project, onDelete }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Удалить проект из главной?</h2>
                    <button 
                        className={styles.closeButton} 
                        onClick={onClose} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                                               <img src="/images/💚 Icon (8).svg" alt="close" style={{ width: '24px', height: '24px' }} />
                    </button>
                </div>
                <div className={styles.divider}></div>
                <p className={styles.confirmationText}>
                    Вы действительно хотите удалить  из главной?
                </p>
                <div className={styles.buttonContainer}>
                    <button 
                        onClick={onDelete} 
                        className={styles.addButton}
                    >
                        Да, удалить
                    </button>
                    <button 
                        onClick={onClose} 
                        className={styles.cancelButton}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProjectMain;
