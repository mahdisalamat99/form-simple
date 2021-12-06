
function openExamModal(id){
    // console.log(arguments);
    let examName = document.querySelector("#exam-name");
    examName.value = "";
    document.querySelector(".backdrop").classList.add("open");
    document.querySelector("#add-exam-btn").setAttribute("onclick",`addExam(${id})`);
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
        });
    } 
    else{
        console.log("else");
        selectedExamList = examList.filter(item => item.id == id)[0];
        selectedExamList.examName = examNameValue;
    }

    closeExamModal();
    printExam();
};

function printExam(){
    let examStr = examList.reduce((total,item)=>{
        return total+ `
        <div class="row">
        <p>${item.rowNum}</p>
        <p>${item.examName}</p>
        <p>${item.minutes} :${item.hour} - ${item.year}/${item.month}/${item.day} </p>
        <div class="buttons">
            <button onclick="editExamName(${item.id})" id="edit-btn">ویرایش</button>
            <button onclick="deleteExam(${item.id})">حذف آزمون</button>
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


