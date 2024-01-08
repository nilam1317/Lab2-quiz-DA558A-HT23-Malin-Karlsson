
//what to show
//document.getElementById("rightsideimage").onload = function() {showFromStart()};



//create a variable from the register form
let registerFormData = document.getElementById("registerUserForm")

//eventlistner to trigger the functions when the form is submitted
registerFormData.addEventListener('submit', (e) => {
	// prevent form (action) tag from submitting/0pening the URL
	e.preventDefault()


	//create variables from inputs
	let firstName = document.getElementById("firstName")
	let lastName = document.getElementById("lastName")
	let phoneNumber = document.getElementById("phoneNumber")
	let email = document.getElementById("email")
	document.getElementById("error").innerHTML = ""

	//Creating an object and filling it with the inputs from the form
	const objectToPass = {
		firstName: document.getElementById("firstName").value,
		lastName: document.getElementById("lastName").value,
		phoneNumber: document.getElementById("phoneNumber").value,
		email: document.getElementById("email").value
	}

	//set the formtype and pass it along too the validation
	let formtype = "registerUserForm"
	useRegexValidation(formtype, objectToPass)
})


function validateQandAs() {

	const QandAsToPass = {}

	const qs = []
	const ans = []
	

	//crate a variable
	let userQuizFormData = document.getElementById("userQuizForm")


	document.getElementById("userQuizForm").addEventListener("click", function (event) {

		// prevent form (action) tag from submitting/0pening the URL
		event.preventDefault()


		// prevent form (action) tag from submitting/0pening the URL



		let counted = countAnswerLabels() -4




		for (let i = 1; i < counted; i++) {

		

			qs.push(document.getElementById("YourQuestion"+i).innerHTML)
			ans.push(document.getElementById("YourAnswer"+i).innerHTML)




			// QandAsToPass.document.getElementById("YourQuestion" + i).value = document.getElementById("YourAnswer" + i).value

		}



		function createObject(keys, values) {
			const obj = Object.fromEntries(
				keys.map((key, index) => [key, values[index]]),
			);

			return obj;
		}

		
		let result = createObject(qs, ans);

		let formtype = "userQuiz"




		useRegexValidation2(formtype, result)
	})







}


//function to validate the data from user registerUserForm
function useRegexValidation(formtype, objectToPass) {


	//the regex
	let regex1 = /^\d+$/
	let regex2 = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\>|\/|\""|\;|\:|[0-9]/g
	let regex3 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

	var i = 0
	var formLength = Object.keys(objectToPass).length;


	// loop throught the object with submitted data
	for (const key in objectToPass) {

		//create a variable
		let toTest = objectToPass[key]

		//matching against regex
		if (key !== 'phoneNumber' && key !== 'email' && toTest.match(regex2)) {
			document.getElementById("error").style.display = "block"
			document.getElementById("error").innerHTML = 'You entered "' + toTest + '" in a field where no special characters or numbers are allowed'

		} else if (key === 'phoneNumber' && !toTest.match(regex1)) {
			document.getElementById("error").style.display = "block"
			document.getElementById("error").innerHTML = 'You entered "' + toTest + '" in a field where only numbers are allowed'

		} else if (key === 'email' && !toTest.match(regex3)) {
			document.getElementById("error").style.display = "block"
			document.getElementById("error").innerHTML = '" ' + toTest + '" is not a valid email'
		} else {
			i = ++i;

		}
		// when the loop is complete 
		if (i === formLength) {
			// make sure the error bgoes awayox 
			document.getElementById("error").style.display = "none"
			
			//call for the function to store the data
			storeDataLocally(formtype, objectToPass)
			document.getElementById("userQuizFormP").innerHTML = ""



			//then empty the inputs
			firstName.value = ""
			lastName.value = ""
			phoneNumber.value =
			email.value = ""

			//hide the registerform
			//Show the next form (the Scandi Quiz)
			document.getElementById("registerUserForm").style.display = "none" 
			document.getElementById("form_div1").style.display = "none"
			document.getElementById("form_div2").style.display = "block"
			document.getElementById("scandiQuizForm").style.display = "block"
			
		}
	}
}







//create an object for the scandiQuiz
var scandiQuizFormData = new Object()

//fill it with the ScandiQuiz submited data
scandiQuizFormData = document.getElementById("scandiQuizForm")

//eventlistner to trigger when the submit button is pressed
scandiQuizFormData.addEventListener('submit', (e) => {

	// prevent form (action) tag from submitting/reloading page
	e.preventDefault()

	//count how many Q and A's this test has
	let counted = countAnswerLabels() 
  

	//Make sure there is no text in the span for error messages
	document.getElementById("error").innerHTML = ""
	document.getElementById("error").style.display = "none"
	
	//Lets loop through the Q and A's
	for (i = 1; i < counted; i++) {
        let checkbox2 = ""
        if(i === 2){
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
        
        }
        else if (i === 4){
            
            
            document.getElementById("sqAnswer4").setAttribute("value", document.getElementById("sqAnswer4select").value)
			
        }    
        else if (i !== 2 || i !== 4){
            // create a variable from what has been typed in, and trim it
    
        
			//Move the submitted text from the div to the value attribute of the hidden input tag 
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


	//create two arrays needed for the next step
	const sqs = []
	const sans = []

	//loop through the Q ans Q's again, this time push them into the array's of sqs and sans
	for (let j = 1; j < counted; j++) {

	
		
		
        const collectAll = document.getElementById("sqAnswer"+j)
		let dataText = collectAll.getAttribute("value");

		
		
		sqs.push(j.toString())
		sans.push(dataText)
		
		
	}


	//create an object from the two arrays 
	const result = createObject(sqs, sans)
	
	function createObject(keys, values) {

		const obj = Object.fromEntries(
			keys.map((key, index) => [key, values[index]]),

		);


		return obj
		
	}

	//flagg the formtype
	let formtype = "scandiQuizForm"


	//move on to the validation
	useRegexValidation2(formtype, result)
})





function useRegexValidation2(formtype, result) {

	let regexQandQs = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\>|\/|\""|\;|\:/g


	var i = 0
	var formLength = Object.keys(result).length


	for (let key in result) {


		let toTest = key
		let toTest2 = result[key]

		


		if (toTest == '' || toTest2 == '') {
			document.getElementById("error").style.display = "block"
			document.getElementById("error").innerHTML = 'You must enter text in all fields.'

		} else if (toTest.match(regexQandQs)) {
			document.getElementById("error").style.display = "block"
			document.getElementById("error").innerHTML = 'You entered "' + toTest + '" in a field where no special characters are allowed'

		} else if (toTest2.match(regexQandQs)) {
			document.getElementById("error").style.display = "block"
			document.getElementById("error").innerHTML = 'You entered "' + toTest2 + '" in a field where no special characters are allowed'

		}
		
		
		
		
		else {


			i = ++i;

		}


		if (i === formLength) {
			document.getElementById("error").style.display = "none"

			storeDataLocally(formtype, result)

		}



	}
}

function countAnswerLabels() {

	const sqAnswerLabels = document.querySelectorAll(".answerLabelClass")


	return sqAnswerLabels.length



}

function checkScandiQuiz(result) {
   
	const submittedQuiz = result
	const rightAnswers = {
		"1": "Sweden",
		"2": "A quality of cosiness. A kind of atmosphere that evokes feelings of contentment and wellbeing.",
		"3": "Danes",
		"4": "Norway",
		"5": "ABBA"
	}

    function upperStrings(obj) {
    	for (let attr in obj) {
        	if (typeof obj[attr] === 'string') {
          		obj[attr] = obj[attr].toUpperCase();
        	} else if (typeof obj[attr] === 'object') {
        		upperStrings(obj[attr]);
        	}
    	}
	}
     
      upperStrings(submittedQuiz)
      upperStrings(rightAnswers)
     
      
    let points=0
    for (let i=1; i < countAnswerLabels(); i++){
		//sringify and remove all whiespaces within both user answers and the right answers 
		//before comparing the two
	    if (JSON.stringify(submittedQuiz[i].replace(/\s/g, "")) === JSON.stringify(rightAnswers[i]).replace(/\s/g, "")) {
		 	points +=1

	    } 
    }
 
    document.getElementById("points").style.display = "block"
    document.getElementById("points").innerHTML= "<p>Congratulations! You have completed the quiz. You got  "
    +points+
    " right answers.</p>"
    
    document.getElementById("points").innerHTML = document.getElementById("points").innerHTML + '<p> Your answers: '

    for (const key in submittedQuiz) {

		let snum = key
		let value = submittedQuiz[key]
        document.getElementById("points").innerHTML = document.getElementById("points").innerHTML +key+': '+value+'<br>'
    }
    document.getElementById("points").innerHTML = document.getElementById("points").innerHTML + '</p> <p>Right answers were:'


    for (const key in rightAnswers) {

		let snum = key
		let value = rightAnswers[key]
        document.getElementById("points").innerHTML= document.getElementById("points").innerHTML +key+': '+value+'<br>'
	}
    document.getElementById("points").innerHTML  = document.getElementById("points").innerHTML +'</p>'
   

    const closeButtonX = document.getElementById("points")
    
	let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>'
	closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert)
}

function myCloseFunction(formtype){
	isYouserRegged()
	
	if(formtype === "scandiQuizForm"){
		document.getElementById("points").style.display = "none"
		document.getElementById("error").style.display = "none"
		document.getElementById("scandiQuizForm").style.display = "none"
		document.getElementById("registerUserForm").style.display = "none"
		document.getElementById("form_div1").style.display = "none"
		document.getElementById("form_div2").style.display = "none"
		document.getElementById("userQuizForm").style.display = "block"
	}else if (formtype === "registerUserForm"){
		document.getElementById("points").style.display = "none"
		document.getElementById("error").style.display = "none"
		document.getElementById("registerUserForm").style.display = "none"
		document.getElementById("form_div1").style.display = "none"
		document.getElementById("scandiQuizForm").style.display = "block"
	}else if (formtype === "userQuizForm"){
		document.getElementById("scandiQuizForm").style.display = "none"
		document.getElementById("form_div1").style.display = "none"
		document.getElementById("form_div2").style.display = "none"
		document.getElementById("userQuizForm").style.display = "block"
	}else{
		document.getElementById("registerUserForm").style.display = "block"
		document.getElementById("points").style.display = "none"
		document.getElementById("error").style.display = "none"
		document.getElementById("scandiQuizForm").style.display = "none"
		document.getElementById("userQuizForm").style.display = "none"
		document.getElementById("form_div2").style.display = "none"
		document.getElementById("form_div3").style.display = "none"
	}
}

function storeDataLocally(formtype, result) {

	isYouserRegged()

	if (formtype === "scandiQuizForm") {
		checkScandiQuiz(result)

	}

	const d = new Date();
	let time = d.getTime();

	if (formtype === "userQuizForm") {
		formtype = "userQuizForm" + time

	}

	//Stringify the object
	const myJSON = JSON.stringify(result)



	//save the string to localSTorage
	localStorage.setItem(
		formtype,
		myJSON
	)


	//alert user that data has been successfully stored
	alert("All data has been successfully submitted!")
	
	const userInfoObject = JSON.parse(localStorage.getItem(formtype))
	
	let StringToShow = ""
	for (const key in userInfoObject) {
		StringToShow = StringToShow + key + ': ' + userInfoObject[key] + '<br>'
	}

	
	if (formtype === "registerUserForm") {
		document.getElementById("savedregisterUserFormAnswers").style.display = "block"
		document.getElementById("deleteregisterUserFormAnswers").style.display = "block"
		document.getElementById("scandiQuizFormP").innerHTML = ""
		//document.getElementById("registerUserFormP").innerHTML = StringToShow		

	} else if (formtype === "scandiQuizForm"){
		document.getElementById("savedscandiQuizFormAnswers").style.display = "block"
		document.getElementById("deletescandiQuizFormAnswers").style.display = "block"

		document.getElementById("scandiQuizFormP").innerHTML = StringToShow		
	}

	//what to show
	//showFromStart()

	

}




function deleteUserStored(formtype) {

	isYouserRegged()

	if(!isYouserRegged()){
		
		localStorage.removeItem(formtype)
		document.getElementById(formtype +"P").innerHTML = ""
		
		const checkObject = JSON.parse(localStorage.getItem(formtype))

		let StringToShow = ""
		for (const key in checkObject) {
			StringToShow = StringToShow + key + ': ' + checkObject[key] + '<br>'
		}
		
		if(StringToShow = ""){
				document.getElementById("error").innerHTML = "There is nothing saved."
				const closeButtonX = document.getElementById("error")
				let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>'
				closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert)
		}
			else{
		document.getElementById("error").style.display ="block"
		document.getElementById("error").innerHTML = "You need to register before you can use this function!"
		const closeButtonX = document.getElementById("error")
		let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>'
		closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert)
	}

}	
		





	if(!localStorage.getItem(formtype)){

		document.getElementById("error").style.display = "block"
		document.getElementById("error").innerHTML = "You need to register before you can use this function!"
		const closeButtonX = document.getElementById("error")
		
    
		let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>'
		closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert)
		
	}else {
		
		localStorage.removeItem(formtype)
		document.getElementById(formtype +"P").innerHTML = ""
	}
		
	

    //what to show
	//showFromStart()		

}	

function countAnswerLabels2() {

	let answerLabels = document.querySelectorAll('#userQuizForm .answerLabelClass').length;

	return answerLabels



}





//check if the number is even
function isEven(number) {
	return number % 2 === 0;
}





function addQuestion() {
	const inputNameLabel = ["QuestionsNumber"]
	const inputNameLabelAnswer = ["AnswerNumber"]


	let j = countAnswerLabels()-5


	j += 1



	document.getElementById("userQuizForm").addEventListener("click", function (event) {
		event.preventDefault()
	});



	var questionDiv = document.createElement("DIV")

	if (isEven(j)) {
		questionDiv.setAttribute("id", "oddEven_" + j)
		questionDiv.setAttribute("class", 'even')
	} else {
		questionDiv.setAttribute("id", "oddEven_" + j)
		questionDiv.setAttribute("class", 'odd')
	}


	document.getElementById("userQuizFormFieldset").appendChild(questionDiv)

	var labelQuestionField = document.createElement("LABEL")
	var QuestionDivField = document.createElement("DIV")
	var inputQuestionField = document.createElement("INPUT")
	
	var labelAnswerField = document.createElement("LABEL")
	var AnswerDivField = document.createElement("DIV")
	var inputAnswerField = document.createElement("INPUT")





	labelQuestionField.setAttribute("for", "YourQuestion" + j)
	labelAnswerField.setAttribute("for", "YourAnswer" + j)
	
	labelAnswerField.setAttribute("class", "answerLabelClass")
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


	document.getElementById("oddEven_" + j).appendChild(labelQuestionField)
	document.getElementById("oddEven_" + j).appendChild(inputQuestionField)
	document.getElementById("oddEven_" + j).appendChild(QuestionDivField)
	document.getElementById("oddEven_" + j).appendChild(labelAnswerField)
	document.getElementById("oddEven_" + j).appendChild(inputAnswerField)
	document.getElementById("oddEven_" + j).appendChild(AnswerDivField)


	document.getElementById('Question' + j).innerHTML = 'Question ' + j
	document.getElementById('Answer' + j).innerHTML = 'Answer ' + j




	addDeleteButton(j)








}


function addDeleteButton(j) {




	const AddRandbuttonX = document.getElementById("YourAnswer" + j)

	let htmlToInsert = ' <div class="button_distance"><button style="display=block" onclick="deleteQuestion(' + j + ')" id="YourButton' + j + '" data-value="' + j + '">Delete question ' + j + ' </button></div>'
	AddRandbuttonX.insertAdjacentHTML("afterend", htmlToInsert)


}





function pickRandom(ObjectFromFile) {

	//Generate xxst random questions
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





//function to read what is stored
function randQuestion(theQuestion, theAnswer) {





	const inputRandNameLabel = ["QuestionsRandNumber"]
	const inputRandNameLabelAnswer = ["AnswerRandNumber"]


	let n = countAnswerLabels()-5

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
	labelRandAnswerField.setAttribute("class", 'answerLabelClass')
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









function deleteQuestion(val) {



	//How many questions before deleting anything (n+1 gives the answer)
	let n = countAnswerLabels() -5


	//Create an event's handler
	document.getElementById("userQuizForm").addEventListener("click", function (event) {
		//do not reload the page when the button is pressed
		event.preventDefault()
	});

	//Now a little loop
	//Loop through all the pairs of questionss and answers
	for (let i = 1; i < (n + 1); i++) {

		//Single out the one's that will come after the deleted question
		//And therefor needs new id/class
		//val is the number in the id of the button pressed
		if (i > val) {


			//get the input value fron the text fields
			//move them one step up in the pair of Q&A
			//stop the loop when every pair has been looped through
			let valToMoveQ = document.getElementById("YourQuestion" + i).value
			let valToMoveA = document.getElementById("YourAnswer" + i).value


			document.getElementById("YourQuestion" + (i - 1)).value = valToMoveQ
			document.getElementById("YourAnswer" + (i - 1)).value = valToMoveA


		}
	}



	//delete all elements with the highest id number in the pairs of Q & A
	const element = document.getElementById('Question' + n)

	const element2 = document.getElementById('YourQuestion' + n)

	const element3 = document.getElementById('Answer' + n)

	const element4 = document.getElementById('YourAnswer' + n)

	const element5 = document.getElementById('YourButton' + n)

	const element6 = document.getElementById('oddEven_' + n)


	//but only if there is actuakly something to remove

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


	n -= 1







}

function isYouserRegged(){
	if(!localStorage.getItem('registerUserForm')){
		console.log('user is not registered')
	}else{
		console.log('user is registered')

	}
}

//function to read what is stored
function showStoredValue(formtype) {

	if(!isYouserRegged()){
		const checkObject = JSON.parse(localStorage.getItem(formtype))

		let StringToShow = ""
		for (const key in checkObject) {
			StringToShow = StringToShow + key + ': ' + checkObject[key] + '<br>'
		
		document.getElementById(formtype+'P').innerHTML = StringToShow
	
		}
		if(StringToShow = ""){
			document.getElementById("error").innerHTML = "There is nothing saved."
			const closeButtonX = document.getElementById("error")
			let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>'
			closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert)
		}
		
	} else{
		document.getElementById("error").style.display ="block"
		document.getElementById("error").innerHTML = "You need to register before you can use this function!"
		const closeButtonX = document.getElementById("error")
		let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Close</button></p>'
		closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert)
	}
	

}

//Function for the scandiQuizButton
function scandiQuizButton(registerUserForm){

	
	if(!localStorage.getItem(registerUserForm)) {
		document.getElementById("error").style.display = "block"
		document.getElementById("error").innerHTML = "You need to register before you can take this quiz!"
		const closeButtonX = document.getElementById("error")
		let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction("scandiQuizForm")">Close</button></p>'
		closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert)
		
	}else{ 
		document.getElementById("form_div2").style.display = "block"
		document.getElementById("scandiQuizForm").style.display = "block"
		document.getElementById("form_div1").style.display = "none"
		const takeMeToElement = document.getElementById("sqAnswer1")
		takeMeToElement.scrollIntoView()
		
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



/* what to show
function showFromStart(){
	//check if form data is stored locally, if not the appropriate buttons will be showed
	
	
	if(thisFormInfo('registerUserForm') === "true"){

		//Show buttons because data exists
		document.getElementById("savedregisterUserFormAnswers").style.display="block"
		document.getElementById("deleteregisterUserFormAnswers").style.display="block"
		console.log('case1: registerUserform är sparad så jag visar knappar')
	}else {
	//hide buttons
		document.getElementById("savedregisterUserFormAnswers").style.display="none"
		document.getElementById("deleteregisterUserFormAnswers").style.display="none"
		document.getElementById("savedscandiQuizFormAnswers").style.display="none"
		document.getElementById("deletescandiQuizFormAnswers").style.display="none"
		document.getElementById("saveduserQuizFormAnswers").style.display="none"
		document.getElementById("deleteuserQuizFormAnswers").style.display="none"
		console.log('case2: registerUserform är inte sparad så jag visar inga knappar')
	}		
}*/
