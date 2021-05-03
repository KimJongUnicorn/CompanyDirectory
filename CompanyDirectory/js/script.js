
$('#menuButton').click(function() {
    $('#openMenu').toggle();
});

$('#addDept').click(function() {
    $('#deptPopup').modal('show');
});

$('#closeDept').click(function() {
    $('#deptPopup').modal('hide');
});

$('#addLoc').click(function() {
    $('#locPopup').modal('show');
});

$('#closeLoc').click(function() {
    $('#locPopup').modal('hide');
});

$('#addPer').click(function() {
    $('#perPopup').modal('show');
});

$('#closePer').click(function() {
    $('#perPopup').modal('hide');
});

$('#closeUpdate').click(function() {
    $('#updatePopup').modal('hide');
});

$('#closeDel').click(function() {
    $('#delPopup').modal('hide');
});

$('#closeDelDept').click(function() {
    $('#delDeptConfirmPopup').modal('hide');
});

$('#closeDelLoc').click(function() {
    $('#delLocConfirmPopup').modal('hide');
});

var table = '';
var information = '';
//POPULATING THE DEPARTMENT DROPDOWNS
function populateDepts() {
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
}
//POPULATING THE LOCATION DROPDOWNS
function populateLocs() {
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
}
//LOADING THE TABLE DATA
$(document).ready(function () {

    populateDepts();
    populateLocs();
                 
                table = $('#mydatatable').DataTable({
                    "ajax": {
                        "url": "php/getAll.php",
                        "type": "POST"
                    },
                    responsive: true,
                    "scrollX": false, 
                    "bPaginate": false,
                    "bInfo" : false,
                    "scrollY": "60vh", 
                    "order": [[ 2, "asc" ]],                
                    columnDefs: [{
                        "defaultContent": "-",
                        "targets": "_all",
                        "orderable": false, "targets": [7, 8] 
                      }],
                    data: information,
                    columns: [
                        { data:'id', className: 'id', title: 'ID' },
                        { data:'firstName', className: 'fName', title: 'First Name' },
                        { data:'lastName', className: 'lName', title: 'Last Name' },
                        { data:'department', className: 'dept', title: 'Department' },
                        { data:'location', title: 'Location' },
                        { data:'jobTitle', className: 'job', title: 'Job Title' },
                        { data:'email', className: 'email', title: 'Email' },
                        {
                            data: "ID",
                            render:function (data, type, row) {
                                    return `<button type="button" class="btn btn-secondary editPer"><i class="fas fa-edit"></i></button>`;  
                            }
                        },
                        {
                            data: "ID",
                            render:function (data, type, row) {
                                    return `<button type="button" class="btn btn-danger deletePer"><i class="fas fa-trash-alt"></i></button>`;
                        }
                    } 
                    ],
                    initComplete: function () {
                        this.api().columns([3,4,5]).every( function () {
                            var column = this;
                            var select = $(`<select class="form-control"><option value="">Filter by..</option></select>`)
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

                 table.columns( [0] ).visible( false );

                 //DEPARTMENTS TABLE
                 table2 = $('#mydatatable2').DataTable({
                    "ajax": {
                        "url": "php/getAllDepartments.php",
                        "type": "POST"
                    },
                    responsive: true,
                    "scrollX": false, 
                    "bPaginate": false,
                    "bInfo" : false,
                    "scrollY": "60vh",                
                    columnDefs: [{
                        "defaultContent": "-",
                        "targets": "_all",
                        "orderable": false, "targets": [3] 
                      }],
                    data: information,
                    columns: [
                        { data:'id', className: 'id', title: 'ID' },
                        { data:'name', className: 'name', title: 'Name' },
                        { data:'location', className: 'loc', title: 'Location' },
                        {
                            data: "ID",
                            render:function (data, type, row) {
                                    return `<button type="button" class="btn btn-danger deleteDept"><i class="fas fa-trash-alt"></i></button>`;
                        }
                    } 
                    ],                              
                 });

                 table2.columns( [0] ).visible( false );

                 //LOCATIONS TABLE
                 table3 = $('#mydatatable3').DataTable({
                    "ajax": {
                        "url": "php/getAllLocations.php",
                        "type": "POST"
                    },
                    responsive: true,
                    "scrollX": false, 
                    "bPaginate": false,
                    "bInfo" : false,
                    "scrollY": "60vh",                
                    columnDefs: [{
                        "defaultContent": "-",
                        "targets": "_all",
                        "orderable": false, "targets": [2] 
                      }],
                    data: information,
                    columns: [
                        { data:'id', className: 'id', title: 'ID' },
                        { data:'name', className: 'name', title: 'Name' },
                        {
                            data: "ID",
                            render:function (data, type, row) {
                                    return `<button type="button" class="btn btn-danger deleteLoc"><i class="fas fa-trash-alt"></i></button>`;
                        }
                    } 
                    ],                              
                 });

                 table3.columns( [0] ).visible( false );

});

//SCROLLTOP AND REFRESH BUTTONS
$('#scrollButton').click(function() {
    $("div.dataTables_scrollBody").scrollTop(0);
});

$('#refreshButton').click(function() {
    table.ajax.reload(null, false);
    table2.ajax.reload(null, false);
});

//DELETING STAFF
$('#mydatatable').on('click','.deletePer',function(){ 
    var row = $(this).closest('tr');
    var id = $('#mydatatable').DataTable().row(row).data().id;
    var delName = $('#mydatatable').DataTable().row(row).data().firstName;
    var delLName = $('#mydatatable').DataTable().row(row).data().lastName;

    $('#delTitle').html(`Removing ${delName} ${delLName} from Staff`);
    $('#delPopup').modal('show');
    
    $( "#saveDel" ).click(function() {
        $.ajax({
            url: 'php/deletePersonnel.php',
            type: 'post',
            data: {
                id: id
            },
            success: function(response) {
                $('#delAlert').html(`${delName} ${delLName} removed from staff.`)
                $('#delPopup').modal('hide');
                $("#delAlert").fadeTo(3000, 500).slideUp(500, function(){
                    $("#delAlert").alert('close');
                });
                    table.ajax.reload(null, false);
                }
        
        });
      });   
    });

//POPULATING THE EDIT PERSONNEL FORM
    $('#mydatatable').on('click','.editPer',function(){
        var row = $(this).closest('tr');
        var id = $('#mydatatable').DataTable().row(row).data().id;
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

        $('#updatePopup').modal('show');
    
    });

//ADDING DEPARTMENTS
    $('#deptForm').on('submit', function (event) {
        event.preventDefault();

        var dName = $("#dName").val();
        var dLocation = $("#locationSelect").val();
    
        $.ajax({
            type: "POST",
            url: "php/server.php",
            data: {
                dName: dName,
                dLocation: dLocation
            },
            success: function(data){
                $("#deptAlert").fadeTo(3000, 500).slideUp(500, function(){
                    $("#deptAlert").alert('close');
                });
                table.ajax.reload(null, false);
                table2.ajax.reload(null, false);
                table3.ajax.reload(null, false);
                populateDepts();
                $('#openMenu').hide();
                $('#deptPopup').modal('hide');
            }
        })
    });
//ADDING LOCATIONS
    $('#locForm').on('submit', function (event) {
        event.preventDefault();

        var locName = $("#locName").val();
    
        $.ajax({
            type: "POST",
            url: "php/server.php",
            data: {
                locName: locName,
            },
            success: function(data){
                $("#locAlert").fadeTo(3000, 500).slideUp(500, function(){
                    $("#locAlert").alert('close');
                });
                table.ajax.reload(null, false);
                table2.ajax.reload(null, false);
                table3.ajax.reload(null, false);
                populateLocs();
                $('#openMenu').hide();
                $('#locPopup').modal('hide');
            }
        })
    });
//ADDING PERSONNEL
    $('#perForm').on('submit', function (event) {
        event.preventDefault();

        var fName = $("#fName").val();
        var lName = $("#lName").val();
        var jobTitle = $("#jobTitle").val();
        var email = $("#email").val();
        var departmentSelect = $("#departmentSelect").val();
    
        $.ajax({
            type: "POST",
            url: "php/server.php",
            data: {
                fName: fName,
                lName: lName,
                jobTitle: jobTitle,
                email: email,
                departmentSelect: departmentSelect
            },
            success: function(data){
                $("#perAlert").fadeTo(3000, 500).slideUp(500, function(){
                    $("#perAlert").alert('close');
                });
                table.ajax.reload(null, false);
                $('#openMenu').hide();
                $('#perPopup').modal('hide');
            }
        })
    });
//UPDATING PERSONNEL
    $('#updateForm').on('submit', function (event) {
        event.preventDefault();

        var ufName = $("#ufName").val();
        var ulName = $("#ulName").val();
        var ujobTitle = $("#ujobTitle").val();
        var uemail = $("#uemail").val();
        var udepartmentSelect = $("#udepartmentSelect").val();
        var uid = $("#uid").val();
    
        $.ajax({
            type: "POST",
            url: "php/server.php",
            data: {
                ufName: ufName,
                ulName: ulName,
                ujobTitle: ujobTitle,
                uemail: uemail,
                udepartmentSelect: udepartmentSelect,
                uid: uid
            },
            success: function(data){
                $("#updateAlert").fadeTo(3000, 500).slideUp(500, function(){
                    $("#updateAlert").alert('close');
                });
                table.ajax.reload(null, false);
                $('#updatePopup').modal('hide');
            }
        })
    });

    //REMOVING DEPARTMENTS
    $('#mydatatable2').on('click','.deleteDept',function(){ 
        var row = $(this).closest('tr');
        var delDeptSelect = $('#mydatatable2').DataTable().row(row).data().id;
        var deptName = $('#mydatatable2').DataTable().row(row).data().name;
            
        $('#delDeptTitle').html(`Removing ${deptName} from Departments.`);
        $('#delDeptConfirmPopup').modal('show');

        $('#saveDelDept').click(function() {
                $.ajax({
                    type: "POST",
                    url: "php/server.php",
                    data: {
                         delDeptSelect: delDeptSelect
                    },
                    success: function(data){
                        $('#delDeptAlert').html(`${deptName} removed from Departments.`)
                        $('#delDeptConfirmPopup').modal('hide');
                        $('#openMenu').hide();
                        $("#delDeptAlert").fadeTo(3000, 500).slideUp(500, function(){
                            $("#delDeptAlert").alert('close');
                        });
                            table.ajax.reload(null, false);
                            table2.ajax.reload(null, false);
                            table3.ajax.reload(null, false);
                            populateDepts();
                    },
                    error: function() {
                        $('#delDeptAlert').html(`Cannot remove ${deptName} whilst staffed!`)
                        $('#delDeptConfirmPopup').modal('hide');
                        $('#openMenu').hide();
                        $("#delDeptAlert").fadeTo(3000, 500).slideUp(500, function(){
                            $("#delDeptAlert").alert('close');
                        });
                    }
                })
            });        
        });

    //REMOVING LOCATIONS
    $('#mydatatable3').on('click','.deleteLoc',function(){ 
        var row = $(this).closest('tr');
        var delLocSelect = $('#mydatatable3').DataTable().row(row).data().id;
        var locName = $('#mydatatable3').DataTable().row(row).data().name;
            
        $('#delLocTitle').html(`Removing ${locName} from Locations.`);
        $('#delLocConfirmPopup').modal('show');

        $('#saveDelLoc').click(function() {
                $.ajax({
                    type: "POST",
                    url: "php/server.php",
                    data: {
                        delLocSelect: delLocSelect
                    },
                    success: function(data){
                        $('#delLocAlert').html(`${locName} removed from Locations.`)
                        $('#delLocConfirmPopup').modal('hide');
                        $('#openMenu').hide();
                        $("#delLocAlert").fadeTo(3000, 500).slideUp(500, function(){
                            $("#delLocAlert").alert('close');
                        });
                            table.ajax.reload(null, false);
                            table2.ajax.reload(null, false);
                            table3.ajax.reload(null, false);
                            populateLocs();
                    },
                    error: function() {
                        $('#delLocAlert').html(`Cannot remove ${locName} whilst staffed!`)
                        $('#delLocConfirmPopup').modal('hide');
                        $('#openMenu').hide();
                        $("#delLocAlert").fadeTo(3000, 500).slideUp(500, function(){
                            $("#delLocAlert").alert('close');
                        });
                    }
                })
        });        
    });


