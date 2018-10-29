let signIn = document.getElementById('formSignIn');
let signUp = document.getElementById('formSignUp');


document.getElementById('signIn').addEventListener('click', function(){
    let signIn = document.getElementById('formSignIn');
let signUp = document.getElementById('formSignUp');
signIn.style.display = "none";
signUp.style.display = "block";
});

document.getElementById('signUp').addEventListener('click', function(){
    let signIn = document.getElementById('formSignIn');
    let signUp = document.getElementById('formSignUp');
    signUp.style.display = "none";
    signIn.style.display = "block";
    console.log('hey')
    });