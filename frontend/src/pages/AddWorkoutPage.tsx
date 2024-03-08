import {ChangeEvent, FormEvent, useState} from "react";
import axios from 'axios';
import "./AddWorkoutPage.css";
import {useNavigate} from "react-router-dom";

type Input = {
    name: string;
    description: string;
};

export default function AddWorkoutPage() {
    const [formData, setFormData] = useState<Input>({ name: '', description: '' });
    const navigate = useNavigate();

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            name: value,
        }));
    };

    const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            description: value,
        }));
    };

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post('/api/workouts', formData);
            setFormData({ name: '', description: '' });
            alert(`Thanks. Workout "${formData.name}" added.`);
            navigate("/");
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (

        <div className="container">
            <h2>Please add a new workout here:</h2>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChangeName}/>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChangeDescription}
                    />
                </div>
                <button type="submit">Add Workout</button>
            </form>
        </div>
    );
}