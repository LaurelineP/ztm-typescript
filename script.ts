import fsAsync from "node:fs/promises";
import path from "node:path/posix";

const DEMO_FOLDER = './demo'
const EXERCISE_FOLDER = './exercise'


async function readDir(folderPath: string): Promise<string[]> {
	return await fsAsync.readdir(path.resolve(DEMO_FOLDER))
		.catch(error => {
			throw {
				functionName: 'readir',
				error
			}
		})


}

async function moveExercisesIntoDemoFolder() {
	const folderDirectoryFiles = await fsAsync.readdir(path.resolve(DEMO_FOLDER))
	console.log('folderDirectoryFiles:', folderDirectoryFiles)
}

moveExercisesIntoDemoFolder()