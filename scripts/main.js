import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
var coursesTbody = document.getElementById('courses');
var studentsTbody = document.getElementById('students');
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBoxMin = document.getElementById("search-boxMin");
var inputSearchBoxMax = document.getElementById("search-boxMax");
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentsInTable(students) {
    console.log('Desplegando estudiantes');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.dato + "</td>\n                             <td>" + student.valor + "</td>";
        studentsTbody.appendChild(trElement);
    });
}
function applyFilterByCredits() {
    var textMin = parseInt(inputSearchBoxMin.value);
    var textMax = parseInt(inputSearchBoxMax.value);
    textMin = (textMin == null) ? 0 : textMin;
    textMax = (textMax == null) ? 15 : textMax;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(textMin, textMax, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(textMin, textMax, courses) {
    return textMin === 0 ? dataCourses : courses.filter(function (c) { return (textMin) < c.credits && c.credits < (textMax); });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return "Total Créditos: " + totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
