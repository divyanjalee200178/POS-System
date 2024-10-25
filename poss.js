let customer_arr = [];

const loadCustomerTabel = () => {
    // Clear the existing rows to avoid duplicates
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

    // Load the updated table
    loadCustomerTabel();
});
