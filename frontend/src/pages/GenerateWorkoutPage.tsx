import {ChangeEvent, FormEvent, useState} from "react";
import {addWorkoutToLibrary, Workout} from "../utility_functions/addWorkout";
import axios from 'axios';
import {MuscleGroup} from '../types/Workout.ts';
import {v4 as uuidv4} from 'uuid';

const BACKEND_ENDPOINT = '/api/chat';

type GenerateWorkoutPageProps={
    fetchData:()=>void;
}
export default function GenerateWorkoutPage(props: Readonly<GenerateWorkoutPageProps>) {
    const [formData, setFormData] = useState<string>('');
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

            const workoutsWithMuscleGroup = workouts.map(workout => ({
                ...workout,
                muscleGroups: [...(workout.muscleGroups || []), formData],
            }));

            setGeneratedData(workoutsWithMuscleGroup);
            setFormData('');
            alert(`Workouts for "${formData}" are generated.`);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToLibrary = async (generatedWorkout: Workout) => {
        await addWorkoutToLibrary(generatedWorkout, props.fetchData);
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
                        {generatedData.map((workout) => (
                            <li key={uuidv4()} style={{
                                marginBottom: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div>
                                    <strong>Name:</strong> {workout.name} <br/>
                                    <strong>Description:</strong> {workout.description} <br/>
                                    <strong>Muscle Group:</strong> {workout.muscleGroups?.map(mg => <span key={mg}>{mg}</span>)} <br/>
                                    <strong>Categories:</strong> {workout.categories?.join(', ')}
                                </div>
                                <button onClick={() => handleAddToLibrary(workout)}>Add to Library</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}