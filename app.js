'use strict';

//   ====================         Declare Global Variables     ===============================
var numItemsToDisplay = 3;
var arrayOfItems = [];
var votesMadeThusFar = 0;
var itemsBeingShown = [];
var itemsToTestAgainst = [];
var displayTable = document.getElementById('displaytable');

//   ====================      Sales Item Constructor Function       =======================
function SalesItem(imgFilepath, itemDescription, itemName) {
    this.itemName = itemName;
    this.imgFilepath = imgFilepath;
    this.itemDescription = itemDescription;
    this.totalVotes = 0;
    this.timesShown = 0;
    arrayOfItems.push(this);
}

//   =================     Function to Select new Store Objects ========================
function selectNewObjects() {
    itemsToTestAgainst = [];
    for (var i = 0; i < numItemsToDisplay; i++) {
        itemsToTestAgainst[i] = itemsBeingShown[i].itemName;
    } // creates an array to test against to ensure we don't duplicate items from last round.

    var testName = itemsToTestAgainst[0];

    //For loop to create appropriate number of items
    //While to ensure item isn't in the array of prohibited items for this time around.
    for (var i = 0; i < numItemsToDisplay; i++) {
        while (itemsToTestAgainst.includes(testName)) {
            var index = Math.floor(Math.random() * arrayOfItems.length);
            testName = arrayOfItems[index].itemName;
        }
        itemsToTestAgainst.push(arrayOfItems[index].itemName);
        itemsBeingShown[i] = arrayOfItems[index];
    }
}


//  =============     =============     =============     =============     =============     

new SalesItem('images/bag.jpg', 'R2Dbag!', 'Starwars Travel Bag');
new SalesItem('images/banana.jpg', 'Banana Rama Ding Dong', 'Banana Slicer');
new SalesItem('images/bathroom.jpg', 'Bathroom Ipad Holder', 'poopy-pad');
new SalesItem('images/breakfast.jpg', 'All in 1, Breakfast Maker', 'Breakfast');
new SalesItem('images/bubblegum.jpg', 'All the flavor of an Italian Grandma', 'sounds disgusting');
new SalesItem('images/chair.jpg', 'It\'s probably not the most uncomfortable chair in the world', 'Yeah it is.');


//  initialize by saying StarWars 
for (var i = 0; i < numItemsToDisplay; i++) {
    itemsBeingShown.push(arrayOfItems[0])
}


//  Function to build out the table
function buildDisplayTable() {
    displayTable.innerHTML = '';
    var newTR = document.createElement('tr');

    for (var i in itemsBeingShown) {
        var newCell = document.createElement('td');
        var img = document.createElement("img");
        img.width = 200;
        img.src = itemsBeingShown[i].imgFilepath;
        newCell.appendChild(img);
        newTR.appendChild(newCell);
    }
    displayTable.appendChild(newTR);
}

selectNewObjects();
buildDisplayTable();




//  build out the table

//  function to display results

//  Event listener to determine clicks

//  Event Handler.   Increments votes, if/then to determine if new product or display results







/*   ====================    Requirements from Class  Repo

The thing you want to build today will select three random photos from the image directory and display them side-by-side-by-side in the browser window.
In addition, you'll want to be able to receive clicks on those displayed images, and track those clicks for each image. You'll also want to track how many times each image is displayed, for statistical purposes.
Upon receiving a click, three new non-duplicating random images need to be automatically displayed. In other words, the three images that are displayed should contain no duplicates, nor should they duplicate with any images that we displayed immediately before.
To do this, you'll want a constructor function that creates an object associated with each image, and has (at a minimum) properties for the name of the image (to be used for display purposes), its filepath, the number of times it has been shown, and the number of times it has been clicked. You'll probably find it useful to create a property that contains a text string you can use as an ID in HTML.
After 25 selections have been made, turn off the event listeners on the images (to prevent additional voting) and also display a list of the products with votes received with each list item looking like "3 votes for the Banana Slicer".
Stretch Goals For This Lab
Handle the display and voting for an arbitrary number of images
Using a variable, declare in your JS how many images to show
Based on that value, dynamically create that many <img> tags
Also based on that value, ensure that your randomizer is properly handling the specified number of images for display and repeat tracking.
*/