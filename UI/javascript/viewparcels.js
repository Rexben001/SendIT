const idOfParcel = document.getElementById('idOfParcel');
const parcelOne = document.getElementById('parcelOne');
const dest = document.getElementById('dest');
const destination = document.getElementById('destination');
const stat = document.getElementById('stat');
const status = document.getElementById('status');
const editDest = document.getElementById('editDest');
const editStat = document.getElementById('editStat');


idOfParcel.addEventListener('click', function(){
    if(parcelOne.style.display === 'block'){
        parcelOne.style.display = 'none';
    }else{
        parcelOne.style.display = "block";
    }
});


editDest.addEventListener('click', function(){
    document.getElementById('des').style.display = 'block';
    editDest.style.display = 'none';
    destination.value = dest.innerText;
    });

    document.getElementById('saveDest').addEventListener('click', function(){
        document.getElementById('des').style.display = 'none';
        editDest.style.display = 'inline';
        dest.innerHTML = destination.value;
    });
    
    
    // editStat.addEventListener('click', function(){
    //     document.getElementById('sta').style.display = 'block';
    //     editStat.style.display = 'none';
    //     status.value = stat.innerHTML;
    //     });
    
    //     document.getElementById('saveStat').addEventListener('click', function(){
    //         document.getElementById('sta').style.display = 'none';
    //         editStat.style.display = 'inline';
    //         stat.innerHTML = status.value;
    //     });


    