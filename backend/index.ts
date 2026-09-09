import express, { Request, Response } from 'express';
import cors from 'cors';
import { Note, BodyNoteCliente } from '@/types';

const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

let notes: Note[] = [
	{
		id: 1,
		content: 'HTML is easy',
		important: true,
	},
	{
		id: 2,
		content: 'Browser can execute only JavaScript',
		important: false,
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		important: true,
	},
];

app.get('/', (request: Request, response: Response) => {
	response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request: Request, response: Response) => {
	response.json(notes);
});

app.get('/api/notes/:id', ({ params: { id } }: Request<{ id: string }>, response) => {
	const idNumber = parseInt(id, 10);
	const note = notes.find((note) => note.id === idNumber);
	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}
});

app.delete('/api/notes/:id', ({ params: { id } }: Request<{ id: string }>, response) => {
	const idNumber = parseInt(id, 10);
	notes = notes.filter((note) => note.id !== idNumber);

	response.status(204).end();
});

const generateId = () => {
	const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
	return maxId + 1;
};

app.post('/api/notes', ({ body }: Request<{}, unknown, BodyNoteCliente>, response) => {
	if (typeof body.content !== 'string' || body.content.trim() === '') {
		return response.status(400).json({
			error: 'content missing',
		});
	}

	const note: Note = {
		id: generateId(),
		content: body.content,
		important: body.important ?? false,
	};

	notes = notes.concat(note);

	return response.json(note);
});

app.put('/api/notes/:id', ({ params: { id } }: Request<{ id: string }>, response) => {
	const idNumber = parseInt(id, 10);
	const noteFindIndex = notes.findIndex((note) => note.id === idNumber);

	if (noteFindIndex === -1) {
		return response.status(404).end();
	}

	const updateNote = {
		...notes[noteFindIndex],
		important: !notes[noteFindIndex].important,
	};

	notes[noteFindIndex] = updateNote;
	return response.json(updateNote);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
