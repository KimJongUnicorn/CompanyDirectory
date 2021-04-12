<?php
    
    $name = "";
    $locationID = "";

    include("config.php");
    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

    if (isset($_POST['saveDept'])) {
        $name = $_POST['departmentname'];
        $locationID = $_POST['location'];

        $query = "INSERT INTO department (name, locationID) VALUES ('$name', '$locationID')";
        mysqli_query($conn, $query);
        echo "<script type='text/javascript'>document.location='/CompanyDirectory/index.php';alert('New Department Added Successfully!')</script>";
        }

    if (isset($_POST['saveLoc'])) {
        $name = $_POST['locationname'];

        $query = "INSERT INTO location (name) VALUES ('$name')";
        mysqli_query($conn, $query);
        echo "<script type='text/javascript'>document.location='/CompanyDirectory/index.php';alert('New Location Added Successfully!')</script>";
        }

    if (isset($_POST['savePer'])) {
        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $jobtitle = $_POST['jobtitle'];
        $email = $_POST['email'];
        $departmentID = $_POST['department'];

        $query = "INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES ('$firstname', '$lastname', '$jobtitle', '$email', '$departmentID')";
        mysqli_query($conn, $query);
        echo "<script type='text/javascript'>document.location='/CompanyDirectory/index.php';alert('New Staff Member Added Successfully!')</script>";
        }

    if (isset($_POST['saveUpdate'])) {
        $ufirstname = $_POST['ufirstname'];
        $ulastname = $_POST['ulastname'];
        $ujobtitle = $_POST['ujobtitle'];
        $uemail = $_POST['uemail'];
        $udepartmentID = $_POST['udepartment'];
        $uid = $_POST['uid'];

        $query = "UPDATE personnel SET firstName='$ufirstname', lastName='$ulastname', jobTitle='$ujobtitle', email='$uemail', departmentID='$udepartmentID' WHERE personnel.id=$uid";
        mysqli_query($conn, $query);     
        echo "<script type='text/javascript'>document.location='/CompanyDirectory/index.php';alert('Staff Member Updated Successfully!')</script>";             
    }
        
    if (isset($_POST['deleteDept'])) {
        $id = $_POST['delDept'];

        $query = "SELECT * FROM personnel WHERE departmentID = $id";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result)==0) {
            $query2 = "DELETE FROM department WHERE department.id = $id";
            mysqli_query($conn, $query2);
            echo "<script type='text/javascript'>document.location='/CompanyDirectory/index.php';alert('Department deleted successfully!')</script>";
        } else {
            echo "<script type='text/javascript'>document.location='/CompanyDirectory/index.php';alert('Cannot delete department whilst staffed!')</script>";
        }    
        
        
        
    }

    if (isset($_POST['deleteLoc'])) {
        $id = $_POST['delLoc'];

        $query = "SELECT * FROM department WHERE locationID = $id";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result)==0) {
            $query2 = "DELETE FROM location WHERE location.id = $id";
            mysqli_query($conn, $query2);
            echo "<script type='text/javascript'>document.location='/CompanyDirectory/index.php';alert('Location deleted successfully!')</script>";
        } else {
            echo "<script type='text/javascript'>document.location='/CompanyDirectory/index.php';alert('Cannot delete Location whilst staffed!')</script>";
        }    
        
        
        
    }

?>