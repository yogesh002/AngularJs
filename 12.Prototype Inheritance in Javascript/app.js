/**
 * @author Yogesh Ghimire 
 */
(function () {
    'use strict';
    var professor = {
            name: "Bill Gates"
            , detail: {
                class: "Microsoft 101"
            }
        }
        //Creating an instance of professor.Since, we created instance, it inherits from parent professor, so properties and methods remain same
    var newProfessor = Object.create(professor);
    console.log("Original Professor", "Name: ", professor.name, " class: ", professor.detail.class); //same as original professor
    console.log("New Professor", "Name: ", newProfessor.name, " class: ", newProfessor.detail.class); //same as original professor
    //Here we are masking the field - 'name' from parent object 
    newProfessor.name = "Steve Jobs";
    //Since, 'detail' itself is an object inside parent, and to access it child object has to climb up the prototype chain. So, any modification to the field of 'detail' object changes the parent's 'detail' field. Unlike 'name' field which masks as it does not require to climb up the prototype chain, change of properties inside 'detail' object requires climbing up the prototype chain. Thus, change done by child gets reflected in child too.
    newProfessor.detail.class = "Apple 101";
    console.log("Original Professor", "Name: ", professor.name, " class: ", professor.detail.class); //here parent's original property is changed by child. So, 'class' property displays 'Apple 101' instead of 'Microsoft 101'. However, name property does not change as it was only masked by the child object as it did not climb up the prototype chain
    console.log("New Professor", "Name: ", newProfessor.name, " class: ", newProfessor.detail.class); //This is child object so, it displays Apple 101
})();