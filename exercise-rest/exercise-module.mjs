// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';


// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

//Schema for exercise
//TO-DO: Create A Date Object 
const exerciseSchema = mongoose.Schema({
    name:{ type:String, required:true},
    reps:{ type:Number, required:true},
    weight:{type:Number, required:true},
    unit:{type:String, required:true},
    date:{type:Date, required:true},
    time:{type:Date, required:true}
});
//Compile the model from the schema
const Exercise = mongoose.model("Exercise",exerciseSchema);

//CREATE exercise model
const createExercise = async (name,reps,weight,unit,date,time) => {
    const exercise = new Exercise({ 
        name:name,
        reps:reps,
        weight:weight,
        unit:unit,
        date:date,
        time:time 
    });
    return exercise.save();
}


//Retrieve Models
//Retrieve full body.
const getExercises = async() => {
    const query = Exercise.find();
    return query.exec();
}

//Retrieve using id.
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

//Replace model
const replaceExercise = async (_id,name,reps,weight,unit,date,time) => {
    const result = await Exercise.replaceOne({_id: _id}, {
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date,
        time: time
    });
    return result.modifiedCount;
}

//Delete model based on ID
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}


//Export variables for use in controller.mjs
export {createExercise, getExercises, findExerciseById, replaceExercise, deleteById}