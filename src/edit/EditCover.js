import { useEffect, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/EditCover.module.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    "Content-Type": "application/json",
};

const EditCover = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // Получаем параметр id из URL
    const [coverImage, setCoverImage] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [projectName, setProjectName] = useState('');  // Состояние для имени проекта
    const [isDropZoneVisible, setDropZoneVisible] = useState(true);
    const [error, setError] = useState(null); // Для отображения ошибок
    const [isLoading, setIsLoading] = useState(true); // Состояние для загрузки данных

    useEffect(() => {
        if (!id) {
            setError('ID проекта не найден');
            setIsLoading(false);  // Завершаем загрузку
            return;
        }

        const fetchCoverData = async () => {
            try {
                setIsLoading(true); // Начинаем загрузку данных
                const response = await axios.get(`http://api.ozinshe.com/core/V1/movies/${id}`, { headers });
                console.log("Данные о проекте загружены:", response.data);

                if (response.data.name) {  // Получаем имя проекта из ответа API
                    setProjectName(response.data.name);  // Устанавливаем имя проекта
                }

                if (response.data.poster && response.data.poster.link) {
                    setCoverImage(response.data.poster.link); // Устанавливаем обложку
                } else {
                    setCoverImage(null); // Если нет, то обложка = null
                }

                if (response.data.screenshots && response.data.screenshots.length > 0) {
                    setScreenshots(response.data.screenshots.map(screenshot => screenshot.link)); // Устанавливаем скриншоты
                } else {
                    setScreenshots([]); // Если нет скриншотов, то устанавливаем пустой массив
                }

            } catch (error) {
                console.error("Ошибка при загрузке данных обложки:", error);
                setError('Ошибка при загрузке данных');
            } finally {
                setIsLoading(false); // Завершаем загрузку
            }
        };

        fetchCoverData();
    }, [id]);

    const handleCoverImageDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCoverImage(imageUrl);
            setDropZoneVisible(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCoverImage(imageUrl);
            setDropZoneVisible(false);
        }
    };

    const handleRemoveCoverImage = () => {
        setCoverImage(null);
        setDropZoneVisible(true);
    };

    const handleScreenshotDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        const newScreenshots = files.map(file => URL.createObjectURL(file));
        setScreenshots(prev => [...prev, ...newScreenshots]);

        // Отправка файлов на сервер
        uploadScreenshots(files);
    };

    const handleAddScreenshot = () => {
        document.getElementById('screenshotInput').click();
    };

    const handleScreenshotChange = (event) => {
        const files = Array.from(event.target.files);
        const newScreenshots = files.map(file => URL.createObjectURL(file));
        setScreenshots(prev => [...prev, ...newScreenshots]);

        // Отправка файлов на сервер
        uploadScreenshots(files);
    };

    const handleRemoveScreenshot = (index) => {
        const updatedScreenshots = screenshots.filter((_, i) => i !== index);
        setScreenshots(updatedScreenshots);
    };

    const uploadScreenshots = async (files) => {
        try {
            const formData = new FormData();
            files.forEach(file => {
                formData.append("screenshots", file);  // Добавляем каждый файл скриншота
            });

            await axios.post(`http://api.ozinshe.com/core/V1/screenshots/${id}`, formData, {
                headers: {
                    ...headers,
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log('Скриншоты успешно загружены');
        } catch (error) {
            console.error("Ошибка при загрузке скриншотов:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            if (coverImage instanceof File) {
                formData.append('coverImage', coverImage);  // Если это файл, добавляем его в форму
            }

            await axios.put(`http://api.ozinshe.com/core/V1/movies/${id}`, formData, {
                headers: {
                    ...headers,
                    "Content-Type": "multipart/form-data"
                }
            });

            await uploadScreenshots(screenshots);

            navigate("/");  // Перенаправляем после успешного сохранения
        } catch (error) {
            console.error("Ошибка при сохранении проекта:", error);
            setError('Ошибка при сохранении данных');
        }
    };

    const handleBack = () => {
        navigate("/"); // Возврат на главную страницу
    };

    if (isLoading) {
        return <div>Загрузка...</div>;  // Здесь можно добавить спиннер или другой индикатор
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
                        <div className={styles.text}>Редактировать проект</div>
                    </div>
                    <div className={styles.container2}>
                        <div className={styles.box1}>
                            <div className={styles.square}>
                                <img onClick={handleBack} className={styles.backicon} src="/images/Bell.svg" alt="назад" />
                            </div>
                            <span className={styles.infoText}>
                                {projectName && ` Редактировать "${projectName}"`}
                                </span>
                        </div>
                        <div className={styles.box2}>
                            <div onClick={() => navigate("/EditProject")} className={styles.item}>Основная информация</div>
                            <div onClick={() => navigate(`/editvideo/${id}`)} className={styles.item}>Видео</div>
                            <div className={styles.item1}>Обложка и скриншоты</div>
                        </div>
                        {error && <div className={styles.error}>{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className={styles.infoContainer}>
                                <h3>Обложка</h3>
                                <span className={styles.infoText}>Рекомендуется использовать картинки размером не менее 375×550px</span>

                                {coverImage ? (
                                    <div className={styles.coverImageContainer}>
                                        <img src={coverImage} alt="Cover" className={styles.coverImage} />
                                        <div className={styles.deleteIconBackground}>
                                            <img
                                                className={styles.deleteIconCover}
                                                src="/images/delete.svg"
                                                alt="delete"
                                                onClick={handleRemoveCoverImage}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={styles.imageDropZone}
                                        onDrop={handleCoverImageDrop}
                                        onClick={() => document.getElementById('coverInput').click()}
                                    >
                                        <input
                                            type="file"
                                            id="coverInput"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <div className={styles.innerSquare}>
                                            <img
                                                src="/images/icon.svg"
                                                alt="Иконка"
                                                style={{ width: '24px', height: '24px' }}
                                            />
                                        </div>
                                        <p style={{ marginTop: '98px', fontWeight: 500, color: 'Gray', textAlign: 'center' }}>
                                            Перетащите изображение сюда или нажмите для выбора
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className={styles.infoContainer}>
                                <h3>Скриншоты</h3>
                                <div
                                    className={styles.screenshotDropZone}
                                    onDrop={handleScreenshotDrop}
                                    onClick={handleAddScreenshot}
                                >
                                    <input
                                        type="file"
                                        id="screenshotInput"
                                        accept="image/*"
                                        multiple
                                        onChange={handleScreenshotChange}
                                        style={{ display: 'none' }}
                                    />
                                    <p>Перетащите скриншоты сюда или нажмите для выбора</p>
                                </div>
                                <div className={styles.screenshotContainer}>
                                    {screenshots.map((screenshot, index) => (
                                        <div key={index} className={styles.screenshot}>
                                            <img src={screenshot} alt={`Screenshot ${index + 1}`} className={styles.screenshotImage} />
                                            <div
                                                className={styles.deleteIconBackground}
                                                onClick={() => handleRemoveScreenshot(index)}
                                            >
                                                <img
                                                    className={styles.deleteIcon}
                                                    src="/images/delete.svg"
                                                    alt="delete"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.buttonsContainer}>
                                <button type="submit" className={styles.saveButton}>Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCover;
