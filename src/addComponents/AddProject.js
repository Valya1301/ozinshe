import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from '../styles/AddProject.module.css';

const AddProject = () => {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [category, setCategory] = useState('');
    const [projectType, setProjectType] = useState('');
    const [ageCategory, setAgeCategory] = useState('');
    const [year, setYear] = useState('');
    const [duration, setDuration] = useState('');
    const [keywords, setKeywords] = useState('');
    const [description, setDescription] = useState('');
    const [director, setDirector] = useState('');
    const [producer, setProducer] = useState('');
    const [loading, setLoading] = useState(false); // Статус загрузки
    const [error, setError] = useState(''); // Сообщение об ошибке

    // Заголовки для запроса
    const headers = {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg', // Используйте актуальный токен
        "Content-Type": "application/json",
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const projectData = {
            projectName,
            category,
            projectType,
            ageCategory,
            year,
            duration,
            keywords,
            description,
            director,
            producer,
        };

        setLoading(true);

        axios
            .post("http://api.ozinshe.com/core/V1/movies", projectData, { headers })
            .then((response) => {
                console.log(response);
                setError('');
                navigate('/ProjectsMain');
            })
            .catch((e) => {
                console.error("Ошибка при добавлении проекта:", e);
                setError("Произошла ошибка при добавлении проекта. Попробуйте еще раз.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onClose = () => {
        navigate('/');
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.container1}>
                    <div className={styles.top}>
                        <div className={styles.projectContainer}>
                            <span className={styles.projectText}>Проект</span>
                            <img
                                className={styles.arrowIcon3}
                                src="\images\chevron-right.svg"
                                alt="arrow"
                            />
                        </div>
                        <div className={styles.text}>Добавить проект</div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.infoContainer}>
                            <div className={styles.infoBox}>
                                <div className={styles.iconContainer}>
                                    <div className={styles.square}></div>
                                    <img
                                        className={styles.arrowIcon4}
                                        src="\images\Bell.svg"
                                        alt="arrow"
                                        onClick={onClose}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <span className={styles.infoText}>Основная информация</span>
                            </div>

                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Название проекта"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                required
                            />
                            {/* Дальше идет ваш код с остальными полями формы */}
                            {error && <div className={styles.errorMessage}>{error}</div>}
                            <div className={styles.buttonContainer}>
                                <button className={styles.addButton} type="submit" disabled={loading}>
                                    {loading ? 'Загрузка...' : 'Далее'}
                                </button>
                                <button className={styles.cancelButton} onClick={onClose}>
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProject;
