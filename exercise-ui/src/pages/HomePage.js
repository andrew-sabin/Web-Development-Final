import React from 'react';
import Table from '../components/Table';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExercise }) {
    // Uses history for updating current list of exercises
    const history = useHistory();

    // Use state to bring in the data
    const [exercises, setExercises] = useState([]);

    // RETRIEVE the list of exercises from database
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    } 

    // LOAD user's current exercises
    useEffect(() => {
        loadExercises();
    }, []);
    

    // UPDATE an exercise routine
    const onEdit = async exercise => {
        setExercise(exercise);
        history.push("/edit-exercise");
    }


    // DELETE an exercise from the routine  
    const onDelete = async _id => {
        const response = await fetch('/exercises/'+_id, {method: 'DELETE'});
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error('Failed to delete exercise with _id'+_id+' status code ='+response.status)
        }
    }


    // DISPLAY the current exercise routine
    return (
        <>
            <article>
                <h2>Current List of All of Your Exercise Routines</h2>
                <h3>Each exercise is ordered based around when they were created.</h3>
                <Table
                    exercises={exercises}
                    onDelete={onDelete} 
                    onEdit={onEdit}
                />
            </article>
        </>
    );
}

export default HomePage;