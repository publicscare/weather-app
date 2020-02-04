// console.log('Client side javascript file is loaded');

// utilizing the browser based Fetch API
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// });
// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//             if (data.error) {
//                 console.log(data.error);
//             } else {
//                 console.log(data.location );
//                 console.log(data.forecast);
//             }
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (e) => {
    // prevent browser refreshing.
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
                if (data.error) {
                    // console.log(data.error);
                    messageOne.textContent = data.error;
                    // messageTwo.textContent = data.location;
                } else {
                    // console.log(data.location );
                    // console.log(data.forecast);
                    messageOne.textContent=data.location;
                    messageTwo.textContent = data.forecast;
                }
        });
    });
    // console.log(`Searching for ${location}`);
})