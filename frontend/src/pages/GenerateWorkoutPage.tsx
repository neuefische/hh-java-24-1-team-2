import {ChangeEvent, FormEvent, useState} from "react";
import {addWorkoutToLibrary, Workout} from "../utility_functions/addWorkout";
import axios from 'axios';
import {MuscleGroup} from '../types/Workout.ts';

const BACKEND_ENDPOINT = '/api/chat';
export default function GenerateWorkoutPage() {
    const [formData, setFormData] = useState( '');
    const [loading, setLoading] = useState(false);
    const [generatedData, setGeneratedData] = useState<Workout[] | null>(null);

    const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFormData(event.target.value);
    };

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setGeneratedData(null);
            setLoading(true);

            const response = await axios.get(BACKEND_ENDPOINT, {
                params: { muscle: formData },
            });

            const workouts: Workout[] = response.data.workouts;

            setGeneratedData(workouts);
            setFormData('');
            alert(`Workouts for "${formData}" are generated.`);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToLibrary = async (generatedWorkout: Workout) => {
        await addWorkoutToLibrary(generatedWorkout);
        setGeneratedData((prevData) => (prevData ? prevData.filter(workout => workout !== generatedWorkout) : null));
    };

    return (

        <div className="container">
            <h2>Which muscles do you want to generate workouts for:</h2>
            <p>You will get three generated workouts you can then add to your library.</p>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="muscledropdown">Select an option:</label>
                <select
                    id="muscledropdown"
                    name="muscledropdown"
                    value={formData}
                    onChange={handleDropdownChange}
                >
                    <option value="">Select...</option>
                    {Object.values(MuscleGroup).map((muscle) => (
                        <option key={muscle} value={muscle}>
                            {muscle}
                        </option>
                    ))}
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? 'Generating Workouts...' : 'Generate Workout'}
                </button>
            </form>
            {loading && <p>Generating workouts...</p>}
            {generatedData && (
                <div>
                    <h3>Generated Workouts:</h3>
                    <ul>
                        {generatedData.map((workout, index) => (
                            <li key={index}>
                                <strong>Name:</strong> {workout.name}, <strong>Description:</strong> {workout.description}
                                <button onClick={() => handleAddToLibrary(workout)}>Add to Library</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}