import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from '../styles/ProjectsMain.module.css';
import axios from 'axios';
import DeleteProjectMain from '../deleteComponents/deleteProjectMain';
import AddMain from '../addComponents/AddMain';
import EditMain from '../edit/EditMain';
import { useNavigate } from 'react-router-dom';

const ProjectsMain = () => {
    const [state, setState] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // Модалка удаления
    const [isEditModalOpen, setEditModalOpen] = useState(false); // Модалка редактирования
    const [selectedProject, setSelectedProject] = useState(null); // Выбранный проект для модалки

    const navigate = useNavigate();

    const headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    };

    const getProjectsMain = async () => {
        try {
            const response = await axios.get("http://api.ozinshe.com/core/V1/movies_main", { headers });
            setState(response.data);
        } catch (err) {
            setError("Ошибка загрузки данных");
            console.error(err);
        }
    };

    const handleOpenEditModal = (project) => {
        setSelectedProject(project);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setSelectedProject(null);
    };

    const handleMainDelete = () => {
        if (selectedProject) {
            axios.delete(`http://api.ozinshe.com/core/V1/movies_main/${selectedProject}`, { headers })
                .then(() => {
                    getProjectsMain();
                    handleCloseDeleteModal();
                })
                .catch(err => console.error(err));
        }
    };

    const handleOpenDeleteModal = (id) => {
        setDeleteModalOpen(true);
        setSelectedProject(id); // Сохраняем id для удаления
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setSelectedProject(null);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getProjectsMain();
    }, []);

    if (error) return <div>{error}</div>;

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.container1}>
                    <div className={styles.top}>
                        <div className={styles.text}>Проекты на главной</div>
                        <div className={styles.text1}>{state.length}</div>
                        <button className={styles.addbutton} onClick={handleOpenModal}>
                            <img className={styles.addicon} src="/images/add.svg" alt="add icon" />
                            <div className={styles.addtext}>Добавить</div>
                        </button>
                        {isModalOpen && <AddMain onClose={handleCloseModal} />}
                    </div>
                    <div className={styles.container2}>
                        {state.map((el) => (
                            <div key={el.id} className={styles.block}>
                                <img
                                    className={styles.images}
                                    srcSet="/images/poster@2x.jpg 2x, /images/poster@3x.jpg 3x"
                                    src={el.movie.poster.link}
                                    alt="poster"
                                    onClick={() => navigate(`/MovieDetails/${el.id}`)}
                                />
                                <div className={styles.movietitle}>{el.movie.name}</div>
                                <div className={styles.undertitle}>
                                    {el.movie.categories.map((category) => category.name).join(", ") || "Без категории"}
                                </div>
                                <div className={styles.box1}>
                                    <div className={styles.views}>Проект на главной #{el.sortOrder}</div>
                                    <div className={styles.iconContainer}>
                                        <img
                                            className={styles.blockicone}
                                            src="/images/edit.svg"
                                            alt="edit icon"
                                            onClick={() => handleOpenEditModal(el)}
                                        />
                                        <img
                                            className={styles.blockicone1}
                                            src="/images/delete.svg"
                                            alt="delete icon"
                                            onClick={() => handleOpenDeleteModal(el.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isEditModalOpen && (
                <EditMain project={selectedProject} onClose={handleCloseEditModal} />
            )}
            {isDeleteModalOpen && (
                <DeleteProjectMain
                    project={selectedProject} // Передаем id проекта
                    onClose={handleCloseDeleteModal}
                    onDelete={handleMainDelete}
                />
            )}
        </div>
    );
};

export default ProjectsMain;
