const STUDENTS_API = "http://localhost:3000/students";
const COURSES_API = "http://localhost:3000/courses";

const coursesBody = document.getElementById("coursesBody");


// =========================
// Get Current User
// =========================

// نجيب المستخدم من localStorage
// وإذا مش موجود، نجيبه من sessionStorage

const user =
    localStorage.getItem("currentuser") ||
    sessionStorage.getItem("currentuser");


// إذا ما في مستخدم مسجل دخول
// نرجعه إلى صفحة Login

if (!user) {
    window.location.href = "login.html";
}


// نحول البيانات من JSON string
// إلى JavaScript object

const currentUser = JSON.parse(user);


// =========================
// Display Student Information
// =========================

document.getElementById("studentName").textContent =
    currentUser.name;

document.getElementById("studentEmail").textContent =
    currentUser.email;

document.getElementById("studentId").textContent =
    currentUser.studentId;


// =========================
// Get Courses
// =========================

async function getCourses() {

    try {

        // نطلب جميع الكورسات من API

        const response = await fetch(COURSES_API);


        if (!response.ok) {
            throw new Error("Failed to fetch courses");
        }


        // نحول JSON إلى JavaScript

        const courses = await response.json();


        // عرض جميع الكورسات في Console

        console.log(courses);

        // نجيب فقط الكورسات الخاصة بالطالب الحالي

        const myCourses = courses.filter(function(course) {

            return course.studentId === currentUser.id;

        });


        console.log(myCourses);


        // نعرض كل Course داخل الجدول

        myCourses.forEach(function(course) {

            const row = document.createElement("tr");


            row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.teacher}</td>
                <td>${course.score}</td>
            `;

              //ضيف الصف للجدول
            coursesBody.appendChild(row);

        });

    }

    catch (error) {

        console.log(error);

    }

}


// تشغيل دالة الـ Courses

getCourses();


// =========================
// Logout
// =========================

const logoutBtn = document.getElementById("logoutBtn");


logoutBtn.addEventListener("click", function() {

    // مسح المستخدم من localStorage

    localStorage.removeItem("currentuser");


    // مسح المستخدم من sessionStorage

    sessionStorage.removeItem("currentuser");


    // الرجوع إلى Login

    window.location.href = "login.html";

});


// =========================
// Edit Profile
// =========================

const editProfileBtn =
    document.getElementById("editProfileBtn");


editProfileBtn.addEventListener("click", async function() {

    // نطلب الاسم الجديد

    const newName = prompt(
        "Enter your new name:",
        currentUser.name
    );


    // إذا المستخدم ضغط Cancel
    // نوقف العملية

    if (!newName) {
        return;
    }


    // نطلب الإيميل الجديد

    const newEmail = prompt(
        "Enter your new email:",
        currentUser.email
    );


    // إذا المستخدم ضغط Cancel
    // نوقف العملية

    if (!newEmail) {
        return;
    }


    try {

        // البيانات الجديدة

        const updatedStudent = {

            // نحتفظ بكل البيانات القديمة

            ...currentUser,

            // نغير الاسم

            name: newName.trim(),

            // نغير الإيميل

            email: newEmail.trim().toLowerCase()

        };


        // نرسل التعديل إلى API

        const response = await fetch(
         //بتحدد للـ API أي طالب بدنا نعدّل.
            `${STUDENTS_API}/${currentUser.id}`,
            {
               //PUT → أعدل بيانات موجودة.
                method: "PUT",
                
                //"البيانات اللي رح أبعثها إلك مكتوبة بصيغة JSON."

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(updatedStudent)
            }
        );


        // نتأكد أن التعديل نجح

        if (!response.ok) {
            throw new Error("Failed to update profile");
        }


        // نحدث currentUser

        currentUser.name = updatedStudent.name;

        currentUser.email = updatedStudent.email;


        // نحدث البيانات الموجودة في Storage

        if (localStorage.getItem("currentuser")) {

            localStorage.setItem(
                "currentuser",
                JSON.stringify(currentUser)
            );

        }
        else {

            sessionStorage.setItem(
                "currentuser",
                JSON.stringify(currentUser)
            );

        }


        // نحدث البيانات الظاهرة على الصفحة

        document.getElementById("studentName").textContent =
            currentUser.name;

        document.getElementById("studentEmail").textContent =
            currentUser.email;


        alert("Profile updated successfully!");

    }

    catch (error) {

        console.log(error);

        alert("Failed to update profile");

    }

});