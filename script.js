document.getElementsByClassName("cta-button")[0].addEventListener("click", function(){
    document.getElementsByClassName("landing-page-container")[0].style.display = "none"
    document.getElementById("main").style.display = "flex"
})

let now = new Date()
let date = now.getDate()  + "-" + (now.getMonth()+1) + "-" + now.getFullYear() + " | " + now.getHours() + ":" + now.getMinutes()
let myMission = [
    
]

function getMissionsFormStorage(){
    let retriveMission = JSON.parse(localStorage.getItem("missions"))
    myMission = retriveMission ?? []

}

getMissionsFormStorage()
function addNewMission(nameFromUser){
    return {
        name: nameFromUser,
        date: date,
        isDone: false
    }
}

displayMyMission()

function displayMyMission(){
    document.getElementById("missinos").innerHTML = ""
    for( let j=0; j<myMission.length ; j++){
        document.getElementById("missinos").innerHTML += `
            <div class="mission-containar">
                <div>
                    <div id="mission-details">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
                            <p id="mission-id">#${(j+1)}</p>
                            <p id="mission-name">${myMission[j].name}</p>
                        </div>
                        <p id="mission-date">أنشأت في: ${myMission[j].date}</p>
                    </div>
                </div>
                <div id="mision-btns">
                    <button onclick="deleteMission(${j})" class="delete-btn">حذف</button>
                    <button onclick="editMission(${j})" class="edit-btn">تعديل</button>
                    <button onclick="finishMission(${j})" class="finish-btn">إنهاء</button>
                </div>
            </div>
        `  
    
        if(myMission[j].isDone === true){
            document.getElementsByClassName("finish-btn")[j].innerHTML = "إكمال"
            document.getElementsByClassName("mission-containar")[j].style.backgroundColor = "rgba(0, 41, 0, 1)"
            document.getElementsByClassName("finish-btn")[j].style.backgroundColor = "rgb(40, 40, 40)"
            document.getElementsByClassName("edit-btn")[j].style.display = "none"
            
        }else{
            document.getElementsByClassName("finish-btn")[j].innerHTML = "إنهاء"
            document.getElementsByClassName("mission-containar")[j].style.backgroundColor = "rgb(40, 40, 40)"
            document.getElementsByClassName("finish-btn")[j].style.backgroundColor = "rgb(0, 124, 0)"
        }
    }



}

document.getElementById("add-new-mission-btn").addEventListener("click", function(){
    document.getElementById("add-promp-main").style.display = "flex"
})

document.getElementById("add-promp-submit-btn").addEventListener("click", function(){
    if(document.getElementById("add-promp-input").value == ""){
        alert("please enter task or cancel")
    }else{
        document.getElementById("add-promp-main").style.display = "none"
        let value = document.getElementById("add-promp-input").value
        myMission.push(addNewMission(value))
        storeMission()
        displayMyMission()
        console.log(myMission)
        document.getElementById("add-promp-input").value = ""
    }
})



document.getElementById("add-promp-close-btn").addEventListener("click", function(){
    document.getElementById("add-promp-main").style.display = "none"
})
document.getElementById("add-promp-cancel-btn").addEventListener("click", function(){
    document.getElementById("add-promp-main").style.display = "none"
})

document.getElementById("edit-promp-close-btn").addEventListener("click", function(){
    document.getElementById("edit-promp-main").style.display = "none"
})
document.getElementById("edit-promp-cancel-btn").addEventListener("click", function(){
    document.getElementById("edit-promp-main").style.display = "none"
})

document.getElementById("delete-promp-no-btn").addEventListener("click", function(){
    document.getElementById("delete-promp-main").style.display = "none"
})


let indexForDelete = undefined
function deleteMission(index){
    document.getElementById("delete-promp-main").style.display = "flex"
    indexForDelete = index
}
document.getElementById("delete-promp-yes-btn").addEventListener("click", function(){
    myMission.splice(indexForDelete,1)
    storeMission()
    document.getElementById("delete-promp-main").style.display = "none"
    displayMyMission()

})

let indexForEdit = 0
function editMission(index){
    indexForEdit =index
    document.getElementById("edit-promp-main").style.display = "flex"
    document.getElementById("edit-promp-input").value = myMission[index].name
}

document.getElementById("edit-promp-submit-btn").addEventListener("click", function(){
    myMission[indexForEdit].name = document.getElementById("edit-promp-input").value
    storeMission()
    displayMyMission()
    document.getElementById("edit-promp-main").style.display = "none"
})


function finishMission(index){
    if(myMission[index].isDone === false){
        myMission[index].isDone = true
    }else{
        myMission[index].isDone = false
    }
    storeMission()
    displayMyMission()
}

function storeMission(){
    let missionsInString = JSON.stringify(myMission)
    localStorage.setItem("missions", missionsInString)
}