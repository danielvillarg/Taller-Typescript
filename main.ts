import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudents } from './dataStudents.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentsTbody: HTMLElement = document.getElementById('students')!;

const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBoxMin: HTMLInputElement = <HTMLInputElement> document.getElementById("search-boxMin")!;
const inputSearchBoxMax: HTMLInputElement = <HTMLInputElement> document.getElementById("search-boxMax")!;

const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderStudentsInTable(students: Student[]): void {
    console.log('Desplegando estudiantes');
    students.forEach((student) => {
      let trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${student.dato}</td>
                             <td>${student.valor}</td>`;
      studentsTbody.appendChild(trElement);
    });
  }
 

function applyFilterByCredits() { 
    let textMin = parseInt(inputSearchBoxMin.value);
    let textMax = parseInt(inputSearchBoxMax.value);
    textMin = (textMin == null) ? 0 : textMin;
    textMax = (textMax == null) ? 15 : textMax;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(textMin, textMax, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }

function searchCourseByCredits(textMin: number, textMax: number, courses: Course[]) {
    return textMin === 0 ? dataCourses : courses.filter( c => (textMin)< c.credits && c.credits<(textMax));
  }

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): string {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return "Total Créditos: "+ totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}

