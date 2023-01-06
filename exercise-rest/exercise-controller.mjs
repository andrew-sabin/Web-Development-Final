import 'dotenv/config';
import express from 'express';
import * as exercises from './exercise-module.mjs';


const PORT = process.env.PORT;
const app = express();
app.use(express.json());

//Create using POST/EXERCISE
app.post('/exercises', (req,res) => {
    exercises.createExercise(
        req.body.name, 
        req.body.reps, 
        req.body.weight, 
        req.body.unit, 
        req.body.date,
        req.body.time
        )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error:'Invalid Syntax: Document Could Not Be Created'});

        })
});

//READ using GET/exercises
app.get('/exercises', (req,res) => {
    exercises.getExercises()
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Failed to retrieve documents.'})
        })

});

//GET using GET/exercises/:id
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if (exercise !== null){
                res.status(200).json(exercise);
            }
            else{
                res.status(404).json({ Error:'Specified Document was not found' });
            }

        })
        .catch(error => {
            res.status(400).json({Error:'Request has failed in retrieving specified document'});
        });
});
//Update using PUT/exercies/:id
app.put('/exercises/:_id', (req,res) => {
    exercises.replaceExercise(
        req.params._id,
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date,
        req.body.time
        )
    .then(numUpdated => {
        if(numUpdated === 1){
            res.status(200).json({
                _id: req.params._id, 
                name: req.body.name,
                reps: req.body.reps, 
                weight: req.body.weight, 
                unit: req.body.unit, 
                date: req.body.date,
                time: req.body.time
            })
        }
        else{
            res.status(404).json({Error:'Resource not found'});
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({Error:'Failed update request'});
    });
});


//DELETE using DELETE/exercises/:id
app.delete('/exercises/:_id', (req,res) => {
    exercises.deleteById(req.params._id)
    .then(deletedCount => {
        if (deletedCount === 1){
            res.status(204).send();
        }
        else {
            res.status(404).json({Error: 'Resource was not found'});
        }
    })
    .catch(error => {
        console.error(error);
        res.send({error: 'Failed request'});
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});