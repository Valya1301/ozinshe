// Step1.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Step1 = ({ saveData }) => {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [category, setCategory] = useState('');
    const [projectType, setProjectType] = useState('');
    const [ageCategory, setAgeCategory] = useState('');
    const [year, setYear] = useState('');
    const [duration, setDuration] = useState('');
    const [keywords, setKeywords] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save the form data
        saveData({
            projectName,
            category,
            projectType,
            ageCategory,
            year,
            duration,
            keywords,
            description,
        });

        // Navigate to the next step
        navigate('/step2');
    };

    return (
        <div>
            <h1>Шаг 1: Основная информация</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Название проекта"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Категория"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Тип проекта"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Возрастная категория"
                    value={ageCategory}
                    onChange={(e) => setAgeCategory(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Год"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Длительность"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Ключевые слова"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step1;
