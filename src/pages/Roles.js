import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Roles.module.css';
import AddRoles from '../addComponents/AddRoles';

import DeleteRoles from '../deleteComponents/deleteRoles'; 
import axios from 'axios';

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null); 
    const [selectedRole, setSelectedRole] = useState(null);
    const [userEmails, setUserEmails] = useState({}); // Состояние для хранения email пользователей

    const headers = {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    };

    // Функция для получения списка ролей
    const getRoles = async () => {
        try {
            const response = await axios.get("http://api.ozinshe.com/core/admin/V1/roles/", { headers });
            setRoles(response.data);
            await fetchUserEmails(response.data); // Получаем email пользователей после получения ролей
        } catch (error) {
            console.error("Ошибка при загрузке ролей:", error);
        }
    };

    // Функция для получения email пользователя по его ID
    const fetchUserEmails = async (roles) => {
        const emailPromises = roles.map(async (role) => {
            try {
                const response = await axios.get(`http://api.ozinshe.com/core/V1/user/profile`, {
                    headers: { ...headers, "User-ID": role.userId }
                });
                return { userId: role.userId, email: response.data.email }; // Предполагаем, что API возвращает объект с email
            } catch (error) {
                console.error(`Ошибка при получении email для пользователя с ID ${role.userId}`, error);
                return { userId: role.userId, email: 'Ошибка при загрузке' };
            }
        });

        const emailData = await Promise.all(emailPromises);
        const emailMap = emailData.reduce((acc, { userId, email }) => {
            acc[userId] = email;
            return acc;
        }, {});
        
        setUserEmails(emailMap); // Обновляем состояние email пользователей
    };

    useEffect(() => {
        getRoles();
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    

   

    const handleOpenDeleteModal = (id) => {
        setSelectedRoleId(id);
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setSelectedRoleId(null);
    };

    const handleDeleteRole = async (id) => {
        try {
            await axios.delete(`http://api.ozinshe.com/core/admin/V1/roles/${id}`, { headers });
            getRoles(); 
            handleCloseDeleteModal(); 
        } catch (error) {
            console.error("Ошибка при удалении роли:", error);
        }
    };

    const addRole = (newRole) => {
        setRoles((prevState) => [...prevState, newRole]);
        handleCloseModal();
    };

   

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.container1}>
                    <div className={styles.top}>
                        <div className={styles.text}>Роли</div>
                        <div className={styles.text1}>{roles.length}</div>
                        <button className={styles.addbutton} onClick={handleOpenModal}>
                            <img className={styles.addicon} src="/images/add.svg" alt="add icon" />
                            <div className={styles.addtext}>Добавить</div>
                        </button>
                    </div>
                    <div className={styles.rolesWrapper}>
                        {roles.map((role) => (
                            <div key={role.id} className={styles.block}>
                                <div className={styles.categoryTitle1}>
                                    {/* Отображаем email перед ролью */}
                                    {userEmails[role.userId] ? (
                                        <p>{userEmails[role.userId]}</p>
                                    ) : (
                                        <span className={styles.categoryTitle1}>Загрузка email...</span>
                                    )}
                                </div>
                                <div className={styles.categoryTitle2}>
                                    {/* Отображаем роль пользователя */}
                                    {role.name}
                                </div>
                                <div className={styles.rolesContainer}>
                                    <div className={styles.roleItem1}>
                                        <img src="/images/🌟 Star (2).svg" alt="check icon" className={styles.checkIcon} />
                                        <div className={styles.categoryTitle3}>Проекты <span className={styles.grayText}>(Редактирование)</span></div>
                                    </div>
                                    <div className={styles.roleItem2}>
                                        <img src="/images/🌟 Star (2).svg" alt="check icon" className={styles.checkIcon} />
                                        <div className={styles.categoryTitle3}>Категории <span className={styles.grayText}>(Только чтение)</span></div>
                                    </div>
                                    <div className={styles.roleItem3}>
                                        <img src="/images/🌟 Star (2).svg" alt="check icon" className={styles.checkIcon} />
                                        <div className={styles.categoryTitle4}>Пользователи <span className={styles.grayText}>(Только чтение)</span></div>
                                        
                                        <img 
                                            className={styles.blockicone1} 
                                            src='/images/delete.svg' 
                                            alt='delete icon' 
                                            onClick={() => handleOpenDeleteModal(role.id)} 
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isModalOpen && <AddRoles onClose={handleCloseModal} onAddRole={addRole} />}
            
            
            {isDeleteModalOpen && (
                <DeleteRoles 
                    onClose={handleCloseDeleteModal} 
                    onDelete={handleDeleteRole} 
                    roleId={selectedRoleId} 
                />
            )}
        </div>
    );
};

export default Roles;
