export type Workout = {
    id: string;
    name: string;
    description: string;
    categories: string[];
    muscleGroups: string[];
}

export enum SportsCategory {
    STRENGTH="STRENGTH",
    ENDURANCE="ENDURANCE",
    BALANCE="BALANCE",
    FLEXIBILITY="FLEXIBILITY"
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