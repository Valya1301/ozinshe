import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/EditVideo.module.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    'Content-Type': 'application/json',
};

const EditVideo = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Получаем ID проекта из параметров маршрута
    const [projectData, setProjectData] = useState({});
    const [seasonsData, setSeasonsData] = useState([]); // Данные сезонов с сервера

    // Запрос для получения данных проекта
    useEffect(() => {
        if (!id) {
            console.error('ID не передан.');
            return;
        }

        console.log('Project ID:', id); // Лог для проверки, что ID существует

        // Запрос для получения данных проекта
        axios
            .get(`http://api.ozinshe.com/core/V1/movies/${id}`, { headers })
            .then((response) => {
                console.log('Данные проекта получены:', response.data);
                setProjectData(response.data);
                if (response.data.seasons) {
                    setSeasonsData(response.data.seasons); // Устанавливаем сезоны, если они есть
                }
            })
            .catch((error) => {
                console.error('Ошибка при загрузке данных проекта:', error.response || error);
            });

        // Запрос для получения данных сезонов
        axios
            .get(`http://api.ozinshe.com/core/V1/seasons/${id}`, { headers })
            .then((response) => {
                console.log('Данные сезонов получены:', response.data);
                setSeasonsData(response.data); // Устанавливаем данные сезонов
            })
            .catch((error) => {
                console.error('Ошибка при загрузке данных сезонов:', error.response || error);
            });
    }, [id]);

    // Функция для добавления нового поля ввода для серии
    const addSeasonInput = () => {
        setSeasonsData([...seasonsData, { videoId: '' }]);
    };

    // Функция для обработки изменения videoId сезона
    const handleSeasonChange = (seasonIndex, videoIndex, value) => {
        const updatedSeasons = [...seasonsData];
        updatedSeasons[seasonIndex].videos[videoIndex].videoId = value; // Обновляем videoId конкретного видео
        setSeasonsData(updatedSeasons);
    };

    // Функция для удаления сезона
    const removeSeasonInput = (seasonIndex, videoIndex) => {
        const updatedSeasons = [...seasonsData];
        updatedSeasons[seasonIndex].videos.splice(videoIndex, 1); // Удаляем видео из массива сезона
        setSeasonsData(updatedSeasons);
    };

    // Функция для сохранения изменений
    const handleSave = () => {
        if (!id) {
            console.error('ID проекта не найден.');
            return;
        }

        const putData = {
            projectId: id,
            seasons: seasonsData.map((season, seasonIndex) => ({
                seasonNumber: season.number,
                videos: season.videos.map((video, videoIndex) => ({
                    videoId: video.videoId,
                    seasonNumber: seasonIndex + 1,
                })),
            })),
        };

        console.log('Сохранение данных...', putData);

        axios
            .put(`http://api.ozinshe.com/core/V1/video/${id}`, putData, { headers })
            .then((response) => {
                console.log('Данные успешно обновлены:', response.data);
                navigate('/'); // Переход на главную страницу после успешного обновления
            })
            .catch((error) => {
                console.error('Ошибка при обновлении данных:', error.response || error);
            });
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
                            <img className={styles.arrowIcon3} src="/images/chevron-right.svg" alt="arrow" />
                        </div>
                        <div className={styles.text}>Редактировать проект</div>
                    </div>
                    <div className={styles.container2}>
                        <div className={styles.box1}>
                            <div className={styles.square}>
                                <img onClick={() => navigate("/")} className={styles.backicon} src="/images/Bell.svg" alt="back point" />
                            </div>
                            <span className={styles.infoText}>
                                
                                {projectData.name ? `Редактировать "${projectData.name}"` : "Загрузка..."}
                            </span>
                        </div>
                        <div className={styles.box2}>
                            <div onClick={() => navigate("/editProject")} className={styles.item}>Основная информация</div>
                            <div className={styles.item1}>Видео</div>
                            <div onClick={() => navigate(`/editcover/${id}`)} className={styles.item}>Обложка и скриншоты</div>
                        </div>

                        <label className={styles.inputLabel2} htmlFor="role">
                            Количество сезонов
                        </label>
                        <div className={styles.selectContainer}>
                            <select
                                id="role"
                                className={styles.select1}
                                value={projectData.category || ''}
                                onChange={(e) => setProjectData({ ...projectData, category: e.target.value })}
                                required
                            >
                                <option value="">Выберите категорию</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className={styles.text3}>Список сезонов</div>

                        {seasonsData.length > 0 ? (
                            seasonsData.map((season, seasonIndex) => (
                                <div key={seasonIndex} className={styles.box3}>
                                    <div className={styles.text4}>Сезон {season.number}</div>
                                    {season.videos && season.videos.length > 0 ? (
                                        season.videos.map((video, videoIndex) => (
                                            <div key={videoIndex} className={styles.box4}>
                                                <input
                                                    className={styles.input1}
                                                    placeholder="Серия / Youtube Video ID"
                                                    type="text"
                                                    value={video.videoId || ''}
                                                    onChange={(e) => handleSeasonChange(seasonIndex, videoIndex, e.target.value)}
                                                />
                                                <img
                                                    className={styles.deleteicon}
                                                    src='/images/delete.svg'
                                                    alt='delete icon'
                                                    onClick={() => removeSeasonInput(seasonIndex, videoIndex)}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p>Видео не найдены для этого сезона.</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>Сезоны не найдены.</p>
                        )}

                        <div className={styles.text5} onClick={addSeasonInput}>Добавить серию</div>
                        <div className={styles.box5}>
                            <button className={styles.nextbtn} onClick={handleSave}>Сохранить</button>
                            <button onClick={() => navigate("/")} className={styles.cancelbtn}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditVideo;
