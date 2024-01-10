let siteName = document.querySelector("#siteName");
let siteURL = document.querySelector("#siteURL");
let submit = document.querySelector("#submit");


let sites ;
if(localStorage.getItem("sites") == null){
  sites = [];
}else {
  sites = JSON.parse(localStorage.getItem("sites"));
  display(sites);
}


submit.addEventListener("click",function () {
  addSite();
}

)

function addSite() {
  if (validateName() == true){
  let site = {
    name: siteName.value,
    URL: siteURL.value
  };
  validateName();
  sites.push(site);
  display(sites);
  localStorage.setItem("sites",JSON.stringify(sites));
}else {
  document.getElementById("alert").classList.remove("d-none");
  document.getElementById("close").addEventListener("click",function() {
    closeAlert();
  })

}
if (validateURL() == true){
  let site = {
    name: siteName.value,
    URL: siteURL.value
  };
  validateName();
  validateURL();
  sites.push(site);
  display(sites);
  localStorage.setItem("sites",JSON.stringify(sites));
}else {
  document.getElementById("alert").classList.remove("d-none");
  document.getElementById("close").addEventListener("click",function() {
    closeAlert();
  })
  
}
clearForm();
}

function display(sitesArr) {
  let siteRow = '';
  for (var i = 0; i < sitesArr.length; i++){
    siteRow += `<tr>
    <td>${i + 1}</td>
    <td>${sitesArr[i].name}</td>
    <td><a href="https://${siteURL.value}" target='_blank' class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</a></td>
    <td><button id="delete" onclick="deleteSite(${i})" class="btn btn-danger">Delete</button></td>
  </tr>`
  }
  document.querySelector("#tbody").innerHTML = siteRow;
  // clearForm();

}

function clearForm(){
  siteName.value = '';
  siteURL.value = '';
}

function deleteSite(index){
  sites.splice(index,1);
  localStorage.setItem("sites",JSON.stringify(sites));
  display(sites)
}

function validateName() {
  let regex = /^[A-Za-z]{3,}$/;
  regex.test(siteName.value);
  if (regex.test(siteName.value) == true) {
    siteName.style.border= '2px solid green';
    return true;
  } else {
    siteName.style.border= '2px solid red';
    return false
  }

}
function closeAlert() {
    document.getElementById("alert").classList.add("d-none");
}

function validateURL(){
  var regex = /^[A-Za-z0-9]{1,}\.[a-z]{2,4}$/
  regex.test(siteURL.value);
  if (regex.test(siteURL.value) == true){
    siteURL.style.border = '2px solid green';
    return true;
  }else {
    siteURL.style.border = '2px solid red';
    return false;
  }
}