import axios from 'axios';

export type Workout = {
    name: string;
    description: string;
    categories?: string[];
    muscleGroups?: string[];
};

export const addWorkoutToLibrary = async (formData: Workout, fetchData: ()=>void): Promise<void> => {
    try {
        await axios.post('/api/workouts', formData)
            .then(fetchData);
        alert(`Workout "${formData.name}" added.`);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};