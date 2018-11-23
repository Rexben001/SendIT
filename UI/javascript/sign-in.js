const signIn = document.getElementById('formSignIn');
const signUp = document.getElementById('formSignUp');


document.getElementById('signIn').addEventListener('click', function(){
   
signIn.style.display = "none";
signUp.style.display = "block";
});

document.getElementById('signUp').addEventListener('click', function(){
    signUp.style.display = "none";
    signIn.style.display = "block";
    });

signUp.addEventListener('submit', function(){
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirm-password');

    if(confirmPassword.value !== password.value){
        alert('Password does not match');
    }
    
});