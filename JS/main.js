let siteName = document.querySelector("#siteName");
let siteURL = document.querySelector("#siteURL");
let submit = document.querySelector("#submit");
let update = document.querySelector("#update");
let search = document.querySelector("#search")


let sites ;
let indexOfSite;
if(localStorage.getItem("sites") == null){
  sites = [];
}else {
  sites = JSON.parse(localStorage.getItem("sites"));
  display(sites);
}


submit.addEventListener("click",function () {
  addSite();
  console.log(1);
}

)

function addSite() {
  console.log(1);
  if (validateName() == true && validateURL() == true){
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

clearForm();
}

function display(sitesArr) {
  let siteRow = '';
  for (var i = 0; i < sitesArr.length; i++){
    siteRow += `<tr>
    <td>${i + 1}</td>
    <td>${sitesArr[i].newName ? sitesArr[i].newName : sitesArr[i].name}</td>
    <td>
    <div class='position-relative'>
    <a href="https://${sitesArr[i].URL}" target='_blank' class="btn btn-outline-success visit">
    <i class="fa-solid fa-eye"></i>
    Visit
    </a>
    <small class='url'>https://${sitesArr[i].URL}</small>
    
    </div>
    </td>
    <td><button id="delete" onclick="updateSite(${i})" class="btn btn-outline-warning">Update</button></td>
    <td><button id="delete" onclick="deleteSite(${i})" class="btn btn-outline-danger">Delete</button></td>
  </tr>`
  }
  document.querySelector("#tbody").innerHTML = siteRow;


}

function clearForm(){
  siteName.value = '';
  siteURL.value = '';
}


search.addEventListener('keyup', function () {
  let sites = JSON.parse(localStorage.getItem('sites'))
  let afterSearch = [];
  for (let i = 0; i < sites.length; i++) {
    const element = sites[i];
    if (element.name.toLowerCase().includes(this.value.toLowerCase())) {
      afterSearch.push(element)
      sites[i].newName = sites[i].name.toLowerCase().replace(this.value.toLowerCase(),`<span class="text-danger">${this.value}</span>`)
    }
    
  }
  display(afterSearch)
})



function updateSite(index) {
  console.log(sites);
  console.log(sites[index]);
  indexOfSite = index
  siteName.value = sites[index].name;
  siteURL.value = sites[index].URL;
  submit.classList.add('d-none')
  update.classList.remove('d-none')
}

update.addEventListener('click', function () {
  replaceUpdate()
})

function replaceUpdate() {
  let sitseAfterUpdate = JSON.parse(localStorage.getItem('sites'));
  sitseAfterUpdate[indexOfSite].name = siteName.value;
  sitseAfterUpdate[indexOfSite].URL = siteURL.value;
  localStorage.setItem('sites',JSON.stringify(sitseAfterUpdate));
  sites = sitseAfterUpdate
  display(sites);
  clearForm();
  submit.classList.remove('d-none')
  update.classList.add('d-none')
}

function deleteSite(index){
  sites.splice(index,1);
  localStorage.setItem("sites",JSON.stringify(sites));
  display(sites)
}

function validateName() {
  let regex = /^([A-Za-z]{3,})([ ][A-Za-z]{3,})?([ ][0-9]{1,3})?$/;
  regex.test(siteName.value);
  if (regex.test(siteName.value) == true) {
    siteName.classList.add('validation-true');
    siteName.classList.remove('validation-false');

    return true;
  } else {
    siteName.classList.remove('validation-true');
    siteName.classList.add('validation-false');
    return false
  }

}
function closeAlert() {
    document.getElementById("alert").classList.add("d-none");
}

function validateURL(){
  var regex = /^[A-Za-z0-9]{1,}\.([a-z]{2,}\.)?[a-z]{2,4}$/
  regex.test(siteURL.value);
  if (regex.test(siteURL.value) == true){
    siteURL.classList.add('validation-true');
    siteURL.classList.remove('validation-false');
    return true;
  }else {
    siteURL.classList.add('validation-false');
    siteURL.classList.remove('validation-true');
    return false;
  }
}