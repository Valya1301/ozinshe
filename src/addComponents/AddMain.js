import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import styles from '../styles/AddMain.module.css';

const AddMain = ({ onClose }) => { 
    const [name, setName] = useState(""); 
    const [link, setLink] = useState(""); 
    const [movieCount, setMovieCount] = useState(0); 
    const [fileId, setFileId] = useState(0); 
    const [sortOrder, setSortOrder] = useState(0); // Для очередности сортировки
    const [loading, setLoading] = useState(false); // Для состояния загрузки
    const [error, setError] = useState(""); // Для ошибок
    const navigate = useNavigate();

    // Авторизационные заголовки для запроса
    const headers = { 
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg', 
    };

    // Обработчик создания проекта
    const handleMainCreate = (e) => { 
        e.preventDefault();

        // Проверка обязательных полей
        if (!name || !link || !movieCount || fileId <= 0 || sortOrder === 0) {
            setError('Пожалуйста, заполните все поля корректно.');
            return;
        }

        // Собираем данные для отправки
        let body = { 
            fileId: fileId,
            id: 0,  // ID может быть передано как 0 (если API предполагает это значение по умолчанию)
            link: link, 
            movieId: movieCount,  // Используем movieCount как количество фильмов, если это правильно
            sortOrder: sortOrder
        };

        console.log("Отправляемые данные для проекта на главную:", body);  // Логируем тело запроса

        setLoading(true); // Начинаем загрузку
        setError(""); // Сбрасываем ошибки

        // Отправляем запрос на сервер
        axios.post("http://api.ozinshe.com/core/V1/movies_main", body, { headers })
            .then((response) => { 
                console.log(response);
                onClose();  // Закрываем модальное окно
                navigate('/ProjectsMain');  // Перенаправляем на страницу проектов
            })
            .catch((e) => { 
                console.error("Ошибка при добавлении проекта:", e);
                setError("Произошла ошибка при добавлении проекта. Попробуйте еще раз.");
            })
            .finally(() => {
                setLoading(false); // Завершаем загрузку
            });
    };

    return ( 
        <div className={styles.modalOverlay}> 
            <form onSubmit={handleMainCreate} className={styles.modal}> 
                <div className={styles.modalHeader}> 
                    <h2>Добавить проект на главную</h2> 
                    <button className={styles.closeButton} onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}> 
                        <img src="/images/💚 Icon (9).svg" alt="close" style={{ width: '24px', height: '24px' }} /> 
                    </button> 
                </div> 
                <div className={styles.divider}></div> 

                {/* Ошибка */}
                {error && <p className={styles.error}>{error}</p>}

                {/* Ввод названия проекта */}
                <input 
                    onChange={(event) => setName(event.target.value)} 
                    value={name} 
                    type="text"  
                    placeholder="Название проекта" 
                    className={styles.searchInput} 
                /> 

                {/* Ввод ссылки на проект */}
                <input 
                    onChange={(event) => setLink(event.target.value)} 
                    value={link} 
                    type="text"  
                    placeholder="Ссылка на проект" 
                    className={styles.searchInput} 
                /> 

                {/* Ввод количества фильмов */}
                <input 
                    onChange={(event) => setMovieCount(Number(event.target.value))} 
                    value={movieCount} 
                    type="number"  
                    placeholder="Количество фильмов" 
                    className={styles.searchInput} 
                /> 

                {/* Ввод ID файла */}
                <input 
                    onChange={(event) => setFileId(Number(event.target.value))} 
                    value={fileId} 
                    type="number"  
                    placeholder="ID файла (0 по умолчанию)" 
                    className={styles.searchInput} 
                /> 

                {/* Выбор очередности сортировки */}
                <select
                    className={styles.searchInput}
                    value={sortOrder}
                    onChange={(event) => setSortOrder(Number(event.target.value))}  // Убедитесь, что сортировка передается как число
                >
                    <option value={0}>Выберите очередность</option>
                    <option value={1}>По возрастанию</option>
                    <option value={-1}>По убыванию</option>
                </select>

                <div className={styles.buttonContainer}> 
                    <button className={styles.addButton} type="submit" disabled={loading}> 
                        {loading ? 'Добавление...' : 'Добавить'}
                    </button> 
                    <button className={styles.cancelButton} onClick={onClose} type="button">Закрыть</button> 
                </div> 
            </form> 
        </div> 
    ); 
}; 

export default AddMain;
