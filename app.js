//  Constructor Function for each sales item.  Needs to contain image location, image description, total votes, and total views.

//  Function to Randomly Select 3 items, checking to make sure they aren't identical, or in the last set of viewed items

//  function to display results

//  Event listener to determine clicks

//  Event Handler.   Increments votes, if/then to determine if new product or display results









/*   ====================    Requirements from Class  Repo
Do today's work on a branch called busmall-start.


Scaffold your repo with the usual README, CSS, JS, and HTML files, plus a img/ directory.

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