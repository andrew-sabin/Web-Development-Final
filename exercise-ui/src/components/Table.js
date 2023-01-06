import React from 'react';
import Row from './Row';
import {FiEdit} from 'react-icons/fi';
import {MdOutlineDangerous} from 'react-icons/md';

function Table({ exercises, onDelete, onEdit }) {
    return (
        <table id="exercise">
            <caption>
                Click on the <MdOutlineDangerous/> to Delete Your Exercise<br/>
                Click on the <strong>Clipboard <FiEdit/></strong> to Edit Your Exercise
            </caption>
            <thead>
                <tr>
                <th>Name of exercise</th>
                <th>Amount of Reps</th>
                <th>Weight Used</th>
                <th>Units Used</th>
                <th>Date</th>
                <th>Time (Time Frame)</th>
                <th>Delete</th>
                <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => 
                    <Row
                        exercise={exercise} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </tbody>
        </table>
    );
}

export default Table;
