import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import {MuscleGroup, SportsCategory} from "../types/Workout.ts";

export type CategoryMuscleCheckboxProps={
    categories:string[],
    muscleGroups: string[],
    changeCategories: (event: SelectChangeEvent<string[]>)=>void,
    changeMuscleGroups: (event: SelectChangeEvent<string[]>)=>void,
}
export default function CategoryMuscleCheckbox(props: Readonly<CategoryMuscleCheckboxProps>){
    const optionalCategories=Object.values(SportsCategory);
    const optionalMuscles=Object.values(MuscleGroup);

    return(
        <>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>Categories</InputLabel>
                <Select
                    multiple
                    value={props.categories}
                    onChange={props.changeCategories}
                    input={<OutlinedInput label="Categories" />}
                >
                    {optionalCategories.map(category=>
                        <MenuItem
                            key={category}
                            value={category}
                        >
                            {category}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <br/>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>Muscle Groups</InputLabel>
                <Select
                    multiple
                    value={props.muscleGroups}
                    onChange={props.changeMuscleGroups}
                    input={<OutlinedInput label="MuscleGroups" />}
                >
                    {optionalMuscles.map(muscle=>
                        <MenuItem
                            key={muscle}
                            value={muscle}
                        >
                            {muscle}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </>
    )
}