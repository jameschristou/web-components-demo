## Web Component Presentation
A project I created in order to do a basic presentation to my work colleagues on web components

## Demos
Webpack dev server is configured to load index.js (which includes all the web components and styling) on each html page below.

### 1. HTML Templates
`index.html`: HTML Templates to render list of items
* Loops through a list of programming languages and using a HTML template to render each one
* Uses querySelector to update appropriate element

### 2. Basic use of Custom Element
`index2.html`: Creates a HelloWorld custom element
* We use HTML Template and then clone the template using `template.content.cloneNode(true)` which creates a deep clone of the DOM tree.
* Demonstrate how to perform property/attribute reflection using `name`.
* Try updating the name attribute inline. The innerHTML doesn't update. Show how to fix this by performing the update in the setter method.

### 3. Advanced use of Custom Element
`index3.html`: Creates a super textbox with accept and cancel buttons.
* `this` references the custom element itself and gives you access to its children
* Show how disabled attribute works and how we use the setter to disable the inner text input element
* Show how we add event handlers in the custom element constructor
* Show that adding another copy of the element does not interfere with event handling

### 4. Basic use of Shadow DOM
`index4.html`: Creates a HelloWorld custom element using Shadow DOM

### 5. Composition of Custom Elements
`index5.html`: Showcases how basic composition can work

### 6. Advanced use of Shadow DOM
`index6.html`: Creates a fancy textbox using Shadow DOM.

## Development
Run `npm install` to install all packages and depenedencies.

### Dev
To run dev server with HMR while developing use `npm run start`. This will run the project on http://localhost:8080 by default.