let section = document.querySelector("section");
let add = document.querySelector(".add");
let bol = true;

add.addEventListener("click", (e) => {
  // --prevent entire form being submitted--

  e.preventDefault();

  // --get the form input value--

  // console.log(e.target.parentElement);
  let form = e.target.parentElement;
  // console.log(form.children);
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDate = form.children[2].value;
  // console.log(todoText, todoMonth, todoDate);

  if (todoText === "") {
    alert("Please enter some text to describe what you need to do!");
    return;
  }

  // if (bol) {
  //   let todoTitle = document.createElement("div");
  //   todoTitle.classList.add("todoTitle");
  //   let todoName = document.createElement("h3");
  //   let todoTime = document.createElement("h3");
  //   let todohr = document.createElement("hr");
  //   todoName.innerText = "Need to do";
  //   todoTime.innerText = "Date";
  //   todoTitle.appendChild(todoName);
  //   todoTitle.appendChild(todoTime);
  //   section.appendChild(todoTitle);
  //   section.appendChild(todohr);
  //   bol = false;
  // }

  // --create a todo item
  let todo = document.createElement("div"); // create a div tag
  todo.classList.add("todo"); // insert class="todo" into this div tag
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let date = document.createElement("p");
  date.classList.add("todo-date");
  date.innerText = todoMonth + " / " + todoDate; // insert line 18 string into "p" tag which class was named "todo-date"
  todo.appendChild(text); // <div class="todo"> add a "p" tag child which class named "todo-text"
  todo.appendChild(date);
  section.appendChild(todo); //<section class="sort-con"> add a "div" tag child which class named "todo"
  todo.style.animation = "scaleUp .3s ease forwards";

  // add check and trash btn
  let completeBTN = document.createElement("button");
  completeBTN.classList.add("complete");
  completeBTN.innerHTML = '<i class="fa-solid fa-check"></i>';
  let trashBTN = document.createElement("button");
  trashBTN.classList.add("trash");
  trashBTN.innerHTML = '<i class="fa-solid fa-trash"></i>';
  todo.appendChild(completeBTN);
  todo.appendChild(trashBTN);

  form.children[0].value = "";

  // complete btn add to give it a function
  completeBTN.addEventListener("click", (e) => {
    let todoComplete = e.target.parentElement;
    todoComplete.classList.toggle("done");
    if (todoComplete.classList.contains("done")) {
      completeBTN.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
    } else {
      completeBTN.innerHTML = '<i class="fa-solid fa-check"></i>';
    }
  });

  // trash btn add a listener to give it a function to remove todo
  trashBTN.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    // todoItem.remove();
    todoItem.style.animation = "scaleDown .3s ease forwards";
    todoItem.addEventListener("animationend", () => {
      // remove from localstorage
      let text = todoItem.children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));
      // if the text in localstorage equal the text in the box which we click remove button
      // than remove whole object which store this text
      myListArray.forEach((item, index) => {
        if (item.myText == text) {
          myListArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      });

      todoItem.remove();
    });
  });

  // myTodo object need to store
  let myTodo = {
    myText: todoText,
    myMonth: todoMonth,
    myDate: todoDate,
  };

  // store data into an array of object
  let myList = localStorage.getItem("list");
  //   console.log(myList);
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo])); // store myTodo object by a type of string array
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }
});

loadData();

function loadData() {
  let myList = localStorage.getItem("list");
  if (myList != null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach((item) => {
      // creat todo
      let todo = document.createElement("div");
      todo.classList.add("todo");
      let text = document.createElement("p");
      text.classList.add("todo-text");
      text.innerText = item.myText;
      let date = document.createElement("p");
      date.innerText = item.myMonth + " / " + item.myDate;
      todo.appendChild(text);
      todo.appendChild(date);

      // add check and trash btn
      let completeBTN = document.createElement("button");
      completeBTN.classList.add("complete");
      completeBTN.innerHTML = '<i class="fa-solid fa-check"></i>';
      let trashBTN = document.createElement("button");
      trashBTN.classList.add("trash");
      trashBTN.innerHTML = '<i class="fa-solid fa-trash"></i>';
      todo.appendChild(completeBTN);
      todo.appendChild(trashBTN);

      section.appendChild(todo);

      // complete btn add to give it a function
      completeBTN.addEventListener("click", (e) => {
        let todoComplete = e.target.parentElement;
        todoComplete.classList.toggle("done");
        if (todoComplete.classList.contains("done")) {
          completeBTN.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
        } else {
          completeBTN.innerHTML = '<i class="fa-solid fa-check"></i>';
        }
      });

      // trash btn add a listener to give it a function to remove todo
      trashBTN.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;
        todoItem.style.animation = "scaleDown .3s ease forwards";

        todoItem.addEventListener("animationend", () => {
          //remove from local storage
          let text = todoItem.children[0].innerText;
          let myListArray = JSON.parse(localStorage.getItem("list"));
          // if the text in localstorage equal the text in the box which we click remove button
          // than remove whole object which store this text
          myListArray.forEach((item, index) => {
            if (item.myText == text) {
              myListArray.splice(index, 1);
              localStorage.setItem("list", JSON.stringify(myListArray));
            }
          });
          todoItem.remove();
        });
      });
    });
  }
}

//merge sort
function mergTime(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (Number(arr1[i].myMonth) > Number(arr2[j].myMonth)) {
      result.push(arr2[j]);
      j++;
    } else if (Number(arr1[i].myMonth) < Number(arr2[j].myMonth)) {
      result.push(arr1[i]);
      i++;
    } else if (Number(arr1[i].myMonth) == Number(arr2[j].myMonth)) {
      if (arr1[i].myDate > arr2[j].myDate) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let right = arr.slice(0, middle); // include 0, but exclusive middle
    let left = arr.slice(middle, arr.length);
    return mergTime(mergeSort(right), mergeSort(left));
  }
}

let sortBTN = document.querySelector(".sort");
console.log(sortBTN);
sortBTN.addEventListener("click", () => {
  let sortListArray = mergeSort(JSON.parse(localStorage.getItem("list")));
  localStorage.setItem("list", JSON.stringify(sortListArray));
  console.log(JSON.parse(localStorage.getItem("list")));

  //   remove data
  let len = section.children.length;
  for(let i = 0; i < len; i++) {
    section.children[0].remove();
  }

  // load data
  loadData();
});
