var editor;

$('#menuButton').click(function() {
    $('#openMenu').show();
});

$('#closeMenu').click(function() {
    $('#openMenu').hide();
});

$('#addDept').click(function() {
    $('#deptPopup').show();
});

$('#closeDept').click(function() {
    $('#deptPopup').hide();
});

$('#addLoc').click(function() {
    $('#locPopup').show();
});

$('#closeLoc').click(function() {
    $('#locPopup').hide();
});

$('#addPer').click(function() {
    $('#perPopup').show();
});

$('#closePer').click(function() {
    $('#perPopup').hide();
});

$('#closeUpdate').click(function() {
    $('#updatePopup').hide();
});

$('#delDept').click(function() {
    $('#delDeptPopup').show();
});

$('#delCloseDept').click(function() {
    $('#delDeptPopup').hide();
});

$('#delLoc').click(function() {
    $('#delLocPopup').show();
});

$('#delCloseLoc').click(function() {
    $('#delLocPopup').hide();
});

$(document).ready(function () {

    $.ajax({
        url: "php/getAll.php",
        type: 'POST',
        dataType: 'json',
    
        success: function(result) {

            if (result.status.name == "ok") {
                console.log(result.data)

                var information = result.data; 
                 
                 $('#mydatatable').DataTable({
                    data: information,
                    columns: [
                        { data:'id', className: 'id', title: 'ID' },
                        { data:'firstName', className: 'fName', title: 'First Name' },
                        { data:'lastName', className: 'lName', title: 'Last Name' },
                        { data:'department', className: 'dept', title: 'Department' },
                        { data:'jobTitle', className: 'job', title: 'Job Title' },
                        { data:'email', className: 'email', title: 'Email' },
                        { data:'location', title: 'Location' },
                        {
                            data: "ID",
                            render:function (data, type, row) {
                                    return `<button class='edit' >edit</button>`;  
                            }
                        },
                        {
                            data: "ID",
                            render:function (data, type, row) {
                                    return `<button class='delete' >delete</button>`;
                        }
                    } 
                    ],
                    initComplete: function () {
                        this.api().columns([3,4,6]).every( function () {
                            var column = this;
                            var select = $('<select><option value=""></option></select>')
                                .appendTo( $(column.footer()).empty() )
                                .on( 'change', function () {
                                    var val = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                    );
             
                                    column
                                        .search( val ? '^'+val+'$' : '', true, false )
                                        .draw();
                                } );
             
                            column.data().unique().sort().each( function ( d, j ) {
                                select.append( '<option value="'+d+'">'+d+'</option>' )
                            } );
                        } );
                        
                        
                    }
                     
                 });

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});

$(document).ready(function () {

    $.ajax({
        url: "php/getAllLocations.php",
        type: 'POST',
        dataType: 'json',
    
        success: function(result) {

            if (result.status.name == "ok") {
                $('#locationSelect').html('');
                $('#delLocSelect').html(''); 

                $.each(result.data, function(index) {

                    $('#locationSelect').append($('<option>',{
                        value: result.data[index].id,
                        text: result.data[index].name
                    })); 
                    $('#delLocSelect').append($('<option>',{
                        value: result.data[index].id,
                        text: result.data[index].name
                    }));                     
                 }); 


            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});

$(document).ready(function () {

    $.ajax({
        url: "php/getAllDepartments.php",
        type: 'POST',
        dataType: 'json',
    
        success: function(result) {

            if (result.status.name == "ok") {
                $('#departmentSelect').html('');
                $('#udepartmentSelect').html('');
                $('#delDeptSelect').html('');               

                $.each(result.data, function(index) {

                    $('#departmentSelect').append($('<option>',{
                        value: result.data[index].id,
                        text: result.data[index].name
                    }));   
                    $('#udepartmentSelect').append($('<option>',{
                        value: result.data[index].id,
                        text: result.data[index].name
                    }));    
                    $('#delDeptSelect').append($('<option>',{
                        value: result.data[index].id,
                        text: result.data[index].name
                    }));               
                 }); 


            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});

$('#mydatatable').on('click','.delete',function(){ 
    var row = $(this).closest('tr');
    var id = row.find('.id').text();
    
    var deleteConfirm = confirm("Are you sure?");
    if (deleteConfirm == true) {
        $.ajax({
            url: 'php/deletePersonnel.php',
            type: 'post',
            data: {
                id: id
            },
            success: function(response) {
                    alert("Record deleted.");
                    location.reload();
                }
        
        });
    }
    });

    $('#mydatatable').on('click','.edit',function(){
        var row = $(this).closest('tr');
        var id = row.find('.id').text();
        var fName = row.find('.fName').text();
        var lName = row.find('.lName').text();
        var job = row.find('.job').text();
        var email = row.find('.email').text();

        var idNum = parseInt(id, 10);

        if (Number.isInteger(idNum)) {
            console.log(id);
        }
        

        $('#ufName').val(fName);
        $('#ulName').val(lName);
        $('#ujobTitle').val(job);
        $('#uemail').val(email);
        $('#uid').val(idNum);

        $('#updatePopup').show();
    
    });
