'use strict';

//   ====================         Declare Global Variables     ===============================
var numItemsToDisplay = 3;
var arrayOfItems = [];
var votesMadeThusFar = 0;
var itemsBeingShown = [];
var itemsToTestAgainst = [];
var displayTable = document.getElementById('displaytable');
var resultsList = document.getElementById('resultslist');
var StopAfterXVotes = 3;

//   ====================      Sales Item Constructor Function       =======================
function SalesItem(imgFilepath, itemDescription, itemName) {
    this.itemName = itemName;
    this.imgFilepath = imgFilepath;
    this.itemDescription = itemDescription;
    this.totalVotesForItem = 0;
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

//  Function to increment Times Shown count
function timesShownIncrement () {
for (var i in itemsBeingShown) {
    itemsBeingShown[i].timesShown++;
}
}

//  Function to build out the table
function buildDisplayTable() {
    displayTable.innerHTML = '';
    var trImages = document.createElement('tr');
    var trDescription = document.createElement('tr');
    var buttonTR = document.createElement('tr');

    for (var i in itemsBeingShown) {
        //  Do the Image Row
        var tdImages = document.createElement('th');
        // switched from td to th to make capturing clicks easier.
        var img = document.createElement("img");
        img.width = 200;
        img.src = itemsBeingShown[i].imgFilepath;

        tdImages.appendChild(img);
        trImages.appendChild(tdImages);


        //Do the Description Row
        var tdDescription = document.createElement('td');
        tdDescription.textContent = itemsBeingShown[i].itemDescription;
        tdDescription.width = 200;
        trDescription.appendChild(tdDescription);

        //  Build the Button Row    
        var tdButton = document.createElement('td');
        var newButton = document.createElement('button');
        tdButton.appendChild(newButton)
        newButton.textContent = 'Pick Me!!!';
        newButton.id= i;
        buttonTR.appendChild(tdButton)

    }

    displayTable.appendChild(trImages);
    displayTable.appendChild(trDescription);
    displayTable.appendChild(buttonTR)
    timesShownIncrement();
}

//  =======   Add Event Listener to buttons:  ==========
    // I tried to put 1 listener on the table, but couldn't figure out how
    // to tell which picture was clicked.  Honestly, I kindof wanted buttons
    // anyways, so no big deal.  But if I forget to ask in class tomorrow, I'd
    // definitely like to know how to do this.  I think we covered it briefly today,
    // but I'm not sure.  I def. don't remember it though!

    function listenAndLog() {
        //put event listeners on each button
        for (var i in itemsBeingShown)
        {
            var thisButton = document.getElementById(i);
            thisButton.addEventListener('click', buttonClicked);
        }
    }
    
    
//  =======  Event Handler for When Table is Clicked ======

function buttonClicked (event) {
    //Count Vote
    itemsBeingShown[this.id].totalVotesForItem++;
    votesMadeThusFar++;
    if(votesMadeThusFar===StopAfterXVotes)
    {
        endpage();
    }
    else{
        selectNewObjects();
        buildDisplayTable();
        listenAndLog();
    }
}


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



//   ================    function to display results
function endpage(){
    for (var i in itemsBeingShown)
        {
            var thisButton = document.getElementById(i);
            thisButton.removeEventListener('click', buttonClicked);
        }

    for (i in arrayOfItems){
        var newLI = document.createElement('li');
        newLI.textContent = arrayOfItems[i].totalVotesForItem + 'votes for ' + arrayOfItems[i].itemName;
        resultslist.appendChild(newLI);
    }
}

/*   ====================    Requirements from Class  Repo

You'll also want to track how many times each image is displayed, for statistical purposes.

After 25 selections have been made, turn off the event listeners on the images (to prevent additional voting) and also display a list of the products with votes received with each list item looking like "3 votes for the Banana Slicer".
Stretch Goals For This Lab
Handle the display and voting for an arbitrary number of images
Using a variable, declare in your JS how many images to show
Based on that value, dynamically create that many <img> tags
Also based on that value, ensure that your randomizer is properly handling the specified number of images for display and repeat tracking.
*/