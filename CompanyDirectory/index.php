<?php include('php/server.php'); ?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>CompanyDirectory</title>
        <meta name="description" content="CompanyDirectory">
        <meta name="author" content="Harry Adams">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.24/css/dataTables.bootstrap4.min.css"/>
        <link rel="stylesheet" href="css/companyDirectory.css">

        <script src="https://kit.fontawesome.com/6edf9b9c75.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <nav id="headerBar">                      
            <i class="fas fa-bars" id="menuButton"></i>
            &nbsp&nbsp&nbsp
            <h1 id="company">Company</h1>
            <h1 id="directory">Directory</h1>
        </nav>
        <div>
            <ul id="openMenu">
                <li id="addDept" class="menuHover">Add Department</li>
                <hr>
                <li id="addLoc" class="menuHover">Add Location</li>
                <hr>
                <li id="addPer" class="menuHover">Add Personnel</li>
                <hr>
                <li id="delDept" class="menuHover">Delete Department</li>
                <hr>
                <li id="delLoc" class="menuHover">Delete Location</li>
                <hr>

                <div id="closeMenu">
                    <i class="fa fa-times"></i>
                </div>
            </ul>
        </div>

        <div id="deptPopup" class="popup">
            <div class="popupHeader">
                <h2>Add New Department</h2>
            </div>
            <div class="popupData">            
            <form action="php/server.php" method="post" id="deptForm">
                <input type='text' id='dName' name="departmentname" placeholder="enter department name">
                <br><br>
                <select id='locationSelect' name='location'>                   
                </select>   
            </form>

            <button type="submit" name="saveDept" form="deptForm" value="Submit">Submit</button>

            </div>
            <div id="closeDept" class="closePopup">
                <i class="fa fa-times"></i>
            </div>
        </div>

        <div id="locPopup" class="popup">
            <div class="popupHeader">
                <h2>Add New Location</h2>
            </div>
            <div class="popupData">            
            <form action="php/server.php" method="post" id="locForm">
                <input type='text' id='locName' name="locationname" placeholder="enter location name">
            </form>

            <button type="submit" name="saveLoc" form="locForm" value="Submit">Submit</button>

            </div>
            <div id="closeLoc" class="closePopup">
                <i class="fa fa-times"></i>
            </div>
        </div>

        <div id="perPopup" class="popup">
            <div class="popupHeader">
                <h2>Add New Staff Member</h2>
            </div>
            <div class="popupData">            
            <form action="php/server.php" method="post" id="perForm">
                <input type='text' id='fName' name="firstname" placeholder="First Name">
                <br><br>
                <input type='text' id='lName' name="lastname" placeholder="Last Name">
                <br><br>
                <input type='text' id='jobTitle' name="jobtitle" placeholder="Job Title">
                <br><br>
                <input type='text' id='email' name="email" placeholder="Email Address">
                <br><br>
                <select id='departmentSelect' name='department'>                   
                </select>   
            </form>

            <button type="submit" name="savePer" form="perForm" value="Submit">Submit</button>

            </div>
            <div id="closePer" class="closePopup">
                <i class="fa fa-times"></i>
            </div>
        </div>

        <div id="updatePopup" class="popup">
            <div class="popupHeader">
                <h2>Update Staff Details</h2>
            </div>
            <div class="popupData">            
            <form action="php/server.php" method="post" id="updateForm">
                <input type='hidden' id='uid' name='uid'>
                <label for="ufName">First Name: </label>
                <input type='text' id='ufName' name="ufirstname" placeholder="">
                <br><br>
                <label for="ulName">Last Name: </label>
                <input type='text' id='ulName' name="ulastname" placeholder="">
                <br><br>
                <label for="ujobTitle">Job Title: </label>
                <input type='text' id='ujobTitle' name="ujobtitle" placeholder="">
                <br><br>
                <label for="uemail">Email: </label>
                <input type='text' id='uemail' name="uemail" placeholder="">
                <br><br>
                <select id='udepartmentSelect' name='udepartment'>                   
                </select>   
            </form>

            <button id= "updateButton" type="submit" name="saveUpdate" form="updateForm" value="Submit">Submit</button>

            </div>
            <div id="closeUpdate" class="closePopup">
                <i class="fa fa-times"></i>
            </div>
        </div>


        <div id="delDeptPopup" class="popup">
            <div class="popupHeader">
                <h2>Delete Department</h2>
            </div>
            <div class="popupData">            
            <form action="php/server.php" method="post" id="delDeptForm">
                <select id='delDeptSelect' name='delDept'>                   
                </select>   
            </form>

            <button type="submit" name="deleteDept" form="delDeptForm" value="Submit">Delete</button>

            </div>
            <div id="delCloseDept" class="closePopup">
                <i class="fa fa-times"></i>
            </div>
        </div>

        <div id="delLocPopup" class="popup">
            <div class="popupHeader">
                <h2>Delete Department</h2>
            </div>
            <div class="popupData">            
            <form action="php/server.php" method="post" id="delLocForm">
                <select id='delLocSelect' name='delLoc'>                   
                </select>   
            </form>

            <button type="submit" name="deleteLoc" form="delLocForm" value="Submit">Delete</button>

            </div>
            <div id="delCloseLoc" class="closePopup">
                <i class="fa fa-times"></i>
            </div>
        </div>
        
        <div class="container mb-3 mt-3" id="table">
            <table class="table table-striped" id="mydatatable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Department</th>
                        <th>Job Title</th>
                        <th>email</th>
                        <th>Location</th> 
                        <th></th>
                        <th></th>                        
                    </tr>
                </thead>
                
                <tfoot>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Department</th>
                        <th>Job Title</th>
                        <th>email</th>
                        <th>Location</th>
                        <th></th>   
                        <th></th>                        
                    </tr>
                </tfoot>
            </table>
        </div>
        
        <script type="application/javascript" src="js/jquery-2.2.3.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

        <script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/1.10.24/js/dataTables.bootstrap4.min.js"></script>
        <script type="application/javascript" src="js/script.js"></script>
    </body>
</html>