$(document).ready(function () {

    // Getting Navbar Html Dynamically from utility.js
    var navData = createNavbar();

    $(".navbar").append(navData);

    // Getting Contract Data from utility.js
    var data = GetAjax("test", onSuccess);

    $("h3").append(` (${data.length})`);

    //Adding each col width, property and label so that col html can be created using getContractColData()

    var contracts = {
        data: data,
        displayCols: [
            { label: "Contract#", key: "ContractNo", width: 1 },
            { label: "Product Type", key: "ProductType", width: 2 },
            { label: "Commencement date", key: "CommencementDate", width: 2 },
            { label: "Term (in months)", key: "Term", width: 2 },
            { label: "Maturity Date", key: "MaturityDate", width: 1 },
            { label: "Payment amount", key: "Amount", width: 2 }
        ],
        hiddenCols: [
            { label: "Payment frequency", key: "PaymentFrequency", width: 1 },
            { label: "Principal balance", key: "PrincipalBalance", width: 2 },
            { label: "Interest balance", key: "InterestBalance", width: 2 },
            { label: "Total balance", key: "TotalBalance", width: 2 },
            { label: "Payments remaining ", key: "PaymentsRemaining", width: 1 }
        ]
    }

    // Creating Contract HTML
    $.each(contracts.data, function (index, item) {
        row = `
        <div class="accordion">
            <div class="row">`

        $.each(contracts.displayCols, function (index, col) {
            row += getContractColData(col.label, item[col.key], col.width)
        });

        row += getContractColData("Status", item.Status == true ? "<i class='status-icon fa fa-check-circle'></i>" : "<i class='status-icon fa fa-clock-o'></i>", 1);

        row += ` <div class="col-1"><i class="panel-icon fa fa-chevron-circle-down "></i></div>    
            </div>
            <div class="row panel"> `

        $.each(contracts.hiddenCols, function (index, col) {
            row += getContractColData(col.label, item[col.key], col.width)
        });
        row +=
            `</div>   

        </div>`;

        $("#grid").append(row);
    });

    // Handling expand of each contract from utility.js
    handleAccordion(true, 'fa-chevron-circle-down', 'fa-chevron-circle-up');

});

/**
   * Creates col HTML
   *
   * @param {string} label
   *   Contract Proprty Label.
   * @param {string} text
   *    Contract Proprty Data
   * @param {number} width
   *  Item Width
   *
*/
function getContractColData(label, text, width) {
    return `<div class="col-${width}">
                            <p class="data-header">${label}</p>
                            <p class="data-text">  ${text} </p>
                         </div>`;
}

/**
   * Success callback to be called on Real Time API success
   *
   * @param {object} res
   *   Data returned from API
   *
*/
function onSuccess(res) {
    console.log(res)
}

