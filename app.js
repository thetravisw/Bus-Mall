'use strict';

//   ====================         Declare Global Variables     ===============================
var numItemsToDisplay = 6;
var arrayOfItems = [];
var votesMadeThusFar = 0;
var itemsBeingShown = [];
var itemsToTestAgainst = [];
var displayTable = document.getElementById('displaytable');
var resultsList = document.getElementById('resultslist');
var StopAfterXVotes = 8;

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

    //calculate width of images.
    var screenWidth=window.screen.availWidth;
    var imageWidth = Math.floor(screenWidth / (2+numItemsToDisplay));
    if (imageWidth > 300){
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

//   ==========    Event Listener Second Try:    ===========
displayTable.addEventListener('click', buttonWasClicked);

function buttonWasClicked(event){
    //create test array to make sure we're seeing clicks on buttons
    var testArray = []
    for(var i=0; i < numItemsToDisplay; i++){
        testArray[i]=i;
    }

    //Count Vote
    var indexidnum = event.target.id;
    
    if(testArray.includes(1*indexidnum)) 
    {
        votesMadeThusFar++;
        itemsBeingShown[indexidnum].totalVotesForItem++;
        

        if(votesMadeThusFar===StopAfterXVotes)
        {
            endpage();
            
        }
        else{
            selectNewObjects();
            buildDisplayTable();
        }
    }
}


//  =============     =============     =============     =============     =============     

function initialize () {
    new SalesItem('images/bag.jpg', 'R2Dbag!', 'Starwars Travel Bag');
    new SalesItem('images/banana.jpg', 'Banana Rama Ding Dong', 'Banana Slicer');
    new SalesItem('images/bathroom.jpg', 'You can Twitter, while on the shitter.', 'Poopy Pad');
    new SalesItem('images/breakfast.jpg', 'All in 1, Breakfast Maker', 'Breakfast');
    new SalesItem('images/bubblegum.jpg', "It's less gross than you think!  (Hopefully)", 'Balls.  Meat Balls.');
    new SalesItem('images/chair.jpg', "It's probably not the most uncomfortable chair in the world", "The Most Uncomfortable Chair in the World");
    new SalesItem('images/cthulhu.jpg', "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtan", "R'lyeh wgah'nagl");
    new SalesItem('images/dog-duck.jpg', 'Given how successfull cat-dog was, can you really afford to pass on this', 'The worst sequel idea since Sharknado IV');
    new SalesItem("images/dragon.jpg", 'Tastes like Chicken', 'Canned chicken');
    new SalesItem('images/pen.jpg', 'For a REAL working lunch', 'Food poisoning' );
    new SalesItem('images/pet-sweep.jpg', "It's your fur I'm trying to clean up anyways, douchebag!", 'Dog Slippers');
    new SalesItem('images/shark.jpg', 'To stay deliciously warm...', 'Jaws');
    new SalesItem('images/sweep.png', "It's the only way he'll clean his college dorm", 'child abuse');
    new SalesItem('images/tauntaun.jpg', 'How warm is one of these things anyways?', 'Lukewarm');
    new SalesItem('images/unicorn.jpg',"100% genuine","Secretariat");
    new SalesItem('images/usb.gif', "Back that thing up", 'USB');
    new SalesItem('images/water-can.jpg','"Maybe I can beat the designer over the head with it?"', "watering can't")
    new SalesItem('images/wine-glass.jpg',"If you can't drink out of this, it's time to stop drinking",'Red red wine.')

    selectNewObjects();
    buildDisplayTable();
}

initialize();

//   ================    Endpage

function endpage(){
    //Turn off the Event Listners
    displayTable.removeEventListener('click', buttonWasClicked);

    // =======  Show the results as a chart
    
    //build out arrays for chart data.
    var xAxisLabels = [];
    var yAxisValues = [];
    var chartBGColor = ['red', 'blue','orange','black','purple','green','yellow','fuscia','cyan','red', 'blue','orange','black','purple','green','yellow','fuscia','cyan'];
    var chartBorderColor = ['red', 'blue','orange','black','purple','green','yellow','fuscia','cyan','red', 'blue','orange','black','purple','green','yellow','fuscia','cyan'];
    for (var i in arrayOfItems){
        xAxisLabels[i] = arrayOfItems[i].itemName;
        yAxisValues[i] = arrayOfItems[i].totalVotesForItem
    }




    var ctx = document.getElementById("saleschart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: xAxisLabels,
            datasets: [{
                label: '# of Votes',
                data: yAxisValues,
                backgroundColor: chartBGColor,
                borderColor: chartBorderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

}