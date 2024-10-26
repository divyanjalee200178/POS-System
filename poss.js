let customer_arr = [];

const loadCustomerTabel = () => {
    $("#customerTableBody").empty();

    customer_arr.map((item) => {
        let data = `<tr><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.mobile}</td><td>${item.email}</td><td>${item.address}</td></tr>`;
        $("#customerTableBody").append(data);
    });
}

$("#cusbtn").on("click", function () {
    let first_name = $('#firstName').val();
    let last_name = $('#lastName').val();
    let mobile = $('#mobile').val();
    let email = $('#email').val();
    let address = $('#address').val();

    let customer = {
        id: "",
        first_name: first_name,
        last_name: last_name,
        mobile: mobile,
        email: email,
        address: address
    };
    customer_arr.push(customer);


    loadCustomerTabel();
});

let item_arr=[];

const loadItemTable=()=>{
    $("#itemTableBody").empty();

    item_arr.map((item)=>{
        let data=`<tr><td>${item.name}</td><td>${item.unit_price}</td><td>${item.qty}</td><td>${item.description}</td></tr>`;
        $("#itemTableBody").append(data);
    });
}

$("#itbtn").on("click", function () {
    let name = $('#name').val();
    let unit_price = $('#unitPrice').val();
    let qty= $('#qty').val();
    let description = $('#description').val();


    let item = {
        id: "",
        name: name,
        unit_price: unit_price,
        qty:qty,
        description:description
    };
    item_arr.push(item);


    loadItemTable();
});
