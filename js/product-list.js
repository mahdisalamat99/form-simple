function openProductModal(id){
    // console.log(arguments);
    let productName = document.querySelector("#product-name");
    productName.value = "";
    document.querySelector(".backdrop").classList.add("open");
    document.querySelector("#add-product-btn").setAttribute("onclick",`addProduct(${id})`);
    document.querySelector("#product-name").focus();
}

function closeProductModal(){
    document.querySelector(".backdrop").classList.remove("open");
}


$(document).ready(function(){
    getAllProducts();
})

let productList = [];
function addProduct(id){
    let productName = document.querySelector("#product-name");
    let productNameValue = productName.value;
    console.log(productNameValue);

    if(id == undefined){
  
        $.ajax({
            url : 'http://192.168.1.66/insert.php/',
            method : 'POST',
            dataType : 'json',
            data:{id:1, product_name:productNameValue},
            success : function (){
                getAllProducts();

            }
        })
    } else {
        console.log("else");
        $.ajax({
            url :'http://192.168.1.66/update.php/',
            method : 'POST',
            dataType : 'json',
            data : {id : id , product_name :"mahdi"},
            success : function(){
                getAllProducts();
            }
        })
    };

    closeProductModal();

};




document.querySelector("#product-name").addEventListener("keydown",(event)=>{
    if(event.keyCode === 13){
        addProduct();
    }
})



function getAllProducts(){
    // ajax
    $.ajax({
        url:'http://192.168.1.66/db.php',
        method : 'GET',
        dataType : 'json',
        success : function(r){
            productList = r;
            printProduct();
        },
        error : function (error){
            console.log(error);
        }
    })

    // fetch
    // fetch('http://192.168.1.60/db.php').then(res => res.json()).then(data => console.log(data));
}


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
            <button onclick="editProduct(${item.id})" id="edit-btn">ویرایش</button>
            <button onclick="deleteProduct(${item.id})">حذف </button>
        </div>
    </div>`
    },"")

    document.querySelector("#products-containter").innerHTML = productStr;
}



function deleteProduct(id){
    $.ajax({
        url : 'http://192.168.1.66/delete.php/',
        method : 'POST',
        dataType : 'json',
        data:{id:id},
        success : function (){
            getAllProducts();
        },
        error : function(){
            console.log(error);
        }
    })
};


function editProduct(id){
    openProductModal(id);
        selectedProductList = productList.filter(product => product.id == id)[0];
        document.querySelector("#product-name").value = selectedProductList.product_name;

// 
}



{/* <p>${item.minutes} :${item.hour} - ${item.year}/${item.month}/${item.day} </p> */}
