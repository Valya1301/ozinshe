import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/EditGenre.module.css';

const EditGenre = ({ onClose, onEditGenre, genre }) => {
    const [name, setName] = useState(genre.name);
    const [link, setLink] = useState(genre.link);
    const [movieCount, setMovieCount] = useState(genre.movieCount);

    useEffect(() => {
        setName(genre.name);
        setLink(genre.link);
        setMovieCount(genre.movieCount);
    }, [genre]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedGenre = { ...genre, name, link, movieCount };

        // Редактирование жанра через API
        axios
            .put(`http://api.ozinshe.com/core/V1/genres/${genre.id}`, updatedGenre)
            .then((response) => {
                onEditGenre(response.data);
                onClose();
            })
            .catch((error) => {
                console.error('Ошибка редактирования жанра', error);
            });
    };

    return (
        <div className={styles.modal}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название жанра"
                    required
                />
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Ссылка на изображение"
                    required
                />
                <input
                    type="number"
                    value={movieCount}
                    onChange={(e) => setMovieCount(e.target.value)}
                    placeholder="Количество фильмов"
                    required
                />
                <button type="submit">Сохранить изменения</button>
                <button type="button" onClick={onClose}>Закрыть</button>
            </form>
        </div>
    );
};

export default EditGenre;
