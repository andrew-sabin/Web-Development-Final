import React from 'react';
import {FiEdit} from 'react-icons/fi';
import {MdOutlineDangerous} from 'react-icons/md';

function Row({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.substring(0,10)}</td>
            <td>{exercise.time}</td>
            <td><MdOutlineDangerous onClick={() => onDelete(exercise._id)} /></td>
            <td><FiEdit onClick={() => onEdit(exercise)} /></td>
        </tr>
    );
}

export default Row;