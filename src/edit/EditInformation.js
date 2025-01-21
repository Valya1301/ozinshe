import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from '../styles/EditProject.module.css';

const EditInformation = () => {
    const { id } = useParams();  // Получаем id проекта из URL
    const navigate = useNavigate();

    const [projectName, setProjectName] = useState('');
    const [category, setCategory] = useState('');
    const [movieTypes, setMovieTypes] = useState([]); // Типы фильмов
    const [movieType, setMovieType] = useState(null); // Тип фильма (для редактирования)
    const [ageCategory, setAgeCategory] = useState('');
    const [year, setYear] = useState('');
    const [duration, setDuration] = useState('');
    const [keywords, setKeywords] = useState('');
    const [description, setDescription] = useState('');
    const [director, setDirector] = useState('');
    const [producer, setProducer] = useState('');
    const [categories, setCategories] = useState([]); // Категории
    const [years, setYears] = useState([]); // Года
    const [ageCategories, setAgeCategories] = useState([]); // Возрастные категории
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
        "Content-Type": "application/json",
    };

    // Функция для загрузки данных проекта при редактировании
    const getProjectData = () => {
        setLoading(true);
        axios
            .get(`http://api.ozinshe.com/core/V1/movies/${id}`, { headers })
            .then((response) => {
                const project = response.data;
                console.log('Project Data:', project); // Выводим данные в консоль для проверки

                setProjectName(project.name || '');
                setCategory(project.movieType || ''); // Используем movieType для категории
                setMovieType(project.movieType || ''); // Используем movieType для типа
                setAgeCategory(project.ageCategory || ''); // Если в данных есть возрастная категория
                setYear(project.year || '');
                setDuration(project.timing || ''); // Используем timing для хронометража
                setKeywords(project.keyWords || '');
                setDescription(project.description || '');
                setDirector(project.director || '');
                setProducer(project.producer || '');
                setLoading(false);
            })
            .catch(() => {
                setError("Не удалось загрузить данные проекта");
                setLoading(false);
            });
    };

    // Функция для загрузки категорий
    const getCategories = () => {
        axios
            .get('http://api.ozinshe.com/core/V1/categories', { headers })
            .then((response) => setCategories(response.data))
            .catch((err) => console.error('Ошибка при загрузке категорий:', err));
    };

    // Функция для загрузки типов фильмов
    const getMovieTypes = () => {
        let url = 'http://api.ozinshe.com/core/V1/movies/page';
        const params = {};
   
        if (movieType) params.type = movieType;
        const queryParams = new URLSearchParams(params).toString();
        if (queryParams) url += `?${queryParams}`;

        axios
          .get(url, { headers })
          .then((response) => {
            const types = [...new Set(response.data.content.map((movie) => movie.movieType))];
            setMovieTypes(types); // Обновляем список типов фильмов
          })
          .catch((err) => console.error('Ошибка при загрузке фильмов:', err));
    };

    // Функция для загрузки годов
    const getYears = () => {
        axios
            .get('http://api.ozinshe.com/core/V1/year/list', { headers })
            .then((response) => setYears(response.data))
            .catch((err) => console.error('Ошибка при загрузке годов:', err));
    };

    // Функция для загрузки возрастных категорий
    const getAgeCategories = () => {
        axios
            .get('http://api.ozinshe.com/core/V1/category-ages', { headers })
            .then((response) => setAgeCategories(response.data))
            .catch((err) => console.error('Ошибка при загрузке возрастных категорий:', err));
    };

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        getProjectData();
        getCategories();
        getMovieTypes();
        getYears();
        getAgeCategories(); // Загружаем возрастные категории
    }, [id]);

    // Функция для обработки изменений в форме
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'projectName':
                setProjectName(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'movieType':
                setMovieType(value);
                break;
            case 'ageCategory':
                setAgeCategory(value);
                break;
            case 'year':
                setYear(value);
                break;
            case 'duration':
                setDuration(value);
                break;
            case 'keywords':
                setKeywords(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'director':
                setDirector(value);
                break;
            case 'producer':
                setProducer(value);
                break;
            default:
                break;
        }
    };

    // Обработчик отправки данных на сервер
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Собираем данные для отправки
        const projectData = {
            projectName,
            category,
            movieType,  // Добавляем тип фильма
            ageCategory,
            year,
            duration,
            keywords,
            description,
            director,
            producer,
        };

        axios
            .put(`http://api.ozinshe.com/core/V1/movies/${id}`, projectData, { headers })
            .then(() => {
                navigate(`/Projects`); // Перенаправление на страницу проектов
            })
            .catch(() => {
                setError("Ошибка при сохранении проекта");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onClose = () => {
        navigate('/'); // Закрыть страницу и вернуться на главную
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
                                <span className={styles.infoText}>
                                {projectName && ` "${projectName}"`}
                                </span>
                                        </div>

                            {/* Название проекта */}
                            <label className={styles.label1}>Название проекта</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Введите название проекта"
                                value={projectName}
                                onChange={handleChange}
                                name="projectName"
                                required
                            />

                            {/* Категория */}
                            <label className={styles.label2}>Категория</label>
                            <select
                                className={styles.select1}
                                value={category}
                                onChange={handleChange}
                                name="category"
                                required
                            >
                                <option value="">Выберите категорию</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name} {/* Отображаем только name категории */}
                                    </option>
                                ))}
                            </select>

                            {/* Тип фильма */}
                            <label className={styles.label3}>Тип фильма</label>
                            <select
                                className={styles.select}
                                value={movieType || ''}
                                onChange={(e) => setMovieType(e.target.value ? e.target.value : null)}
                                name="movieType"
                                required
                            >
                                <option value="all">Выберите тип фильма</option>
                                {movieTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>

                            {/* Возрастная категория */}
                            <label className={styles.label4}>Возрастная категория</label>
                            <select
                                className={styles.select}
                                value={ageCategory || ''}
                                onChange={handleChange}
                                name="ageCategory"
                                required
                            >
                                <option value="">Выберите возрастную категорию</option>
                                {ageCategories.map((ageCategory) => (
                                    <option key={ageCategory.id} value={ageCategory.id}>
                                        {ageCategory.name} {/* Отображаем только name категории */}
                                    </option>
                                ))}
                            </select>

                            {/* Год */}
                            <label className={styles.label5}>Год</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Год"
                                value={year}
                                onChange={handleChange}
                                name="year"
                                required
                            />

                            {/* Продолжительность */}
                            <label className={styles.label6}>Продолжительность</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Продолжительность"
                                value={duration}
                                onChange={handleChange}
                                name="duration"
                                required
                            />

                            {/* Ключевые слова */}
                            <label className={styles.label7}>Ключевые слова</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Ключевые слова"
                                value={keywords}
                                onChange={handleChange}
                                name="keywords"
                                required
                            />

                            {/* Описание */}
                            <label className={styles.label8}>Описание</label>
                            <textarea
                                className={styles.textarea}
                                placeholder="Описание"
                                value={description}
                                onChange={handleChange}
                                name="description"
                                required
                            ></textarea>

                            {/* Режиссёр */}
                            <label className={styles.label9}>Режиссёр</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Режиссёр"
                                value={director}
                                onChange={handleChange}
                                name="director"
                                required
                            />

                            {/* Продюсер */}
                            <label className={styles.label10}>Продюсер</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Продюсер"
                                value={producer}
                                onChange={handleChange}
                                name="producer"
                                required
                            />

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={loading}
                            >
                                {loading ? 'Загрузка...' : 'Сохранить изменения'}
                            </button>

                            {error && <div className={styles.error}>{error}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditInformation;
