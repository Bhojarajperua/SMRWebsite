// Auto Fill Job Title

const params = new URLSearchParams(window.location.search);

const job = params.get("job");

const jobInput = document.getElementById("jobTitle");

if(jobInput){

if(job){

jobInput.value = job;

}

else{

jobInput.value = "General Application";

}

}