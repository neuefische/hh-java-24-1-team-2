import {ChangeEvent, FormEvent, useState} from "react";
import {addWorkoutToLibrary, Workout} from "../utility_functions/addWorkout";
import "./AddWorkoutPage.css";
import {SelectChangeEvent} from "@mui/material";
import CategoryMuscleCheckbox from "../components/CategoryMuscleCheckbox.tsx";

type AddWorkoutPageProps={
    fetchData:()=>void;
}
export default function AddWorkoutPage(props: Readonly<AddWorkoutPageProps>) {
    const [categories, setCategories]=useState<string[]>([]);
    const [muscleGroups, setMuscleGroups]=useState<string[]>([]);
    const [formData, setFormData] = useState<Workout>({ name: '', description: '', muscleGroups: [], categories: [] });

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
        const updatedCategories = typeof value === 'string' ? value.split(',') : value;
        setCategories(updatedCategories);
        setFormData((prevData) => ({
            ...prevData,
            categories: updatedCategories,
        }));
    }

    function changeMuscleGroups(event: SelectChangeEvent<typeof muscleGroups>) {
        const value = event.target.value;
        const updatedMuscleGroups = typeof value === 'string' ? value.split(',') : value;
        setMuscleGroups(updatedMuscleGroups);
        setFormData((prevData) => ({
            ...prevData,
            muscleGroups: updatedMuscleGroups,
        }));
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addWorkoutToLibrary(formData, props.fetchData);
        setFormData({ name: '', description: '', categories: [], muscleGroups: [] });
        setCategories([]);
        setMuscleGroups([]);
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