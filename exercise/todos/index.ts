import { existsSync, readFileSync, writeFileSync, open as fileOpen, mkdirSync } from 'fs';
import { argv, execPath } from 'process';
import type { Todo, StorageTodosRecord } from './types';



const BASE_PATH = './exercise/todos/output'
const TODOS_FILE_PATH = `${BASE_PATH}/todos.txt`;
const TODOS_STORAGE_FILE_PATH = `${BASE_PATH}/todos.json`;


const [,, ...todosReceived ]:string[] = argv;

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

const generateTodo = (id: number, text: string, isDone = false): Todo => (
	{ id , text, isDone }
)

const getFileContent = (filePath: string): object => {
	const doesExist = existsSync( filePath );
	const content: object = doesExist ? JSON.parse(readFileSync(filePath).toString()) : {}
	return content;
}


/* -------------------------------------------------------------------------- */
/*                                     API                                    */
/* -------------------------------------------------------------------------- */



function addTodo(text: string): void {
	// 
}

function editTodo(id: number, text: string): void{
	// 
}

function deleteTodo(text: string): void{
	// 
}

function deleteTodos(text: string): void{
	// 
}

function listTodos():void{
	// return ['']
}


const todos = {
	add: addTodo,
	edit: editTodo,
	delete: deleteTodos,
	list: listTodos
}


/* -------------------------------------------------------------------------- */
/*                                   SCRIPT                                   */
/* -------------------------------------------------------------------------- */

// ensures the 'output' directory creation
if(!existsSync(BASE_PATH)){
	mkdirSync(BASE_PATH);
	writeFileSync(TODOS_FILE_PATH, '');
	writeFileSync(TODOS_STORAGE_FILE_PATH, JSON.stringify({}));
}



todosReceived.forEach( text => {
	const STORAGE = getFileContent(TODOS_STORAGE_FILE_PATH)
	let id = Object.keys(STORAGE).length;
		id += 1;
		const todo = generateTodo(id, text)

	// const shouldAddNewTodo = Object.values(STORAGE).every( todo => todo.text !== text);
	const shouldAddNewTodo = Object.values(STORAGE).findIndex(i => i.text === text) === -1
	if(shouldAddNewTodo){

		// Writes todos text on text file
		writeFileSync(TODOS_FILE_PATH, `- ${todo.text}\n`, { flag: 'a'});
	
		// Writes on 
		const storage = {
			...STORAGE,
			[todo.id]: { text: todo.text, isDone: todo.isDone }
		}
	
		const formatToJSON = (obj): string => JSON.stringify(obj, null, 2)
		// console.log('storage:', storage)
		writeFileSync(TODOS_STORAGE_FILE_PATH, formatToJSON(storage));
	}
})