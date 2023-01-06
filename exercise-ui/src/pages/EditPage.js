import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditPage = ({ exerciseToEdit }) => {
 
    const [name, setName]           = useState(exerciseToEdit.name);
    const [reps, setReps]           = useState(exerciseToEdit.reps);
    const [weight,setWeight]        = useState(exerciseToEdit.weight);
    const [unit, setUnit]           = useState(exerciseToEdit.unit);
    const [date, setDate]           = useState(exerciseToEdit.date);
    const [time, setTime]           = useState(exerciseToEdit.time);

    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch('/exercises/'+exerciseToEdit._id, {
            method: 'put',
            body: JSON.stringify({
                name:name,
                reps:reps,
                weight:weight,
                unit:unit,
                date:date,
                time:time
            }),
            headers:{'Content-Type': 'application/json',}
        });

        if (response.status === 200){
            alert("Successfully edited exercise!");
        }
        else {
            const errMessage = await response.json();
            alert('Failed to update exercise. Error Code: '+response.status+' .'+errMessage.Error);
        }
        history.push("/");
    }

    return (
        <>
        <article>
            <h2>Edit your exercise</h2>
            <h3>Edit your exercise routine to fit your new specific requirements.</h3>
            <form onSubmit={(e) => {e.preventDefault();}}>
                <fieldset>
                <legend>How would you like to edit your exercise?</legend>
                    <table>
                        <thead>
                            <th>Exercise Name</th>
                            <th>Number of Reps</th>
                            <th>Weight Amount</th>
                            <th>Units Being Used</th>
                            <th>Date Set For Exercise</th>
                            <th>Time Set For Exercise</th>
                            <th>Submit</th>
                        </thead>
                        <tr>
                            <td><label for="name"></label><input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        id="name" /></td>
                            <td><label for="reps"></label>
                    <input
                        type="number"
                        value={reps}
                        onChange={e => setReps(e.target.value)}
                        id="reps" /></td>
                            <td><label for = "weight"></label>
                    <input
                        type="number"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        id="weight" /></td>
                            <td><label for = "unit"></label>
                    <select name="unit-select" id="unit" onChange={e=> setUnit(e.target.value)}      >
                        <option>kgs</option>
                        <option>lbs</option>
                        <option>miles</option>
                        <option>meters</option>
                        <option>n/a</option>
                    </select></td>
                            <td><label for="date"></label>
                    <input
                        type="date"
                        placeholder="mm/dd/yyyy"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        id="date" /></td>
                        <td><label for = "time"></label>
                        <select name="time-select" id="time" onChange={e=> setTime(e.target.value)}>
                            <option>Morning 6:00am to 11:30am</option>
                            <option>Afternoon 12:00pm to 4:30pm</option>
                            <option>Evening 5:00pm to 10:30pm</option>
                        </select></td>  
                            <td><label for="submit">
                        <button
                            type="submit"
                            onClick={editExercise}
                            id="submit">
                                Edit
                                </button>
                    </label></td>
                        </tr>
                    </table>
                </fieldset>
                </form>
        </article>
        </>
    );
}
export default EditPage;