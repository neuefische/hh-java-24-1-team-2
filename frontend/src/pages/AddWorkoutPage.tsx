import {ChangeEvent, FormEvent, useState} from "react";
import axios from 'axios';
import "./AddWorkoutPage.css";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import {MuscleGroup, SportsCategory} from "../types/Workout.ts";

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

    const optionalCategories=Object.values(SportsCategory);

    function changeMuscleGroups(event: SelectChangeEvent<typeof muscleGroups>) {
        const value=event.target.value;
        setMuscleGroups(typeof value === 'string' ? value.split(',') : value,);
        setFormData((prevData) => ({
            ...prevData,
            muscleGroups: muscleGroups,
        }));
    }

    const optionalMuscles=Object.values(MuscleGroup);

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
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel>Categories</InputLabel>
                    <Select
                        multiple
                        value={categories}
                        onChange={changeCategories}
                        input={<OutlinedInput label="Categories" />}
                    >
                        {optionalCategories.map(category=>
                            <MenuItem
                                value={category}
                            >
                                {category}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel>Muscle Groups</InputLabel>
                    <Select
                        multiple
                        value={muscleGroups}
                        onChange={changeMuscleGroups}
                        input={<OutlinedInput label="MuscleGroups" />}
                    >
                        {optionalMuscles.map(muscle=>
                            <MenuItem
                                value={muscle}
                            >
                                {muscle}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <button type="submit">Add Workout</button>
            </form>
        </div>
    );
}