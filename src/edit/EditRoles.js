import React, { useEffect, useState } from 'react';
import styles from '../styles/EditRoles.module.css';

const EditRoles = ({ onClose, role }) => {
    const [roleName, setRoleName] = useState('');
    const [selectedOptions, setSelectedOptions] = useState(Array(4).fill(''));

    useEffect(() => {
        if (role) {
            setRoleName(role.name);
            setSelectedOptions(role.options || Array(4).fill('')); // Убедитесь, что options инициализированы
        }
    }, [role]);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Редактировать роль</h2>
                <div className={styles.divider}></div>

                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel1}>Название роли</label>
                    <div className={styles.inputWrapper}>
                        <input 
                            type="text" 
                            value={roleName} 
                            onChange={(e) => setRoleName(e.target.value)} 
                            placeholder="Введите название роли" 
                            className={styles.roleInput} 
                        />
                    </div>
                </div>

                {['Проект', 'Категория', 'Пользователь', 'Роль'].map((label, index) => (
                    <div key={index} className={styles.selectContainer}>
                        <label className={styles.inputLabel}>{label}</label>
                        <div className={styles.inputWrapper}>
                            <select 
                                className={styles.roleSelect} 
                                value={selectedOptions[index]} 
                                onChange={(e) => {
                                    const newSelectedOptions = [...selectedOptions];
                                    newSelectedOptions[index] = e.target.value;
                                    setSelectedOptions(newSelectedOptions);
                                }}
                            >
                                <option value="">Выберите {label.toLowerCase()}</option>
                                {/* Здесь добавьте соответствующие опции */}
                            </select>
                        </div>
                    </div>
                ))}

                <div className={styles.buttonContainer}>
                    <button className={styles.cancelButton} onClick={onClose}>Закрыть</button>
                </div>
            </div>
        </div>
    );
};

export default EditRoles;
