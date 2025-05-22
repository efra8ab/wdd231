
function toggleMenu() {
    document.body.classList.toggle("nav-open");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseSection = document.querySelector(".certificate-card");
const creditDisplay = document.createElement("p");
creditDisplay.classList.add("credit-count");
courseSection.appendChild(creditDisplay);

const filterButtons = document.createElement("div");
["All", "WDD", "CSE"].forEach(subject => {
    const btn = document.createElement("button");
    btn.textContent = `${subject} Courses`;
    btn.addEventListener("click", () => filterCourses(subject));
    filterButtons.appendChild(btn);
});
courseSection.appendChild(filterButtons);

const courseList = document.createElement("div");
courseList.classList.add("grid");
courseSection.appendChild(courseList);

function filterCourses(subject) {
    let filtered = courses;
    if (subject !== "All") {
        filtered = courses.filter(course => course.subject === subject);
    }
    displayCourses(filtered);
}

function displayCourses(courseArray) {
    courseList.innerHTML = "";
    let totalCredits = 0;
    courseArray.forEach(course => {
        const card = document.createElement("section");
        card.classList.add("course-card");
        card.style.border = `2px solid ${course.completed ? 'green' : 'gray'}`;
        card.style.backgroundColor = course.completed ? "#e5f9e7" : "#ffffff";

        const title = document.createElement("h3");
        title.textContent = `${course.subject} ${course.number}: ${course.title}`;
        const desc = document.createElement("p");
        desc.textContent = course.description;
        const tech = document.createElement("p");
        tech.textContent = `Technologies: ${course.technology.join(", ")}`;

        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(tech);
        courseList.appendChild(card);

        if (course.completed) {
            totalCredits += course.credits;
        }
    });

    creditDisplay.textContent = `Total Credits: ${totalCredits}`;
}

displayCourses(courses);