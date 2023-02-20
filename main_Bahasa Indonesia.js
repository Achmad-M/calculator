        // Fungsi ini digunakan untuk menangani event tekan tombol dan memasukkan nilai tombol yang ditekan sebagai angka di field output
        document.addEventListener('keypress', function (event) {
            var key = event.which || event.keyCode;
            if(key >= 48 && key <= 57) {
                //  Cek apakah tombol yang ditekan adalah angka antara 0-9, jika benar masukkan angka tersebut ke field output
                insert(key-48);
            }
        });

        // Penglistener acara untuk menangani tombol keyboard yang ditekan
        document.addEventListener("keydown", function(event) {
            if (event.key === "-") {
              insert('-');
            } else if (event.key === "/") {
                insertOpr('÷');
            } else if (event.shiftKey && event.key === "+" ) {
                insertOpr('+');
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

        // Fungsi ini menerima sebuah operator (opr) sebagai argumen
        function insertOpr(opr) {
            // Mendapatkan nilai saat ini dari field output (result)
            var result = document.form.output_number.value;
            if(result){
                // Jika ada nilai di field output
                // Menyimpan karakter terakhir dari field output (lastChar)
                var lastChar = result[result.length - 1];
            
                // Kemudian memeriksa apakah karakter terakhir adalah operator
                // Jika iya, menghapus operator terakhir
                if (lastChar === '+' || lastChar === '-' || lastChar === 'x' || lastChar === '÷') {
                    result = result.substring(0, result.length - 1);
                }
                // Kemudian menambahkan operator baru ke field output
                document.form.output_number.value = result + opr;
            }
            
        }

        // Fungsi ini disebut 'insert' dan memasukkan parameter yang disebut 'number'.
        function insert(number) {
            // Mendapatkan nilai saat ini dari elemen dengan nama 'output_number' dalam bentuk 'form'.
            var result = document.form.output_number.value;
            // Kemudian memberikan nilai saat ini dari 'output_number' ditambah dengan 'number' yang diterima ke elemen 'output_number'
            document.form.output_number.value = document.form.output_number.value + number;
        }

        // Fungsi "deleteFunc" digunakan untuk menghapus semua karakter pada nilai input
        function deleteFunc(){
            document.form.output_number.value = "";
        }

        // Fungsi "equal" digunakan untuk melakukan perhitungan pada nilai input
        function equal(){
            try {
                var result = document.form.output_number.value;
                if(result){
                    // Kemudian, ia mengganti setiap instance dari "x" dengan "" dan "÷" dengan "/" dan "--" dengan "+" untuk memastikan bahwa input dapat dievaluasi
                    if(result.includes("x")){
                        result = result.replace(/x/g, "*");

                    } else if(result.includes("÷")){
                        result = result.replace(/÷/g, "/");

                    } else if(result.includes("--")){
                        result = result.replace(/--/g, "+");

                    }
                    // Kemudian, nilai input dievaluasi menggunakan fungsi javascript "eval"
                    document.form.output_number.value = eval(result);
                }
            // Dalam kasus terjadi error, pengguna akan diberikan peringatan untuk memeriksa apakah input yang dimasukkan sudah benar
            } catch (error) {
                alert("Please make sure the calculation you entered is correct!");
            }
        }

        // Fungsi ini mengubah angka menjadi persen dari angka terakhir pada tampilan kalkulator
        function percent(){
            // Menetapkan nilai dari elemen output_number ke variabel "result"
            var result = document.form.output_number.value;
            if (result) {
                // Inisialisasi variabel "lastNumber" sebagai string kosong
                var lastNumber = "";
                // Melakukan iterasi melalui karakter dari variabel "result" mulai dari karakter terakhir
                for (var i = result.length - 1; i >= 0; i--) {
                    // Cek apakah karakter saat ini adalah angka, '-' atau '.'
                    if (!isNaN(result[i]) || result[i] === '-' || result[i] === '.') {
                        lastNumber = result[i] + lastNumber;
                    } else {
                        //  Jika bukan angka, hentikan loop
                        break;
                    }
                }

                // Inisialisasi variabel "firstNumber" sebagai string kosong
                var firstNumber = "";
                // Melakukan iterasi melalui karakter dari variabel "result" mulai dari karakter pertama
                for (var i = 0; i < result.length - lastNumber.length; i++) {
                    // Tambahkan karakter saat ini ke variabel "firstNumber"
                    firstNumber += result[i];
                }
                // Berikan nilai dari variabel "firstNumber" dikonkatenasi dengan nilai dari variabel "lastNumber" dibagi 100 ke elemen "output_number"
                document.form.output_number.value = firstNumber.toString() + lastNumber / 100;
            }

            }

        // Fungsi ini mengubah tanda dari angka terakhir pada tampilan kalkulator
        function changeSign() {
            // Mendapatkan nilai saat ini pada tampilan kalkulator
            var result = document.form.output_number.value;
            if (result) {
                //  Jika ada nilai, menemukan angka terakhir pada tampilan
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
    
                // Mengubah tanda dari angka terakhir
                if (lastNumber.charAt(0) === '-') {
                    lastNumber = lastNumber.substring(1);
                } else {
                    lastNumber = '-' + lastNumber;
                }
    
                // Memperbarui tampilan kalkulator dengan nilai baru
                document.form.output_number.value = firstNumber.toString() + lastNumber;
            }
    
        }

        // Fungsi ini digunakan untuk menghapus karakter terakhir dari nilai output pada kalkulator
        function back(){
            // Menyimpan nilai output saat ini dalam variabel
            var result = document.form.output_number.value;
            // Memperbarui nilai output dengan menghapus karakter terakhir
            document.form.output_number.value = result.substring(0,result.length-1);
        }