import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreatePage = () => {

    const [name, setName]           = useState('');
    const [reps, setReps]           = useState('');
    const [weight,setWeight]        = useState('');
    const [unit, setUnit]           = useState('');
    const [date, setDate]           = useState('');
    const [time, setTime]           = useState('');
    
    const history = useHistory();

    function CheckWords(string){
        const words = ['banana bread']
        let test_str = string.toLowerCase();
        for (let i = 0; i < words.length; i++){
            if (test_str.includes(words[i])){
                return true;
            }
        }
        return false;
    }

    const addExercise = async () => {
        if (CheckWords(name) === true){
            window.location.href = "https://youtu.be/b550jyzGj5Y?si=itrGXScbcRuBMuGn&t=25";
            return;
        }
        const newExercise = {name,reps,weight,unit,date,time};
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added your new routine!");
        }
        else {
            alert('Failed to add a new exercise, Error Code = '+ response.status);
        }
        history.push("/");
    };


    return(
        <>
        <article>
            <h2>Create a New Exercise</h2>
            <h3>Add a new exercise to your weekly routine.</h3>
            <h4>Please enter a date from today onward for the database to save your results.</h4>
            <form onSubmit={(e) => {e.preventDefault();}}>
                <fieldset>
                <legend>What Exercise Would You Like To Create For Yourself?</legend>
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
                    <td>
                    <input
                        type="time"
                        placeholder="HH:MM"
                        name="time"
                        value ={time}
                        onChange={e => setTime(e.target.value)}
                        id="time" />
                    </td>
                            <td><label for="submit">
                        <button
                            type="submit"
                            onClick={addExercise}
                            id="submit">
                                Add
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

export default CreatePage;