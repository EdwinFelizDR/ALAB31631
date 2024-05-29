// ALAB 316.1.1: DOM Manipulation (Part One) 
// Menu data structure 

// data structure to create menu buttons. 
var menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog', href: '#', subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ]
  },
  {
    text: 'orders', href: '#', subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ]
  },
  {
    text: 'account', href: '#', subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ]
  },
];

// Part 1: Getting Started 

// 1.	Select and cache the <main> element in a variable named mainEl. 
const mainEl = document.querySelector('main');

// Get the value of the --main-bg CSS custom property
const mainBgColor = 'var(--main-bg)';

//2. Set the background color of mainEl
mainEl.style.backgroundColor = mainBgColor;

//3. Set the content (h1) using innerHTML
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';

//4. Add the class "flex-ctr" to mainEl
mainEl.classList.add('flex-ctr');


//Part 2: Creating a Menu Bar 
// 1.Select and cache the <nav id="top-menu"> element in a variable named topMenuEl
const topMenuEl = document.getElementById('top-menu');

//2. Set the height of the topMenuE1 element to be 100%.
topMenuEl.style.height = '100%';

//3. Set the background color of topMenuEl 
//to the value stored in the --top-menu-bg CSS custom property
const topMenuBgColor = ('var(--top-menu-bg)').trim();
topMenuEl.style.backgroundColor = topMenuBgColor;

//4. Add the class "flex-around" to topMenuEl
topMenuEl.classList.add('flex-around');

//Part 3: Adding Menu Buttons
/*Iterate over the entire menuLinks array and for each "link" object: 
   1.	Create an <a> element. 
   2.	On the new element, add an href attribute with its value set to the href property of the "link" object. 
   3.	Set the new element's content to the value of the text property of the "link" object. 
   4.	Append the new element to the topMenuEl element. 
*/

//1. Create an <a> element.
// Iterate over the entire menuLinks array
menuLinks.forEach(link => {
  // 1. Create an <a> element
  const aElement = document.createElement('a');

  // 2. Add an href attribute with its value set to the href property of the "link" object
  aElement.setAttribute('href', link.href);

  // 3. Set the new element's content to the value of the text property of the "link" object
  aElement.textContent = link.text;

  // 4. Append the new element to the topMenuEl element
  topMenuEl.appendChild(aElement);

});

//R-ALAB 316.3.1 - DOM Manipulation (Part Two)

//Part 1: Getting Started 


//Part 2: Adding Additional HTML and CSS 
// 1.Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl
const subMenuEl = document.getElementById('sub-menu');

//2. Set the height of the subMenuEl element to be 100%.
subMenuEl.style.height = '100%';

//3. Set the background color of subMenuEl  
//to the value stored in the --sub-menu-bg  CSS custom property
const subMenuBgColor = ('var(--sub-menu-bg )').trim();
subMenuEl.style.backgroundColor = subMenuBgColor;

//4. Add the class "flex-around" to topMenuEl
subMenuEl.classList.add('flex-around');

// 1.	Set the CSS position property of subMenuEl to the value of absolute. 
subMenuEl.style.position = 'absolute';
// 2.	Set the CSS top property of subMenuEl to the value of 0. 
subMenuEl.style.top = '0';

// Part 4: Adding Menu Interaction 
// 1.	Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks. 
const topMenuLinks = document.getElementById('top-menu').children;

// 2. Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener('click', (event) => {

  // The first line of code of the event listener function should call the event object's preventDefault() method.
  //The preventDefault() method allows you to cancel this default behavior.
  event.preventDefault();

  //stored what link was clicked on the top menu
  const clickedLink = event.target;

  // The second line of code of the function should immediately return if the element clicked was not an <a> element.
  if (clickedLink.tagName !== 'A') return;

  // Log the content of the <a> to verify the handler is working.
  console.log(`Clicked: ${clickedLink.textContent}`);

  //The event listener should add the active class to the <a> element that was clicked, 
  //unless it was already active, in which case it should remove it. 
  // Toggle the 'active' class for the clicked link
  //The toggle() method in JavaScript is like an on/off switch for classes on elements. 
  clickedLink.classList.toggle('active');

  // Remove the 'active' class from other <a> elements
  const allLinks = topMenuEl.querySelectorAll('a');
  allLinks.forEach((link) => {
    if (link !== clickedLink) {
      link.classList.remove('active');

      //shows the submenu bar, and that clicking them again hides it
      subMenuEl.style.top = '0';
    }
  });


  //Part 5: Adding Submenu Interaction 
  //check if clicked link is active
  if (clickedLink.classList.contains('active')) {
  
    //grab the text from the textcontent property in constant clickedLink
    const linkText = clickedLink.textContent.toLowerCase();
    
    //check if the text on the clickedlink is on the menulinks, should return the element.
    //this line of code searches through the menuLinks array and finds the first menu item object 
    //whose text property (in lowercase) matches the lowercase version of the text content of the clicked top menu item. 
    // The found object (or undefined if not found) is stored in the linkData variable.
    const linkData = menuLinks.find(link => link.text.toLowerCase() === linkText);

    //if the linkdata is an object and the menulinks had the sublinks array
    if (linkData && linkData.subLinks) {

      // Clear existing submenu links
      subMenuEl.innerHTML = '';

      //Populate submenu links with the active link on the topmenu
      linkData.subLinks.forEach(subLink => {
        //set the top property of the submenu to 100
        subMenuEl.style.top = '100%';  
        
        //constant to hold the creation on an 'a' element
        const submenuElement = document.createElement('a');

        //Setting the href attribute to 'href' property on the menulink.sublink array.
        submenuElement.setAttribute('href', subLink.href);

        //Setting the text on the submenuElement to the value in menulink.sublink.text.
        submenuElement.textContent = subLink.text;

        //inserting the created submenuElement into the submenu nav bar
        subMenuEl.appendChild(submenuElement);
      });
    }
    //if not sublinks were found on the array remove everthing from the submenu
    else {
      subMenuEl.innerHTML = ''
      subMenuEl.style.top = '0';  
    };
  }
});

