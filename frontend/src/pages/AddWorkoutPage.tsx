import {ChangeEvent, FormEvent, useState} from "react";
import axios from 'axios';
import "./AddWorkoutPage.css";
import {SelectChangeEvent} from "@mui/material";
import CategoryMuscleCheckbox from "../components/CategoryMuscleCheckbox.tsx";

type Input = {
    name: string;
    description: string;
};

export default function AddWorkoutPage() {
    const [formData, setFormData] = useState<Input>({ name: '', description: '' });
    const [categories, setCategories]=useState<string[]>([]);
    const [muscleGroups, setMuscleGroups]=useState<string[]>([]);
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

    function changeCategories(event: SelectChangeEvent<typeof categories>) {
        const value = event.target.value;
        setCategories(typeof value === 'string' ? value.split(',') : value,);
        setFormData((prevData) => ({
            ...prevData,
            categories: categories,
        }));
    }

    function changeMuscleGroups(event: SelectChangeEvent<typeof muscleGroups>) {
        const value=event.target.value;
        setMuscleGroups(typeof value === 'string' ? value.split(',') : value,);
        setFormData((prevData) => ({
            ...prevData,
            muscleGroups: muscleGroups,
        }));
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post('/api/workouts', formData);
            setFormData({ name: '', description: '' });
            setCategories([]);
            setMuscleGroups([]);
            alert(`Thanks. Workout "${formData.name}" added.`);
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
                <CategoryMuscleCheckbox categories={categories} changeCategories={changeCategories} muscleGroups={muscleGroups} changeMuscleGroups={changeMuscleGroups}/>
                <button type="submit">Add Workout</button>
            </form>
        </div>
    );
}