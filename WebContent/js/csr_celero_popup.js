
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

     // });
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
        var customer=JSON.parse(responseJson);
        
        $("#addr1").html(customer.address1);
        $("#addr2").html(customer.address2);
        $("#cno").html(customer.telephone); 
        $("#email").html(customer.emailId);
        $("#name").html(customer.name);
                        
                        
 });


                });




//____________________________________________________________


  $('#searchItem').click(function(){
      
      
    alert('Hello Renuka');  
      

    $.ajax({
   
    type: 'GET',
    url: 'PopulateItems',
    success: function(jsonArray) {  //ajax call

     
//alert('hello');
  if(jQuery.isEmptyObject(jsonArray)){
//                     alert('empty json');

                       
  return false;
   }    
   
   
   
   var i=0;
  for(i=0;i<jsonArray.length;i++){

     RenderItems(jsonArray[i]);
 }
 
            insertEmptyRow();
            alert(jsonArray.length);
   }
                
      
                
            });

  });






//---------------------------------------------------------------------------------------------------------------------------------------------

             
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
      //---------------------------------------------------------------------------------------------------------------------------------------  
        
        
        $("#itemTable").on('click', '.btnDelete', function (event) {
                    event.stopPropagation();
                    var classname = $(this).closest('tr').attr('class');
                    if (confirm("Do you want to delete?")) {
                        this.click;
                        size++;

                        document.getElementById(classname).disabled = false;

                        $(this).closest('tr').remove();

                    } else
                    {

                    }
                    event.preventDefault();

                });

            });
       // </script>


         function displayDate(){
             var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = dd+'/'+mm+'/'+yyyy;
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
            function appendRow(e, tableID) {              //Add style variant
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
                    var deleteButton = '<td style="vertical-align:middle"><input type="image" src="images/delete4.gif"  class="btnDelete" style="width:36px;height:36px" /></td>';
                    $(newRow).find('td.addVariant').replaceWith(deleteButton);
                    $(newRow).find('td p.price').text("");
                    $(newRow).find('td input.qty').val("");
                    $(newRow).find('td table td input').val("");
                    $(newRow).find('td input.other').val("");
                    $(currentRow).after(newRow);                    //insert row after current row
                }
//                if (variant_size === 1) {
//                 element.closest('tr').find('.btn').prop('disabled', true);
//                }
                if (variant_size === 2 && total_tr_class === 1) {

                    element.closest('tr').find('.btn').prop('disabled', true);
                }
                if (total_tr_class === variant_size && variant_size > 1) {
                    element.closest('tr').find('.btn').prop('disabled', true);

                }
            }
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

                var y = ($(nestedTable).find('td input').eq(0)).val();
//                table.rows[rowIndex].cells[columnIndex]
                
                var num1 = parseInt(($(nestedTable).find('td input[type=text]').eq(0)).val());   //get quantities for different sizes
                var num2 = parseInt(($(nestedTable).find('td input[type=text]').eq(1)).val());
                var num3 = parseInt(($(nestedTable).find('td input[type=text]').eq(2)).val());
                var num4 = parseInt(($(nestedTable).find('td input[type=text]').eq(3)).val());
                var num5 = parseInt(($(nestedTable).find('td input[type=text]').eq(4)).val());


                num1 = num1 ? num1 : 0;
                num2 = num2 ? num2 : 0;
                num3 = num3 ? num3 : 0;
                num4 = num4 ? num4 : 0;
                num5 = num5 ? num5 : 0;
                
                
                var price1=parseFloat(((($(nestedTable).find('td input[type=hidden]')).eq(0)).val()).slice(1));
                var price2=parseFloat(((($(nestedTable).find('td input[type=hidden]')).eq(1)).val()).slice(1));
           var price3=parseFloat(((($(nestedTable).find('td input[type=hidden]')).eq(2)).val()).slice(1));
       var price4=parseFloat(((($(nestedTable).find('td input[type=hidden]')).eq(3)).val()).slice(1));         
         var price5=parseFloat(((($(nestedTable).find('td input[type=hidden]')).eq(4)).val()).slice(1));  
         
         
         
         
                var totalValue = price1 * num1 + price2 * num2 + price3 * num3 + price4 * num4 + price5 * num5;   // calculate total qty & price
                var qty1 = num1 + num2 + num3 + num4 + num5;


                var parentRow = $(nestedTable).parents('tr');                              //get the parent row(row of main table)
                parentRow.find('.qty').val(qty1);                                          //set total qty
                parentRow.find('.price').text(totalValue);                                 //set total price



                if (num1 !== 0) {
                    var pr1 = "$" + price1 * num1;
//                      var pr1=price1;
                    (($(nestedTable).find('tr').eq(2)).find('td p').eq(0)).text(pr1);
                }
                if (num2 !== 0) {

                    var pr2 = "$" + price2 * num2;
                    (($(nestedTable).find('tr').eq(2)).find('td p').eq(1)).text(pr2);
                }
                if (num3 !== 0) {
                    var pr3 = "$" + price3 * num3;
                    (($(nestedTable).find('tr').eq(2)).find('td p').eq(2)).text(pr3);
                }
                if (num4 !== 0) {
                    var pr4 = "$" + price4 * num4;
                    (($(nestedTable).find('tr').eq(2)).find('td p').eq(3)).text(pr4);
                }
                if (num5 !== 0) {
                    var pr5 = "$" + price5 * num5;
                    (($(nestedTable).find('tr').eq(2)).find('td p').eq(4)).text(pr5);
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

           
                        function RenderItems(item){
                        var table1 = $("#itemTable");
//	               $.each(responseJson, function(key,value) { 

             
                              var style=item.code;
                              var colors=[];
                              var i;
                              for(i=0;i<item.colors.length;i++){
                                  colors[i]=item.colors[i].colorName;
                              }
                              
                              
//                              var color1=item.colors[0].colorName;
//                              var color2=item.colors[1].colorName;
//                              var color3=item.colors[2].colorName;
                              
//                              colors=[color1,color2,color3];
//                              var x={"L":"40","S":"50"};
                              
                              var sizes=[];
                              var prices=[];
                              i=0;
                              $.each(item.colors[0].sizePriceMap, function(key, value) {
                                  
                                  sizes[i]=key;
                                  prices[i]="$"+value;
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
                                
                                
	               		   var rowNew = $(' <tr>'+

                                '<td class="mainTable style" style="vertical-align:middle">'+style+'</td>'+

                                '<td class="mainTable" style="vertical-align:middle"><select name="COLOR" class="form-control" style="width:220px">'+
                                 
//                                    
//                                        '<option>GREEN</option>'+
//                                        '<option>BLUE</option>'+
//                                        '<option>ORANGE</option>'+
                                       
                                    '</select></td>'+
                                '<td style="vertical-align:middle"><input type="text" class="form-control other" style="width:50px"></td>'+             
                    
                                    '<td class="mainTable"><div class="container"> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">size</button> <div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Modal Header</h4> </div><div class="modal-body">  <table class="nestedTable">'+
                                 '       <tr>'+
                                           ' <th style="width:60px;color:gray">Size</th>'+
//                                            '<td style="width:60px">S</td>'+
//                                            '<td style="width:60px">M</td>'+
//                                            '<td style="width:60px">L</td>'+
//                                            '<td style="width:60px">XL</td>'+
//                                            '<td style="width:60px">XXL</td>'+
                                       ' </tr>'+

                                       ' <tr>'+
                                          '  <th style=";color:gray">Qty</th>'+
//                                          ' <td><input type="text" class="form-control innerQty" style="width:50px" onkeyup="getValues(this);"></td>'+
//                                          '  <td><input type="text" class="form-control innerQty" style="width:50px" onkeyup="getValues(this);"></td>'+
//                                           ' <td><input type="text" class="form-control innerQty" style="width:50px" onkeyup="getValues(this);"></td>'+
//                                            '<td><input type="text" class="form-control innerQty" style="width:50px" onkeyup="getValues(this);"></td>'+
//                                           ' <td><input type="text" class="form-control innerQty" style="width:50px" onkeyup="getValues(this);"></td>'+
                                       ' </tr>'+

                                       ' <tr>'+
                                         '   <th style="color:gray">Price</th>'+
//                                            '<td>$40</td>'+
//                                            '<td>$40</td>'+
//                                            '<td>$40</td>'+
//                                            '<td>$40</td>'+
//                                            '<td>$40</td>'+
                                        '</tr>'+
                                    '</table></div></div></div></div></div></td>'+

                               ' <td style="vertical-align:middle"><input type="text" class="form-control qty" style="width:75px"></td>'+

                               ' <td class="mainTable" style="vertical-align:middle"><p class="price"></p></td>'+              
                               ' <td style="vertical-align:middle" class="addVariant">  <button class="btn btn-default" style="width:35px" type="button" id="btn" onclick ="appendRow(this, '+'itemTable'+ ')" ><b>+</b></button></td> ' +           
                            '</tr>');
//	                       rowNew.children().eq(0).text(""); 
//	                       rowNew.children().eq(1).text(value['itemCode']); 
//	                       rowNew.children().eq(2).text(value['description']); 
//	                       rowNew.children().eq(3).text(value['attributes']); 
//	                       rowNew.children().eq(4).text(value['price']);
//                               rowNew.children().eq(5).text(value['stock']); 
//	                       rowNew.children().eq(6).text(value['qty']); 

//                               var option = new Option(text, value); $('select').append($(option));
                               var i=0;
                               var select=rowNew.find("select");
                               for(i=0;i<colors.length;i++){
                                   var option=new Option(colors[i],colors[i]);
                                   $(select).append($(option));
                               }
                               
                               var nestedTable=rowNew.find(".nestedTable");
                               var sizeRow=$(nestedTable).find("tr").eq(0);
                               
                               for(i=0;i<sizes.length;i++){
                                   $(sizeRow).append('<td style="width:60px">'+sizes[i]+'</td>');
                               }
                               
                               var qtyRow=$(nestedTable).find("tr").eq(1);
                               for(i=0;i<sizes.length;i++){
                                   $(qtyRow).append('<td><input type="text" class="form-control innerQty" style="width:50px" onkeyup="getValues(this);"></td>');
                               }
                               
                               var priceRow=$(nestedTable).find("tr").eq(2);
                               
                                for(i=0;i<sizes.length;i++){
                                   $(priceRow).append('<td><input type="hidden"  name="" value="'+prices[i]+'"><p>'+prices[i]+'</p></td>');
                               }
                               
                               
	                       rowNew.appendTo(table1);
             }
           
           
           function insertEmptyRow(){
               var table = $("#itemTable");
               var row=$('<tr>'+
                                '<td></td>'+
                                '<td></td>'+
                                '<td></td>'+

                                '<td></td>'+
                                '<td></td>'+
                                '<td></td>'+
                                '<td></td>'+
                            '</tr>');
                    
              row.appendTo(table);     
                    
           }
           
           

