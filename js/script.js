/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const maxPerPage = 9; // maximum number of student listButtons displayed per page

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   // calculates the start and end index of the data array based on what number page is being displayed and the maxPerPage constant value
   let startIndex = (page * maxPerPage) - maxPerPage; 
   let endIndex = page * maxPerPage;

   // selects student list section of the document and initializes the HTML value to an empty string
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   // iterates over the subset of the data array, inserting the relevant data into the list item template literal
   for(let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let studentHTML =
         `<li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
         `;
         studentList.insertAdjacentHTML('beforeend', studentHTML); // inserts student list item into the page, making it visible
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   const numPaginationButtons = Math.ceil(list.length / maxPerPage);
   const linkList = document.querySelector(".link-list");
   linkList.innerHTML = '';

   for(let i = 0; i < numPaginationButtons; i++){
      let paginationHTML = `
      <li>
         <button type="button" id="${i + 1}">${i + 1}</button>
      </li>
      `;
      linkList.insertAdjacentHTML('beforeend', paginationHTML);
   }

   const firstPageButton = document.getElementById('1');
   firstPageButton.className = "active";

   linkList.addEventListener('click', (event) => {
      if (event.target.nodeName === 'BUTTON'){
         let linkListButtons = linkList.getElementsByTagName('button');
         for (let i = 0; i < linkListButtons.length; i++){
            linkListButtons[i].className = 'inactive';
         }
         event.target.className = "active";
         showPage(list, event.target.getAttribute('id'));
      }
   });


}

function createSearchBar(){
   const header = document.querySelector(".header");
   const searchBarHTML = 
      `<label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
      `;
   header.insertAdjacentHTML('beforeend', searchBarHTML);   

   const searchBar = document.getElementById('search');

   searchBar.addEventListener('keyup', () => {
      let query = searchBar.value;
      let matchedResults = [];

      for (let i = 0; i < data.length; i++){
         let studentName = `${data[i].name.first} ${data[i].name.last}`;
         
         if (studentName.includes(query)){
            matchedResults.push(data[i]);
         }
      }

      if (matchedResults.length === 0) {
         console.log("No results found.");
      }else{
         showPage(matchedResults, 1);
         addPagination(matchedResults);
      }

   });
}

// Call functions
createSearchBar(data);
showPage(data, 1);
addPagination(data);
