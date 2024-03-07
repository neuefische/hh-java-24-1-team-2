import {ChangeEvent, FormEvent, useState} from "react";
import axios from 'axios';

type Input = {
    name: string;
    description: string;
};

type AddWorkoutPageProps = {};

export default function AddWorkoutPage() {
    const [formData, setFormData] = useState<Input>({ name: '', description: '' });

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
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (

        <form onSubmit={handleOnSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChangeName} />
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
    );
}