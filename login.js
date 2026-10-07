const API_URL = "http://localhost:3000/students";
const Form = document.getElementById("loginForm");
const Email=document.getElementById("email");
const Pass=document.getElementById("password");
const remember=document.getElementById("rememberMe");


Form.addEventListener("submit", async function(event)
{

    event.preventDefault();
    try{
        const res=await fetch(API_URL);
        if(!res.ok){
            throw new Error("failed to login")
        }

        //وحوّلها من JSON إلى JavaScript،
        const students=await res.json();
        
          //هذول الايميل والباس الي المستخدم دخلهم
        const email=Email.value.trim().toLowerCase();

        const password = Pass.value;

        const student=students.find(function(user){

               return user.email === email && user.password===password;  
        });

        if (!student)
         {
            alert("Invalid email or password");
             return;
          }

        

     //هذا اوبجكت مثل علبه بدي اخزن فيها معلومات تسجيل الدخول
     //الي تمت بنجاح 
          const sesstionData={
              id: student.id,
              name: student.name,
            email: student.email,
                studentId: student.studentId,

             loginTime: new Date().toISOString()


          }


          if(remember.checked){
            localStorage.setItem("currentuser",JSON.stringify(sesstionData));

          }
          else{
                sessionStorage.setItem("currentuser", JSON.stringify(sesstionData));

          }

          window.location.href = "dashboard.html";






    }







    catch(error){
        console.log(error)

    }
    

})