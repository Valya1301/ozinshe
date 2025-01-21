import React from 'react';
import styles from '../styles/UserModal.module.css'; // Импортируйте стили для модалки

const UserModal = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null; // Если модалка не открыта, ничего не рендерим

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.modalTitle}>Данные пользователя</h2>
                    <svg
                        onClick={onClose}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className={styles.closeIcon}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <hr className={styles.separator} />
                
                {/* Контейнер для информации о пользователе */}
                <div className={styles.content}>
                    <div className={styles.imageContainer}>
                        <img src="\images\Image (13).svg" alt="Смайлик" className={styles.userImage} />
                    </div>
                    <p className={styles.userName}>{user.name}</p>
                    <p className={styles.userEmail}>{user.email}</p>
                    <p className={styles.userPhone}>{user.phoneNumber}</p>
                    <p className={styles.userBirthDate}>Дата рождения: {user.birthDate}</p>
                </div>
                <button className={styles.closeButton} onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
}

export default UserModal;
