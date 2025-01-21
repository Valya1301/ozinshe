import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from '../styles/AddProject3.module.css';

const AddProject3 = () => {
    const navigate = useNavigate();
    const [coverImage, setCoverImage] = useState('');
    const [screenshots, setScreenshots] = useState([]);

    useEffect(() => {
        const fetchScreenshots = async () => {
            const response = await fetch('http://api.ozinshe.com/core/V1/screenshots/');
            const data = await response.json();
            setScreenshots(data.screenshots || []);
        };
        fetchScreenshots();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/Modal'); // Переход к следующему шагу
    };

    const handleCoverImageDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setCoverImage(e.target.result);
            reader.readAsDataURL(files[0]);
        }
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className={styles.container}>
                {/* Вывод обложки и скриншотов */}
                <button type="submit" onClick={handleSubmit}>Далее</button>
            </div>
        </div>
    );
};

export default AddProject3;
