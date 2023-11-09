document.addEventListener("DOMContentLoaded", function() {
//    fetch('https://api.example.com/project1Data')
//        .then(response => response.json())
//        .then(data => {
//            // Update the HTML elements with the fetched data
//            document.getElementById('project1Title').textContent = data.title;
//            document.getElementById('project1Description').textContent = data.description;
//            document.getElementById('project1Image').src = data.imageUrl;
//        })
//        .catch(error => console.error('Error:', error));

fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(data => {
      console.log(data);
      document.getElementById('userId').textContent = data.userId;

      document.getElementById('id').textContent = data.id;
      document.getElementById('completed').textContent = data.completed;
      document.getElementById('title').textContent = data.title;
      })
      .catch(error => console.error('Error:', error));
});
