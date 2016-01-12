function Employee(id, name) { //Constructor
    //Public member variables
    this.id = id;
    this.name = name;
    //Private member variables
    var fName;
    var lName;
    var that = this;
    //By convention, we create a private variable 'that'. This is used to
    //make the object available to the private methods.

    //Private function
    function setFName(pfname) {
        fName = pfname;
        alert('setFName called');
    }
    //Privileged function
    this.setLName = function (plName, pfname) {
        lName = plName;  //Has access to private variables
        setFName(pfname); //Has access to private function
        alert('setLName called ' + this.id); //Has access to member variables
    }
    //Another privileged member has access to both member variables and private variables
    //Note access of this.dataOfBirth created by public member setDateOfBirth
    this.toString = function () {
        return 'toString called ' + this.id + ' ' + this.name + ' ' + fName + ' ' + lName + ' ' + this.dataOfBirth;
    }
}
//Public function has access to member variable and can create on too but does not have access to private variable
Employee.prototype.setDateOfBirth = function (dob) {
    alert('setDateOfBirth called ' + this.id);
    this.dataOfBirth = dob;   //Creates new public member note this is accessed by toString
    //alert(fName); //Does not have access to private member
}
$(document).ready()
{
    var employee = new Employee(5, 'Shyam'); //Create a new object and initialize it with constructor
    employee.setLName('Bhaskar', 'Ram');  //Call privileged function
    employee.setDateOfBirth('1/1/2000');  //Call public function
    employee.id = 9;                     //Set up member value
    //employee.setFName('Ram');  //can not call Private Privileged method
    alert(employee.toString());  //See the changed object

}