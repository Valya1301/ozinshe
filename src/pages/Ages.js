import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Ages.module.css';
import AddAge from '../addComponents/AddAge';
import EditAge from '../edit/EditAge';
import DeleteAges from '../deleteComponents/deleteAges';

const Ages = () => {
    const [ages, setAges] = useState([]); // Состояние для возрастов
    const [modalState, setModalState] = useState({ add: false, edit: false, delete: null }); // Состояние для модальных окон
    const [selectedAge, setSelectedAge] = useState(null); // Для выбранного возраста

    // Заголовки для авторизации
    const headers = {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    };

    // Функция для получения списка возрастов
    const getAges = async () => {
        try {
            const response = await axios.get("http://api.ozinshe.com/core/V1/category-ages", { headers });
            setAges(response.data); // Устанавливаем список возрастов
        } catch (error) {
            console.error("Ошибка при получении возрастов:", error);
        }
    };

    // Загружаем возраста при монтировании компонента
    useEffect(() => {
        getAges();
    }, []);

    // Открытие модальных окон для добавления, редактирования или удаления
    const handleOpenModal = (type, age = null) => {
        if (type === 'add') {
            setModalState({ add: true, edit: false, delete: null });
        } else if (type === 'edit' && age) {
            setSelectedAge(age); // Устанавливаем выбранный возраст для редактирования
            setModalState({ add: false, edit: true, delete: null });
        } else if (type === 'delete' && age) {
            setModalState({ add: false, edit: false, delete: age }); // Устанавливаем выбранный возраст для удаления
        }
    };

    // Закрытие модальных окон
    const handleCloseModal = (type) => {
        if (type === 'add') {
            setModalState({ add: false, edit: false, delete: null });
        } else if (type === 'edit') {
            setModalState({ add: false, edit: false, delete: null });
            setSelectedAge(null); // Очистка выбранного возраста
        } else if (type === 'delete') {
            setModalState({ add: false, edit: false, delete: null });
        }
    };

    // Удаление возраста
    const handleDeleteAge = async (age) => {
        try {
            await axios.delete(`http://api.ozinshe.com/core/V1/category-ages/${age.id}`, { headers });
            setAges((prev) => prev.filter((item) => item.id !== age.id)); // Удаляем возраст из списка
            handleCloseModal('delete');
        } catch (error) {
            console.error("Ошибка при удалении возраста:", error);
        }
    };

    // Функция для обновления возраста после редактирования
    const handleEditAge = async (updatedAge) => {
        try {
            const response = await axios.put(`http://api.ozinshe.com/core/V1/category-ages/${updatedAge.id}`, updatedAge, { headers });
            console.log('Возраст успешно обновлён:', response.data);
            // Обновляем состояние возраста
            setAges((prevAges) => 
                prevAges.map((age) => age.id === updatedAge.id ? updatedAge : age)
            );
            handleCloseModal('edit');
        } catch (error) {
            console.error('Ошибка при обновлении возраста:', error);
            alert("Произошла ошибка при обновлении возраста.");
        }
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.container1}>
                    <div className={styles.top}>
                        <div className={styles.text}>Возрасты</div>
                        <div className={styles.text1}>{ages.length}</div>
                        <button className={styles.addbutton} onClick={() => handleOpenModal('add')}>
                            <img className={styles.addicon} src="/images/add.svg" alt="add icon" />
                            <div className={styles.addtext}>Добавить</div>
                        </button>
                    </div>
                    <div className={styles.container2}>
                        {ages.map((age) => (
                            <div key={age.id} className={styles.block}>
                                <img className={styles.images} src={age.link} alt="cartoon img" />
                                <div className={styles.categoryTitle}>{age.name} жас</div>
                                <div className={styles.categoryInfo}>
                                    <img className={styles.viewicon} src='/images/🌟 Star (1).svg' alt='views icon' />
                                    <div className={styles.views}>{age.movieCount}</div>
                                    <img
                                        className={styles.blockicone}
                                        src='/images/edit.svg'
                                        alt='edit icon'
                                        onClick={() => handleOpenModal('edit', age)} // Передаем объект для редактирования
                                    />
                                    <img
                                        className={styles.blockicone1}
                                        src='/images/delete.svg'
                                        alt='delete icon'
                                        onClick={() => handleOpenModal('delete', age)} // Передаем объект для удаления
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {modalState.add && <AddAge onClose={() => handleCloseModal('add')} />}
            {modalState.edit && selectedAge && (
                <EditAge
                    onClose={() => handleCloseModal('edit')}
                    onEdit={handleEditAge} // Передаем функцию для обновления
                    ageData={selectedAge} // Передаем выбранные данные для редактирования
                />
            )}
            {modalState.delete && (
                <DeleteAges
                    onClose={() => handleCloseModal('delete')}
                    onDelete={handleDeleteAge}
                    age={modalState.delete} // Передаем объект для удаления
                />
            )}
        </div>
    );
};

export default Ages;
