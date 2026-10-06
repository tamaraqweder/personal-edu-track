const user=
  localStorage.getItem("currentuser") || sessionStorage.getItem("currentuser");
  //معناها جيب المتسخدم الحالي من اللوكال اذا ما في جيب من session

 if(!user){
    window.location.href="login.html"
 }
