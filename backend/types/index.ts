export type BodyNoteCliente = {
	content: string;
	important?: boolean;
};

export type Note = BodyNoteCliente & {
	id: number;
};