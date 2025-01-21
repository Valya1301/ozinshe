import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Modal.module.css'; // Убедитесь, что файл стилей существует

const Modal = ({ onClose, onConfirm, children }) => {
    const navigate = useNavigate();

    const handleClose = () => {
        onClose();
        navigate('/'); // Перенаправление на главную страницу
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    <img src="/images/💚 Icon (9).svg" alt="close" style={{ width: '24px', height: '24px' }} />
                </button>

                <div className={styles.divider}></div>

                <button className={styles.confirmButton} onClick={onConfirm}>
                    <img src="/images/Icon (1).svg" alt="Подтвердить" className={styles.checkIcon} />
                </button>
                <p className={styles.text}>Проект добавлен успешно!</p>
                <button className={styles.cancel} onClick={handleClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default Modal;
