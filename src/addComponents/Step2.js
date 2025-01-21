// Step2.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Step2 = ({ saveData, formData }) => {
    const navigate = useNavigate();
    const [videoFile, setVideoFile] = useState(null);
    const [posterFile, setPosterFile] = useState(null);

    const handleVideoChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const handlePosterChange = (e) => {
        setPosterFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save video and poster data along with previous form data
        saveData({
            ...formData,
            video: videoFile,
            poster: posterFile,
        });

        // Navigate to the next step
        navigate('/step3');
    };

    return (
        <div>
            <h1>Шаг 2: Видео и обложка</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleVideoChange} />
                <input type="file" onChange={handlePosterChange} />
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step2;
