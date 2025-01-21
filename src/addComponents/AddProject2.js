import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from '../styles/AddProject2.module.css';

const AddProject2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [category, setCategory] = useState('season');
    const [seasons, setSeasons] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const basicInfo = location.state?.basicInfo;

    useEffect(() => {
        if (!basicInfo) {
            navigate('/AddProject');
        }

        const fetchVideos = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://api.ozinshe.com/core/V1/videos', {
                    headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg` }, // Убедитесь, что токен правильный
                });
                setVideos(response.data);
                setLoading(false);
            } catch (err) {
                setError('Ошибка при загрузке видео.');
                setLoading(false);
            }
        };

        fetchVideos();
    }, [basicInfo, navigate]);

    const handleAddSeason = () => {
        const newSeason = `Сезон ${seasons.length + 1}`;
        setSeasons([...seasons, newSeason]);

        axios.post('http://api.ozinshe.com/core/V1/seasons', { season: newSeason }, {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg` }
        })
            .then((response) => {
                console.log('Сезон добавлен:', response.data);
            })
            .catch((err) => {
                console.error('Ошибка при добавлении сезона:', err);
                setError('Не удалось добавить сезон');
            });
    };

    const handleRemoveSeason = (index) => {
        const newSeasons = seasons.filter((_, i) => i !== index);
        setSeasons(newSeasons);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/AddProject3', { state: { basicInfo } });
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
                    <form onSubmit={handleSubmit}>
                        <div className={styles.infoContainer}>
                            <div className={styles.infoBox}>
                                <div className={styles.iconContainer}>
                                    <div className={styles.square}></div>
                                    <img
                                        className={styles.arrowIcon4}
                                        src="/images/Bell.svg"
                                        alt="arrow"
                                        onClick={handleBack}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <span className={styles.infoText}>Видео</span>
                            </div>

                            <button type="button" className={styles.addSeriesButton} onClick={handleAddSeason}>
                                Добавить серию
                            </button>

                            {seasons.map((season, index) => (
                                <div key={index} className={styles.seasonContainer}>
                                    <span className={styles.seasonText}>{season}</span>
                                    <button type="button" onClick={() => handleRemoveSeason(index)}>
                                        Удалить
                                    </button>
                                </div>
                            ))}

                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {videos.length > 0 && (
                                <div>
                                    <h3>Доступные видео</h3>
                                    <ul>
                                        {videos.map((video, index) => (
                                            <li key={index}>{video.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className={styles.buttonContainer}>
                                <button type="button" onClick={handleBack}>Назад</button>
                                <button type="submit">Далее</button>
                                <button type="button" onClick={onClose}>Отмена</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProject2;
