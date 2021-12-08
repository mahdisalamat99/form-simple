
function openExamModal(id){
    // console.log(arguments);
    let examName = document.querySelector("#exam-name");
    examName.value = "";
    document.querySelector(".backdrop").classList.add("open");
    document.querySelector("#add-exam-btn").setAttribute("onclick",`addExam(${id})`);
    document.querySelector("#exam-name").focus();
}

function closeExamModal(){
    document.querySelector(".backdrop").classList.remove("open");
}

document.querySelector("#add-exam-btn").addEventListener("click",alertShow);
function alertShow(){
    console.log("alert")
    let examName = document.querySelector("#exam-name");
    let examNameValue = examName.value;
    if(examNameValue === ""){
        document.querySelector("#alert-ms").classList.add("active");
    } else {
        document.querySelector("#alert-ms").classList.remove("active");
    }
}

let examList = [];
function addExam(id){
    let examName = document.querySelector("#exam-name");
    let examNameValue = examName.value;
  
    if(id == undefined){
        let d = new Date();

        examList.push({
            rowNum : examList.length+1,
            id : Date.now(),
            year :d.getFullYear(),
            month :d.getMonth(),
            day : d.getDate(),
            hour : d.getHours(),
            minutes : d.getMinutes(),
            examName : examNameValue,
            productCode : Math.floor(Math.random()),
            productCount :"",
            recordTime : "",
            productPrice :"",
        });
    } 
    else{
        console.log("else");
        selectedExamList = examList.filter(item => item.id == id)[0];
        selectedExamList.examName = examNameValue;
    }

    closeExamModal();
    printExam();
    console.log(examList);
};

document.querySelector("#exam-name").addEventListener("keydown",(event)=>{
    if(event.keyCode === 13){
        addExam();
    }
});
function printExam(e){
    // add search functionality
    let searchStr = e?.target.value || "";
    let examStr = examList.filter(item => item.examName.indexOf(searchStr)>-1).reduce((total,item)=>{
    // end adding search functionality
        
        return total+ `
        <div class="row">
        <p>${item.rowNum}</p>
        <p>${item.productCode}</p>
        <p>${item.examName}</p>
        <p>${item.productCount}</p>
        <p>${item.recordTime} </p>
        <p>${item.productPrice} </p>
        <div class="buttons">
            <button onclick="editExamName(${item.id})" id="edit-btn">ویرایش</button>
            <button onclick="deleteExam(${item.id})">حذف </button>
        </div>
    </div>`
    },"")

    document.querySelector("#exams-containter").innerHTML = examStr;
}

function deleteExam(id){
    examList = examList.filter(exam => exam.id != id);
    printExam(id)
}

function editExamName(id){
    openExamModal(id);
    selectedExamList = examList.filter(exam => exam.id == id)[0];
    document.querySelector("#exam-name").value = selectedExamList.examName;
}












// new code

$(document).ready(function(){
    $.ajax({
        url : 'http://192.168.1.60/db.php',
        method : "GET",
        dataType : 'json',
        success : function(r){
            console.log(r);
            productList = [...productList,...r]
            printProduct();
        },
    })
})

let productList = [];
function addProduct(id){
    let productName = document.querySelector("#exam-name");
    let productNameValue = productName.value;
    function getRandomNumber(){
        return Math.floor(Math.random()*1000)
    }

    if(id == undefined){
        productList.push({
            row_num : productList.length+1,
            id : Date.now(),
            year :d.getFullYear(),
            month :d.getMonth(),
            day : d.getDate(),
            hour : d.getHours(),
            minutes : d.getMinutes(),
            product_name : "",
            product_code : getRandomNumber(),
            product_count :"",
            record_time : "",
            product_price :"",
        });
    } else {

    }
};

document.querySelector("#exam-name").addEventListener("keydown",(event)=>{
    if(event.keyCode === 13){
        addProduct();
    }
})


function printProduct(e){
    let searchStr = e?.target.value || "";
    let productStr = productList.filter(item => item.product_name.indexOf(searchStr)>-1).reduce((total,item)=>{
    // end adding search functionality
        
        return total+ `
        <div class="row">
        <p>${item.row_num}</p>
        <p>${item.product_code}</p>
        <p>${item.product_name}</p>
        <p>${item.product_count}</p>
        <p>${item.record_time} </p>
        <p>${item.product_price} </p>
        <div class="buttons">
            <button onclick="editExamName(${item.id})" id="edit-btn">ویرایش</button>
            <button onclick="deleteExam(${item.id})">حذف </button>
        </div>
    </div>`
    },"")

    document.querySelector("#exams-containter").innerHTML = productStr;
}



function deleteProduct(id){
    $.ajax({
        url : 'http://192.168.1.60/index4.php/productlist/'+id,
        method : 'DELETE',
        success : function(){
            // again get all products
            console.log("product has been deleted")
        },
        error : function(error){
            console.log(error);
        }
    })
};


function editProduct(id){
    $.ajax({
        url : 'http://192.168.1.60/index4.php/productlist/'+id,
        method : 'GET',
        success : function(){
            console.log("product has been edited");
        },
        error : function(error){
            console.log(error);
        }
    })
}

















$(document).ready(function(){
    // $(".main-section").load("test.html");

    // $.get('test.html', function(data){
    //     $('.resault').html(data);
    // })

    // $.ajax({
    //     method : 'GET',
    //     url : 'http://192.168.1.60/index4.php',
    //     dataType : 'json',
    // }).done(function(data){
    //     console.log(data);
    //     examList = [...examList,...data]
    //     console.log(examList);
    //     printExam();
    // })



    // First Get info
    $.ajax({
        method : "GET",
        url : "http://192.168.1.60/index4.php",
        dataType : 'json',
    }).done(function(data){

    });


    // Add New Info
    $.ajax({
        method : "POST",
        url : "http://192.168.1.60/index4.php",
        dataType : 'json',
    }).done(function(data){

    })

    // Delete Btn
    $.ajax({
        method : "GET",
        url : "http://192.168.1.60/index4.php",
        dataType : 'json',
    }).done(function(data){

    })

    // Edit Btn
    $.ajax({
        method :"GET",
        url : "http://192.168.1.60/index4.php",
        dataType : 'json',
    })
})


{/* <p>${item.minutes} :${item.hour} - ${item.year}/${item.month}/${item.day} </p> */}
