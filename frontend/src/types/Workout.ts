export type Workout = {
    id: string;
    name: string;
    description: string;
    categories: string[];
    muscleGroups: string[];
}

export enum SportsCategory {
    HIIT="HIIT",
    STRENGTH="STRENGTH",
    CARDIO="CARDIO",
    RUNNING="RUNNING",
    YOGA="YOGA"
}
export enum MuscleGroup {
    ABS="ABS",
    LEGS="LEGS",
    ARMS="ARMS",
    BACK="BACK",
    SHOULDER="SHOULDER",
    CHEST="CHEST",
    GLUTES="GLUTES",
    BICEPS="BICEPS",
    TRICEPS="TRICEPS",
}