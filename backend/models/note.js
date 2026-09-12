import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
	.connect(url)
	.then((result) => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		minlength: 5,
		required: true,
	},
	important: Boolean,
});

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Note = mongoose.model('Note', noteSchema);

export default Note;

// Note.find({}).then((result) => {
// 	result.forEach((note) => {
// 		console.log(note);
// 	});

// 	mongoose.connection.close();
// });

// note.save().then((result) => {
// 	console.log('note saved!');
// 	mongoose.connection.close();
// });
