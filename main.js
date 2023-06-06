      // Event listener to handle pressed keyboard buttons
        document.addEventListener("keydown", function(event) {
            if (event.key === "-") {
              insert('-');
            } else if (event.key === "/") {
                insertOpr('÷');
            } else if (event.shiftKey && event.key === "+" ) {
                insertOpr('+');
            } else if (event.shiftKey && event.key === "(" ) {
                insertOpr('(');
            } else if (event.shiftKey && event.key === ")" ) {
                insertOpr(')');
            } else if (event.key === "=" || event.key ==="Enter") {
                equal();
            } else if (event.key === "Delete") {
                deleteFunc();
            } else if (event.key === ".") {
                insertOpr(".");
            } else if (event.key === "x") {
                insertOpr('x');
            } else if (event.key === "Backspace") {
                back();
            } else if (event.shiftKey && event.key === "%" ) {
                percent();
            } else if (event.ctrlKey && event.key === "a") {
                document.form.output_number.select();
            }
        });

        // This function is called 'insert' and it takes in a parameter called 'number'.
        function insert(number) {
            // It retrieves the current value of the element with the name 'output_number' in the form 'form'.
            var result = document.form.output_number.value;
            // It then assigns the current value of 'output_number' plus the passed in 'number' to the 'output_number' element
            document.form.output_number.value = document.form.output_number.value + number;
        }

        // The function "deleteFunc" is used to delete all characters on the input value.
        function deleteFunc(){
            document.form.output_number.value = "";
        }

        // This function changes number to percent of the last number in the calculator's display
        function percent(){
            // Assign the value of the output_number element to the variable "result"
            var result = document.form.output_number.value;
            if (result) {
                // Initialize the "lastNumber" variable as an empty string
                var lastNumber = "";
                // Iterate through the characters of the "result" variable starting from the last character
                for (var i = result.length - 1; i >= 0; i--) {
                    // Check if the current character is a number, '-' or '.'
                    if (!isNaN(result[i]) || result[i] === '-' || result[i] === '.') {
                        lastNumber = result[i] + lastNumber;
                    } else {
                        // If it is not a number, break the loop
                        break;
                    }
                }

                // Initialize the "firstNumber" variable as an empty string
                var firstNumber = "";
                // Iterate through the characters of the "result" variable starting from the first character
                for (var i = 0; i < result.length - lastNumber.length; i++) {
                    // Add the current character to the "firstNumber" variable
                    firstNumber += result[i];
                }
                // Assign the value of the "firstNumber" variable concatenated with the value of the "lastNumber" divided by 100 to the "output_number" element
                document.form.output_number.value = firstNumber.toString() + lastNumber / 100;
            }

        }

        function squareRootLastNumber() {
            var result = document.form.output_number.value;
            if (result) {
                // Mencari angka terakhir dalam tampilan kalkulator
                var lastNumber = "";
                var start = false;
                for (var i = result.length - 1; i >= 0; i--) {
                    if (isNaN(result[i]) && result[i] !== "." && result[i] !== "-") {
                        break;
                    }
                    if (result[i] === "-" && i !== 0) {
                        break;
                    }
                    start = true;
                    lastNumber = result[i] + lastNumber;
                }
                
                // Mendapatkan karakter sebelum angka terakhir
                var firstNumber = "";
                if (start) {
                    for (var i = 0; i < result.length - lastNumber.length; i++) {
                        firstNumber += result[i];
                    }
                } else {
                    firstNumber = result;
                }
                
                // Mengubah angka terakhir menjadi akar pangkat dua
                lastNumber = Math.sqrt(parseFloat(lastNumber)).toString();
                
                // Mengupdate tampilan kalkulator dengan nilai baru
                document.form.output_number.value = firstNumber + lastNumber;
            }
        }
        
        function squareLastNumber() {
            var result = document.form.output_number.value;
            if (result) {
                // Mencari angka terakhir dalam tampilan kalkulator
                var lastNumber = "";
                var start = false;
                for (var i = result.length - 1; i >= 0; i--) {
                    if (isNaN(result[i]) && result[i] !== "." && result[i] !== "-") {
                        break;
                    }
                    if (result[i] === "-" && i !== 0) {
                        break;
                    }
                    start = true;
                    lastNumber = result[i] + lastNumber;
                }
        
                // Mendapatkan karakter sebelum angka terakhir
                var firstNumber = "";
                if (start) {
                    for (var i = 0; i < result.length - lastNumber.length; i++) {
                        firstNumber += result[i];
                    }
                } else {
                    firstNumber = result;
                }
        
                // Menghitung pangkat dua dari angka terakhir
                var squaredNumber = parseFloat(lastNumber) ** 2;
        
                // Menggabungkan kembali hasil perhitungan ke dalam tampilan kalkulator
                document.form.output_number.value = firstNumber.toString() + squaredNumber.toString();
            }
        }

        // This function is used to delete the last character of the output value in the calculator
        function back(){
            // Store the current output value in a variable
            var result = document.form.output_number.value;
            // Update the output value by removing the last character
            document.form.output_number.value = result.substring(0,result.length-1);
        }        // This function is used to handle key press event and insert the pressed key value as a number in the output field
        document.addEventListener('keypress', function (event) {
            var key = event.which || event.keyCode;
            if(key >= 48 && key <= 57) {
                // check if the key pressed is a number between 0-9, if true insert that number in the output field
                insert(key-48);
            }
        });

        function insertOpr(opr) {
            var result = document.form.output_number.value;
            if (opr === '(' || opr === ')') {
                document.form.output_number.value = result + opr;
            } else if (result) {
                var lastChar = result[result.length - 1];
                if (lastChar === '+' || lastChar === '-' || lastChar === 'x' || lastChar === '÷') {
                    result = result.substring(0, result.length - 1);
                }
                document.form.output_number.value = result + opr;
            }
        }
        

        // The function "equal" is used to perform calculations on the input value.
        function equal() {
            try {
                var result = document.form.output_number.value;
                if (result) {
                    // Mengganti "x" dengan "*" dan "÷" dengan "/"
                    result = result.replace(/x/g, "*").replace(/÷/g, "/");

                    // Menggunakan math.evaluate() untuk mengevaluasi ekspresi matematika
                    var mathResult = math.evaluate(result);

                    // Mengubah hasil evaluasi menjadi string dan menampilkan pada output
                    document.form.output_number.value = mathResult.toString();
                }
            } catch (error) {
                alert("Please make sure the calculation you entered is correct!");
            }
        }


        // This function changes the sign of the last number in the calculator's display
        function changeSign() {
            // Get the current value in the calculator's display
            var result = document.form.output_number.value;
            if (result) {
                //  Find the last number in the display
                var lastNumber = "";
                var start = false;
                for (var i = result.length - 1; i >= 0; i--) {
                    if (isNaN(result[i]) && result[i] !== "." && result[i] !== "-") {
                        break;
                    }
                    if (result[i] === "-" && i !== 0) {
                        break;
                    }
                    start = true;
                    lastNumber = result[i] + lastNumber;
                }
    
                // Get the characters before the last number
                var firstNumber = "";
                if (start) {
                    for (var i = 0; i < result.length - lastNumber.length; i++) {
                        firstNumber += result[i];
                    }
                } else {
                    firstNumber = result;
                }
    
                // Change the sign of the last number
                if (lastNumber.charAt(0) === '-') {
                    lastNumber = lastNumber.substring(1);
                } else {
                    lastNumber = '-' + lastNumber;
                }
    
                // Update the calculator's display with the new value
                document.form.output_number.value = firstNumber.toString() + lastNumber;
            }
    
        }
