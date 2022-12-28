const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    message1.textContent = 'Loading...';

    const location = searchElement.value;
    fetch('http://localhost:3000/weather?address='+location)
    .then(response => {

        response.json().then(res => {
            console.log(res);
            if(res.placename){
                message1.textContent = res.placename;
                message2.textContent = res.weather;
            }else if(res.error){
                message1.textContent = res.error;
            }
        }).catch(err=>{
            message1.textContent = 'An error occurred!!';
        })
    });
});