
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('all_circles');
    document.getElementById('drawing').innerHTML = '';
    button.addEventListener('click', () => {
        fetch('http://127.0.0.1:8000/all_circles')
            .then(response => response.json())
            .then(data =>  {
                
                data.forEach(circleData => {
                    document.getElementById('all_ids').value += circleData+", \n";
                    circle_status = getCircleById(circleData);
                    console.log(circle_status);
                    
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });


});


//Get circle
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('get_circle');
    button.addEventListener('click', () => {
        const inputText = document.getElementById('get_circle_text').value;
        console.log(inputText);
        const URI ='http://127.0.0.1:8000/circle' + '/' + inputText; 
        console.log(URI);
        fetch(URI)
        .then(response => response.json())
        .then(data =>  {
            const svg = document.getElementById('drawing');
            svg.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    });


});



//Delete circle
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('delete_circle');
    button.addEventListener('click', () => {
        const inputText = document.getElementById('delete_circle_text').value;
        console.log(inputText);
        const URI = 'http://127.0.0.1:8000/delete' + '/' + inputText; 
        document.getElementById('drawing').innerHTML = '';
        console.log(URI);
        fetch(URI, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            console.log('Delete status:', data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('status').innerText = 'Error deleting circle';
        });
    });
});

//Delete circles
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('delete_all_circle');
    button.addEventListener('click', () => {
        fetch('http://127.0.0.1:8000/all_circles')
        .then(response => response.json())
        .then(data =>  {
            
            data.forEach(circleData => {
                const URI = 'http://127.0.0.1:8000/delete' + '/' + circleData; 
                document.getElementById('drawing').innerHTML = '';
                console.log(URI);
                fetch(URI, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                console.log('Delete status:', data);
        })
                
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('status').innerText = 'Error deleting circle';
        });
    });
});

//Create circle
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('create_circle');
    button.addEventListener('click', () => {
        const inputText = document.getElementById('create_circle_text').value;
        circleparam = inputText.split(',');
        data = {svgType:"circle", cx: circleparam[0], cy: circleparam[1], r: circleparam[2],
        fill: 'red', stroke: 'red', stroke_width: '1'};
        data = JSON.stringify(data);
        console.log(data);
        const URI = 'http://127.0.0.1:8000/create';
        //const data = { circleData: inputText };


        fetch(URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            console.log('Create status:', data['id']);
            const URI ='http://127.0.0.1:8000/circle' + '/' + data['id']; 
            //document.getElementById('drawing').innerHTML = '';
            console.log(URI);
            fetch(URI)
            .then(response => response.json())
            .then(data =>  {
                const svg = document.getElementById('drawing');
                svg.insertAdjacentHTML('beforeend', data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        })
        .catch(error => {
            console.error('Error creating circle:', error);
            document.getElementById('status').innerText = 'Error creating circle';
        });
    });
});

//update circle
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('update_circle');
    button.addEventListener('click', () => {
        const inputText = document.getElementById('update_circle_text').value;
        circleparam = inputText.split(',');
        data = {svgType:"circle", cx: circleparam[1], cy: circleparam[2], r: circleparam[3], fill: 'green', stroke: 'red', stroke_width: '1'};
        data = JSON.stringify(data);
        const URI = 'http://127.0.0.1:8000/update/' + circleparam[0];
        console.log(data)
        fetch(URI, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            console.log('Create status:', data['id']);
            const URI ='http://127.0.0.1:8000/circle' + '/' + data['id']; 
            console.log(URI);
            fetch(URI)
            .then(response => response.json())
            .then(data =>  {
                const svg = document.getElementById('drawing');
                svg.insertAdjacentHTML('beforeend', data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        })
        .catch(error => {
            console.error('Error updating circle:', error);
            document.getElementById('status').inn
            erText = 'Error updating circle';
        });
    });
});

function getCircleById(inputText) {
    const URI = 'http://127.0.0.1:8000/circle/' + inputText;
    console.log(URI);
    fetch(URI)
        .then(response => response.json())
        .then(data => {
            const svg = document.getElementById('drawing');
            svg.insertAdjacentHTML('beforeend', data)
            return "Circle_id: "+ inputText +" rendered"
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}