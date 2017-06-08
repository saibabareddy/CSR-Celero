
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// });
var jsonArray;
$(document).ready(function () {
    $(window).keydown(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            return false;
        }
    });
});
$(document).ready(function () {

    displayDate();

//-----------------------------------------------------
    $('#search').val("");
    $("#search").keyup(function () {

        if (!this.value) {
            $("#addr1").empty();
            $("#addr2").empty();
            $("#cno").empty();
            $("#email").empty();
            $("#name").empty();
        }

    });

    $("#search").on('autocompleteselect', function (event, ui) {

//                    var value = $(this).val();
        $(this).val(ui.item.label);
        var value = ui.item.label;

        $.get("FetchCustomerDetails", {
            q: value
        }, function (responseJson) {

//        console.table(responseJson,['address1','address2','telephone','emailId']);
            var customer = JSON.parse(responseJson);

            $("#addr1").html(customer.address1);
            $("#addr2").html(customer.address2);
            $("#cno").html(customer.telephone);
            $("#email").html(customer.emailId);
            $("#name").html(customer.name);


        });


    });




//____________________________________________________________






    $('#searchItem').click(function () {

        var searchText = $.trim($('#searchText').val());


        if (searchText === null || searchText === "") {             // empty searchText validation
            alert('Please enter product to be searched');
            return false;
        }

        $('#searchText').addClass('searchloading');


        $.ajax({
            type: 'GET',
            url: 'PopulateItems',
            data: {searchText: searchText},
            success: function (jsonArr) {  //ajax call
                $('#searchText').removeClass('searchloading');

                jsonArray = jsonArr;


                if (jQuery.isEmptyObject(jsonArray)) {

                    $('#searchText').removeClass('searchloading');
                    return false;
                }



                var i = 0;
                for (i = 0; i < jsonArray.length; i++) {

                    RenderItems(jsonArray[i], i);
                }

                insertEmptyRow();
//            alert(jsonArray.length);
            }



        });

    });






    //---------------------------------------------------------------------------------------------------------------------------------------  


    $("#itemTable").on('click', '.btnDelete', function (event) {
        event.stopPropagation();
        var classname = $(this).closest('tr').attr('class');

        if (confirm("Do you want to delete?")) {
            this.click;
            var table = $(this).closest('.table');
            var tr_class = $(table).find('tr.' + classname);
            $(tr_class).find('td.addVariant').find('.btn').prop('disabled', false);
         
            ///////////////////////////////////////////////aty and amt deduction
         // $(this).closest('tr').find('td')
             var qty=$(this).closest('tr').find('td').find('.qty').val();
             if(qty===""){
                 qty=0;
             }
            
            var price= $(this).closest('tr').find('td').find('.price').text();
            if(price===""){
                 price=0;
             }
            var discount = $('.table').find('.discount').val();
              var totQty = $('.table').find('.total_qty').val();
                var amt = $('.table').find('.total_amt').val();
           // alert(amt);
            ////////////////////////////
            $(this).closest('tr').remove();//deletes row
             $('.table').find('.total_qty').val(totQty-qty);
              $('.table').find('.total_amt').val(amt-price);
                 $('.table').find('.discount').val(0);
              $('.table').find('#after_dis').val(0);
        } 
        event.preventDefault();

    });

});
// </script>


function displayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    document.getElementById("date").textContent = today;
}

function capitalize(textboxid, str) {
    // string with alteast one character
    if (str && str.length >= 1)
    {
        var firstChar = str.charAt(0);
        var remainingStr = str.slice(1);
        str = firstChar.toUpperCase() + remainingStr;
    }
    document.getElementById(textboxid).value = str;
}


//        <script>
var size = null;
function appendRow(e, tableID, currentIndex) {              //Add style variant
    var element;
    if (e instanceof jQuery) {
        element = e;
    } else {
        element = jQuery(e);
    }
    element.closest('tr').find('.mainTable').text();
    var style = element.closest('tr').find('.style').text();

    element.closest('tr').find('.btn').attr("id", style);
    var currentRow = element.closest('tr');
    var variant_size = element.closest('tr').find('.mainTable .form-control option').length;
    var total_tr_class = $('.' + style).length + 1;
    if (total_tr_class <= variant_size && variant_size !== 1) {
        var currentRow = element.closest('tr').addClass(style);
        var newRow = $(currentRow).clone(true);         //clone current row
        // replace add with delete button
        var deleteButton = '<td style="vertical-align:middle"><input type="image" src="images/delete4.gif"  class="btnDelete" onClick="deleteRow(this)" style="width:36px;height:36px;float:right" /></td>';
        $(newRow).find('td.addVariant').replaceWith(deleteButton);
        $(newRow).find('td p.price').text("");
        $(newRow).find('td input.qty').val("");
        $(newRow).find('td table td input').val("");
        $(newRow).find('td input.other').val("");
//                    $(currentRow).after(newRow);                    //insert row after current row

        var newRef = $(newRow).insertAfter(currentRow);
        var newSelect = $(newRef).find('select');
        var newSelectValue = $(newRef).find('select').val();
        var findStyleRows = 'tr.' + style;
        var z = $(findStyleRows).not(newRef);
        var c;
        var triggerChange = false;
        var availableColors = [];
        var selectedColors = [];
        var i = 0;
        z.each(function () {
            selectedColors[i] = $(this).find('select').val();
            i++;
        });

        var availableOptions = $(newSelect).find('option');


        for (i = 0; i < availableOptions.length; i++) {

            availableColors[i] = $(availableOptions[i]).val();
        }

        var unselectedColors = $(availableColors).not(selectedColors).get();
        $(newSelect).val(unselectedColors[0]);
        colorSelection(newSelect, currentIndex);


    }

    if (variant_size === 2 && total_tr_class === 1) {                //minimum condition

        element.closest('tr').find('.btn').prop('disabled', true);
    }


    if (total_tr_class === variant_size && variant_size > 1) {
        element.closest('tr').find('.btn').prop('disabled', true);

    }


}
//---------------------------------------------------------------------------------------
var amount = 0;

function getValues(e) {    //parameter 'this'
//               var ee =jQuery(e);


    var element;
    if (e instanceof jQuery) {
        element = e;
    } else {
        element = jQuery(e);
    }
//                 if(element instanceof jQuery){
//                     var x=true;
//                 }
//                 
    var nestedTable = element.closest('table');                         //get the nested table
    if (nestedTable instanceof  jQuery) {
        var x = true;
    }
    var size = $(nestedTable).find(' tr td input[type=text]').length;
    //  alert(size);

    var total = "0";

    var tot_qty = 0;
    var parentRow = $(nestedTable).parents('tr');
    var pre = parentRow.find('.price').text();
//    alert(pre+"pre");
    for (var i = 0; i < size; i++) {

        var amt = "";
        var qty = parseInt(($(nestedTable).find('td input[type=text]').eq(i)).val());
        if (!isNaN(qty)) {
            var amt = $(nestedTable).find('p').eq(i).text();
            var a = "$";
            amt = amt.replace(a, '');
            // alert("price"+amt + "qty:" + qty);
            if (pre === "") {
                pre = "0";
            }

            total = parseFloat(total) + qty * parseFloat(amt);
            //alert(parseFloat(amt)+"float");

            var price = "$" + parseFloat(amt) * parseInt(qty);
            //$(nestedTable).find('p').eq(i).text(price);


            tot_qty = parseFloat(tot_qty) + parseInt(qty);

//            alert(tot_qty);

        }
        parentRow.find('.qty').val(tot_qty);
        // alert(tot_qty);
    }


    parentRow.find('.price').text(total);


//price length
    var length = $('.table').find('.price').length;

    var final_amount = 0, quantity = 0;

    var amount = $('.table').find('.price').eq(i).text();


    var discount = $('.table').find('.discount').val();
    var amt = $('.table').find('.total_amt').val();
//    alert(amt +"and " +discount+1);
    var after_dis_amt = 0;

    if (amt !== "0" && discount !== "0" && amt !== "" & discount !== "") {

        discount = discount / 100;
        discount = discount * amt;
        after_dis_amt = amt - discount;

        $('.table').find('#after_dis').val(after_dis_amt);
        //    alert(after_dis_amt);
    }

    for (var i = 0; i < length; i++) {
        var amount = $('.table').find('.price').eq(i).text();
        var qty = $('.table').find('.qty').eq(i).val();
        // alert(amount);
        if (amount !== "" && qty !== "") {
            final_amount = final_amount + parseFloat(amount);
            quantity = quantity + parseInt(qty);
        }

    }
    $('.table').find('.total_amt').val(final_amount);

    $('.table').find('.total_qty').val(quantity);
    var chk = $('.table').find('.total_qty').val();
    if (chk === 0) {
        $('.table').find('#after_dis').val(0);
    }
}

$(document).ready(function () {

    $('#tableData').submit(function () {

        markSelected();


        var rowItems = [];



        $('#itemTable').find('tr.selected').each(function (rowIndex, r) {    //get row 
//        var cols = [];
            var sizeQtyChart = [];
            var color, style, totalPrice;
            $(this).find('td.mainTable').each(function (colIndex, c) {     //get column


                if (colIndex === 0) {


//             cols.push({style:c.textContent});               //get style
                    style = c.textContent;

                }



                if (colIndex === 1) {                              // get COLOR
                    color = $(this).find("select").val();
                    if (color === undefined) {
                        color = "";
                    }
//            cols.push({color:color});
                } else if (colIndex === 2) {                                   //get sizeQtyChart
                    var sizes = [];
                    var qtys = [];
                    var prices = [];
                    var me = $(this).text();
                    $(this).find('tr').each(function (rIndex, r) {

                        $(this).find('td').each(function (cIndex, c) {

                            if (rIndex === 0) {
                                sizes[cIndex] = c.textContent;
                            }

                            if (rIndex === 1) {
                                qtys[cIndex] = $(this).find(".innerQty").val();
                            }

                            if (rIndex === 2) {
                                prices[cIndex] = c.textContent;
                            }

                        });

                    });
                    var i = 0;
//              var sizeQtyChart=[];
                    for (i = 0; i < qtys.length; i++) {
                        if (qtys[i] !== "" && qtys[i] !== undefined) {

//                     var temp= new Object();
//                     
//                     temp["size"] = sizes[i];
//                     temp["qty"] = qtys[i];
//                     temp["price"] = prices[i];
                            var temp = {size: sizes[i], qty: qtys[i], price: prices[i]};

                            sizeQtyChart.push(temp);
                        }
                    }

//              cols.push(sizeQtyChart);
                } else if (colIndex === 3) {                       //get totalPrice

                    totalPrice = c.textContent;
//          cols.push({totalPrice:c.textContent});
                }

//        


            });
            var rowItem = {style: style, color: color, sizeQtyChart: sizeQtyChart, totalPrice: totalPrice};

            rowItems.push(rowItem);
        });



        //Now filter data create JSON of SKU-Items


        var SKUitems = [];
        var j = 0;
        for (j = 0; j < rowItems.length; j++) {


            var x = 0;
            var rowItem = rowItems[j];
            var sizeQtyChart = rowItem.sizeQtyChart;

            for (x = 0; x < sizeQtyChart.length; x++) {
                var size = sizeQtyChart[x].size;
                var qty = sizeQtyChart[x].qty;
                var SKU = rowItem.style + "-" + rowItem.color + "-" + size;
                var SKUitem = {SKU: SKU, qty: qty};
                SKUitems.push(SKUitem);
            }
        }


        $('<input type="hidden" name="json"/>').val(JSON.stringify(SKUitems)).appendTo('#tableData');


    });


});

function markSelected() {

    $('#itemTable').find('.qty').each(function (rowIndex, r) {

        var markValue = $(this).val();

        if (markValue !== "" && markValue !== undefined) {

            $(this).closest('tr').addClass("selected");
        }

    });
}


function RenderItems(item, currentIndex) {
    var table1 = $("#itemTable");
//	               $.each(responseJson, function(key,value) { 


    var style = item.code;
    var colors = [];
    var i;
    for (i = 0; i < item.colors.length; i++) {
        colors[i] = item.colors[i].colorName;
    }


//                              var color1=item.colors[0].colorName;
//                              var color2=item.colors[1].colorName;
//                              var color3=item.colors[2].colorName;

//                              colors=[color1,color2,color3];
//                              var x={"L":"40","S":"50"};

    var sizes = [];
    var prices = [];
    i = 0;
    $.each(item.colors[0].sizePriceMap, function (key, value) {

        sizes[i] = key;
        prices[i] = "$" + value;
        i++;
    });
//                              var sizes=[];
//                                var style='DRESS1';
//                                var colors=[];
//                                colors[0]="RED";
//                                colors[1]="BLUE";
//                                colors[2]="GREEN";
//                                  

//                                                                   
//                                var sizes=[];
//                                sizes[0]="S";
//                                sizes[1]="M";
//                                sizes[2]="L";
//                                sizes[3]="XL";
//                                sizes[4]="XXL";
////                                
////                                
//                                var prices=[];
//                                prices[0]="$40";
//                                prices[1]="$45";
//                                prices[2]="$50";
//                                prices[3]="$55";
//                                prices[4]="$60";


//                      var items=[ {"style":"DRESS1","colors":colors,} ];          


    var rowNew = $(' <tr>' +
            '<td class="mainTable style" style="vertical-align:middle">' + style + '</td>' +
            '<td class="mainTable" style="vertical-align:middle"><select name="COLOR" onChange="ColorSelectionChange\n\
(this,' + currentIndex + ')" onClick=storePreviousOption(this) class="form-control" style="width:205px">' +
//                                    
//                                        '<option>GREEN</option>'+
//                                        '<option>BLUE</option>'+
//                                        '<option>ORANGE</option>'+

            '</select></td>' +
            //   '<td style="vertical-align:middle"><input type="text" class="form-control other" style="width:50px"></td>'+             
            '<td class="mainTable">  <table class="nestedTable">' +
            '       <tr>' +
            ' <th style="width:60px;color:gray">Size</th>' +
//                                            '<td style="width:60px">S</td>'+
//                                            '<td style="width:60px">M</td>'+
//                                            '<td style="width:60px">L</td>'+
//                                            '<td style="width:60px">XL</td>'+
//                                            '<td style="width:60px">XXL</td>'+
            ' </tr>' +
            ' <tr>' +
            '  <th style=";color:gray">Qty</th>' +
//                                          ' <td><input type="text" class="form-control innerQty" style="width:50px" onkeyup="getValues(this);"></td>'+
//                                          '  <td><input type="text" class="form-control innerQty" style="width:50px" onkeyup="getValues(this);"></td>'+
//                                           ' <td><input type="text" class="form-control innerQty" style="width:50px" onkeyup="getValues(this);"></td>'+
//                                            '<td><input type="text" class="form-control innerQty" style="width:50px" onkeyup="getValues(this);"></td>'+
//                                           ' <td><input type="text" class="form-control innerQty" style="width:50px" onkeyup="getValues(this);"></td>'+
            ' </tr>' +
            ' <tr>' +
            '   <th style="color:gray">Price</th>' +
//                                            '<td>$40</td>'+
//                                            '<td>$40</td>'+
//                                            '<td>$40</td>'+
//                                            '<td>$40</td>'+
//                                            '<td>$40</td>'+
            '</tr>' +
            '</table></td>' +
            ' <td style="vertical-align:middle"><input type="text" class="form-control qty" style="width:70px"></td>' +
            ' <td class="mainTable" style="vertical-align:middle"><p class="price" style="font-size:smaller;"></p></td>' +
            ' <td style="vertical-align:middle" class="addVariant">  <button class="btn btn-default" style="width:35px; float:right;" type="button" id=add' + style + ' onclick ="appendRow(this, ' + 'itemTable,' + currentIndex + ')" ><b>+</b></button></td> ' +
            '</tr>');
//	                       rowNew.children().eq(0).text(""); 
//	                       rowNew.children().eq(1).text(value['itemCode']); 
//	                       rowNew.children().eq(2).text(value['description']); 
//	                       rowNew.children().eq(3).text(value['attributes']); 
//	                       rowNew.children().eq(4).text(value['price']);
//                               rowNew.children().eq(5).text(value['stock']); 
//	                       rowNew.children().eq(6).text(value['qty']); 

//                               var option = new Option(text, value); $('select').append($(option));
    var i = 0;
    var select = rowNew.find("select");
    for (i = 0; i < colors.length; i++) {
        var option = new Option(colors[i], colors[i]);
        $(select).append($(option));
    }

    var nestedTable = rowNew.find(".nestedTable");
    var sizeRow = $(nestedTable).find("tr").eq(0);

    for (i = 0; i < sizes.length; i++) {
        $(sizeRow).append('<td style="width:65px;color:gray;font-weight:bold;">' + sizes[i] + '</td>');
    }

    var qtyRow = $(nestedTable).find("tr").eq(1);
    for (i = 0; i < sizes.length; i++) {

        $(qtyRow).append('<td><input type="text" class="form-control innerQty" style="width:45px" onkeyup="getValues(this);" value=""/></td>');
    }

    var priceRow = $(nestedTable).find("tr").eq(2);

    for (i = 0; i < sizes.length; i++) {
        $(priceRow).append('<td><input type="hidden" style="width:70px;" name="" value="' + prices[i] + '"><p style="font-size:smaller;">' + prices[i] + '</p></td>');
    }


    rowNew.appendTo(table1);
}


function insertEmptyRow() {
    var table = $("#itemTable");
    var row = $('<tr>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '</tr>');

    row.appendTo(table);

}



function getPreviousOption(element) {
    return $(element).data('previousSelection');
}


function storePreviousOption(element) {

    var value = $(element).val();
    $(element).data('previousSelection', value);

}




function ColorSelectionChange(element, index) {

//    var last_value = $(element).find('option').filter(':selected:last').val();




    var last_value = getPreviousOption(element);

    var value = $(element).val();
    var item = jsonArray[index];
    var findStyleRows = 'tr.' + item.code;
    var newRef = $(element).parents(findStyleRows);
    var z = $(findStyleRows).not(newRef);
    var c;
    var i = 0;
    var flag = true;
    z.each(function () {
        c = $(this).find('select').val();
        if (c === value) {

            alert(value + " is already selected for style " + item.code + ".Please choose a different color.");
            flag = false;

        }



//                     
    });

    //---------------------------------------                 
    if (flag === false) {
        $(element).val(last_value);

        return false;
    }
//                    ( $(element).find('option:selected:last')).val(value);

    colorSelection(element, index);

}





function colorSelection(element, index) {





//    var value=element.options[element.selectedIndex].value;
//    var index=element.id; 
    var value = $(element).val();
    var item = jsonArray[index];

//    //---------------------------------------------------------------------------------------
//                    var findStyleRows='tr.'+item.code;
//                    var newRef=$(element).parents(findStyleRows);
//                    var  z = $(findStyleRows).not(newRef);
//                    var c;
//                    var i=0;
//                    var flag=true;
//                     z.each(function (){
//                        c=$(this).find('select').val();
//                        if(c===value){
//                            
//                          alert(value +" is already selected for style "+item.code+".Please choose a different color.");
//                          flag=false;
//                            
//                        }
//                        
//                        
//                      
////                     
//                    });
//                    
//   //---------------------------------------                 
//                     if(flag===false){
//                       
//                         return false;
//                     }          
    //------------------------------------------------------------------------------------------------   

//    alert(item.code+ " " + value);

    var colors = item.colors;
    var sizes;
    var colorIndex;
    for (i = 0; i < colors.length; i++) {
        if (colors[i].colorName === value) {
            sizes = colors[i].sizePriceMap;
            colorIndex = i;
        }
    }


//  --------------------------------------------------------------------
    var sizes = [];
    var prices = [];
    i = 0;
    $.each((item.colors[colorIndex]).sizePriceMap, function (key, value) {

        sizes[i] = key;
        prices[i] = "$" + value;
        i++;
    });




    var row1 = '<th style="width:60px;color:gray">Size</th>';

    var row2 = '<th style=";color:gray">Qty</th>';

    var row3 = '<th style="color:gray">Price</th>';

    for (i = 0; i < sizes.length; i++) {

        row1 = row1 + '<td style="width:65px;color:gray;font-weight:bold;">' + sizes[i] + '</td>';
    }


    for (i = 0; i < sizes.length; i++) {
        row2 = row2 + '<td><input type="text" class="form-control innerQty" style="width:45px" onkeyup="getValues(this);" value=""/></td>';
    }

    for (i = 0; i < sizes.length; i++) {
        row3 = row3 + '<td><input type="hidden" style="width:70px;" name="" value="' + prices[i] + '"><p style="font-size:smaller;">' + prices[i] + '</p></td>';
    }



    var nestedTable = ($(element).closest('tr')).find('.nestedTable');
// var x=df.attr("class");
// 
// var nestedTable = $(element).closest('.nestedTable');
// var y=$(nestedTable).attr("class");
// var r1=$(nestedTable).find("tr").eq(0);


    ($(nestedTable).find("tr").eq(0)).html(row1);
    ($(nestedTable).find("tr").eq(1)).html(row2);
    ($(nestedTable).find("tr").eq(2)).html(row3);









//    alert(id);

}

////function deleteRow(element){
////    var classname = $(element).closest('tr').attr('class');
////      
////        if (confirm("Do you want to delete?")) {
//////            this.click;
//////            size++;
////
////            //document.getElementById(classname).disabled = false;
////           // $(this).closest('tr').find('#'+classname).prop('disabled', false);
////         //     $('#'+classname).prop('disabled', false);
////            var str="#add"+classname;
////            var btn= $(str);
////           
////           $(btn).prop('disabled', false);
////            $(element).closest('tr').remove();
////            
////}
//}