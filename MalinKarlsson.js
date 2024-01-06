//crate a variable
let registerFormData = document.getElementById("registerForm")

//eventlistner to trigger functions
registerFormData.addEventListener('submit', (e) => {
	// prevent form (action) tag from submitting/0pening the URL
	e.preventDefault()


	//create variables from inputs
	let firstName = document.getElementById("firstName")
	let lastName = document.getElementById("lastName")
	let phoneNumber = document.getElementById("phoneNumber")
	let email = document.getElementById("email")
	document.getElementById("error").innerHTML = ""

	const objectToPass = {
		firstName: document.getElementById("firstName").value,
		lastName: document.getElementById("lastName").value,
		phoneNumber: document.getElementById("phoneNumber").value,
		email: document.getElementById("email").value
	}


	let formtype = "userInfo"
	useRegexValidation(formtype, objectToPass)
})


function validateQandAs() {

	const QandAsToPass = {}

	const qs = []
	const ans = []

	//crate a variable
	let QuestionsFormData = document.getElementById("QuestionsForm")


	document.getElementById("QuestionsForm").addEventListener("click", function (event) {

		// prevent form (action) tag from submitting/0pening the URL
		event.preventDefault()


		// prevent form (action) tag from submitting/0pening the URL



		let counted = countAnswerLabels() + 1




		for (let i = 1; i < counted; i++) {

			qs.push(document.getElementById("YourQuestion" + i).value)
			ans.push(document.getElementById("YourAnswer" + i).value)




			// QandAsToPass.document.getElementById("YourQuestion" + i).value = document.getElementById("YourAnswer" + i).value

		}



		function createObject(keys, values) {
			const obj = Object.fromEntries(
				keys.map((key, index) => [key, values[index]]),
			);

			return obj;
		}

		let a = qs
		let b = ans
		let result = createObject(a, b);

		let formtype = "userQuiz"




		useRegexValidation2(formtype, result)
	})







}



function useRegexValidation(formtype, objectToPass) {



	let regex1 = /^\d+$/
	let regex2 = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\>|\/|\""|\;|\:|[0-9]/g
	let regex3 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

	var i = 0
	var formLength = Object.keys(objectToPass).length;

	for (const key in objectToPass) {


		let toTest = objectToPass[key]


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

		if (i === formLength) {

			document.getElementById("error").style.display = "none"
			storeDataLocally(formtype, objectToPass)




			//then empty the inputs
			firstName.value = ""
			lastName.value = ""
			phoneNumber.value =
				email.value = ""
		}
	}
}







//create an object 
var scandiQuizFormData = new Object()

//fill it with the ScandiQuiz
scandiQuizFormData = document.getElementById("sqandiQuiz")

//eventlistner to trigger when the submit button is pressed
scandiQuizFormData.addEventListener('submit', (e) => {

	// prevent form (action) tag from submitting/reloading page
	e.preventDefault()

	//count how many Q and A's this test has
	let counted = countAnswerLabels() + 1
    let countdown = counted
   

	//Make sure there is no text in the span for error messages
	document.getElementById("error").innerHTML = ""

	//Lets loop through the Q and A's
	for (i = 1; i < counted; i++) {
        let checkbox2 = ""
        if(i === 2){
            if(document.getElementById("sqAnswer2a").checked){
                   //checkbox2 = checkbox2 + document.getElementById('sqAnswer2a').value
                   checkbox2 = checkbox2 + ' and ' + document.getElementById('sqAnswer2a').value
                   console.log(checkbox2);
            }     
            if(document.getElementById("sqAnswer2b").checked){
                //checkbox2 = checkbox2 + document.getElementById('sqAnswer2b').value
                checkbox2 = checkbox2 + ' and ' + document.getElementById('sqAnswer2b').value
                console.log(checkbox2);

            }  
            if(document.getElementById("sqAnswer2c").checked){
                //checkbox2 = checkbox2 + document.getElementById('sqAnswer2c').value
                checkbox2 = checkbox2 + ' and ' + document.getElementById('sqAnswer2c').value
                console.log(checkbox2);
            }  
            if(document.getElementById("sqAnswer2d").checked){
                //checkbox2 = checkbox2 + document.getElementById('sqAnswer2d').value
                checkbox2 = checkbox2 + ' and ' +  document.getElementById('sqAnswer2d').value
                console.log(checkbox2);
            } 
            document.getElementById("sqAnswer2").setAttribute("data", checkbox2)

            if(checkbox2 ="") {
                
                document.getElementById("error").style.display = "block"
			    document.getElementById("error").innerHTML = 'You must check at least one of the checkboxes.'
             }

        
        }
        else if (i === 4){
            
            console.log(2)
            document.getElementById("sqAnswer4").setAttribute("data", document.getElementById("sqAnswer4").value )
        }    
        else if (i !== 2 || i !== 4){
            // create a variable from what has been typed in, and trim it
      
          const typedInAnswer = (document.getElementById("sqQuestion_" + i).innerHTML).trim()
          
           


        

		    //Check that the input field is not empty
		    if (typedInAnswer == "") {
			    //Show error message
			    document.getElementById("error").style.display = "block"
			    document.getElementById("error").innerHTML = 'You must enter text in all fields..'
		    } 
	    
        }
        
        //Move the submitted text from the div to the data attribute of the hidden input tag
        //var tempVarName = i;
        //window["sqAnswer" + tempVarName].setAttribute("data", typedInAnswer)
       
        Här är du
    }
	//create two arrays needed for the next step
	const sqs = []
	const sans = []

	//loop through the Q ans Q's again, this time push them into the array's of sqs and sans
	for (let j = 1; j < counted; j++) {

		/*const element = document.getElementById("sqAnswer" + j);
        for (const key in element) {

            console.log(key +':'+ element[key]);
        }*/
        
        const tsts = document.getElementById("sqAnswer"+j)
		let dataText = tsts.getAttribute("value");

		sqs.push(j)
		sans.push(dataText)
    
	}


	//create an object from the two arrays 
	let result = createObject(sqs, sans)

	function createObject(keys, values) {

		const obj = Object.fromEntries(
			keys.map((key, index) => [key, values[index]]),

		);


		return obj
	}

	//flagg the formtype
	let formtype = "scandiQuiz"


	//move on to the validation
	useRegexValidation2(formtype, result)
})





function useRegexValidation2(formtype, result) {

	let regexQandQs = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\>|\/|\""|\;|\:/g


	var i = 0
	var formLength = Object.keys(result).length


	for (const key in result) {


		let toTest = key
		let toTest2 = result[key]


		if (toTest == '' || toTest2 == '') {
			document.getElementById("error").style.display = "block"
			document.getElementById("error").innerHTML = 'You must enter text in all fields.'

		} else if (toTest.match(regexQandQs) || toTest2.match(regexQandQs)) {
			document.getElementById("error").style.display = "block"
			document.getElementById("error").innerHTML = 'You entered "' + toTest + '" in a field where no special characters are allowed'

		} else {


			i = ++i;

		}


		if (i === formLength) {
			document.getElementById("error").style.display = "none"

			storeDataLocally(formtype, result)

			alert("Your quiz has been saved")
			document.getElementById("error").style.display = "none"
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
		"2": "ad",
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
     for (let i=1; i < countAnswerLabels() +1; i++){
      

	    if (JSON.stringify(submittedQuiz[i]) === JSON.stringify(rightAnswers[i])) {
		    console.log('1 rätt')
            console.log(JSON.stringify(submittedQuiz[i]))
            console.log(JSON.stringify(rightAnswers[i]))
            points +=1

	    } else {
		    console.log('1 fel')
            console.log(JSON.stringify(submittedQuiz[i]))
            console.log(JSON.stringify(rightAnswers[i]))

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
        document.getElementById("points").innerHTML = document.getElementById("points").innerHTML + '   Q'+key+': '+value+'.'
    }
    document.getElementById("points").innerHTML = document.getElementById("points").innerHTML + '</p> <p>Right answers were:'


    for (const key in rightAnswers) {

		let snum = key
		let value = rightAnswers[key]
        document.getElementById("points").innerHTML= document.getElementById("points").innerHTML +'   Q'+key+': '+value+'.'
    }
    
    document.getElementById("points").innerHTML  = document.getElementById("points").innerHTML +'</p>'
   

    const closeButtonX = document.getElementById("points")
    
	let htmlToInsert = '<p class="button_distance"><button id="close" onclick="myCloseFunction()">Delete question </button></p>'
	closeButtonX.insertAdjacentHTML("beforeend", htmlToInsert)
}

function myCloseFunction(){
document.getElementById("points").style.display = "none"
}

function storeDataLocally(formtype, result) {


	if (formtype === "scandiQuiz") {
		checkScandiQuiz(result)

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
	//document.getElementById("sqandiQuiz").style.display = "none"
	// document.getElementById("headline2").innerHTML = `Välkommen ${firstName.value}!`
	//document.getElementById("headline2").style.display = "block"
	// document.getElementById("headline1").style.display = "none"
	document.getElementById("showMyUserInfoButton").style.display = "block"
	document.getElementById("deleteUi").style.display = "block"



}


function deleteUserStored() {
	localStorage.removeItem("userInfo")



	document.getElementById("showMyUserInfoButton").style.display = "none"
	document.getElementById("deleteUi").style.display = "none"
	document.getElementById("userInfo").innerHTML = ""
}


function countAnswerLabels2() {

	let answerLabels = document.querySelectorAll('#QuestionsForm .answerLabelClass').length;

	return answerLabels



}





//check if the number is even
function isEven(number) {
	return number % 2 === 0;
}





function addQuestion() {
	const inputNameLabel = ["QuestionsNumber"]
	const inputNameLabelAnswer = ["AnswerNumber"]


	let j = countAnswerLabels()


	j += 1



	document.getElementById("QuestionsForm").addEventListener("click", function (event) {
		event.preventDefault()
	});



	var questionSpan = document.createElement("SPAN")

	if (isEven(j)) {
		questionSpan.setAttribute("id", "oddEven_" + j)
		questionSpan.setAttribute("class", 'even')
	} else {
		questionSpan.setAttribute("id", "oddEven_" + j)
		questionSpan.setAttribute("class", 'odd')
	}


	document.getElementById("QuestionsForm").appendChild(questionSpan)

	var labelQuestionField = document.createElement("LABEL")
	var inputQuestionField = document.createElement("INPUT")
	var labelAnswerField = document.createElement("LABEL")
	var inputAnswerField = document.createElement("INPUT")





	labelQuestionField.setAttribute("for", 'YourQuestion' + j)
	labelAnswerField.setAttribute("for", 'YourAnswer' + j)
	labelAnswerField.setAttribute("class", 'answerLabelClass')
	labelQuestionField.setAttribute("class", 'questionLabelClass')


	labelQuestionField.setAttribute("id", 'Question' + j)
	labelAnswerField.setAttribute("id", 'Answer' + j)



	inputQuestionField.setAttribute("type", "text")
	inputAnswerField.setAttribute("type", "text")

	inputQuestionField.setAttribute("id", "YourQuestion" + j)
	inputAnswerField.setAttribute("id", "YourAnswer" + j)




	inputQuestionField.setAttribute("maxlength", "100")
	inputAnswerField.setAttribute("maxlength", "100")

	inputQuestionField.setAttribute("value", "Enter your Question here")
	inputAnswerField.setAttribute("value", "Enter your Answer here")

	document.getElementById("oddEven_" + j).appendChild(labelQuestionField)
	document.getElementById("oddEven_" + j).appendChild(inputQuestionField)
	document.getElementById("oddEven_" + j).appendChild(labelAnswerField)
	document.getElementById("oddEven_" + j).appendChild(inputAnswerField)



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


	let n = countAnswerLabels()

	n += 1



	document.getElementById("randQuestionGenerator").addEventListener("click", function (event) {
		event.preventDefault()
	})



	var questionSpan = document.createElement("SPAN")

	if (isEven(n)) {
		questionSpan.setAttribute("id", "oddEven_" + n)
		questionSpan.setAttribute("class", 'even')
	} else {
		questionSpan.setAttribute("id", "oddEven_" + n)
		questionSpan.setAttribute("class", 'odd')
	}


	document.getElementById("QuestionsForm").appendChild(questionSpan)





	//inputRandNameLabel.push("Question" + n)
	//inputRandNameLabelAnswer.push("Answer" + n)

	var labelRandQuestionField = document.createElement("LABEL")
	var inputRandQuestionField = document.createElement("INPUT")

	var labelRandAnswerField = document.createElement("LABEL")
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
	labelRandAnswerField.setAttribute("id", 'Answer' + n)

	//labelRandQuestionField.value = 'YourQuestion' + n
	//labelRandAnswerField = 'YourAnswer' + n

	inputRandQuestionField.setAttribute("type", "text")
	inputRandAnswerField.setAttribute("type", "text")

	inputRandQuestionField.setAttribute("id", "YourQuestion" + n)
	inputRandAnswerField.setAttribute("id", "YourAnswer" + n)

	inputRandQuestionField.setAttribute("value", theQuestion)
	inputRandAnswerField.setAttribute("value", theAnswer)



	document.getElementById("QuestionsForm").appendChild(labelRandQuestionField)

	document.getElementById("QuestionsForm").appendChild(inputRandQuestionField)

	document.getElementById("QuestionsForm").appendChild(labelRandAnswerField)
	document.getElementById("QuestionsForm").appendChild(inputRandAnswerField)

	document.getElementById("oddEven_" + n).appendChild(labelRandQuestionField)
	document.getElementById("oddEven_" + n).appendChild(inputRandQuestionField)
	document.getElementById("oddEven_" + n).appendChild(labelRandAnswerField)
	document.getElementById("oddEven_" + n).appendChild(inputRandAnswerField)


	document.getElementById('Question' + n).innerHTML = 'Question ' + n
	document.getElementById('Answer' + n).innerHTML = 'Answer ' + n

	let labelElement = document.getElementById(inputRandNameLabel[n]);
	let labelElement2 = document.getElementById(inputRandNameLabelAnswer[n]);



	addDeleteButton(n)
}









function deleteQuestion(val) {



	//How many questions before deleting anything (n+1 gives the answer)
	let n = countAnswerLabels()


	//Create an event's handler
	document.getElementById("QuestionsForm").addEventListener("click", function (event) {
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




	/*----need to delete this but is saving it for now


	                            //create objects of the Q&A to delete
	                            const yourQuestionToDelete = document.getElementById("YourQuestion" + val)
	                            const yourAnswerToDelete = document.getElementById("YourAnswer" + val)

	                            //create variables/objects of the last pair of input field with q and a
	                            //we want to save this so that it can be reinserted as the new last q&A
	                            const yourQuestionToSave1 = document.getElementById("YourQuestion" + n)
	                            const yourAnswerToSave1 = document.getElementById("YourAnswer" + n)

	                         
	                            //Create a temp object with the value from the pair of input field with question and answer
	                            const ObjectToTempSave = {
	                                yourQuestionToSave1: yourQuestionToSave1.value,
	                                yourAnswerToSave1: yourAnswerToSave1.value

	                            }
	                           
	*/

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

//function to read what is stored
function showStoredValue(formtype) {



	const userInfoObject = JSON.parse(localStorage.getItem(formtype))


	let StringToShow = ""
	for (const key in userInfoObject) {
		StringToShow = StringToShow + key + ': ' + userInfoObject[key] + '<br>'
	}

	document.getElementById(formtype).innerHTML = StringToShow

}
