
let age = document.querySelector("#age");
let ageCheckBox = age.querySelector("#age-checkbox");
let ageRange = age.querySelector("#age-range");
console.log(ageRange);

// ternary solution

ageCheckBox.addEventListener("click",()=>{
    (ageCheckBox.checked) ? ageRange.style.display = "flex" : ageRange.style.display = "none";
});

// classic solution

// ageCheckBox.addEventListener("click",rangeShower);
// function rangeShower(){
//     if (ageCheckBox.checked == true){
//         ageRange.style.display = "flex";
//         console.log("if");
//     } else {
//         ageRange.style.display = "none";
//         console.log("else");
//     }
// }


let criteria = [];
function addCriteria(){
    criteria.push({
        id:Date.now(),
        name:"",
        questions : []
    })
    criteriaPrint();
    console.log(criteria);

}

function criteriaPrint(){
    let criteriaStr = criteria.reduce((total,item)=>{
        return total+ `
        <div class="criterion-content">
                        <label for="criterion-input"> نام معیار</label>
                        <br>
                        <input type="text" name="criterion-input">

                        <div class="questions" id="q-${item.id}">
                            ${printQuestion(item.id)}
                        </div>
                        <button onclick="openModal(event,'${item.id}')">افزودن سوال</button> 
                    </div>
                    <div class="backdrop" onclick="closeModal(event)">
                    <div class="modal" onclick="event.stopPropagation()">
                        <div class="modal-content">
                            <div class="category">
                                <label for="cat">دسته</label>
                                <select name="cat" id="cat">
                                    <option value="پیش فرض">
                                        پیش فرض
                                    </option>
                                    <option value="دسته یک" selected>
                                        دسته یک
                                    </option>
                                    <option value="دسته دو">
                                        دسته دو
                                    </option>
                                </select>
                            </div>
                            <div class="number">
                                <label for="cat">شماره سریال</label>
                                <input type="text" placeholder="شماره سوال را وارد کنید" id="question-number">
                            </div>
                            <button id="add-question-btn" onclick="addQuestion(event)">افزودن سوال</button>
                        </div>
                    </div>
                </div>`
    },"")
    document.querySelector(".criteria-container").innerHTML = criteriaStr;
}


function openModal(e,id){
    document.querySelector(".backdrop").classList.add("open");
    document.querySelector("#add-question-btn").setAttribute("onclick","addQuestion(event,'"+ id +"')");
}
function closeModal(e){
    document.querySelector(".backdrop").classList.remove("open");
}

function addQuestion(e,id){
    let select = document.querySelector("#cat");
    let catValue = select.options[select.selectedIndex].value;
    let questionNumber = document.querySelector("#question-number").value;
    let myCriteria = criteria.filter(item => item.id == id)[0];
    myCriteria.questions.push({
        qId : myCriteria.questions.length,
        q : "سوال یک",
        qNum :questionNumber,
        cat : catValue,
    })
    printQuestion(id);
    closeModal();
    console.log(myCriteria.questions)
}


function printQuestion(id){
    console.log(id);
    let questionStr = criteria.filter(item => item.id == id)[0].questions.reduce((total,item)=>{
        console.log(item , criteria);
        return total+ `
        <div class="question">
        <h4 class="question-cat"> سوال  ${item.qNum} از ${item.cat}</h4>
        <p class="question-content">${item.q}</p>

        <div class="question-caption">
            <div class="caption">خوب</div>
            <input type="text" class="male-input" placeholder="مرد" >
            <input type="text" class="female-input" placeholder="زن" >
        </div>
        <div class="question-caption">
            <div class="caption">متوسط</div>
            <input type="text" class="male-input" placeholder="مرد" >
            <input type="text" class="female-input" placeholder="زن" >
        </div>
        <div class="question-caption">
            <div class="caption">ضعیف</div>
            <input type="text" class="male-input" placeholder="مرد" >
            <input type="text" class="female-input" placeholder="زن" >
        </div>
        <button onclick="deleteQuestion(event,${item.qId},${id})">حذف سوال </button>
    </div>`
    },"");

    if(document.querySelector("#q-" + id)){
        document.querySelector("#q-" + id).innerHTML = questionStr;
    }
    return questionStr;
}


function deleteQuestion(e,qId,cId){
    let myCriteria = criteria.filter(item => item.id == cId)[0];
    console.log(myCriteria.questions.filter(elem=>elem.qId!=qId),qId);
    myCriteria.questions = myCriteria.questions.filter(elem=>elem.qId!=qId);
    console.log(myCriteria);
    printQuestion(cId);
}