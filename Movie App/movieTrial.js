
// 1) Add a text input to your document
// 2) Attach 'keyup' event to the text input and call searchShow with the input
// 3) Convert the result json to a string array using 'map'
// 4) Display the string results on the page below the text input.
// make the results as clickable links that go to the show's page.

function searchShow(query) {
    const url = `https://api.tvmaze.com/search/shows?q=${query}`;
    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        const results = jsonData.map((element) => element.show.name);
        renderResults(results);
        // the codes below will be added at last step
        document.getElementById("errorMessage").innerHTML = "";
      })
      .catch((error) => {
        document.getElementById("errorMessage").innerHTML = error;
        renderResults([]);
      });
    // console.log(result);
    //console.log(jsonData);
    // we want to show search result / tv show name
    //json is an array so we use map all shows/elements and extract the name
  }
  
  function renderResults(results) {
    const list = document.getElementById("resultsList");
    list.innerHTML = "";
    results.forEach((result) => {
      const element = document.createElement("li");
      element.innerText = result;
      list.appendChild(element);
    });
  }
  
  /*window.onload = () => {
    const searchFieldElement = document.getElementById("searchField");
    searchFieldElement.onkeyup = (event) => {
     // console.log(searchFieldElement.value);
      searchShow(searchFieldElement.value);
    };
  }; */
  
  //when we type, for each onkeyup/letter we send query/ http request so lot of responses are spamming the server
  // to prevent this we create setTimeout function
  //when we type a letter it will schedule the search show in 250ms
  // if we type the second letter faster than 250ms, it will cancel the previous request by clearTimeout so the first show never happens
  // as long as we type faster than 250ms, the setTimeout will be cancelled
  //as soon as we don't type anything for 250ms, the search will be performed
  
  /*let searchTimeoutToken = 0;
  window.onload = () => {
    const searchFieldElement = document.getElementById("searchField");
    searchFieldElement.onkeyup = (event) => {
     // console.log(searchFieldElement.value);
     clearTimeout( searchTimeoutToken)
     searchTimeoutToken = setTimeout(() => {
     searchShow(searchFieldElement.value);
  }, 250)
      
    };
  };  */
  
  // in above code block, when the input is empty or we just make some spaces, it will send query and that's not good
  // so we need to check if the searchFieldElement.value is empty then we return/
  // if ... return is called early exit, so if that happens the next codes/ setTimeout will never execute
  // trim() will remove all the spaces so it doesn't count any spaces
  // problem: still when add space after typing a word or backspace to remove a letter, it will send a query
  
  let searchTimeoutToken = 0;
  window.onload = () => {
    const searchFieldElement = document.getElementById("searchField");
    searchFieldElement.onkeyup = (event) => {
      // console.log(searchFieldElement.value);
      clearTimeout(searchTimeoutToken);
      if (searchFieldElement.value.trim().length === 0) {
        return;
      }
      searchTimeoutToken = setTimeout(() => {
        searchShow(searchFieldElement.value);
      }, 250);
    };
  };
  
  // to handle errors in fetch API we need to use promise and catch statement
  // to make the error appear in the html, we create a div inside html
  //then we add .catch to our searchShow function
  // to try the error, in DT we change the network to off to simulate no internet connection
  // to make network offline in firefox, use "Enable Request Blocking". Add * to match all requests. It also blocks local requests.
  // We should also prevent results to be shown when there is an error, we do that by calling renderResult with empty string