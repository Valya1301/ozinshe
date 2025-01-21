import React, { useState } from 'react';
import AddProject from './AddProject';
import AddProject2 from './AddProject2';
import AddProject3 from './AddProject3';

const AddProjectWrapper = () => {
    const [projectData, setProjectData] = useState({});
    const [step, setStep] = useState(1);

    // Функция для сохранения данных проекта
    const saveData = (newData) => {
        setProjectData((prevData) => ({ ...prevData, ...newData }));
    };

    return (
        <div>
            {step === 1 && <AddProject onSave={saveData} projectData={projectData} />}
            {step === 2 && <AddProject2 onSave={saveData} projectData={projectData} />}
            {step === 3 && <AddProject3 projectData={projectData} />}
        </div>
    );
};

export default AddProjectWrapper;
