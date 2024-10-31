import {customer_arr, item_arr, order_arr,cart_arr, orderDetail_arr} from "../db/database.js";
import OrderModel from "../model/orderModel.js";
import OrderDetailModel from "../model/orderDetail.js";

export function loadCustomers() {

    $("#customers").empty();
    customer_arr.map((item, number) => {

        let data = ` <option>${item._customer_id}</option>`

        console.log(data);
        $("#customers").append(data);

    })
}
export function loadItems(){

    $("#items").empty();
    item_arr.map((item,number) =>{

        let data = `<option>${item._item_code}</option>`

        console.log(data);
        $("#items").append(data);

    })
}

$(document).ready(function (){
    $("#orderId").val(generateOrderId());
})


//GENERATE ORDER ID

let generateOrderId = function generateOrderId(){

    let id = order_arr.length + 1;
    return "O0" + id;
}

let setOrderId = () => {
    $("#orderId").val(generateOrderId());
}


//GET ITEM DETAILS WHEN ITEM CODE IS ENTERED

$("#items").on('input', function (){

    let id = $(this).val();
    let itemCode = item_arr.findIndex(item =>
        item._item_code === id);

    if(itemCode !== 'item_code' ){

        $("#itemName").val(item_arr[itemCode]._description);
        $("#itemPrice").val(item_arr[itemCode]._unit_price);
        $("#itemQtyOnHand").val(item_arr[itemCode]._quantity);

    }else{
        $("#itemName").val("");
        $("#itemPrice").val("");
        $("#itemQtyOnHand").val("");
    }

});



$("#customerName").on('input', function () {

    let name = $(this).val().toLowerCase();

    let customer = customer_arr.find(item => item._name.toLowerCase().includes(name));

    if (customer) {

        $("#customers").val(customer._customer_id);

    } else {

        Swal.fire({

            icon: "error",
            title: "Oops...",
            text: "Customer not found!",

        });

        $("#customers").val('');
    }

});



//LOAD CART TABLE

const loadCartTable = () =>{
    cart_arr.map((item,index) =>{
        let data = `<tr><td>${item.item_code}</td><td>${item.description}</td><td>${item.unit_price}</td><td>${item.qty}</td><td>${item.total}</td></tr>`
        console.log(item);
        $('#orderTableBody').append(data);
    })
}


//ADD TO CART

$('#orSaveBtn').on('click',function (){

    let item_code = $("#items").val();
    let description = $("#itemName").val();
    let unit_price = $("#itemPrice").val();
    let qtyOnHand = $("#itemQtyOnHand").val();
    let qty = $("#itemQty").val();

    let order_id = generateOrderId();
    let date = $("#date").val();
    let customerId = $("#customers").val();
    let customerName = $("#customerName").val();
    let total = unit_price * qty;

    let payment = $("#inputTotal").val(total);


    if(qty > qtyOnHand){

        Swal.fire({

            icon: "error",
            title: "Oops...",
            text: "Not enough quantity!",

        });

    }else if((item_code.length == 0) || (description.length == 0) || (unit_price.length == 0) || (qtyOnHand.length == 0) || (qty.length == 0) || (order_id.length == 0) || (date.length ==0) || (customerId.length == 0) || (customerName.length == 0)){

        Swal.fire({

            icon: "error",
            title: "Oops...",
            text: "Empty fields!",

        });
    }
    else {

        let cart_item = {
            item_code:item_code,
            description:description,
            unit_price:unit_price,
            qty:qty,
            total:total
        }


        cart_arr.push(cart_item);

        loadCartTable();
        updateItemArray();

        console.log(item_arr);
    }


});


//UPDATE ITEM ARRAY AFTER ORDER IS PLACED

function updateItemArray() {

    let item_code = $("#items").val();
    let qtyOnHand = parseInt($("#itemQtyOnHand").val());
    let qty = parseInt($("#itemQty").val());

    // Find the item in the array
    let item = item_arr.find(item => item._item_code === item_code);

    // Check that item is exists

    if (item) {
        item._quantity = qtyOnHand - qty; // Update the quantity

    } else {
        console.error(`Item not found in itemArray`);

    }
}

let orderCount = 0;
$('#order-count').text(orderCount);



//PLACE ORDER

$("#order_btn").on('click',function (){

    let item_code = $("#items").val();
    let unit_price = $("#itemPrice").val();
    let qty = $("#itemQty").val();

    let order_id = generateOrderId();
    let date = $("#date").val();
    let customerId = $("#customers").val();
    let customerName = $("#customerName").val();
    let total = unit_price * qty;

    let order = new OrderModel(
        order_id,
        customerId,
        date,
        total
    )

    let orderDetail = new OrderDetailModel(
        order_id,
        item_code,
        qty,
        unit_price
    )

    if(order_arr.push(order) && orderDetail_arr.push(orderDetail)){

        console.log(order);
        console.log(orderDetail);

        Swal.fire({
            title: "Order Placed Successfully!",
            icon: "success"
        });

        clearOrderForm();
        setOrderId();

        orderCount += 1;
        $('#order-count').text(orderCount);

    }else{

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Order not placed!",

        });
    }

});

function clearOrderForm(){

    $("#items").val('');
    $("#itemPrice").val('');
    $("#itemName").val('');
    $("#itemQty").val('');
    $("#itemQtyOnHand").val('');
    $("#orderId").val('');
    $("#date").val('');
    $("#customers").val('');
    $("#customerName").val('');
    $("#inputTotal").val('');
    clearTable();
}


//CLEAR TABLE

function clearTable() {
    let tableBody = $("#orderTableBody")[0];
    tableBody.innerHTML = ''; // Clear all rows
}

