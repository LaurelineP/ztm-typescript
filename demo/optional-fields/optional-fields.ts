/* eslint-disable */

// You can define optional fields in your object types. Optional fields are
// fields that may or may not be present in an object. You can make a field
// optional by appending a question mark "?" to its name in the type
// definition. This is useful when you have an object with some properties that
// are not always required.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties

type Warranty = 'standard' | 'extended';

function getWarrantyInfo( warranty: Warranty){
	switch (warranty){
		case "standard": return "90 days warranty";
		case "extended": return "180 days extended warranty";
	}

}

interface LineItem {
	name: string;
	quantity: number;
	// undefined if not present
	warranty?: Warranty | null;
}

function printLine( {name, quantity, warranty = null }: LineItem):void{
	console.table({  name, quantity, warranty: warranty ? getWarrantyInfo(warranty) : 'None'});
}

const product1: LineItem = {
	name: "heater",
	quantity: 1,
	warranty: 'standard'
}

const product2: LineItem = {
	name: "bread",
	quantity: 1,
}


printLine( product1 );
printLine( product2 );