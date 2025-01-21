import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Projects.module.css';
import axios from 'axios';
import DeleteProjects from '../deleteComponents/deleteProjects';

const Projects = () => {
  const [state, setState] = useState([]); // Все проекты
  const [categories, setCategories] = useState([]); // Категории
  const [movieTypes, setMovieTypes] = useState([]); // Типы фильмов
  const [years, setYears] = useState([]); // Года
  const [searchResults, setSearchResults] = useState([]); // Результаты поиска
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [movieType, setMovieType] = useState(null);
  const [year, setYear] = useState(null);
  const [sortField, setSortField] = useState('createdDate');
  const navigate = useNavigate();

  const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
  };

  // Получение списка фильмов
  const getMovies = () => {
    let url = 'http://api.ozinshe.com/core/V1/movies/page';
    const params = {};

    if (year) params.year = year;
    if (categoryId) params.categoryId = categoryId;
    if (movieType) params.type = movieType;
    if (sortField) params.sortField = sortField;

    const queryParams = new URLSearchParams(params).toString();
    if (queryParams) url += `?${queryParams}`;

    axios
      .get(url, { headers })
      .then((response) => {
        setState(response.data.content); // Обновляем все проекты
        const types = [...new Set(response.data.content.map((movie) => movie.movieType))];
        setMovieTypes(types); // Обновляем список типов фильмов
      })
      .catch((err) => console.error('Ошибка при загрузке фильмов:', err));
  };

  // Получение категорий
  const getCategories = () => {
    axios
      .get('http://api.ozinshe.com/core/V1/categories', { headers })
      .then((response) => setCategories(response.data))
      .catch((err) => console.error('Ошибка при загрузке категорий:', err));
  };

  // Получение годов
  const getYear = () => {
    axios
      .get('http://api.ozinshe.com/core/V1/year/list', { headers })
      .then((response) => setYears(response.data))
      .catch((err) => console.error('Ошибка при загрузке годов:', err));
  };

  // Обработчик поиска
  const handleSearch = (query) => {
    // Пример поиска по ключевым словам
    const lowerQuery = query.toLowerCase();
    const results = state.filter((movie) =>
      // Ищем в нескольких полях: название, описание, категории и тип
      movie.name.toLowerCase().includes(lowerQuery) ||
      movie.description?.toLowerCase().includes(lowerQuery) ||
      movie.categories?.some((category) => category.name.toLowerCase().includes(lowerQuery)) ||
      movie.movieType?.toLowerCase().includes(lowerQuery)
    );
    setSearchResults(results); // Обновляем результаты поиска
  };

  // Удаление проекта
  const handleDeleteProject = (id) => {
    axios
      .delete(`http://api.ozinshe.com/core/V1/movies/${id}`, { headers })
      .then(() => {
        setState((prevState) => prevState.filter((project) => project.id !== id));
        setDeleteModalOpen(false);
      })
      .catch((err) => console.error('Ошибка при удалении проекта:', err));
  };

  // Открытие модального окна для удаления
  const handleOpenDeleteModal = (project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  // Закрытие модального окна
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  // Обработчики фильтров
  const onCategorySelect = (e) => {
    setCategoryId(e.target.value === 'all' ? null : e.target.value);
  };

  const onTypeSelect = (e) => {
    setMovieType(e.target.value === 'all' ? null : e.target.value);
  };

  const onYearSelect = (e) => {
    setYear(e.target.value === 'all' ? null : e.target.value);
  };

  const onSortSelect = (e) => {
    setSortField(e.target.value);
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    getCategories();
    getMovies();
    getYear();
  }, []);

  // Перезагрузка списка фильмов при изменении фильтров
  useEffect(() => {
    getMovies();
  }, [categoryId, movieType, year, sortField]);

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.container1}>
          <div className={styles.top}>
            <div className={styles.text}>Проекты</div>
            <div className={styles.text1}>{state.length}</div>
            <button className={styles.addbutton} onClick={() => navigate('/AddProject')}>
              <img className={styles.addicon} src='/images/add.svg' alt='add icon' />
              <div className={styles.addtext}>Добавить</div>
            </button>
          </div>

          {/* Фильтры */}
          <div className={styles.title}>
            <div className={styles.box2}>
              <label className={styles.text2} htmlFor='sort-select'>
                Сортировать:
              </label>
              <div className={styles.selectContainer}>
                <select onChange={onSortSelect} className={styles.select} name='sort' id='sort-select'>
                  <option value='createdDate'>По дате создания</option>
                  <option value='watchCount'>По количеству просмотров</option>
                </select>
                <div className={styles.customArrow} />
              </div>
            </div>

            <div className={styles.box3}>
              <label className={styles.text2} htmlFor='category-select'>
                Категория:
              </label>
              <div className={styles.selectContainer}>
                <select onChange={onCategorySelect} className={styles.select} name='category' id='category-select'>
                  <option value='all'>Все категории</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className={styles.customArrow} />
              </div>
            </div>

            <div className={styles.box4}>
              <label className={styles.text2} htmlFor='type-select'>
                Тип:
              </label>
              <div className={styles.selectContainer}>
                <select onChange={onTypeSelect} className={styles.select} name='type' id='type-select'>
                  <option value='all'>Все типы</option>
                  {movieTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className={styles.customArrow} />
              </div>
            </div>

            <div className={styles.box5}>
              <img src='\images\💚 Icon (10).svg' alt='calendar icon' className={styles.calendarIcon} />
              <div className={styles.selectContainer}>
                <select onChange={onYearSelect} className={styles.select} name='year' id='year-select'>
                  <option value='all'>Выберите год</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className={styles.customArrow} />
              </div>
            </div>
          </div>

          {/* Отображение результатов поиска или всех проектов */}
          <div className={styles.container2}>
            {(searchResults.length ? searchResults : state).map((el) => (
              <div
                onClick={() => navigate(`/MovieDetails/${el.id}`)}
                key={el.id}
                className={styles.block}
              >
                <img
                  className={styles.images}
                  src={el.poster?.link || '/images/defaultPoster.jpg'}
                  alt={el.name || 'Без названия'}
                />
                <div className={styles.movietitle}>{el.name || 'Без названия'}</div>
                <div className={styles.undertitle}>{el.categories?.[0]?.name || 'Без категории'}</div>
                <div className={styles.box1}>
                  <img className={styles.viewicon} src='/images/🌟 Star.svg' alt='views icon' />
                  <div className={styles.views}>{el.watchCount || 0}</div>
                  <img
  className={styles.blockicone}
  src='/images/edit.svg'
  alt='edit icon'
  onClick={(e) => {
    e.stopPropagation(); // Останавливаем всплытие события
    navigate(`/EditProject/${el.id}`); // Переход на страницу редактирования
  }}
/>
                  <img
                    className={styles.blockicone1}
                    src='/images/delete.svg'
                    alt='delete icon'
                    onClick={() => handleOpenDeleteModal(el)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Модальное окно для удаления проекта */}
      {isDeleteModalOpen && (
        <DeleteProjects
          project={projectToDelete}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteProject}
        />
      )}
    </div>
  );
};

export default Projects;
