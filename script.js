let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const delBtn = document.getElementById("del-btn");
const saveBtn = document.getElementById("save-btn");
const delLastBtn = document.getElementById("del-last-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads){
    let listItems = "";
    for(let i = 0; i < leads.length; i++){
        listItems += `
        <li>
            <a href='${leads[i]}' target='_blank'> 
                ${leads[i]}
            </a>
        </li>
    `;
    }
    ulEl.innerHTML = listItems;
}

saveBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("leads",JSON.stringify(myLeads));
        render(myLeads);
    
    })
})

delBtn.addEventListener("click",function(){
    myLeads = [];
    localStorage.clear();
    render(myLeads);
})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("leads",JSON.stringify(myLeads));
    render(myLeads);
});

delLastBtn.addEventListener("click",function(){
    let lastItem = myLeads.pop().value;
    localStorage.removeItem("leads",lastItem);
    console.log(lastItem);
    render(myLeads);
})

