import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { BodyNoteCliente } from './types/index.js';
import NoteMongo from './models/note.js';

const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

app.get('/', (request: Request, response: Response) => {
	response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request: Request, response: Response) => {
	NoteMongo.find({}).then((notes) => {
		response.json(notes);
	});
});

app.get('/api/notes/:id', ({ params: { id } }: Request<{ id: string }>, response, next) => {
	NoteMongo.findById(id)
		.then((note) => {
			if (note) {
				response.json(note);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => {
			next(error);
		});
});

app.delete('/api/notes/:id', ({ params: { id } }: Request<{ id: string }>, response, next) => {
	NoteMongo.findByIdAndDelete(id)
		.then(() => {
			response.status(204).end();
		})
		.catch((error) => {
			next(error);
		});
});

app.post('/api/notes', ({ body }: Request<unknown, unknown, BodyNoteCliente>, response, next) => {
	if (typeof body.content !== 'string' || body.content.trim() === '') {
		return response.status(400).json({
			error: 'content missing',
		});
	}

	const note = new NoteMongo({
		content: body.content,
		important: body.important ?? false,
	});

	return note
		.save()
		.then((saveNote) => {
			response.json(saveNote);
		})
		.catch((error) => {
			next(error);
		});
});

app.put('/api/notes/:id', ({ params: { id }, body }: Request<{ id: string }>, response, next) => {
	const { content, important } = body as BodyNoteCliente;

	const note = {
		content,
		important,
	};

	NoteMongo.findByIdAndUpdate(id, note, { returnDocument: 'after', runValidators: true, context: 'query' })
		.then((updateNote) => {
			response.json(updateNote);
		})
		.catch((error) => next(error));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	}

	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	return next(error);
};

app.use(errorHandler);
