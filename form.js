// localStorage.clear();'

    
let index = '';
CreateTable();
function readdata() { 
    if(validateform() === false){
        return false;
    }  
    else{
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pwd = document.getElementById("pwd").value;
    const mobile = document.getElementById("mobile").value;
    const brithdate = document.getElementById("b_date").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const city = document.getElementById("city").value;
    const address = document.getElementById("address").value;
    let checkbox = document.querySelectorAll('input[type=checkbox]');
    let chkInput = [];
        for(let i = 0; i< checkbox.length;i++) {
            if(checkbox[i].checked) {
                chkInput.push(checkbox[i].value);
                
            }
        }
    let image = document.getElementById("img").files[0];
    console.log(image);
    let img = URL.createObjectURL(image);
    console.log(img);
    
        let record = localStorage.getItem("data");
        if(record == null){
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(record);
        }
        taskObj.push([name,email,pwd,mobile,brithdate,gender,city,address,chkInput,img]);
        localStorage.setItem("data", JSON.stringify(taskObj));
        return true;
    }
}
CreateTable();
  
function CreateTable(){
    let record = localStorage.getItem('data');
    
    if(record == null){
        var taskObj = [];
        }
        else{
              taskObj = JSON.parse(record);
        }
        let html ='';
        let addList = document.getElementById('addList');
        html += `<tr class="table-row">
                        <th scope="column">Sr.No</th>
                        <th scope="column">Name</th>
                        <th scope="column">Email</th> 
                        <th scope="column">Password</th>
                        <th scope="column">Mobile No</th>
                        <th scope="column">BrithDate</th>
                        <th scope="column">Gender</th>
                        <th scope="column">City</th>
                        <th scope="column">Address</th>
                        <th scope="column">Languages</th>
                        <th scope="column">Image</th>
                        <th scope="column">Action</th>
                        </tr>`
        taskObj.forEach((element, index) => {
console.log(element);
           
            html +=`<tr>
                        <th scope="row">${index+1}</th>
                        <td>${element[0]}</td>
                        <td>${element[1]}</td>
                        <td>${element[2]}</td>
                        <td>${element[3]}</td>
                        <td>${element[4]}</td>
                        <td>${element[5]}</td>
                        <td>${element[6]}</td>
                        <td>${element[7]}</td>
                        <td>${element[8]}</td>
                        <td><img src="${element[9]}"</td>

    
                        <td>
                            <button type="button" onclick="edittask(${index})" class="btn"><i class="fa fa-edit"></i>Edit</button>
    
                            <button type="button" onclick="deleteitem(${index})" class="btn"><i class="fa fa-trash"></i>Delete</button>
                            
                        </td>
                            
                                
                    </tr>`;
                    
        });
        
        addList.innerHTML = html;
    }

    function deleteitem(index){
        let record = localStorage.getItem("data");
        let taskObj = JSON.parse(record);
        taskObj.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(taskObj));
        CreateTable();
    }

    function edittask(index){
        let saveindex = document.getElementById("saveindex");
        
        let submit = document.getElementById("submit");
        let savebtn = document.getElementById("savebtn");
        let checkbox = document.querySelectorAll('input[type="checkbox"]');
    
        saveindex.value = index;
    
        let record = localStorage.getItem("data");
    
        let taskObj = JSON.parse(record); 
        
       
        document.getElementById("name").value = taskObj[index][0];
        document.getElementById("email").value = taskObj[index][1];
        document.getElementById("pwd").value = taskObj[index][2];
        document.getElementById("mobile").value = taskObj[index][3];
        document.getElementById("b_date").value = taskObj[index][4];
        // document.getElementById(`${taskObj[index][5]}`).checked = true;
        document.getElementById("city").value = taskObj[index][6];
        document.getElementById("address").value = taskObj[index][7];
        let radio = taskObj[index][5];
        let radiobtn = document.querySelectorAll('input[type="radio"]')
        for(i=0;i<radiobtn.length;i++){
            radiobtn[i].checked = radiobtn[i].value === radio;
        }
        let chkInput = taskObj[index][8];
        let checkboxs=document.querySelectorAll('input[type=checkbox]')
        for(let index=0;index<checkboxs.length;index++){
            checkboxs[index].checked=chkInput.includes(checkboxs[index].value);
        }

        submit.style.display="none";
        savebtn.style.display="block";
        savebtn.style.textAlign = "center";
    }
    
    function saveitem(){
        if(validateform() === false){
            return false;
        }  
else{
    let savebtn = document.getElementById("savebtn");
    let submit = document.getElementById("submit");
    let record = localStorage.getItem("data");
    let taskObj = JSON.parse(record); 
    let saveindex = document.getElementById("saveindex").value;


    taskObj[saveindex][0] = document.getElementById("name").value;
    taskObj[saveindex][1] = document.getElementById("email").value;
    taskObj[saveindex][2] = document.getElementById("pwd").value;
    taskObj[saveindex][3] = document.getElementById("mobile").value;
    taskObj[saveindex][4] = document.getElementById("b_date").value;
    taskObj[saveindex][5] = document.querySelector('input[name="gender"]:checked').value;
    taskObj[saveindex][6] = document.getElementById("city").value;
    taskObj[saveindex][7] = document.getElementById("address").value;
    let checkbox = document.querySelectorAll('input[type=checkbox]');
    let chkInput = [];
        for(let i = 0; i< checkbox.length;i++) {
            if(checkbox[i].checked) {
                chkInput.push(checkbox[i].value);
                // console.log(chkInput,'checkbox');
                
            }
        } 
        taskObj[saveindex][8] = chkInput;
    savebtn.style.display="none";
    submit.style.display="block";
    localStorage.setItem("data", JSON.stringify(taskObj));
    CreateTable();
    document.getElementById("form").reset();
    }
}

function validateform(){
    let name = document.getElementById('name').value;
     if(name === ''){
        document.getElementById('name_error').innerHTML = 'Name must be filled out';
        return false; 
    }
    document.getElementById('name_error').innerHTML = '';

        let email = document.getElementById("email").value;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if(email === ''){
        document.getElementById('email_error').innerHTML = 'Email must be filled out';
        return false;
    }
    if(email.match(mailformat)){
        return true;
    }
    if(!(email.match(mailformat))){
        document.getElementById('email_error').innerHTML = 'Please valid Email';
        return false;
    }
    let pwd = document.getElementById('pwd').value;
   let password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
    if(pwd === ''){
        document.getElementById('pwd_error').innerHTML = 'Password must be filled out';
        return false;
    }
    if(pwd.match(password)){
        return true;
    }
    if(!(pwd.match(password))){

        document.getElementById('pwd_error').innerHTML = 'Please Enter valid Password';
        return false;
    }
    // if (pwd.match(/[a-z]/g) && pwd.match(
    //     /[A-Z]/g) && pwd.match(
    //     /[0-9]/g) && pwd.match(
    //     /[^a-zA-Z\d]/g) && pwd.length >= 8){
    //         console.log(pwd.length);
    //         return true;
            
    // }
    // if(!(pwd.match(/[a-z]/g) && pwd.match(
    //     /[A-Z]/g) && pwd.match(
    //     /[0-9]/g) && pwd.match(
    //     /[^a-zA-Z\d]/g) && pwd.length >= 8)){
    //     document.getElementById('pwd_error').innerHTML = 'Please Enter Valid Password';
    //     return false;
    // }
    let mobile = document.getElementById("mobile").value;
     if(mobile === ''){
        document.getElementById('mobile_error').innerHTML = 'Mobile Number must be filled out';
        return false;
    }
    document.getElementById('mobile_error').innerHTML = '';
    if(isNaN(mobile)){
        document.getElementById('mobile_error').innerHTML = 'Please Enter number only';
        return false;
    }
       
    let brithdate = document.getElementById("b_date").value;
     if(brithdate === ''){
        document.getElementById('bdate_error').innerHTML = 'Brithdate must be filled out';
        return false;
    }
    var radios = document.getElementsByName("gender");
    var radioValid = false;

    var i = 0;
    while (!radioValid && i < radios.length) {
        if (radios[i].checked) 
        radioValid = true;
        i++;        
    }
    if (!radioValid) {
        document.getElementById('gender_error').innerHTML = 'Must check some option!';
        return false;
    }
    var checkboxes = document.getElementsByName("lang");
    var checkValid = false;

    var i = 0;
    while (!checkValid && i < checkboxes.length) {
        if (checkboxes[i].checked) 
        checkValid = true;
        i++;        
    }
    if (!checkValid) {
        document.getElementById('lang_error').innerHTML = 'Must select some option!';
        return false;
    }
    let city = document.getElementById("city").value;
    if(city === ''){
        document.getElementById('city_error').innerHTML = 'City must be filled out';
        return false;
    }
        let address = document.getElementById("address").value;
    if(address === ''){
        document.getElementById('address_error').innerHTML = 'Address must be filled out';
        return false;
        
    }
    let fileInput = document.getElementById('img').value;
    if(fileInput === ''){
        document.getElementById('img_error').innerHTML = 'File must be upload';
        return false;
    }

    return true;
    }

    function imageValidate() {
        var fileInput = document.getElementById('img');
        var file = fileInput.value;
      
        var allowedExtensions = 
                /(\.jpg|\.jpeg|\.png|\.gif)$/i;
          
        if (!allowedExtensions.exec(file)) {
            document.getElementById('img_error').innerHTML = 'Invalid File type';
            fileInput.value = '';
            return false;
           
        }
    }
