
const dest = document.getElementById('dest');
const destination = document.getElementById('destination');
const stat = document.getElementById('stat');
const status = document.getElementById('status');


document.getElementById('editDest').addEventListener('click', function(){
    document.getElementById('des').style.display = 'block';
    destination.value = dest.innerText;
    });

    document.getElementById('saveDest').addEventListener('click', function(){
        document.getElementById('des').style.display = 'none';
        dest.innerHTML = destination.value;
    });
    
    
    document.getElementById('editStat').addEventListener('click', function(){
        document.getElementById('sta').style.display = 'block';
        status.value = stat.innerHTML;
        });
    
        document.getElementById('saveStat').addEventListener('click', function(){
            document.getElementById('sta').style.display = 'none';
            stat.innerHTML = status.value;
        });
        
        
    