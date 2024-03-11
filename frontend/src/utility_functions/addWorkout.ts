import axios from 'axios';

export type Workout = {
    name: string;
    description: string;
    categories?: string[];
    muscleGroups?: string[];
};

export const addWorkoutToLibrary = async (formData: Workout): Promise<void> => {
    try {
        await axios.post('/api/workouts', formData);
        alert(`Workout "${formData.name}" added.`);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};