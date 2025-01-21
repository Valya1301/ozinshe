import React, { useEffect, useState } from 'react'; 
import styles from '../styles/EditCategory.module.css'; 
import axios from 'axios';

const EditCategory = ({ onClose, categoryId }) => { 
    const [name, setName] = useState(""); 
    const [link, setLink] = useState(""); 
    const [movieCount, setMovieCount] = useState(0); 
    const [fileId, setFileId] = useState(0); 


    const headers = {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWxpYV8xN18xQG1haWwucnUiLCJpYXQiOjE3MjgwMzUzMTIsImV4cCI6MTc1OTU3MTMxMn0.On5YvYbxIRyakD5LUjc-jHjh4TQI4O_eF4djs9vOvyuoyspiJjW9Ne40gOGx2vgK6qNaPA4Cs6d-_NCbLph0Zg',
    };

    
    const getCategoriesById = () => {
        axios.get(`http://api.ozinshe.com/core/V1/categories/${categoryId}`, { headers })
            .then((response) => {
                const result = response.data;
                if (result) {
                setName(result.name);
                setMovieCount(result.movieCount);
                setFileId(result.fileId);
                setLink(result.link);
                }
            })
            .catch((error) => {
                console.error('Ошибка', error)
            })
    };

    useEffect(() => {
        getCategoriesById();
    }, []);

    const handleCategoryUpdate = (e) => { 
        e.preventDefault(); 
        let body = { 
            name: name, 
            link: link, 
            movieCount: movieCount, 
            fileId: fileId 
        }; 
        axios.put(`http://api.ozinshe.com/core/V1/categories/${categoryId}`, body, {headers}) 
        .then((response) => { 
            console.log(response.data); 
            onClose(); 
        }) 
        .catch((e) => { 
            console.log(e); 
        }); 
    }; 

    useEffect(() => { 
        if (categoryId) { 
            getCategoriesById(); 
        } 
    }, [categoryId]); 

    
    

    return ( 
        <div className={styles.modalOverlay}> 
            <form onSubmit={handleCategoryUpdate} className={styles.modal}> 
                <div className={styles.modalHeader}> 
                    <h2>Редактировать категорию</h2> 
                    <button className={styles.closeButton} onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}> 
                        <img src="\images\💚 Icon (9).svg" alt="close" style={{ width: '24px', height: '24px' }} /> 
                    </button> 
                </div> 
                <div className={styles.divider}></div> 

                <input 
                    onChange={(event) => setName(event.target.value)} 
                    value={name} 
                    type="text"  
                    placeholder="Название категории" 
                    className={styles.searchInput} 
                /> 

                <input 
                    onChange={(event) => setLink(event.target.value)} 
                    value={link} 
                    type="text"  
                    placeholder="Ссылка" 
                    className={styles.searchInput} 
                /> 

                <input 
                    onChange={(event) => setMovieCount(Number(event.target.value))} 
                    value={movieCount} 
                    type="number"  
                    placeholder="Количество фильмов" 
                    className={styles.searchInput} 
                /> 

                <input 
                    onChange={(event) => setFileId(Number(event.target.value))} 
                    value={fileId} 
                    type="number"  
                    placeholder="ID файла (0 по умолчанию)" 
                    className={styles.searchInput} 
                /> 

                <div className={styles.buttonContainer}> 
                    <button className={styles.addButton} type="submit">Сохранить</button> 
                    <button className={styles.cancelButton} onClick={onClose}>Отмена</button> 
                </div> 
            </form> 
        </div> 
    ); 
}; 

export default EditCategory; 
