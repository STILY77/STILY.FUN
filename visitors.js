///
// Local Visitor Count - starts fresh for your site
// You can set a starting number if you want
///

///
// SETTINGS
///

// Starting visitor count (set to 0 to start from scratch, or any number you want)
const starting_count = 0;

// Where you want the visitor number to be inserted.
// This uses a CSS selector and adds the number to the
// end of every matching element.
// By default, it will do this to every element with
// the class "visitor-count".

const visitor_count_selector = ".visitor-count";

///
// CODE
///

(function () {
  // Get current count from localStorage, or use starting_count
  const storage_key = "site_visitor_count";
  let current_count = parseInt(localStorage.getItem(storage_key), 10);
  
  // If no count exists in localStorage, start with starting_count
  if (isNaN(current_count)) {
    current_count = starting_count;
  }
  
  // Increment the count for this visit
  current_count++;
  
  // Save the new count to localStorage
  localStorage.setItem(storage_key, current_count.toString());
  
  // Display the count
  const visitor_count_elements = document.querySelectorAll(visitor_count_selector || ".visitor-count");
  visitor_count_elements.forEach((item) => item.appendChild(document.createTextNode(current_count)));
}());
