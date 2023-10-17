/* eslint-disable */
import { strict as assert } from "assert";

// A `Map` is a data structure that allows you to store data in a key-value
// pair format. Keys in a map must be unique, and each key can map to only one
// value. You can use any type of value as the key, including objects and
// functions. Maps are useful when you want to quickly access data and you are
// able to maintain the key in memory. In situations where you have to search
// (you don't have a key) for the data you need, a difference data structure
// would be more appropriate.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
type Name = string;
type Score = number;
type ScoreMap = Map<Name, Score>
const scoreMap: ScoreMap = new Map();

// Instantiating scoreMap
scoreMap.set('Joe', 78);
scoreMap.set('Bill', 34);
scoreMap.set('Hoana', 88);

assert.equal(scoreMap.size, 3);

// Mapping over a Map object
console.info('For of loop');
for ( const [name, score] of scoreMap ){
	console.table({ name, score })
}

//  or

console.info( 'Map.forEach loop');
scoreMap.forEach(( value, key, self ) => {
	console.table({ value, key, self })
})


// Delete items in the Map object
// pattern: <mapObject>.delete(<keyValue>)
// fun challenge: delete the one having the lowest score
// scoreMap.delete()
const scores: [Name, Score][] = [...scoreMap.entries()];
console.info('scores:', scores)
const foundScoreItem = scores.find(
	( value, idx, self ): boolean => {
		const scoreNumbers = self.map( s => s[1]);
		const minScoreNumber = Math.min( ...scoreNumbers );
		const minNumberIdx = scoreNumbers.indexOf(minScoreNumber);
		return value[minNumberIdx] === minScoreNumber;
	}
)

!!foundScoreItem && scoreMap.delete( foundScoreItem[0] )
// Checks if correctly deleted
assert.equal(scoreMap.size, 2);

// Checks a person's score
function hasPersonScore( name: Name, map: ScoreMap ): boolean {
	return map.has(name);
}
assert.equal( hasPersonScore('Joe', scoreMap ), true );
assert.equal( hasPersonScore('Plop', scoreMap ), false );


// Gets a person's score
function getPersonScore( name: Name, map: ScoreMap ): Score | undefined {
	return map.get(name);
}
assert.equal( getPersonScore('Joe', scoreMap), 78 );


// Clears Map object
scoreMap.clear();
assert.equal(scoreMap.size, 0);