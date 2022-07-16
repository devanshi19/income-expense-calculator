const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

//loggedin user object
let loggedin = JSON.parse(localStorage.getItem(`${params.email}`));










/**
 *  income addition function
 */
function income_addition() {

    console.log("income function called")

    //input income value
    var income_value = parseInt(document.getElementById("income").value);
    if (Number.isNaN(income_value)) {
        document.getElementById("total_income").value = "";
    }
    else {
        if (loggedin["income"] == undefined && loggedin["income"] == null) {
            loggedin["income"] = parseInt(income_value);
            localStorage.setItem(`${params.email}`, JSON.stringify(loggedin));
            document.getElementById("total_income").value = income_value;
        }
        else {
            var exsisting_income = parseInt(loggedin["income"]);
            exsisting_income += income_value;
            loggedin["income"] = parseInt(exsisting_income);
            localStorage.setItem(`${params.email}`, JSON.stringify(loggedin));
            document.getElementById("total_income").value = exsisting_income;
        }
        document.getElementById("income").value = "";
    }


}






// /**
//  *  real expense function 
//  */
// function expense_addition()
// {
//     console.log("expesnse fuunction called")

//     //total income 
//     var t_income = loggedin["income"];

//     // category field value
//     var category_value =  document.getElementById("category").value;

//     //input expense value 
//     var expense_value = parseInt(document.getElementById("expense").value);

//     //table global data
//     var table = document.getElementById("expense_data");
//     var row_count =table.rows.length;
//     var row = table.insertRow(row_count);

//     if(loggedin["expense"] == undefined)
//     {
//         loggedin["expense"] =parseInt( expense_value);
//         localStorage.setItem(`${params.email}`, JSON.stringify(loggedin));

//         // dynamic data shown in table
//         row.insertCell(0).innerHTML = category_value;
//         row.insertCell(1).innerHTML = expense_value;
//     }
//     else
//     {
//         var exsisting_expense = parseInt(loggedin["expense"]);
//         exsisting_expense+=expense_value;
//         loggedin["expense"] =parseInt(exsisting_expense);
//         localStorage.setItem(`${params.email}`, JSON.stringify(loggedin));


//         // dynamic data shown in table
//         row.insertCell(0).innerHTML = category_value;
//         row.insertCell(1).innerHTML = expense_value;
//         document.getElementById("total_expense").value = exsisting_expense;

//         if(t_income< exsisting_expense)
//         {
//             alert("your remainig balance  is " + t_income + " and your Expense is higher than total remaining balance.");
//             document.getElementById("t_balance").value = t_income - exsisting_expense;
//             document.getElementById("t_balance").style.color = "red";
//         }
//         else
//         {
//             document.getElementById("t_balance").value = t_income - exsisting_expense;
//         }
//     }

// }











/**
 * updated expense_additon function 
 */
function expense_addition() {
    console.log("expesnse fuunction called")

    //total income 
    var t_income = loggedin["income"];


    //input expense value 
    var expense_value = parseInt(document.getElementById("expense").value);
    
    //note value
    var note_value = document.getElementById("note").value;
    

    // category field value
    var category_value = document.getElementById("category").value;
   

    // month field value 
    var month_value = document.getElementById("month").value;
   

    //table global data
    var table = document.getElementById("expense_data");
    var row_count = table.rows.length;
    var row = table.insertRow(row_count);

    //js for table visibility
    table.style.visibility = "visible";

    if (Number.isNaN(expense_value) && note_value == "" && category_value == "food" && month_value == "Janaury") {
        table.style.visibility = "hidden";
    }
    else {
        if (loggedin["expense"] == undefined && loggedin["expense"] == null) {
            loggedin["expense"] = parseInt(expense_value);
            localStorage.setItem(`${params.email}`, JSON.stringify(loggedin));

            // dynamic data shown in table
            console.log(" table if part called ")
            row.insertCell(0).innerHTML = category_value;
            row.insertCell(1).innerHTML = expense_value;
            row.insertCell(2).innerHTML = note_value;
            row.insertCell(3).innerHTML = month_value;
            expense();
        }
        else {

            var exsisting_expense = parseInt(loggedin["expense"]);
            exsisting_expense += expense_value;
            loggedin["expense"] = parseInt(exsisting_expense);
            localStorage.setItem(`${params.email}`, JSON.stringify(loggedin));


            // dynamic data shown in table
            row.insertCell(0).innerHTML = category_value;
            row.insertCell(1).innerHTML = expense_value;
            row.insertCell(2).innerHTML = note_value;
            row.insertCell(3).innerHTML = month_value;
            document.getElementById("total_expense").value = exsisting_expense;
            expense();




            // condition for insufficient balance 
            if (t_income < exsisting_expense) {
                //alert("your remainig balance  is " + t_income + " and your Expense is higher than total remaining balance.");
                document.getElementById("danger_msg").style.visibility = "visible";
                document.getElementById("t_balance").value = t_income - exsisting_expense;
                document.getElementById("t_balance").style.color = "red";
            }
            else {
                document.getElementById("t_balance").value = t_income - exsisting_expense;
            }
        }
        document.getElementById("expense").value = "";
        document.getElementById("note").value = "";
        document.getElementById("category").value = "food";
        document.getElementById("month").value = "Janaury";
    }


}









/**
 * updated expense function 
 */

function expense() {
    //input expense value 
    var expense_value = parseInt(document.getElementById("expense").value);

    //note value
    var note_value = document.getElementById("note").value;

    // category field value
    var category_value = document.getElementById("category").value;
    // month field value 
    var month_value = document.getElementById("month").value;


    var expense_obj = {
        expense: expense_value,
        category: category_obj,
    }
    var category_obj = {
        note: note_value,
        category_expense: expense_value
    }

    if (loggedin[`${month_value}`] == undefined) {
        loggedin[`${month_value}`] = expense_obj;
        loggedin[`${month_value}`].category = {};
        if (loggedin[`${month_value}`].category[`${category_value}`] == undefined) {
            loggedin[`${month_value}`].category[`${category_value}`] = category_obj;
        }
    }
    else {
        loggedin[`${month_value}`].expense += expense_value;
        if (loggedin[`${month_value}`].category[`${category_value}`] == undefined) {
            loggedin[`${month_value}`].category[`${category_value}`] = category_obj;
        }
        else {
            loggedin[`${month_value}`].category[`${category_value}`].category_expense += expense_value;
        }
    }
    localStorage.setItem(`${params.email}`, JSON.stringify(loggedin));
}



/**
 * 
 * Monthly expense function 
 */
function monthly_expense() {
    console.log("monthly expense function called ");
    var month_name = document.getElementById("monthly_expense").value;
    if (loggedin[`${month_name}`]) {
        document.getElementById("m_expense").value = `You haven't any expense in ${month_name}`
    }
    else {
        document.getElementById("m_expense").value = `Your  expense in ${month_name} is  ${loggedin[`${month_name}`].expense}`;
    }
    document.getElementById("monthe_input").style.visibility = "visible";
}






/**
 * js for edit modal 
 */




//edit modal
var edit_modal = document.getElementById("edit-modal");

//link on which edit will be called
var edit_link = document.getElementById("edit-link");
// close btn
var close_btn = document.getElementsByClassName("close")[0];

edit_link.onclick = function () {
    edit_modal.style.display = "block";

}
//js for close the edit-modal 
close_btn.onclick = function () {
    edit_modal.style.display = "none";

}

/**
 * edit data function 
 */
var month_array = []
function edit_data() {
    var edited_expense = parseInt(document.getElementById("edit_expense").value);
    var edited_category = document.getElementById("edit_category").value;
    var month = document.getElementById("edit_month").value;

    if (loggedin[month] == undefined) {
        alert("you don't have expense in this month");
        edit_modal.style.display = "none";
    }
    else {
        var original_expense = loggedin[month].category[`${edited_category}`].category_expense;
        loggedin[month].category[`${edited_category}`].category_expense = edited_expense;
        var abstracted_value = loggedin[month].expense - original_expense;
        abstracted_value += loggedin[month].category[`${edited_category}`].category_expense;
        loggedin[month].expense = abstracted_value;
        document.getElementById("success_msg").style.visibility = "visible";
        edit_modal.style.display = "none";
    }
    localStorage.setItem(`${params.email}`, JSON.stringify(loggedin));
}






































// function expense() {

//     //input expense value 
//     var expense_value = parseInt(document.getElementById("expense").value);

//     //note value
//     var note_value = document.getElementById("note").value;

//     // category field value
//     var category_value = document.getElementById("category").value;
//     // month field value 
//     var month_value = document.getElementById("month").value;




//     if (loggedin[`${month_value}`] == undefined) {
//         loggedin[`${month_value}`] = {};


//         var expense_obj = {
//             expense: expense_value,
//             category: categories,
//         }
//         var categories = {
//             category_name : category_data(),
//         }

//         loggedin[`${month_value}`] = expense_obj;
//         console.log(loggedin[`${month_value}`]);
//         localStorage.setItem(`${params.email}`, JSON.stringify(loggedin));
//     }
//     else {
//         loggedin[`${month_value}`].expense += expense_value;
//         localStorage.setItem(`${params.email}`, JSON.stringify(loggedin));

//     }

// }
// function category_data() {
//     var expense_value = parseInt(document.getElementById("expense").value);
//     var note_value = document.getElementById("note").value;
//     var category_value = document.getElementById("category").value;
//     var month_value = document.getElementById("month").value;

//     var category_obj = {
//         note: note_value,
//         category_expense: expense_value
//     }
//     loggedin[`${month_value}`].category = {category_name : category_value};
//     if (loggedin[`${month_value}`].category[`${category_value}`] == undefined){

//         console.log("category if called")
//         loggedin[`${month_value}`].category[`${category_value}`] = category_obj;

//     }
//     // else{
//     //     console.log("else part")
//     // }   

// }