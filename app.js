'use strict';

//   ====================         Declare Global Variables     ===============================

var numItemsToDisplay = 3;
var arrayOfItems = [];
var votesMadeThusFar = 0;
var itemsBeingShown = [];
var itemsToTestAgainst = [];
var displayTable = document.getElementById('displaytable');
var resultsList = document.getElementById('resultslist');
var StopAfterXVotes = 6;

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
function timesShownIncrement() {
    for (var i in itemsBeingShown) {
        itemsBeingShown[i].timesShown++;
    }
}
//  Function to build out the table
function buildDisplayTable() {
    displayTable.innerHTML = '';
    var trImages = document.createElement('tr');
    var buttonTR = document.createElement('tr');

    //calculate width of images.
    var screenWidth = window.screen.availWidth;
    var imageWidth = Math.floor(screenWidth / (2 + numItemsToDisplay));
    if (imageWidth > 300) {
        imageWidth = 300;
    }

    for (var i in itemsBeingShown) {
        //  Do the Image Row
        var tdImages = document.createElement('td');
        // switched from td to th to make capturing clicks easier.
        var img = document.createElement("img");
        img.width = imageWidth;
        img.height = imageWidth;
        img.src = itemsBeingShown[i].imgFilepath;
        img.alt = itemsBeingShown[i].itemDescription;
        img.title = itemsBeingShown[i].itemDescription;

        tdImages.appendChild(img);
        trImages.appendChild(tdImages);

        //  Build the Button Row    
        var tdButton = document.createElement('td');
        var newButton = document.createElement('button');
        tdButton.appendChild(newButton)
        newButton.textContent = 'Pick Me!!!';
        var idnum = 1 * i + 1;
        newButton.id = idnum;
        buttonTR.appendChild(tdButton)

    }

    displayTable.appendChild(trImages);
    displayTable.appendChild(buttonTR)
    timesShownIncrement();
}

//  ===========   Event Handler   =============
function buttonWasClicked(event) {


    //Count Vote
    var indexidnum = 1 * event.target.id;
    console.log(indexidnum)

    if (indexidnum > 0) {
        votesMadeThusFar++;
        itemsBeingShown[indexidnum - 1].totalVotesForItem++;

        if (votesMadeThusFar === StopAfterXVotes) {
            // Store data into local storage
            localStorage.setItem('array', JSON.stringify(arrayOfItems));
            endpage();

        }
        else {
            selectNewObjects();
            buildDisplayTable();
        }
    }
    else {
        alert('Click on the buttons you moron.')
    }
}

function initialize() {
    var objectmatrix = [['images/bag.jpg', 'R2Dbag!', 'Starwars Travel Bag'], ['images/banana.jpg', 'Banana Rama Ding Dong', 'Banana Slicer'], ['images/bathroom.jpg', 'You can Twitter, while on the shitter.', 'Poopy Pad'], ['images/breakfast.jpg', 'All in 1, Breakfast Maker', 'Breakfast'], ['images/bubblegum.jpg', "It's less gross than you think!  (Hopefully)", 'Balls.  Meat Balls.'], ['images/chair.jpg', "It's probably not the most uncomfortable chair in the world", "The Most Uncomfortable Chair in the World"], ['images/cthulhu.jpg', "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtan", "R'lyeh wgah'nagl"], ['images/dog-duck.jpg', 'Given how successfull cat-dog was, can you really afford to pass on this', 'The worst sequel idea since Sharknado IV'], ["images/dragon.jpg", 'Tastes like Chicken', 'Canned chicken'], ['images/pen.jpg', 'For a REAL working lunch', 'Food poisoning'], ['images/pet-sweep.jpg', "It's your fur I'm trying to clean up anyways, douchebag!", 'Dog Slippers'], ['images/sweep.png', "It's the only way he'll clean his college dorm", 'child abuse'], ['images/shark.jpg', 'To stay deliciously warm...', 'Jaws'], ['images/tauntaun.jpg', 'How warm is one of these things anyways?', 'Lukewarm'], ['images/unicorn.jpg', "100% genuine", "Secretariat"], ['images/usb.gif', "Back that thing up", 'USB'], ['images/water-can.jpg', '"Maybe I can beat the designer over the head with it?"', "watering can't"], ['images/wine-glass.jpg', "If you can't drink out of this, it's time to stop drinking", 'Red red wine.']]

    for (var i in objectmatrix)
        new SalesItem(objectmatrix[i][0], objectmatrix[i][1], objectmatrix[i][2])

    selectNewObjects();
    buildDisplayTable();
}


function randomizeColor() {
    var options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += options[Math.floor(Math.random() * 16)];
    }
    return color;
}

function onPageLoad() {
    displayTable.addEventListener('click', buttonWasClicked);
    //if local storage data exists
    if (localStorage.array) {
        //recall data 
        arrayOfItems = JSON.parse(localStorage.getItem('array'))

        selectNewObjects();
        buildDisplayTable();
    }

    else {
        initialize();
    }
}


onPageLoad();

//   ================    Endpage

function endpage() {
    //Turn off the Event Listners
    displayTable.removeEventListener('click', buttonWasClicked);

    // =======  Show the results as a chart

    //build out arrays for chart data.
    var xAxisLabels = [];
    var yAxisValues = [];
    var chartBGColor = [];
    var chartBorderColor = [];
    var winningPercentage = [];
    for (var i in arrayOfItems) {
        xAxisLabels[i] = arrayOfItems[i].itemName;
        yAxisValues[i] = arrayOfItems[i].totalVotesForItem;
        chartBGColor[i] = randomizeColor();
        chartBorderColor[i] = randomizeColor();
    }

    var ctx = document.getElementById("saleschart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: xAxisLabels,
            datasets: [{
                label: 'Total Votes Won',
                data: yAxisValues,
                backgroundColor: chartBGColor,
                borderColor: chartBorderColor,
                borderWidth: 5
            }]
        },
        options: {
            responsive: false,
            scales: {
                YAxes: [{
                    ticks: {
                        stepsize: 1.0,
                        tickmarklength: 1.0,
                    }
                }]
            }
        }
    });
}