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

//   =================     Function to Select new Objects for sale ========================
function selectNewObjects() {
    itemsToTestAgainst = [];
    for (var i in itemsBeingShown) {
        itemsToTestAgainst[i] = itemsBeingShown[i].itemName;
    } // creates an array to test against to ensure we don't duplicate items from last round.

    //For loop to create appropriate number of items
    //While to ensure item isn't in the array of prohibited items for this iteration.
    for (var i = 0; i < numItemsToDisplay; i++) {
        do {
            var index = Math.floor(Math.random() * arrayOfItems.length);
            var testName = arrayOfItems[index].itemName;
        }
        while (itemsToTestAgainst.includes(testName))
        itemsToTestAgainst.push(arrayOfItems[index].itemName);
        itemsBeingShown[i] = arrayOfItems[index];
    }
}

//  Function to build out the table
function buildDisplayTable() {
    displayTable.innerHTML = '';
    var trImages = document.createElement('tr');
    var trDescription = document.createElement('tr');

    for (var i in itemsBeingShown) {
        //  Do the Image Row
        var tdImages = document.createElement('th');
        // switched from td to th to make capturing clicks easier.
        var img = document.createElement("img");
        img.width = 200;
        img.src = itemsBeingShown[i].imgFilepath;

        //assign the td an ID to be used in the event listener
        tdImages.id = i

        tdImages.appendChild(img);
        trImages.appendChild(tdImages);


        //Do the Description Row
        var tdDescription = document.createElement('td');
        tdDescription.textContent = itemsBeingShown[i].itemDescription;
        tdDescription.width = 200;
        trDescription.appendChild(tdDescription);
    }

    displayTable.appendChild(trImages);
    displayTable.appendChild(trDescription);
}

//  =======   Add Event Listener to Table:  ==========

//Got some help from Stack Overflow on this part.
//Specifically, learned what a node-list is, and how
//to apply it to this particular problem.
function listenAndLog() {
    //  make a node-list of all the th
    var tableImages = document.querySelectorAll('th')

    // add an event listener to each node
    tableImages.forEach(function (clickMe) {
        clickMe.addEventListener('click', function (clicked) {

            // get the ID of the TH that was clicked on.
            var itemClicked = clicked.currentTarget;
            var idItemClicked = itemClicked.id
            votesMadeThusFar++;
            itemsBeingShown[idItemClicked].totalVotes++;

            if (votesMadeThusFar > 24) {
                'End Page'
            }
            else {
                selectNewObjects();
                buildDisplayTable();
                listenAndLog();
            }

            // There's got to be a better way of doing this!        
        });

    });
};

//  =============     =============     =============     =============     =============     

new SalesItem('images/bag.jpg', 'R2Dbag!', 'Starwars Travel Bag');
new SalesItem('images/banana.jpg', 'Banana Rama Ding Dong', 'Banana Slicer');
new SalesItem('images/bathroom.jpg', 'You can Twitter, while on the shitter.', 'poopy-pad');
new SalesItem('images/breakfast.jpg', 'All in 1, Breakfast Maker', 'Breakfast');
new SalesItem('images/bubblegum.jpg', 'All the flavor of an Italian Grandma', 'sounds disgusting');
new SalesItem('images/chair.jpg', "It's probably not the most uncomfortable chair in the world", "Yeah it is.");

selectNewObjects();
buildDisplayTable();
listenAndLog();



//  function to display results


//  Event Handler.   Increments votes, if/then to determine if new product or display results







/*   ====================    Requirements from Class  Repo

The thing you want to build today will select three random photos from the image directory and display them side-by-side-by-side in the browser window.
In addition, you'll want to be able to receive clicks on those displayed images, and track those clicks for each image. You'll also want to track how many times each image is displayed, for statistical purposes.

After 25 selections have been made, turn off the event listeners on the images (to prevent additional voting) and also display a list of the products with votes received with each list item looking like "3 votes for the Banana Slicer".
Stretch Goals For This Lab
Handle the display and voting for an arbitrary number of images
Using a variable, declare in your JS how many images to show
Based on that value, dynamically create that many <img> tags
Also based on that value, ensure that your randomizer is properly handling the specified number of images for display and repeat tracking.
*/