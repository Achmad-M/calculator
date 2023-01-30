        // This function is used to handle key press event and insert the pressed key value as a number in the output field
        document.addEventListener('keypress', function (event) {
            var key = event.which || event.keyCode;
            if(key >= 48 && key <= 57) {
                // check if the key pressed is a number between 0-9, if true insert that number in the output field
                insert(key-48);
            }
        });

        // This function is used to handle keydown event for backspace key
        document.addEventListener("keydown", function(event) {
            if (event.keyCode === 8) {
                // check if the key pressed is backspace, if true call the back() function
                back()
            }
        });

        // The function takes in an operator (opr) as an argument
        function insertOpr(opr) {
            // It retrieves the current value of the output field (hasil)
            var hasil = document.form.output_number.value;
            if(hasil){
                // If there is a value in the output field
                // It stores the last character of the output field (lastChar)
                var lastChar = hasil[hasil.length - 1];
            
                // It then checks if the last character is an operator
                // If it is, it removes the last operator
                if (lastChar === '+' || lastChar === '-' || lastChar === 'x' || lastChar === '÷') {
                    hasil = hasil.substring(0, hasil.length - 1);
                }
                // It then appends the new operator to the output field
                document.form.output_number.value = hasil + opr;
            }
            
        }

        // This function is called 'insert' and it takes in a parameter called 'number'.
        function insert(number) {
            // It retrieves the current value of the element with the name 'output_number' in the form 'form'.
            var hasil = document.form.output_number.value;
            // It then assigns the current value of 'output_number' plus the passed in 'number' to the 'output_number' element
            document.form.output_number.value = document.form.output_number.value + number;
        }

        // The function "deleteFunc" is used to delete all characters on the input value.
        function deleteFunc(){
            document.form.output_number.value = "";
        }

        // The function "equal" is used to perform calculations on the input value.
        function equal(){
            try {
                var hasil = document.form.output_number.value;
                if(hasil){
                    // It then replaces any instances of "x" with "*" and "÷" with "/" and "--" with "+" to ensure that the input can be evaluated
                    if(hasil.includes("x")){
                        hasil = hasil.replace(/x/g, "*");

                    } else if(hasil.includes("÷")){
                        hasil = hasil.replace(/÷/g, "/");

                    } else if(hasil.includes("--")){
                        hasil = hasil.replace(/--/g, "+");

                    }
                    // Then, the input value is evaluated using the javascript "eval" function.
                    document.form.output_number.value = eval(hasil);
                }
            // In case of an error, the user is alerted to check if the input is correct
            } catch (error) {
                alert("Please make sure the calculation you entered is correct!");
            }
        }

        // This function changes number to percent of the last number in the calculator's display
        function percent(){
            // Assign the value of the output_number element to the variable "hasil"
            var hasil = document.form.output_number.value;
            if(hasil){
                //  Initialize the "lastNumber" variable as an empty string
                var lastNumber = "";
                // Iterate through the characters of the "hasil" variable starting from the last character
                for (var i = hasil.length - 1; i >= 0; i--) {
                    // Check if the current character is a number
                    if (!isNaN(hasil[i])) {
                        lastNumber = hasil[i] + lastNumber;
                    } else {
                        // If it is not a number, break the loop
                        break;
                    }
                }

                // Initialize the "firstNumber" variable as an empty string
                var firstNumber = "";
                // Iterate through the characters of the "hasil" variable starting from the first character
                for (var i = 0; i < hasil.length - lastNumber.length; i++) {
                    // Add the current character to the "firstNumber" variable
                    firstNumber += hasil[i];
                }
                // Assign the value of the "firstNumber" variable concatenated with the value of the "lastNumber" variable divided by 100 to the output_number element
                document.form.output_number.value = firstNumber.toString() +  lastNumber / 100;
            }
            }

        // This function changes the sign of the last number in the calculator's display
        function changeSign() {
            // Get the current value in the calculator's display
            var hasil = document.form.output_number.value;
            if (hasil) {
                //  Find the last number in the display
                var lastNumber = "";
                for (var i = hasil.length - 1; i >= 0; i--) {
                    if (!isNaN(hasil[i])) {
                        lastNumber = hasil[i] + lastNumber;
                    } else {
                        break;
                    }
                }

                // Get the characters before the last number
                var firstNumber = "";
                for (var i = 0; i < hasil.length - lastNumber.length; i++) {
                    firstNumber += hasil[i];
                }

                // Change the sign of the last number
                if (lastNumber.charAt(0) === '-') {
                    lastNumber = lastNumber.substring(1);
                } else {
                    lastNumber = '-' + lastNumber;
                }

                // Update the calculator's display with the new valueUpdate the calculator's display with the new value
                document.form.output_number.value = firstNumber.toString() + lastNumber;
            }
        }

        // This function is used to delete the last character of the output value in the calculator
        function back(){
            // Store the current output value in a variable
            var hasil = document.form.output_number.value;
            // Update the output value by removing the last character
            document.form.output_number.value = hasil.substring(0,hasil.length-1);
        }