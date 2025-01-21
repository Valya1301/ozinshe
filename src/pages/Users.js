import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import UserModal from '../pages/UserModal'; // Импортируем модальное окно
import styles from '../styles/Users.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]); // Состояние для списка пользователей
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
    const [selectedUser, setSelectedUser] = useState(null); // Состояние для выбранного пользователя
    const [loading, setLoading] = useState(true); // Состояние для загрузки
    const [error, setError] = useState(null); // Состояние для ошибки

    // Заголовки для API запроса (если нужно авторизоваться)
    const headers = {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    };

    // Функция для получения списка пользователей с первого API
    const getUsers = async () => {
        setLoading(true); // Устанавливаем состояние загрузки
        try {
            // Закомментирован запрос к API для получения списка пользователей с пагинацией
            /*
            const response = await axios.get("http://api.ozinshe.com/core/V1/admin/?size=20&sortField=name&direction=asc", { headers });
            const usersData = response.data.data || [];
            setUsers(usersData); // Сохраняем информацию о пользователях
            */
            // Для тестирования, создадим заглушку данных
            setUsers([
                { id: 1, name: 'Иван Иванов', email: 'ivan@mail.ru' },
                { id: 2, name: 'Мария Петрова', email: 'maria@mail.ru' },
                { id: 3, name: 'Петр Сидоров', email: 'peter@mail.ru' },
            ]);
        } catch (err) {
            setError("Ошибка при загрузке пользователей"); // Если произошла ошибка
        } finally {
            setLoading(false); // Закрываем индикатор загрузки
        }
    };

    // Загружаем пользователей при монтировании компонента
    useEffect(() => {
        getUsers();
    }, []);

    // Функция для обработки клика по пользователю
    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // Функция для закрытия модального окна
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    // Обработка состояний загрузки и ошибки
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.container1}>
                    <div className={styles.top}>
                        <div className={styles.text}>Пользователи</div>
                        <div className={styles.text1}>{users.length}</div> {/* Количество пользователей */}
                    </div>
                    <div className={styles.container2}>
                        {users.map((user) => (
                            <div
                                key={user.id} // Используйте уникальный идентификатор
                                className={styles.block}
                                onClick={() => handleUserClick(user)} // Обработчик клика
                            >
                                <div className={styles.categoryLetter}>{user.name.charAt(0)}</div>
                                <div className={styles.categoryTitle}>{user.name}</div>
                                <div className={styles.gmail}>{user.email}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <UserModal isOpen={isModalOpen} onClose={closeModal} user={selectedUser} /> {/* Модалка с информацией о пользователе */}
        </div>
    );
}

export default Users;
