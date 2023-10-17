export type Id = number;

export interface StoredTodo {
	text: string;
	isDone: boolean;
}


export type StorageTodosRecord = Record<Id, StoredTodo>;



export type Todo = {
	id: number,
	text: string,
	isDone: boolean
}