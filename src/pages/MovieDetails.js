import React, { useState, useEffect } from 'react';
import styles from '../styles/MovieDetails.module.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
    const [activeSeason, setActiveSeason] = useState(null);
    const [activeEpisode, setActiveEpisode] = useState(null);
    const [movies, setMovies] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();  // Для редиректа после удаления фильма

    const headers = {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    };

    const getMovies = (id) => {
        axios.get(`http://api.ozinshe.com/core/V1/movies/${id}?authenticated=true`, { headers })
            .then((response) => {
                setMovies(response.data);
                setError(null);
            })
            .catch((error) => {
                console.error("Ошибка", error.response ? error.response.data : error.message);
                setError("Не удалось загрузить данные о фильме.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = () => {
        axios.delete(`http://api.ozinshe.com/core/V1/movies/${id}`, { headers })
            .then((response) => {
                console.log('Фильм удален:', response);
                // Перенаправление на страницу списка фильмов после успешного удаления
                navigate('/movies'); // Замените '/movies' на путь к списку фильмов
            })
            .catch((error) => {
                console.error("Ошибка при удалении фильма:", error);
                setError("Не удалось удалить фильм.");
            });
    };

    useEffect(() => {
        if (id) {
            setLoading(true);
            getMovies(id);
        }
    }, [id]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.container1}>
                    <div className={styles.top}>
                        <div className={styles.projectContainer}>
                            <span className={styles.projectText}>Проект</span>
                            <img className={styles.arrowIcon3} src="/images/chevron-right.svg" alt="стрелка" />
                        </div>
                        <div className={styles.text}>{movies.name || 'Без названия'}</div>
                    </div>
                    <div className={styles.container2}>
                        <div className={styles.titleContainer}>
                            <h1 className={styles.title}>{movies.name || 'Без названия'}</h1>
                            <div className={styles.buttonContainer}>
                                <button className={styles.editButton}>Редактировать</button>
                                <button className={styles.deleteButton} onClick={handleDelete}>
                                    <img src="/images/Bell (1).svg" alt="удалить" />
                                </button>
                            </div>
                        </div>
                        <div className={styles.statsContainer}>
                            <div className={styles.statItem}>
                                <img src="/images/🌟 Star.svg" alt="просмотры" />
                                <span className={styles.statNumber}>{movies.watchCount || 0}</span>
                            </div>
                            <div className={styles.statItem}>
                                <img src="/images/Item.svg" alt="жанры" />
                                <span className={styles.statNumber}>{movies.genres?.length || 0}</span>
                            </div>
                            <div className={styles.statItem}>
                                <img src="/images/Item (1).svg" alt="серии" />
                                <span className={styles.statNumber}>{movies.seriesCount || 0}</span>
                            </div>
                        </div>
                        <div className={styles.videoContainer}>
                            <video controls className={styles.videoImage}>
                                <source 
                                    src={movies.video?.link || '/images/defaultVideo.mp4'} 
                                    type="video/mp4" 
                                />
                                Ваш браузер не поддерживает видео.
                            </video>
                            <div className={styles.circle}>
                                <img src="/images/alarm.svg" alt="иконка" className={styles.alarmIcon} />
                            </div>
                        </div>
                        <div className={styles.separator}></div>
                        <h2 className={styles.descriptionTitle}>Описание</h2>
                        <p className={styles.descriptionText}>{movies.description || 'Описание отсутствует'}</p>
                        <p className={styles.directorText}>
                            <span className={styles.directorLabel}>Режиссер:</span> 
                            <span className={styles.Name}>{movies.director || 'Неизвестен'}</span>
                        </p>
                        <p className={styles.directorText}>
                            <span className={styles.directorLabel}>Продюсер:</span> 
                            <span className={styles.Name}>{movies.producer || 'Неизвестен'}</span>
                        </p>
                        <div className={styles.lineSeparator}></div>
                        <h2 className={styles.screenshotsTitle}>Скриншоты</h2>
                        <div className={styles.screenshotContainer}>
                            {movies.screenshots?.map((screenshot, index) => (
                                <div key={index} className={styles.screenshot}>
                                    <img 
                                        src={screenshot?.link || '/images/defaultScreenshot.jpg'} 
                                        alt={`Скриншот ${index + 1}`} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.additionalInfo}>
                    <div className={styles.yearIcon}>
                        <img src="/images/Icon (5).svg" alt="Год" className={styles.icon} />
                        <span className={styles.additionalText}>{movies.releaseYear || 'Неизвестен'}</span>
                    </div>
                    <div className={styles.typeIcon}>
                        <img src="/images/Icon (2).svg" alt="Телехикая" className={styles.icon} />
                        <span className={styles.additionalText}>{movies.type || 'Неизвестен'}</span>
                    </div>
                    <div className={styles.seasonEpisodeInfo}>
                        <img src="/images/Icon (4).svg" alt="Сезон" className={styles.icon} />
                        <span className={styles.additionalText}>{movies.seasonsCount ? `${movies.seasonsCount} сезона, ${movies.episodesCount} серии` : 'Данные отсутствуют'}</span>
                    </div>
                    <div className={styles.imageContainer}>
                        <img 
                            src={movies.poster?.link || '/images/defaultPoster.jpg'} 
                            alt="Плакат фильма" 
                            className={styles.smallImage} 
                        />
                    </div>
                    <div className={styles.adminInfo}>
                        <div className={styles.adminRow}>
                            <span className={styles.label}>Добавил:</span> 
                            <span className={styles.value}>{movies.admin || 'Неизвестен'}</span>
                        </div>
                        <div className={styles.adminRow}>
                            <span className={styles.label}>Дата добавления:</span> 
                            <span className={styles.value}>{movies.addedDate || 'Неизвестна'}</span>
                        </div>
                        <div className={styles.adminRow}>
                            <span className={styles.label}>Дата обновления:</span> 
                            <span className={styles.value}>{movies.updatedDate }</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
