const API_URL = "http://localhost:3000/students";


const form = document.getElementById("registrationForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const studentIdInput = document.getElementById("studentId");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const message = document.getElementById("message");



form.addEventListener("submit", async function(event) {
    event.preventDefault();
         try{

            const response=await fetch(API_URL);
            if(!response.ok){
                throw new Error("failed to fetch");

            }

            const students=await response.json();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim().toLowerCase();
            const studentId = studentIdInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;


            //هسا بدي اتأكد انه ولا حقل فاضي
              if (!name || !email || !studentId || !password || !confirmPassword)
                 {
                    message.textContent = "Please fill in all fields.";
                   return;
                  }

                  if(!email.includes("@")){
                    message.textContent="enter valid email";
                    return;
                  }
                  

                  if(password !== confirmPassword){
                    message.textContent ="passwords dont match";
                    return;
                  }





                  const studentexist= students.find(function(user){
                     return user.email === email || user.studentId === studentId;

                  })

                  if (studentexist) { 
                     message.textContent = "Email or Student ID already exists.";
                       return;
                      }



                    
                    /////هسا هون لما طالب يضع بيانات جديده

                const newStudent =
                 {
                 name: name,
                  email: email,
                  studentId: studentId,
                 password: password
               };

                 const registerResponse = await fetch(API_URL, {
                       method: "POST",
                        headers:
                         {
                           "Content-Type": "application/json"
                           },

                   body: JSON.stringify(newStudent)
                      });

                  if (!registerResponse.ok) {
                       throw new Error("Failed to register student");
                      }

                  message.textContent = "Account created successfully!";

                    window.location.href = "login.html";



         






}











         catch(error){
            console.log(error)
         }
});