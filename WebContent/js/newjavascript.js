/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// <script type="text/javascript">
        
        
        $(document).ready(function(){
            
            //clear search text for customer on load
            
            $('#search').val("");
            $('#searchText').val("");
            //Fetch customer details
            //------------------------------------------------------------------------
            
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

        console.table(responseJson,['address1','address2','telephone','emailId']);
        var customer=JSON.parse(responseJson);
        
        $("#addr1").html(customer.address1);
        $("#addr2").html(customer.address2);
        $("#cno").html(customer.telephone); 
        $("#email").html(customer.emailId);
        $("#name").html(customer.name);
                        
                        
 });


                });
            
            
            
            
            
            
            //---------------------------------------------------------------------
            
            $('#searchItem').click(function(){
                
 
               $("#medium").prop("checked", true);
//                $("#medium").attr('checked', 'checked');
                
                $('#displayText').html('');
                
             var productCodes=$.trim($('#searchText').val());
                
                
                if(productCodes==null || productCodes==""){             // empty searchText validation
                    alert('Please enter product code to be searched');
                    return false;
                }
                
                else{                             // searchText is not empty
                
  $.ajax({
   
    type: 'GET',
    url: 'PopulateTable',
    data: {productCodes : productCodes},
    success: function(responseJson) {  //ajax call

     

                   
                 if(jQuery.isEmptyObject(responseJson)){
//                     alert('empty json');
                       $("#itemTable").find("tr:gt(0)").remove();
            	       var table1 = $("#itemTable");
                       var endRow = $("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                       endRow.appendTo(table1);
                       $('#displayText').html('<h4>Products not found</h4>');
                       
                     return false;
                 }
        
//                        alert('I got json!!!');
                        
                        
                          $("#itemTable").find("tr:gt(0)").remove();
            	   var table1 = $("#itemTable");
	               $.each(responseJson, function(key,value) { 
	               		   var rowNew = $("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td><input type='text' class='qty' /></td></tr>");
	                       rowNew.children().eq(0).text(""); 
	                       rowNew.children().eq(1).text(value['itemCode']); 
	                       rowNew.children().eq(2).text(value['description']); 
	                       rowNew.children().eq(3).text(value['attributes']); 
	                       rowNew.children().eq(4).text(value['price']);
                               rowNew.children().eq(5).text(value['stock']); 
	                       rowNew.children().eq(6).text(value['qty']); 
	                       rowNew.appendTo(table1);
	               });
                       
                       var endRow = $("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                       endRow.appendTo(table1);
                       $('#displayText').html('');
                       
                        
                    
//                    $('.progress').addClass('hide');
     
                    
                }
                
                
                
                
});

            




       

            }
                
            });
            
        
        
        
        
        
        
        
            $('#tableData').submit(function() {
                
//           alert('submit clicked');
        
      var data = [];
//    $('#itemTable').find('tr').each(function (rowIndex, r) {
//        var cols = [];
//        $(this).find('th,td').each(function (colIndex, c) {
//            if(colIndex==5){
//                cols.push('565');
//            }
//            else{
//            cols.push(c.textContent);
//        }
//        });
//        data.push(cols);
//    });
    
      $('#itemTable').find('tr').each(function (rowIndex, r) {    //get row 
        var cols = [];
        $(this).find('td').each(function (colIndex, c) {     //get column
            
            if(colIndex==6){                              // if column index is 5 then get qty
            var data2=$(this).find(".qty").val();
            if(data2==undefined){
                cols.push("");
            }
            cols.push(data2);
        }
        else{
        cols.push(c.textContent);
       }
        
        });
        data.push(cols);
    });
    
  //  return data;                        //array of rows (index of th-->data[0],index of first td row--> data[1]
                
  //var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg))
  
  var jsonArray=[];
  
  var i=1;
  for(i=1;i<data.length;i++){
      var itemData=data[i];
     
        if(itemData[6]!==""){       // index of column qty
        var tmp={
          
          "itemCode":itemData[1],
          "description":itemData[2],
          "attributes":itemData[3],
          "price":itemData[4],
          "stock":itemData[5],
          "qty":itemData[6]
    
        };
        
        jsonArray.push(tmp);
    }
  }
  
  if(jsonArray.length===0){
      alert("Please select products");
      return false;
  }
  var searchParameter=$('#search').val();
  
  if(searchParameter===""){
      alert("Please select customer");
      return false;
  }
  
//          $("#addr1").html(customer.address1);
//        $("#addr2").html(customer.address2);
//        $("#cno").html(customer.telephone); 
//        $("#email").html(customer.emailId);
 
// var name=$('#search').val();
// var add1=$("#addr1").html();
// var add2=$("#addr2").html();
// var tele=$("#cno").html();
 
 var customerJson={
     "name":$('#name').html(),
     "address1": $("#addr1").html(),
     "address2":  $("#addr2").html(),
     "telephone":$("#cno").html(),
     "emailId":$("#email").html()
 };
  
//            return jsonArray;
    
     $('<input type="hidden" name="json"/>').val(JSON.stringify(jsonArray)).appendTo('#tableData');
     $('<input type="hidden" name="customerJson"/>').val(JSON.stringify(customerJson)).appendTo('#tableData');
    
    });
            
            
    
        
            
        
        
         $(document).ajaxStart(function(){
                    
           $('.progress').css({
                    display:'block'
                    
                });          
     $('#load').css({
                  
                    width:'100%'
                });
});
        
        
        $(document).ajaxComplete(function(){
                
                
                 $('.progress').css({
                    display:'none'
                    
                });

                    
                
        }
                
            
            
            );
        
        
        
        
 });       
        
//    </script>
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