/* ------------------------- Define type for object ------------------------- */
export type Status = "success" | 'failure';

/**
 * Type assertion here because someone
 * may want to iterate over the array
 */
const Departments = ["Electronics", "Home & Kitchen", "Toys & Games"] as const;
/**
 * Defining the indexable
 */
type Department = (typeof Departments)[number];
export interface APIResponseItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	department: Department;
}
export interface APIResponse {
	status: Status,
	data: {
		items: APIResponseItem[]
	}
}


/**
 * Either returns the response we can see in the js file
 * or undefined - anticipating the error case
 */
export function apiResponse(): APIResponse | undefined;