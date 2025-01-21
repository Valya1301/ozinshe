import React, { useState } from 'react';
import styles from '../styles/AddRoles.module.css';

const AddRoles = ({ onClose, onAddRole }) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const roleOptions = ['ROLE_MODERATOR', 'ROLE_ADMIN', 'ROLE_USER']; // Пример ролей

    const handleSubmit = () => {
        if (!email) {
            alert("Пожалуйста, введите email.");
            return;
        }
        if (!role) {
            alert("Пожалуйста, выберите роль.");
            return;
        }

        const newRole = {
            id: Date.now(),
            email: email,
            role: role,
        };

        onAddRole(newRole);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Добавить роль</h2>
                <div className={styles.divider}></div>

                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel1}>Email</label>
                    <div className={styles.inputWrapper}>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Введите email" 
                            className={styles.roleInput} 
                        />
                    </div>
                </div>

                <div className={styles.selectContainer}>
                    <label className={styles.inputLabel}>Роль</label>
                    <div className={styles.inputWrapper}>
                        <select 
                            className={styles.roleSelect}
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Выберите роль</option>
                            {roleOptions.map((roleOption, index) => (
                                <option key={index} value={roleOption}>{roleOption}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <button className={styles.addButton} onClick={handleSubmit}>Добавить</button>
                    <button className={styles.cancelButton} onClick={onClose}>Закрыть</button>
                </div>
            </div>
        </div>
    );
};

export default AddRoles;
