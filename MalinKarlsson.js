// Get the register form element
const registerFormData = document.getElementById("registerUserForm")

// Add event listener to handle form submission
registerFormData.addEventListener('submit', (e) => {
    // Prevent the form from submitting and opening the URL
    e.preventDefault()

    // Function to get input values by ID
    const getInputValue = (id) => document.getElementById(id).value

    // Get input values using the function
    const firstName = getInputValue("firstName")
    const lastName = getInputValue("lastName")
    const phoneNumber = getInputValue("phoneNumber")
    const email = getInputValue("email")

    // Clear any existing error messages
    document.getElementById("error").innerHTML = ""

    // Create an object with the input values
    const objectToPass = {
        firstName,
        lastName,
        phoneNumber,
        email
    }

    // Set the form type and pass it to the validation function
    const formType = "registerUserForm";
    useRegexValidation(formType, objectToPass)
});




// Add event listener to handle form click
document.getElementById("saveQuiz").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form from submitting/opening the URL
   
})


function preValidateForm() {
    // the existing validation code...

    // Additional logic to concatenate values from specific input fields
    let concatenatedValues = "";

    // Loop through input fields with ids like "moreAnswerOptions2a", "moreAnswerOptions2b", etc.
    for (let i = 1; i <= countAnswerLabels2(); i++) {
        ['a', 'b', 'c'].forEach(function (char) {
            const inputId = "moreAnswerOptions" + i + char;
            const inputElement = document.getElementById(inputId);

            if (inputElement) {
                concatenatedValues += `Question ${i} - ${inputElement.value}\n`;
            }
        });
    }

    // Use the concatenatedValues string as needed in the validation logic
    console.log(concatenatedValues);
}

function validateQandAs() {

    preValidateForm()

	// Create an object to store questions and answers
	const QandAsToPass = {}
	const qs = []
	const ans = []
  
	// Get the userQuizForm element
	const userQuizForm = document.getElementById("userQuizForm")
  
	// Count the number of answer labels
	let counted = countAnswerLabels2();
        
	for (let i = 1; i < counted +1; i++) {
			// Push question and answer values to arrays
			qs.push(document.getElementById("YourQuestion"+i).innerHTML)
			ans.push(document.getElementById("YourAnswer"+i).innerHTML)
            
            // Loop through the answer labels
    }
  

        
	//create arrays from the inputs
	function createObject(keys, values) {
			const obj = Object.fromEntries(
			keys.map((key, index) => [key, values[index]]),
           
		);

		return obj
	}
	
	//create object from the array
	const result = createObject(qs, ans)

	let formtype = "userQuizForm"

    
	useRegexValidation2(formtype, result)	 
}




// Function to validate data from the user registerUserForm
function useRegexValidation(formtype, objectToPass) {
	
	// Regular expressions for validation
	// Numeric only
	let regex1 = /^\d+$/  
	//Special characters or numbers
	let regex2 =/\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\>|\/|\""|\;|\:|[0-9]/g
	// Email format
	let regex3 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g  
  
	var i = 0;
	var formLength = Object.keys(objectToPass).length
  
	// loop throught the object with submitted data
	for (const key in objectToPass) {
		//create a variable
	  	let toTest = objectToPass[key]
  
	  	// Validate against regex and display appropriate error messages
	  	if (key !== 'phoneNumber' && key !== 'email' && toTest.match(regex2)) {
			document.getElementById("error").style.display = "block"
			document.getElementById("error").innerHTML = 'You entered "' + toTest + '" in a field where no special characters or numbers are allowed';
	  	} else if (key === 'phoneNumber' && !toTest.match(regex1)) {
			document.getElementById("error").style.display = "block"
			document.getElementById("error").innerHTML = 'You entered "' + toTest + '" in a field where only numbers are allowed';
	  	} else if (key === 'email' && !toTest.match(regex3)) {
			document.getElementById("error").style.display = "block"
			document.getElementById("error").innerHTML = '" ' + toTest + '" is not a valid email'
	  	} else {
			i = ++i;
	  	}
  
	  // When the loop is complete
	  if (i === formLength) {
		// Hide error box
		document.getElementById("error").style.display = "none"
		
		// Call the function to store the data locally
		storeDataLocally(formtype, objectToPass);
		document.getElementById("userQuizFormP").innerHTML = ""
  
		// Empty the input fields
		firstName.value = ""
		lastName.value = ""
		phoneNumber.value = ""
		email.value = ""
  
		// Hide the register form and show the next form (the Scandi Quiz)
		document.getElementById("registerUserForm").style.display = "none"
		document.getElementById("form_div1").style.display = "none"
		document.getElementById("form_div2").style.display = "block"
		document.getElementById("scandiQuizForm").style.display = "block"
	  }
	}
  }





// Create an object for the scandiQuiz
var scandiQuizFormData = new Object();

// Fill it with the ScandiQuiz submitted data
scandiQuizFormData = document.getElementById("scandiQuizForm");

// Event listener to trigger when the submit button is pressed
scandiQuizFormData.addEventListener('submit', (e) => {
    // Prevent form (action) tag from submitting/reloading page
    e.preventDefault()

    // Count how many Q and A's this test has
    let counted = countAnswerLabels()

    // Make sure there is no text in the span for error messages
    document.getElementById("error").innerHTML = ""
    document.getElementById("error").style.display = "none"

    // Loop through the Q and A's
    for (let i = 1; i < counted; i++) {
        let checkbox2 = "";


        if (i === 2) {
            
			if(document.getElementById("sqAnswer2a").checked){
				//checkbox2 = checkbox2 + document.getElementById('sqAnswer2a').value
				checkbox2 = checkbox2 + document.getElementById('sqAnswer2a').value + ' '
				
			 } 
		 	if(document.getElementById("sqAnswer2b").checked){
				//checkbox2 = checkbox2 + document.getElementById('sqAnswer2b').value
				checkbox2 = checkbox2 + document.getElementById('sqAnswer2b').value
			

			} 
			if(document.getElementById("sqAnswer2c").checked){
				//checkbox2 = checkbox2 + document.getElementById('sqAnswer2c').value
				checkbox2 = checkbox2 + document.getElementById('sqAnswer2c').value
			
			}  
			if(document.getElementById("sqAnswer2d").checked){
				//checkbox2 = checkbox2 + document.getElementById('sqAnswer2d').value
				checkbox2 = checkbox2 + document.getElementById('sqAnswer2d').value
			
			} 

			document.getElementById("sqAnswer2").setAttribute("value", checkbox2)
			checkbox2 = checkbox2.trim()
		
		
			if(checkbox2 =="") {
				document.getElementById("error").style.display = "block"
				document.getElementById("error").innerHTML = 'You must check at least one of the checkboxes.'
			} 

        } else if (i === 4) {
            // Set the value attribute of the hidden input for question 4
            
			document.getElementById("sqAnswer4").setAttribute("value", document.getElementById("sqAnswer4select").value)


        } else if (i !== 2 || i !== 4) {
            // Move the submitted text from the div to the value attribute of the hidden input tag
            
            
		  	document.getElementById("sqAnswer"+1).setAttribute("value", document.getElementById("sqQuestion_" + 1).innerHTML)
		  	document.getElementById("sqAnswer"+3).setAttribute("value", document.getElementById("sqQuestion_" + 3).innerHTML)
		  	document.getElementById("sqAnswer"+5).setAttribute("value", document.getElementById("sqQuestion_" + 5).innerHTML)

			//Check that the input field is not empty
			let f = document.getElementById("sqQuestion_"+ i).innerHTML
			f = f.trim()

			if (f == "") {
			    //Show error message
			    document.getElementById("error").style.display = "block"
			    document.getElementById("error").innerHTML = 'You must enter text in all fields..'
		    } 
			
    	
			
		}
		
    }
			

    // Create two arrays needed for the next step
    const sqs = []
    const sans = []

    // Loop through the Q and A's again, this time push them into the arrays of sqs and sans
    for (let j = 1; j < counted; j++) {
        // Collect data from hidden inputs
        // Push data into arrays
		const collectAll = document.getElementById("sqAnswer"+j)
		let dataText = collectAll.getAttribute("value")
		
		sqs.push(j.toString())
		sans.push(dataText)

    }

    // Create an object from the two arrays
    const result = createObject(sqs, sans);

    // Function to create an object from two arrays
    function createObject(keys, values) {
        const obj = Object.fromEntries(
            keys.map((key, index) => [key, values[index]]),
        );
        return obj
    }

    // Flag the form type
    let formtype = "scandiQuizForm";

    // Move on to the validation
    useRegexValidation2(formtype, result)
})







// Function to validate data using regex
function useRegexValidation2(formtype, result) {
    // Regular expression to match special characters
    let regexQandQs = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\>|\/|\""|\;|\:/g
    var i = 0
    var formLength = Object.keys(result).length

    // Loop through the properties in the result object
    for (let key in result) {
        let toTest = key
        let toTest2 = result[key]
        console.log(key +':'+ result[key])

        // Validate input and display appropriate error messages
        if (toTest == '' || toTest2 == '') {
            showError('You must enter text in all fields.')
        } else if (toTest.match(regexQandQs)) {
            showError('You entered "' + toTest + '" in a field where no special characters are allowed.')
        } else if (toTest2.match(regexQandQs)) {
            showError('You entered "' + toTest2 + '" in a field where no special characters are allowed.')
        } else if (toTest2 == "Select one") {
            showError('You have not selected an option on one of the selectbox questions.')
        } else {
            i = ++i;
        }

        const submittedQuiz = result;

        // When the loop is complete
        if (i === formLength) {
            hideError()
            storeDataLocally(formtype, result)
        }
    }
}

// Function to count the number of answer labels
function countAnswerLabels() {
    const sqAnswerLabels = document.querySelectorAll(".answerLabelClass");
    return sqAnswerLabels.length;
}

// Function to show error messages
function showError(message) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML = message;
}

// Function to hide error messages
function hideError() {
    document.getElementById("error").style.display = "none";
}


function checkScandiQuiz(result) {
    // Define the submitted quiz and the correct answers
    const submittedQuiz = result;
    const rightAnswers = {
        "1": "Sweden",
        "2": "A quality of cosiness. A kind of atmosphere that evokes feelings of contentment and wellbeing.",
        "3": "Danes",
        "4": "Norway",
        "5": "ABBA"
    }

    // Function to convert all strings in an object to uppercase
    function upperStrings(obj) {
        for (let attr in obj) {
            if (typeof obj[attr] === 'string') {
                obj[attr] = obj[attr].toUpperCase();
            } else if (typeof obj[attr] === 'object') {
                upperStrings(obj[attr]);
            }
        }
    }

    // Convert both submittedQuiz and rightAnswers to uppercase
    upperStrings(submittedQuiz);
    upperStrings(rightAnswers);

    // Calculate points by comparing user answers to correct answers
    let points = 0;
    for (let i = 1; i < countAnswerLabels(); i++) {
        // stringify and remove all whitespaces within both user answers and the right answers 
        // before comparing the two
        if (JSON.stringify(submittedQuiz[i].replace(/\s/g, "")) === JSON.stringify(rightAnswers[i]).replace(/\s/g, "")) {
            points += 1;
        }
    }

    // Display the result and user answers
    document.getElementById("points").style.display = "block";
    document.getElementById("points").innerHTML = "<p>Congratulations! You have completed the quiz. You got " +
        points +
        " right answers.</p>";

    document.getElementById("points").innerHTML = document.getElementById("points").innerHTML + '<p>Your answers: ';
    for (const key in submittedQuiz) {
        let snum = key;
        let value = submittedQuiz[key];
        document.getElementById("points").innerHTML = document.getElementById("points").innerHTML + key + ': ' + value + '<br>';
    }

    document.getElementById("points").innerHTML = document.getElementById("points").innerHTML + '</p> <p>Right answers were:';
    for (const key in rightAnswers) {
        let snum = key;
        let value = rightAnswers[key];
        document.getElementById("points").innerHTML = document.getElementById("points").innerHTML + key + ': ' + value + '<br>';
    }

    document.getElementById("points").innerHTML = document.getElementById("points").innerHTML + '</p>';

    // Insert a close button
    const closeButtonX = document.getElementById("points");
    let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>';
    closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert);

    // Reset the form and clear question divs
    for (let i = 1; i < countAnswerLabels() + 1; i++) {
        if (i == 2) {
            document.getElementById('sqAnswer2').setAttribute("value", "");
            document.getElementById("sqAnswer2a").checked = false;
            document.getElementById("sqAnswer2b").checked = false;
            document.getElementById("sqAnswer2c").checked = false;
            document.getElementById("sqAnswer2d").checked = false;
        } else if (i == 4) {
            document.getElementById('sqAnswer4select').value = 'Select one';
            document.getElementById('sqAnswer4').setAttribute("value", "");
        }
        document.getElementById('sqQuestion_' + i).innerHTML = "";
    }
}

function myCloseFunction() {
    // Hide both points and error elements
    document.getElementById("points").style.display = "none";
    document.getElementById("error").style.display = "none";
    document.getElementById("quizes").style.display = "none";

    // Check the registration and quiz status to determine which content to show/hide
    if (isYouserRegged()) {
        if (userHasQuiz('scandiQuisForm')) {
            // User is registered and has filled out the scandi form
            // Show/hide relevant content
            showHideContent("none", "none", "block", "none", "none", "block");
        } else {
            // User is registered but has not filled out the scandi form
            // Show/hide relevant content
            showHideContent("none", "block", "none", "none", "block", "none");
        }
        if (userHasQuiz('userQuizForm')) {
            // User is registered and has filled out and saved quizes
            // Show/hide relevant content
            showHideContent("none", "none", "none", "block", "block", "block");
        } else {
            // User is registered but has not filled out any user forms
            // Show/hide relevant content
            showHideContent("none", "none", "block", "none", "none", "block");
        }

    } else {
        // User is not registered
      //might add something here...
    }
}

// Function to show/hide content based on element IDs
function showHideContent(form1, form2, form3, registerForm, scandiForm, quizForm) {
    document.getElementById("form_div1").style.display = form1
    document.getElementById("form_div2").style.display = form2
    document.getElementById("form_div3").style.display = form3
    document.getElementById("form_div3").style.display = quizForm
    document.getElementById("registerUserForm").style.display = registerForm
    document.getElementById("scandiQuizForm").style.display = scandiForm
    document.getElementById("userQuizForm").style.display = quizForm
}


function storeDataLocally(formtype, result) {
  

    // Process data based on the formtype
    if (formtype === "scandiQuizForm") {
        // Perform additional actions specific to the ScandiQuiz form
        checkScandiQuiz(result);
    }

    // Generate a unique timestamp for userQuizForm submissions
    const timestamp = (formtype === "userQuizForm") ? new Date().getTime() : ""

    // If it's a userQuizForm, append timestamp to formtype
    if (formtype === "userQuizForm") {
        formtype = "userQuizForm" + timestamp;
    }

    // Stringify the object
    const myJSON = JSON.stringify(result)

  
    // Save the string to localStorage
    localStorage.setItem(formtype, myJSON)

    // Alert user that data has been successfully stored
    alert("All data has been successfully submitted!");

    // Update UI based on the saved formtype
    updateUI(formtype)

	showFromStart()
}

// Function to update UI elements based on the saved formtype
function updateUI(formtype) {
    if (formtype === "registerUserForm") {
        // Update UI elements for the registerUserForm
        document.getElementById("savedregisterUserFormAnswers").style.display = "block";
        document.getElementById("deleteregisterUserFormAnswers").style.display = "block";
        document.getElementById("scandiQuizFormP").innerHTML = "";
    } else if (formtype === "scandiQuizForm") {
        // Update UI elements for the ScandiQuizForm
        document.getElementById("savedscandiQuizFormAnswers").style.display = "block";
        document.getElementById("deletescandiQuizFormAnswers").style.display = "block";
    }

    // might add more here....
}




// Function to delete stored user data
function deleteUserStored(formtype) {
    // Check if the user is registered and has content to delete
    if (isYouserRegged() && userHasQuiz(formtype)) {
        // Remove the item from localStorage
        localStorage.removeItem(formtype);
        // Clear the content associated with the formtype
        document.getElementById(formtype + "P").innerHTML = "";
        // Display an alert indicating successful deletion
        alert('Info deleted!');
    }
    // User is registered but doesn't have anything saved
    else if (isYouserRegged()) {
        displayErrorMessage("There is nothing saved.");
    }
    // User is not registered
    else {
        displayErrorMessage("You need to register before you can use this function!");
    }
}

// Function to count the number of answer labels for userQuizForm
function countAnswerLabels2() {
    // Select all answer labels in the userQuizForm and get their length
    let answerLabels = document.querySelectorAll('#userQuizForm .answerLabelClass2').length;
    return answerLabels;
}

// Function to check if a number is even
function isEven(number) {
    // Return true if the number is even, otherwise return false
    return number % 2 === 0;
}

// Function to display an error message and a close button
function displayErrorMessage(message) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML = message;
    const closeButtonX = document.getElementById("error");
    let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>';
    closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert);
}


// Function to add a new question dynamically
function addQuestion() {
    // Arrays for input names
    const inputNameLabel = ["QuestionsNumber"];
    const inputNameLabelAnswer = ["AnswerNumber"];

    // Count the current number of questions
    let j = countAnswerLabels2();
    j += 1;

    // Prevent default form behavior on click
    document.getElementById("userQuizForm").addEventListener("click", function (event) {
        event.preventDefault();
    });

    // Remove any existing checkboxes
    removeExistingCheckboxes();

    var questionDiv = document.createElement("DIV");

    // Create a new question container div
    if (isEven(j)) {
        questionDiv.setAttribute("id", "oddEven_" + j);
        questionDiv.setAttribute("class", "even");
    } else {
        questionDiv.setAttribute("id", "oddEven_" + j);
        questionDiv.setAttribute("class", "odd");
    }

    // Append the question container to the form fieldset
    document.getElementById("userQuizFormFieldset").appendChild(questionDiv);

    // Create label, input, and div elements for the question
    var labelQuestionField = document.createElement("LABEL");
    var QuestionDivField = document.createElement("DIV");
    var inputQuestionField = document.createElement("INPUT");

    // Create label, input, and div elements for the answer
    var labelAnswerField = document.createElement("LABEL");
    var AnswerDivField = document.createElement("DIV");
    var inputAnswerField = document.createElement("INPUT");

    // set attributes
    labelQuestionField.setAttribute("for", "YourQuestion" + j);
    labelAnswerField.setAttribute("for", "YourAnswer" + j);

    labelAnswerField.setAttribute("class", "answerLabelClass2");
    labelQuestionField.setAttribute("class", "questionLabelClass");

    labelQuestionField.setAttribute("id", "Question" + j);
    labelAnswerField.setAttribute("id", "Answer" + j);

    QuestionDivField.setAttribute("id", "YourQuestion" + j);
    QuestionDivField.setAttribute("class", "multilineinput");
    QuestionDivField.setAttribute("contenteditable", "true");

    AnswerDivField.setAttribute("id", "YourAnswer" + j);
    AnswerDivField.setAttribute("class", "multilineinput");
    AnswerDivField.setAttribute("contenteditable", "true");

    inputQuestionField.setAttribute("type", "hidden");
    inputAnswerField.setAttribute("type", "hidden");

    inputQuestionField.setAttribute("id", "Your_Question" + j);
    inputAnswerField.setAttribute("id", "Your_Answer" + j);

    // Append the created elements to the question container div
    document.getElementById("oddEven_" + j).appendChild(labelQuestionField);
    document.getElementById("oddEven_" + j).appendChild(inputQuestionField);
    document.getElementById("oddEven_" + j).appendChild(QuestionDivField);
    document.getElementById("oddEven_" + j).appendChild(labelAnswerField);
    document.getElementById("oddEven_" + j).appendChild(inputAnswerField);
    document.getElementById("oddEven_" + j).appendChild(AnswerDivField);

    // Set labels for the question and answer
    document.getElementById("Question" + j).innerHTML = `Question ${j}`;
    document.getElementById("Answer" + j).innerHTML = `Answer ${j}`;

    addMoreAnswerCheckbox();

    // Add a delete button for the question
    addDeleteButton(j);
}

// Function to remove existing checkboxes
function removeExistingCheckboxes() {
    const existingCheckboxes = document.querySelectorAll('.checkbox_container');
    existingCheckboxes.forEach(function (checkboxContainer) {
        checkboxContainer.remove();
    });
}

/*

// Function to add a new question dynamically
function addQuestion() {
    // Arrays for input names
    const inputNameLabel = ["QuestionsNumber"]
    const inputNameLabelAnswer = ["AnswerNumber"]

    // Count the current number of questions
    let j = countAnswerLabels2();
    j += 1

    // Prevent default form behavior on click
    document.getElementById("userQuizForm").addEventListener("click", function (event) {
        event.preventDefault();
    })

	var questionDiv = document.createElement("DIV")

    // Create a new question container div
	if (isEven(j)) {
		questionDiv.setAttribute("id", "oddEven_" + j)
		questionDiv.setAttribute("class", 'even')
	} else {
		questionDiv.setAttribute("id", "oddEven_" + j)
		questionDiv.setAttribute("class", 'odd')
	}

    // Append the question container to the form fieldset
    document.getElementById("userQuizFormFieldset").appendChild(questionDiv);

    // Create label, input, and div elements for the question
	var labelQuestionField = document.createElement("LABEL")
	var QuestionDivField = document.createElement("DIV")
	var inputQuestionField = document.createElement("INPUT")
	

    // Create label, input, and div elements for the answer
	var labelAnswerField = document.createElement("LABEL")
	var AnswerDivField = document.createElement("DIV")
	var inputAnswerField = document.createElement("INPUT")
   
   


//set attributes
	labelQuestionField.setAttribute("for", "YourQuestion" + j)
	labelAnswerField.setAttribute("for", "YourAnswer" + j)
	
	labelAnswerField.setAttribute("class", "answerLabelClass2")
	labelQuestionField.setAttribute("class", "questionLabelClass")


	labelQuestionField.setAttribute("id", "Question" + j)
	labelAnswerField.setAttribute("id", "Answer" + j)
    

	QuestionDivField.setAttribute("id", "YourQuestion" + j)
	QuestionDivField.setAttribute("class", "multilineinput")
	QuestionDivField.setAttribute("contenteditable", "true")


	AnswerDivField.setAttribute("id", "YourAnswer" + j)
	AnswerDivField.setAttribute("class", "multilineinput")
	AnswerDivField.setAttribute("contenteditable", "true")
	

	inputQuestionField.setAttribute("type", "hidden")
	inputAnswerField.setAttribute("type", "hidden")
    

	inputQuestionField.setAttribute("id", "Your_Question" + j)
	inputAnswerField.setAttribute("id", "Your_Answer" + j)

   

    // Append the created elements to the question container div
	document.getElementById("oddEven_" + j).appendChild(labelQuestionField)
	document.getElementById("oddEven_" + j).appendChild(inputQuestionField)
	document.getElementById("oddEven_" + j).appendChild(QuestionDivField)
	document.getElementById("oddEven_" + j).appendChild(labelAnswerField)
	document.getElementById("oddEven_" + j).appendChild(inputAnswerField)
	document.getElementById("oddEven_" + j).appendChild(AnswerDivField)
   
   
   
   


    // Set labels for the question and answer
    document.getElementById('Question' + j).innerHTML = `Question ${j}`
    document.getElementById('Answer' + j).innerHTML = `Answer ${j}`
   
    addMoreAnswerCheckbox()


    
    // Add a delete button for the question
    addDeleteButton(j);

}

*/
function addMoreAnswerCheckbox() {
    let j = countAnswerLabels2();

    const checkBoxButton = document.getElementById("userQuizForm");

    let htmlToInsert =
        '<div class="checkbox_container" id="checkbox_container'+j+'"><input class="check_box" type="checkbox"  id="moreAnswerOptions' + j + '" value="Add more answer options'+j+'">' +
        '<span>Add more answer options for Question'+j+'</span></div>'

    checkBoxButton.insertAdjacentHTML("afterend", htmlToInsert)

    var moreAnswerOptionsCheckbox = document.getElementById("moreAnswerOptions" + j)

    if (moreAnswerOptionsCheckbox) {
        moreAnswerOptionsCheckbox.addEventListener("change", function () {
            // Check if the checkbox is checked
            if (moreAnswerOptionsCheckbox.checked) {
                //the code to execute when the checkbox is checked

                // Create text input elements
                var moreAnswerOptions1 = createTextInput("moreAnswerOptions" + j + 'a', "Answer option 1")
                var moreAnswerOptions2 = createTextInput("moreAnswerOptions" + j + 'b', "Answer option 2")
                var moreAnswerOptions3 = createTextInput("moreAnswerOptions" + j + 'c', "Answer option 3")

                // Append text input elements to their respective containers
                document.getElementById("YourAnswer" + j).appendChild(moreAnswerOptions1)
                document.getElementById("YourAnswer" + j).appendChild(moreAnswerOptions2)
                document.getElementById("YourAnswer" + j).appendChild(moreAnswerOptions3)

                // Update text for existing checkboxes
                document.getElementById("moreAnswerOptions" + j).nextElementSibling.innerHTML = "Uncheck this box to remove answer options for Q"+j
                

                console.log("Checkbox is checked!");
            } else {
                //The  code to execute when the checkbox is unchecked

                // Remove text input elements
                removeTextInput("moreAnswerOptions" + j + 'a')
                removeTextInput("moreAnswerOptions" + j + 'b')
                removeTextInput("moreAnswerOptions" + j + 'c')

                // Update text for existing checkboxes
                document.getElementById("moreAnswerOptions" + j).nextElementSibling.innerHTML = "Add more answer options"
               // document.getElementById("moreAnswerOptions" + j).removeAttribute("disabled"); // Enable the checkbox

                console.log("Checkbox is unchecked!")
            }
        });
    } else {
        console.error("Element not found!")
    }
}

// Function to remove a text input element by ID
function removeTextInput(id) {
    var element = document.getElementById(id)
    if (element) {
        element.parentNode.removeChild(element)
    }
}


/*----------------------------------
function addMoreAnswerCheckbox() {
    let j = countAnswerLabels2();

    const checkBoxButton = document.getElementById("userQuizForm");

    let htmlToInsert =
        '<div class="checkbox_container"><input class="check_box" type="checkbox" style="display:block;" id="moreAnswerOptions' + j + '" value="Add more answer options">' +
        '<span>Add more answer options</span></div>';

    checkBoxButton.insertAdjacentHTML("afterend", htmlToInsert);

    var moreAnswerOptionsCheckbox = document.getElementById("moreAnswerOptions" + j);

    if (moreAnswerOptionsCheckbox) {
        moreAnswerOptionsCheckbox.addEventListener("change", function () {
            // Check if the checkbox is checked
            if (moreAnswerOptionsCheckbox.checked) {
                // The code to execute when the checkbox is checked

                // Create text input elements
                var moreAnswerOptions1 = createTextInput("moreAnswerOptions" + j + 'a', "Answer option 1");
                var moreAnswerOptions2 = createTextInput("moreAnswerOptions" + j + 'b', "Answer option 2");
                var moreAnswerOptions3 = createTextInput("moreAnswerOptions" + j + 'c', "Answer option 3");

                // Append text input elements to their respective containers
                document.getElementById("YourAnswer"+j).appendChild(moreAnswerOptions1);
                document.getElementById("YourAnswer"+j).appendChild(moreAnswerOptions2);
                document.getElementById("YourAnswer"+j).appendChild(moreAnswerOptions3);

                // Update text for existing checkboxes
                document.getElementById("moreAnswerOptions" + j).nextElementSibling.innerHTML = "Add answer option 1.";
                document.getElementById("moreAnswerOptions" + j).setAttribute("disabled", "true"); // Disable the checkbox
        
                
                console.log("Checkbox is checked!");
            } 
        });
    } else {
        console.error("Element not found!");
    }
}
----------------------------------------
*/

// Function to create a text input element
function createTextInput(id, value) {
    var input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("type", "text");
    input.setAttribute("value", value);
    return input;
}
/*

function addMoreAnswerCheckbox() {

    let j = countAnswerLabels2();


    const checkBoxButton = document.getElementById("userQuizForm")

    let htmlToInsert =


        '<div class="checkbox_container"><input class="check_box" type="checkbox" id="moreAnswerOptions' + j + '" value="Add more answer options">' +
        '<span>Add more answer options</span></div>'

    checkBoxButton.insertAdjacentHTML("afterend", htmlToInsert)



    var moreAnswerOptionsCheckbox = document.getElementById("moreAnswerOptions" + j);

    if (moreAnswerOptionsCheckbox) {
        moreAnswerOptionsCheckbox.addEventListener("change", function () {
            // Check if the checkbox is checked
            if (moreAnswerOptionsCheckbox.checked) {
                // Your code to execute when the checkbox is checked

                var moreAnswerOptions1 = document.createElement("INPUT")
                moreAnswerOptions1.setAttribute("id", "moreAnswerOptions" + j+'a')
                moreAnswerOptions1.setAttribute("type", "text")
                moreAnswerOptions1.setAttribute("value", "Answer option 1")

                var moreAnswerOptions2 = document.createElement("INPUT")
                moreAnswerOptions2.setAttribute("id", "moreAnswerOptions" + j+'b')
                moreAnswerOptions2.setAttribute("type", "text")
                moreAnswerOptions2.setAttribute("value", "Answer option2")



                var moreAnswerOptions3 = document.createElement("INPUT")
                moreAnswerOptions3.setAttribute("id", "moreAnswerOptions" + j+'c')
                moreAnswerOptions3.setAttribute("type", "text")
                moreAnswerOptions3.setAttribute("value", "Answer option 3")


                document.getElementById("YourAnswer1").appendChild(moreAnswerOptions1)
                document.getElementById("YourAnswer2").appendChild(moreAnswerOptions2)
                document.getElementById("YourAnswer3").appendChild(moreAnswerOptions3)

                document.getElementById("moreAnswerOptions1".innerHTML = "Add answer option 1")
                document.getElementById("moreAnswerOptions2".innerHTML = "Add answer option 2")
                document.getElementById("moreAnswerOptions3".innerHTML = "Add answer option 3")

                console.log("Checkbox is checked!");
            } else {
                // Your code to execute when the checkbox is unchecked
                console.log("Checkbox is unchecked!");
            }
        })
    } else {
        console.error("Element not found!");
    }

}

*/

// Function to add a delete button for a question
function addDeleteButton(j) {

	const AddRandbuttonX = document.getElementById("YourAnswer" + j)

	let htmlToInsert = ' <div class="button_distance"><button style="display=block" onclick="deleteQuestion(' + j + ')" id="YourButton' + j + '" data-value="' + j + '">Delete question ' + j + ' </button></div>'
	AddRandbuttonX.insertAdjacentHTML("afterend", htmlToInsert)


}








function pickRandom(ObjectFromFile) {

	//Generate a random number/questions from 45
	const numbers = Array(45).fill().map((_, index) => index + 1)
	numbers.sort(() => Math.random() - 0.5)
	const QuestionsToPick = (numbers.slice(0, 1))





	//Indexing the keys in the object of questions and answerrs from file
	const objectKeys = Object.keys(ObjectFromFile);

	//Find the corresponding question and answer
	//looping thorough the array of random questions
	for (let k = 0; k < QuestionsToPick.length; k++) {

		//Finding they index for the answer 
		let FindAnswers = QuestionsToPick[k] - 1

		if (FindAnswers !== 'undefined') {
			var theAnswer = ObjectFromFile[objectKeys[FindAnswers]]

			//Getting the answer with the right index from the object





			//looping throught the object to get the questions
			let m = 0
			for (const key in ObjectFromFile) {
				m += 1


				//Finding the right question(key)
				if (m == QuestionsToPick[k]) {


					//RandQuestions = RandQuestions + QuestionsToPick[k] + ' ' + key
					var theQuestion = key


				}



			}
		}
	}

	randQuestion(theQuestion, theAnswer)
}





function addMoreAnswerOptions() {
    // Get the checkbox element
    var moreAnswerOptionsCheckbox = document.getElementById("moreAnswerOptions");
  
    // Check if the checkbox is checked
    if (moreAnswerOptionsCheckbox.checked) {
        console.log('hejva')
      // Create input fields and checkboxes
      for (let i = 0; i < 3; i++) {
        // Create input field
        var inputAnswerField = document.createElement("INPUT");
        inputAnswerField.setAttribute("type", "text");
        inputAnswerField.setAttribute("id", "Your_Answer_" + String.fromCharCode(97 + i)); // "a", "b", "c"
  
/*
        var moreAnswerOptions = document.createElement("INPUT")
var Your_Answer_a = document.createElement("INPUT")
var Your_Answer_b = document.createElement("INPUT")
var Your_Answer_c = document.createElement("INPUT")

moreAnswerOptions.setAttribute("id", "moreAnswerOptions" + j)
moreAnswerOptions.setAttribute("type", "checkbox")
moreAnswerOptions.setAttribute("value", "Add more options for the answer")

Your_Answer_a.setAttribute("id", " Your_Answer_c")
Your_Answer_b.setAttribute("id", " Your_Answer_c")
Your_Answer_c.setAttribute("id", " Your_Answer_c")

Your_Answer_a.setAttribute("type", "text")
Your_Answer_b.setAttribute("type", "text")
Your_Answer_c.setAttribute("type", "text")

moreAnswerOptions.setAttribute("id", "moreAnswerOptions" + j)
moreAnswerOptions.setAttribute("type", "checkbox")
moreAnswerOptions.setAttribute("value", "Add more options for the answer")

Your_Answer_a.setAttribute("id", " Your_Answer_c")
Your_Answer_b.setAttribute("id", " Your_Answer_c")
Your_Answer_c.setAttribute("id", " Your_Answer_c")

Your_Answer_a.setAttribute("type", "text")
Your_Answer_b.setAttribute("type", "text")
Your_Answer_c.setAttribute("type", "text")

document.getElementById("oddEven_" + j).appendChild(moreAnswerOptions)
document.getElementById("oddEven_" + j).appendChild(Your_Answer_a)
document.getElementById("oddEven_" + j).appendChild(Your_Answer_b)
document.getElementById("oddEven_" + j).appendChild(Your_Answer_c)
*/

        // Create corresponding checkbox
        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "Check_" + String.fromCharCode(97 + i)); // "Check_a", "Check_b", "Check_c"
  
        // Append elements to the div in the form
        document.getElementById('div').appendChild(inputAnswerField);
        document.getElementById('oddEven_1').appendChild(checkbox);

        console.log('case1')
      }
    } else {
      // If checkbox is unchecked, remove the added elements
      for (let i = 0; i < 3; i++) {
        var answerFieldToRemove = document.getElementById("Your_Answer_" + String.fromCharCode(97 + i));
        var checkboxToRemove = document.getElementById("Check_" + String.fromCharCode(97 + i));
  
        // Check if the elements exist before attempting to remove
        if (answerFieldToRemove) {
          answerFieldToRemove.parentNode.removeChild(answerFieldToRemove);
        }
  
        if (checkboxToRemove) {
          checkboxToRemove.parentNode.removeChild(checkboxToRemove);
        }
      }
    }
  }


//function to read what is stored
function randQuestion(theQuestion, theAnswer) {


    removeMoreAnswerCheckbox();


	const inputRandNameLabel = ["QuestionsRandNumber"]
	const inputRandNameLabelAnswer = ["AnswerRandNumber"]


	let n = countAnswerLabels2()

	n += 1



	document.getElementById("randQuestionGenerator").addEventListener("click", function (event) {
		event.preventDefault()
	})



	var questionDiv = document.createElement("div")

	if (isEven(n)) {
		questionDiv.setAttribute("id", "oddEven_" + n)
		questionDiv.setAttribute("class", 'even')
	} else {
		questionDiv.setAttribute("id", "oddEven_" + n)
		questionDiv.setAttribute("class", 'odd')
	}


	document.getElementById("userQuizFormFieldset").appendChild(questionDiv)





	//inputRandNameLabel.push("Question" + n)
	//inputRandNameLabelAnswer.push("Answer" + n)

	var labelRandQuestionField = document.createElement("LABEL")
	var RandQuestionDivField = document.createElement("DIV")
	var inputRandQuestionField = document.createElement("INPUT")

	var labelRandAnswerField = document.createElement("LABEL")
	var RandAnswerDivField = document.createElement("DIV")
	var inputRandAnswerField = document.createElement("INPUT")

	let labelValueRandQuestion = 'Question ' + n
	let labelValueRandAnswer = 'Answer ' + n



	//let labelValueRandQuestion = inputRandNameLabel[n].substr(0, 8) + ' ' + inputRandNameLabel[n].substr(8);
	//let labelValueRandAnswer = inputRandNameLabelAnswer[n].substr(0, 6) + ' ' + inputRandNameLabel[n].substr(8);


	labelRandQuestionField.setAttribute("for", 'YourQuestion' + n)
	labelRandAnswerField.setAttribute("for", 'YourAnswer' + n)
	labelRandAnswerField.setAttribute("class", 'answerLabelClass2')
	labelRandQuestionField.setAttribute("class", 'questionLabelClass')

	labelRandQuestionField.setAttribute("id", 'Question' + n)
	labelRandAnswerField.setAttribute("id", 'Answer_' + n)

	//labelRandQuestionField.value = 'YourQuestion' + n
	//labelRandAnswerField = 'YourAnswer' + n

	inputRandQuestionField.setAttribute("type", "hidden")
	inputRandAnswerField.setAttribute("type", "hidden")

	inputRandQuestionField.setAttribute("id", "Your_Question" + n)
	inputRandAnswerField.setAttribute("id", "Your_Answer" + n)

	RandQuestionDivField.setAttribute("id", "YourQuestion" + n)
	RandQuestionDivField.setAttribute("class", "multilineinput")
	RandQuestionDivField.setAttribute("contenteditable", "true")


	inputRandQuestionField.setAttribute("value", theQuestion)
	inputRandAnswerField.setAttribute("value", theAnswer)

	RandAnswerDivField.setAttribute("id", "YourAnswer" + n)
	RandAnswerDivField.setAttribute("class", "multilineinput")
	RandAnswerDivField.setAttribute("contenteditable", "true")


	document.getElementById("userQuizFormFieldset").appendChild(labelRandQuestionField)

	document.getElementById("userQuizFormFieldset").appendChild(inputRandQuestionField)

	document.getElementById("userQuizFormFieldset").appendChild(labelRandAnswerField)
	document.getElementById("userQuizFormFieldset").appendChild(inputRandAnswerField)

	document.getElementById("oddEven_" + n).appendChild(labelRandQuestionField)
	document.getElementById("oddEven_" + n).appendChild(inputRandQuestionField)
	document.getElementById("oddEven_" + n).appendChild(RandQuestionDivField)
	document.getElementById("oddEven_" + n).appendChild(labelRandAnswerField)
	document.getElementById("oddEven_" + n).appendChild(inputRandAnswerField)
	document.getElementById("oddEven_" + n).appendChild(RandAnswerDivField)


	document.getElementById('Question' + n).innerHTML = 'Question ' + n
	document.getElementById('Answer_' + n).innerHTML = 'Answer ' + n

	document.getElementById("YourQuestion" + n).innerHTML = theQuestion
	document.getElementById("YourAnswer" + n).innerHTML = theAnswer


	let labelElement = document.getElementById(inputRandNameLabel[n]);
	let labelElement2 = document.getElementById(inputRandNameLabelAnswer[n]);



	addDeleteButton(n)
}

// Function to remove the "more answer options" checkbox and its container
function removeMoreAnswerCheckbox() {
    const existingCheckboxes = document.querySelectorAll('.checkbox_container')
    existingCheckboxes.forEach(function (checkboxContainer) {
        checkboxContainer.remove()
    })
}

/*
// Function to delete a question and reorganize the remaining questions and answers
function deleteQuestion(val) {
    // Get the total number of questions before deleting anything 
    let totalQuestions = countAnswerLabels2();

    // Add an event listener to prevent page reload when the button is pressed
    document.getElementById("userQuizForm").addEventListener("click", function (event) {
        // Do not reload the page when the button is pressed
        event.preventDefault();
    });

    // Loop through all the pairs of questions and answers
    for (let i = 1; i <= totalQuestions; i++) {
        // Single out the ones that will come after the deleted question and therefore need new id/class
        // 'val' is the number in the id of the button pressed
        if (i > val) {
            // Get the input value from the text fields
            // Move them one step up in the pair of Q&A
            let valToMoveQ = document.getElementById("YourQuestion" + i).innerHTML;
            let valToMoveA = document.getElementById("YourAnswer" + i).innerHTML;

            // Update the text and values for the previous pair
            document.getElementById("YourQuestion" + (i - 1)).innerHTML = valToMoveQ;
            document.getElementById("Your_Question" + (i - 1)).value = valToMoveQ;
            document.getElementById("YourAnswer" + (i - 1)).innerHTML = valToMoveA;
            document.getElementById("Your_Answer" + (i - 1)).value = valToMoveA;
        }
    }

    // Delete all elements with the highest id number in the pairs of Q & A
    const element = document.getElementById('Question' + totalQuestions);
    const element2 = document.getElementById('YourQuestion' + totalQuestions);
    const element3 = document.getElementById('Answer' + totalQuestions);
    const element4 = document.getElementById('YourAnswer' + totalQuestions);
    const element5 = document.getElementById('YourButton' + totalQuestions);
    const element6 = document.getElementById('oddEven_' + totalQuestions);

    // But only if there is actually something to remove
    if (element != null) {
        element.remove();
    }
    if (element2 != null) {
        element2.remove();
    }
    if (element3 != null) {
        element3.remove();
    }
    if (element4 != null) {
        element4.remove();
    }
    if (element5 != null) {
        element5.remove();
    }
    if (element6 != null) {
        element6.remove();
    }

    // Update the total number of questions
    totalQuestions -= 1;
}*/

// Function to delete a question and reorganize the remaining questions and answers
function deleteQuestion(val) {
    // Get the total number of questions before deleting anything 
    let totalQuestions = countAnswerLabels2();

    // Add an event listener to prevent page reload when the button is pressed
    document.getElementById("userQuizForm").addEventListener("click", function (event) {
        // Do not reload the page when the button is pressed
        event.preventDefault();
    });

    // Loop through all the pairs of questions and answers
    for (let i = 1; i <= totalQuestions; i++) {
        // Single out the ones that will come after the deleted question and therefore need new id/class
        // 'val' is the number in the id of the button pressed
        if (i > val) {
            // Get the input value from the text fields
            // Move them one step up in the pair of Q&A
            let valToMoveQ = document.getElementById("YourQuestion" + i).innerHTML;
            let valToMoveA = document.getElementById("YourAnswer" + i).innerHTML;
            let valToMoveC = document.getElementById("YourAnswer" + i).innerHTML;

            // Update the text and values for the previous pair
            document.getElementById("YourQuestion" + (i - 1)).innerHTML = valToMoveQ;
            document.getElementById("Your_Question" + (i - 1)).value = valToMoveQ;
            document.getElementById("YourAnswer" + (i - 1)).innerHTML = valToMoveA;
            document.getElementById("Your_Answer" + (i - 1)).value = valToMoveA;
        }
    }

    // Delete all elements with the highest id number in the pairs of Q & A
    const element = document.getElementById('Question' + totalQuestions);
    const element2 = document.getElementById('YourQuestion' + totalQuestions);
    const element3 = document.getElementById('Answer' + totalQuestions);
    const element4 = document.getElementById('YourAnswer' + totalQuestions);
    const element5 = document.getElementById('YourButton' + totalQuestions);
    const element6 = document.getElementById('oddEven_' + totalQuestions);
    const element7 = document.getElementById('checkbox_container'+val)

    // But only if there is actually something to remove
    if (element != null) {
        element.remove()
    }
    if (element2 != null) {
        element2.remove()
    }
    if (element3 != null) {
        element3.remove()
    }
    if (element4 != null) {
        element4.remove()
    }
    if (element5 != null) {
        element5.remove()
    }
    if (element6 != null) {
        element6.remove() 
    }
    if (element7 != null) {
        element7.remove()
    }


    // Remove the "more answer options" checkbox
    const moreAnswerOptionsCheckbox = document.getElementById("moreAnswerOptions" + totalQuestions);
    if (moreAnswerOptionsCheckbox) {
        moreAnswerOptionsCheckbox.remove();
    }

    // Update the total number of questions
    totalQuestions -= 1;
}

function isYouserRegged(){
	if(!localStorage.getItem('registerUserForm')){
		
		return false
	}else{
	
		return true
	}
}


function userHasQuiz(formtype){
	if(!localStorage.getItem(formtype)){
		
		
		return false
	}else{
	
		return true
	}
}

// Function to read and display stored values
function showStoredValue(formtype) {
    // Check if the user is registered
    


    if (isYouserRegged()) {
        // Parse the stored object from localStorage
        const storedObject = JSON.parse(localStorage.getItem(formtype));

        let stringToShow = ""

        // Check if there is anything stored
        for (const key in storedObject) {
            // Concatenate key-value pairs to form the string to display
            stringToShow = stringToShow + key + ': ' + storedObject[key] + '<br>'
            document.getElementById(formtype + 'P').innerHTML = stringToShow;
        }

        // If there is nothing stored to show
        if (stringToShow === "") {
            document.getElementById("error").style.display = "block"
            document.getElementById("error").innerHTML = "There is nothing saved."
            const closeButtonX = document.getElementById("error")
            let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>';
            closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert)
        }
    } else {
        // Display an error message if the user is not registered
        document.getElementById("error").style.display = "block"
        document.getElementById("error").innerHTML = "You need to register before you can use this function!"
        const closeButtonX = document.getElementById("error")
        let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>'
        closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert)
    }
}

function listUserQuizFormNames() {
    const userQuizFormNames = Object.keys(localStorage)
      .filter(key => key.startsWith('userQuizForm'))
  
    if (userQuizFormNames.length === 0) {
      // Display error message
      const errorContainer = document.getElementById("error")
      errorContainer.style.display = "block"
      errorContainer.innerHTML = "There is nothing saved."
      const closeButtonX = document.getElementById("error")
      let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>'
      closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert)
    }
  
    const ul = document.createElement('ul')
    userQuizFormNames.forEach(name => {
      const li = document.createElement('li')
      const link = document.createElement('a')
      link.textContent = name
      // Set a dummy href
      link.href = '#'
      link.addEventListener('click', () => {
        // Display the corresponding object in the span with id 'quizes'
        const quizesContainer = document.getElementById('quizes')
        quizesContainer.style.display = 'block'
  
        const objectString = localStorage.getItem(name);
        const parsedObject = JSON.parse(objectString);
  
        // Create a string representation with line breaks and numbering, replace ':' with '<br>'
        let formattedString = '';
        Object.entries(parsedObject).forEach(([key, value], index) => {
          formattedString += `Q${index + 1}. ${key.replace(/:/g,'<br>')} <br>A: ${value}<br><br>`
        });
  
        quizesContainer.innerHTML = formattedString;
  
        const closeButtonX = document.getElementById("quizes");
        let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>';
        closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert);
      });
  
      li.appendChild(link);
      ul.appendChild(li);
    });
  
    // Append the ul to the existing div with id 'userQuizFormP'
    const userQuizFormPContainer = document.getElementById('userQuizFormP');
    // Clear previous content
    userQuizFormPContainer.innerHTML = '';
    userQuizFormPContainer.appendChild(ul);
  }

  function clearUserQuizForms() {
    const userQuizFormNames = Object.keys(localStorage)
      .filter(key => key.startsWith('userQuizForm'))
  
    if (userQuizFormNames.length === 0) {
      // Display error message
      const errorContainer = document.getElementById("error")
      errorContainer.style.display = "block";
      errorContainer.innerHTML = "There is nothing saved."
  
      // Add close button to the error message
      let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>'
      errorContainer.insertAdjacentHTML("beforeend", htmlToInsert)
  
      return;
    }
  
    // Remove localStorage items
    userQuizFormNames.forEach(key => {
      localStorage.removeItem(key)
    });
  
    // Remove the associated ul list
    const userQuizFormPContainer = document.getElementById('userQuizFormP')
    // Clear the content of the container
    userQuizFormPContainer.innerHTML = ''
  }
  


// Function to read and display stored values
function showStoredQuestions(formtype) {
    // Check if the user is registered
 
    const userQuizFormsList = listUserQuizFormNames();
    console.log(userQuizFormsList);
   

    if (isYouserRegged()) {
        // Parse the stored object from localStorage
        const storedObject = JSON.parse(localStorage.getItem(formtype));

        let stringToShow = "";

        // Check if there is anything stored
        for (const key in storedObject) {
            // Concatenate key-value pairs to form the string to display
            stringToShow = stringToShow + key + ': ' + storedObject[key] + '<br>';
            document.getElementById(formtype + 'P').innerHTML = stringToShow;
        }

        // If there is nothing stored to show
        if (stringToShow === "") {
            document.getElementById("error").style.display = "block";
            document.getElementById("error").innerHTML = "There is nothing saved.";
            const closeButtonX = document.getElementById("error");
            let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>';
            closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert);
        }
    } else {
        // Display an error message if the user is not registered
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = "You need to register before you can use this function!";
        const closeButtonX = document.getElementById("error");
        let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>';
        closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert);
    }



}



//Function for the scandiQuizButton
function scandiQuizButton(formtype){


	//is the user registered and is there form already saved? 
	if(isYouserRegged() && userHasQuiz(formtype)){
		
		

			const checkObject = JSON.parse(localStorage.getItem(formtype))
			
			let StringToShow = ""
			
			//what if anything is stored?
			for (const key in checkObject) {
				StringToShow = StringToShow + key + ': ' + checkObject[key] + '<br>'
	
				document.getElementById(formtype+'P').innerHTML = StringToShow
		
			}

		
		document.getElementById("error").style.display = "block"
		document.getElementById("error").innerHTML = "Delete your previous Quiz results first!"
		const closeButtonX = document.getElementById("error")
		let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>'
		closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert)
		


	}
	//is the user registered but there is no form saved
	else if(isYouserRegged()){
		
		document.getElementById("form_div2").style.display = "block"
		document.getElementById("scandiQuizForm").style.display = "block"
		document.getElementById("form_div1").style.display = "none"
	}
//not registered
	else{ 
		document.getElementById("error").style.display ="block"
		document.getElementById("error").innerHTML = "You need to register before you can use this function!"
		const closeButtonX = document.getElementById("error")
		let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>'
		closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert)
		
	}
}

// Function for the userQuizButton
function userQuizButton(formtype) {
    // Check if the user is registered and if there is a form already saved
    if (isYouserRegged() && userHasQuiz(formtype)) {
        // Parse the stored object from localStorage
        const checkObject = JSON.parse(localStorage.getItem(formtype));

        let stringToShow = "";

        // Check if anything is stored
        for (const key in checkObject) {
            // Concatenate key-value pairs to form the string to display
            stringToShow = stringToShow + key + ': ' + checkObject[key] + '<br>';
            document.getElementById(formtype + 'P').innerHTML = stringToShow;
        }

        // Hide any error messages
        document.getElementById("error").style.display = "none";
        document.getElementById("error").innerHTML = "";

        // Show the user quiz form and relevant sections while hiding unnecessary sections
        document.getElementById("form_div3").style.display = "block";
        document.getElementById("userQuizForm").style.display = "block";
        document.getElementById("registerUserForm").style.display = "none";
        document.getElementById("form_div1").style.display = "none";
        document.getElementById("scandiQuizForm").style.display = "none";
        document.getElementById("form_div2").style.display = "none";
    }
    // Check if the user is registered but there is no form saved
    else if (isYouserRegged()) {
        // Hide any error messages
        document.getElementById("error").style.display = "none";
        document.getElementById("error").innerHTML = "";

        // Show the user quiz form and relevant sections while hiding unnecessary sections
        document.getElementById("form_div3").style.display = "block";
        document.getElementById("userQuizForm").style.display = "block";
        document.getElementById("registerUserForm").style.display = "none";
        document.getElementById("form_div1").style.display = "none";
        document.getElementById("scandiQuizForm").style.display = "none";
        document.getElementById("form_div2").style.display = "none";
    }
    // Display an error message if the user is not registered
    else {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = "You need to register before you can use this function!";
        const closeButtonX = document.getElementById("error");
        let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>';
        closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert);
    }
}







//Function to check if data from any of the forms are stored locally
function thisFormInfo(formtype){
	/*const getObject = JSON.parse(localStorage.getItem(formtype))
	
	//if the object exists (i.e the object is not empty) return true
	const isObjectEmpty = (getObject) => {
		return Object.keys(getObject).length > 0
			
	}*/

!localStorage.getItem(formtype)
	

}

//function to decide which forms to show
function showThisForm(formtype){
		
	const allFormTypes = ["registerUserForm" , "scandiQuizForm" , "userQuizForm"]
	
	for (let i = 0; i < allFormTypes.length; i++) {
		

		if(allFormTypes[i] !== formtype ){

			document.getElementById(allFormTypes[i]).style.display = "none"
			document.getElementById('form_div'+ (i + 1)).style.display = "none"
			
		}else{
			document.getElementById(allFormTypes[i]).style.display = "block"
			document.getElementById('form_div'+ (i + 1)).style.display = "block"
			
		}
	}

	
}

/*

/// Function to check and show appropriate buttons based on stored form data
function showFromStart() {
    // Check if data for the registerUserForm is stored locally


	// Check if the user is registered and if there is a form already saved
    if (isYouserRegged() && userHasQuiz('registerUserForm')) {
 	//show buttons for registerUserForm
 	document.getElementById("savedregisterUserFormAnswers").style.display = "block"
 	document.getElementById("deleteregisterUserFormAnswers").style.display = "block"
	document.getElementById("scandiQuizButton").style.display = "block"
	
}
	// Check if the user is registered and if there is a form already saved
    if (isYouserRegged() && userHasQuiz('userScandiQuiz')) {
		//show buttons for registerUserForm
		// Show buttons for scandiQuizForm
		document.getElementById("savedregisterUserFormAnswers").style.display = "block";
 		document.getElementById("deleteregisterUserFormAnswers").style.display = "block";
        document.getElementById("savedscandiQuizFormAnswers").style.display = "block";
        document.getElementById("deletescandiQuizFormAnswers").style.display = "block";
		document.getElementById("scandiQuizButton").style.display = "block";
   }
   if (isYouserRegged() && userHasQuiz('useQuizForm')) {

   // show buttons for scandiQuizForm
   	document.getElementById("savedregisterUserFormAnswers").style.display = "block";
   	document.getElementById("deleteregisterUserFormAnswers").style.display = "block";
  	document.getElementById("scandiQuizButton").style.display = "block";
}

    
}
*/


/// Function to check and show appropriate buttons based on stored form data
function showFromStart() {
    // Check if the user is registered
    if (isYouserRegged()) {
        // Check and show buttons for registerUserForm
        if (userHasQuiz('registerUserForm')) {
			console.log('1')
            showButtons([
                "savedregisterUserFormAnswers",
                "deleteregisterUserFormAnswers",
                "scandiQuizButton"
            ])
			
        }

        // Check and show buttons for scandiQuizForm
        if (userHasQuiz('scandiQuizForm')) {
            showButtons([
                "savedscandiQuizFormAnswers",
                "deletescandiQuizFormAnswers"
            ])
			console.log('2')
        }else{

			  // Hide other buttons
			  hideButtons([
				"savedscandiQuizFormAnswers",
				"deletescandiQuizFormAnswers"
				
			])
			console.log('3'+userHasQuiz('scandiQuizForm'))
		}

        // Check and show buttons for userQuizForm
        if (!userHasQuiz('userQuizForm')) {
            showButtons([
                "userQuizForm",
                "userQuizButton",
                "saveduserQuizFormAnswers",
                "deleteuserQuizFormAnswers"
            ])
			console.log('4')
        }else{

			// Hide other buttons
			hideButtons([
			  "saveduserQuizFormAnswers",
			  "deleteuserQuizFormAnswers"
            
			  
		  ])
		  console.log('5'+userHasQuiz('userQuizForm'))
	  }

       
       
    } else {
        // User is not registered, show specific buttons
        showButtons([
            "showMyUserInfoButton",
            "scandiQuizButton",
            "makeYourOwnQuizButton"
        ])
		// Hide other buttons
		hideButtons([
			"savedscandiQuizFormAnswers",
			"deletescandiQuizFormAnswers",
			"userQuizFormAnswers",
			"userQuizFormAnswers",
			"saveduserQuizFormAnswers",
			"deleteuserQuizFormAnswers",
			"deleteregisterUserFormAnswers"
		])
		
    }
}

function showButtons(buttonIds) {
    // Utility function to show an array of buttons
    buttonIds.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.style.display = "block";
        }
    });
}

function hideButtons(buttonIds) {
    // Utility function to hide an array of buttons
    buttonIds.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.style.display = "none";
        }
    });
}