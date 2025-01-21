import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Genres.module.css';
import AddGenre from '../addComponents/AddGenre';
import EditGenre from '../edit/EditGenre';
import DeleteGenres from '../deleteComponents/deleteGenres';

const Genres = () => {
    const [genres, setGenres] = useState([]); // Состояние для жанров
    const [modalState, setModalState] = useState({ add: false, edit: false, delete: null }); // Состояние для модальных окон
    const [selectedGenre, setSelectedGenre] = useState(null); // Для выбранного жанра
    const [error, setError] = useState(null); // Состояние для ошибок
    const [successMessage, setSuccessMessage] = useState(null); // Состояние для успешных действий

    // Заголовки для авторизации
    const headers = {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    };

    // Функция для получения списка жанров
    const getGenres = async () => {
        try {
            const response = await axios.get("http://api.ozinshe.com/core/V1/genres", { headers });
            setGenres(response.data); // Устанавливаем список жанров
        } catch (error) {
            console.error("Ошибка при получении жанров:", error);
            setError('Произошла ошибка при загрузке жанров. Попробуйте позже.');
        }
    };

    // Загружаем жанры при монтировании компонента
    useEffect(() => {
        getGenres();
    }, []);

    // Открытие модальных окон для добавления, редактирования или удаления
    const handleOpenModal = (type, genre = null) => {
        if (type === 'add') {
            setModalState({ add: true, edit: false, delete: null });
        } else if (type === 'edit' && genre) {
            setSelectedGenre(genre); // Устанавливаем выбранный жанр для редактирования
            setModalState({ add: false, edit: true, delete: null });
        } else if (type === 'delete' && genre) {
            setModalState({ add: false, edit: false, delete: genre }); // Устанавливаем выбранный жанр для удаления
        }
    };

    // Закрытие модальных окон
    const handleCloseModal = (type) => {
        if (type === 'add') {
            setModalState({ add: false, edit: false, delete: null });
        } else if (type === 'edit') {
            setModalState({ add: false, edit: false, delete: null });
            setSelectedGenre(null); // Очистка выбранного жанра
        } else if (type === 'delete') {
            setModalState({ add: false, edit: false, delete: null });
        }
    };

    // Удаление жанра
    const handleDeleteGenre = async (genre) => {
        try {
            await axios.delete(`http://api.ozinshe.com/core/V1/genres/${genre.id}`, { headers });
            setGenres((prev) => prev.filter((item) => item.id !== genre.id)); // Удаляем жанр из списка
            setSuccessMessage('Жанр успешно удалён!');
            handleCloseModal('delete');
        } catch (error) {
            console.error("Ошибка при удалении жанра:", error);
            setError('Произошла ошибка при удалении жанра. Попробуйте еще раз.');
        }
    };

    // Функция для обновления жанра после редактирования
    const handleEditGenre = async (updatedGenre) => {
        try {
            const response = await axios.put(`http://api.ozinshe.com/core/V1/genres/${updatedGenre.id}`, updatedGenre, { headers });
            console.log('Жанр успешно обновлён:', response.data);
            // Обновляем состояние жанра
            setGenres((prevGenres) => 
                prevGenres.map((genre) => genre.id === updatedGenre.id ? updatedGenre : genre)
            );
            setSuccessMessage('Жанр успешно обновлён!');
            handleCloseModal('edit');
        } catch (error) {
            console.error('Ошибка при обновлении жанра:', error);
            setError('Произошла ошибка при обновлении жанра.');
        }
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.container1}>
                    <div className={styles.top}>
                        <div className={styles.text}>Жанры</div>
                        <div className={styles.text1}>{genres.length}</div>
                        <button className={styles.addbutton} onClick={() => handleOpenModal('add')}>
                            <img className={styles.addicon} src="/images/add.svg" alt="add icon" />
                            <div className={styles.addtext}>Добавить</div>
                        </button>
                    </div>
                    <div className={styles.container2}>
                        {genres.map((genre) => (
                            <div key={genre.id} className={styles.block}>
                                <img className={styles.images} src={genre.link} alt="category img" />
                                <div className={styles.categoryTitle}>{genre.name}</div>
                                <div className={styles.categoryInfo}>
                                    <img className={styles.viewicon} src='/images/🌟 Star (1).svg' alt='views icon' />
                                    <div className={styles.views}>{genre.movieCount}</div>
                                    <img
                                        className={styles.blockicone}
                                        src='/images/edit.svg'
                                        alt='edit icon'
                                        onClick={() => handleOpenModal('edit', genre)} // Передаем объект для редактирования
                                    />
                                    <img
                                        className={styles.blockicone1}
                                        src='/images/delete.svg'
                                        alt='delete icon'
                                        onClick={() => handleOpenModal('delete', genre)} // Передаем объект для удаления
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {modalState.add && <AddGenre onClose={() => handleCloseModal('add')} />}
            {modalState.edit && selectedGenre && (
                <EditGenre
                    onClose={() => handleCloseModal('edit')}
                    onEdit={handleEditGenre} // Передаем функцию для обновления
                    genreData={selectedGenre} // Передаем выбранные данные для редактирования
                />
            )}
            {modalState.delete && (
                <DeleteGenres
                    onClose={() => handleCloseModal('delete')}
                    onDelete={handleDeleteGenre}
                    genre={modalState.delete} // Передаем объект для удаления
                />
            )}
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
};

export default Genres;
