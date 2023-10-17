// A student management system requires functionality to add and remove student
// enrollments for various sections (classes). Each student has a list of
// enrollments which may have sections added or removed at any time.
//
// The faculty also needs the ability to determine how many sections any given
// student is enrolled in.
//
// Sections consist only of a section name, for example "Computer Science".
//
// Perform the following steps and add assertions to confirm that your program
// behaves as expected:
import { strict as assert } from "assert";

interface StudentManagementSystem {
  name: string,
  enrollments: string[],
  addEnrollment: ( enrollment: string ) => void,
  removeEnrollment: ( enrollment: string ) => void,
  countEnrollment: () => number
}



const alice: StudentManagementSystem = {
  name: "Alice",
  enrollments: [],
  addEnrollment: (enrollment: string) => { alice.enrollments.push(enrollment) },
  removeEnrollment: (enrollment: string) => {
    alice.enrollments.splice(alice.enrollments.indexOf(enrollment),1)
  },
  countEnrollment: () => alice.enrollments.length
};


const bob: StudentManagementSystem = {
  name: "Bob",
  enrollments: ["Algorithms"],
  addEnrollment: (enrollment: string) => { bob.enrollments.push(enrollment) },
  removeEnrollment: (enrollment: string) => { 
    bob.enrollments.splice(bob.enrollments.indexOf(enrollment),1)
  },
  countEnrollment: () => bob.enrollments.length
}
//
// 1. Add a section titled "CompSci" for `alice`
// alice.enrollments.push('CompSci');
alice.addEnrollment('CompSci');
assert.equal(alice.enrollments.toString(), ['CompSci'].toString());

// 2. Add a section titled "Networking" for `alice`
// alice.enrollments.push('Networking');
alice.addEnrollment('Networking');
assert.equal(alice.enrollments.toString(), ['CompSci', 'Networking'].toString());

// 3. Remove a section titled "CompSci" from `alice`
// 4. Assert that alice's enrollments consist of only "Networking"
// alice.enrollments.shift();
alice.removeEnrollment('CompSci')
assert.equal(alice.enrollments.toString(), ['Networking'].toString());


// 5. Add a section titled "Networking" for `bob`
// bob.enrollments.push('Networking');
bob.addEnrollment('Networking');

// 6. Assert that bob's enrollments consist of "Algorithms" and "Networking"
assert.equal(bob.enrollments.toString(), ['Algorithms','Networking'].toString());


// 7. Assert that bob's total enrollment count is equal to 2
assert.equal(bob.enrollments.length, 2);

// Tips:
//
// - Create an `addSection` function to add an enrollment for a student.
// - Create a `removeSection` function to remove an enrollment from a student.
// - Create a `totalEnrollments` function to calculate the number of
//   sections a student is enrolled in.
