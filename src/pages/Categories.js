import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AddCategory from '../addComponents/AddCategory';
import EditCategory from '../edit/EditCategory'; // Импортируем компонент редактирования
import DeleteCategories from '../deleteComponents/deleteCategories';
import styles from '../styles/Categories.module.css';
import axios from 'axios';

const Categories = () => {
    const [state, setState] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(null); // Состояние для редактирования
    // const [selectedCategory, setSelectedCategory] = useState(null); // Для хранения выбранной категории

    const headers = {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    };

    const getCategories = () => {
        axios.get("http://api.ozinshe.com/core/V1/categories", { headers })
            .then((response) => {
                setState(response.data);
            });
    };

    const handleCategoryDelete = (id) => {
        axios.delete(`http://api.ozinshe.com/core/V1/categories/${id}`, { headers })
            .then((response) => {
                console.log(response);
                getCategories();
                setDeleteModalOpen(false);
            });
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenDeleteModal = (id) => {
        setDeleteModalOpen(id);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const handleOpenEditModal = (id) => {
        // setSelectedCategory(category); // Устанавливаем выбранную категорию
        setEditModalOpen(id); // Открываем модалку редактирования
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(null);
        // setSelectedCategory(null); // Сбрасываем выбранную категорию
    };
    
    useEffect(() => {
        if (!isEditModalOpen) {
            getCategories();
        }
    }, [isEditModalOpen]);

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.container1}>
                    <div className={styles.top}>
                        <div className={styles.text}>Категории</div>
                        <div className={styles.text1}>{state.length}</div>
                        <button className={styles.addbutton} onClick={handleOpenModal}>
                            <img className={styles.addicon} src="/images/add.svg" alt="add icon" />
                            <div className={styles.addtext}>Добавить</div>
                        </button>
                        {isModalOpen && <AddCategory onClose={handleCloseModal} />}
                    </div>
                    <div className={styles.container2}>
                        {state.map((el) => (
                            <div key={el.id} className={styles.block}>
                                <div className={styles.categoryTitle}>{el.name}</div>
                                <div className={styles.categoryInfo}>
                                    <img className={styles.viewicon} src='/images/🌟 Star (1).svg' alt='views icon' />
                                    <div className={styles.views}>{el.movieCount}</div>
                                    <img 
                                        className={styles.blockicone} 
                                        src='/images/edit.svg' 
                                        alt='edit icon' 
                                        onClick={() => handleOpenEditModal(el.id)} // Открываем модалку редактирования
                                    />
                                    <img 
                                        onClick={() => handleOpenDeleteModal(el.id)} 
                                        className={styles.blockicone1} 
                                        src='/images/delete.svg' 
                                        alt='delete icon' 
                                    />
                                    {isDeleteModalOpen === el.id && (
                                        <DeleteCategories 
                                            onClose={() => handleCategoryDelete(el.id)}
                                            state={el}
                                            onCloseModal={() => setDeleteModalOpen(null)} 
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isEditModalOpen && (
                <EditCategory 
                    onClose={handleCloseEditModal}
                    categoryId = {isEditModalOpen} 
            />
            )}
        </div>
    );
};

export default Categories;
