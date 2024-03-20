const loginForm = document.getElementById("registerForm");

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const data = new FormData(loginForm);
    const obj = {}
    data.forEach((value, key)=>obj[key]=value);
    if (obj.email === "adminCoder@coder.com" && obj.password === "adminCod3r123") {
        obj.role = "admin";
    }
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if(res.status ==200){
            window.location.replace('/')
        }
    })
})