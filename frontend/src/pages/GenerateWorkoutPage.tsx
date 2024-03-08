import {ChangeEvent, FormEvent, useState} from "react";
import {addWorkoutToLibrary, Workout} from "../utility_functions/addWorkout";

export default function GenerateWorkoutPage() {
    const [formData, setFormData] = useState( '');
    const [loading, setLoading] = useState(false);
    const [generatedData, setGeneratedData] = useState<Workout[] | null>(null);

    interface ApiWorkout {
        title: string;
        body: string;
    }

    const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFormData(event.target.value);
    };

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setGeneratedData(null);
            setLoading(true);

            const fakeData: ApiWorkout[] = [
                { title: 'Workout 1', body: 'Description 1' },
                { title: 'Workout 2', body: 'Description 2' },
                { title: 'Workout 3', body: 'Description 3' },
            ];

            await new Promise(resolve => setTimeout(resolve, 1500));

            const workouts: Workout[] = fakeData.map((post: ApiWorkout) => ({
                name: post.title,
                description: post.body,
            }));

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
                <label htmlFor="dropdown">Select an option:</label>
                <select id="dropdown" name="dropdown" value={formData} onChange={handleDropdownChange}>
                    <option value="">Select...</option>
                    <option value="chest">chest</option>
                    <option value="back">back</option>
                    <option value="arms">arms</option>
                    <option value="abdominals">abdominals</option>
                    <option value="legs">legs</option>
                    <option value="shoulders">shoulders</option>
                </select>
                <button type="submit">Generate Workout</button>
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