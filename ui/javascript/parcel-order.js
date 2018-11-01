const createParcel = document.getElementById('createParcel');
const viewAllParcel = document.getElementById('viewAllParcel');



document.getElementById('create').addEventListener('click', function(){
   viewAllParcel.style.display = 'none';
   createParcel.style.display = "block";
});


document.getElementById('viewParcel').addEventListener('click', function(){
    createParcel.style.display = 'none';
    viewAllParcel.style.display = "block";
    });

document.getElementById('idOfParcel').addEventListener('click', function(){
let parcel = document.getElementById('parcelOne');
let disp = document.getElementById('disp');


if(parcel.style.display != 'none'){
    parcel.style.display = 'none';
    disp.innerHTML = "<strong>&#8594</strong>";
}else{
    parcel.style.display = 'block';
    disp.innerHTML = "<strong>&#8595</strong>"

}
});
const dest = document.getElementById('dest');
const destination = document.getElementById('destination');

document.getElementById('editDest').addEventListener('click', function(){
    document.getElementById('des').style.display = 'block';
    console.log(dest.value);
    destination.value = dest.innerText;
    });

    document.getElementById('saveDest').addEventListener('click', function(){
        
        document.getElementById('des').style.display = 'none';
        dest.innerHTML = destination.value;
    });
    