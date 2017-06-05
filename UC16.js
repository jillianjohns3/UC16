function findFact(number) {
    var num = document.getElementById(number).value;

    var types = document.getElementsByName("user_type");
    var type;
    for(i = 0; i < types.length; i++){
        if(types[i].checked){
          type = types[i].value;

        }
        console.log(types[i].value);
    }
    console.log(type);

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if(this.status === 200) {
                console.log("succesful request!");
                displayFact(this.responseText);
            } else if (this.status === 404){
                displayFact("none");
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
        }
    };

    //http://numbersapi.com/random/year?json
    var url = "http://numbersapi.com/" + num + "/" + type + "?json" ;
    httpRequest.open("GET", url, true);
    httpRequest.send();
}
function displayFact(data){
    var trivia = JSON.parse(data);
    if(trivia == "none") {
        document.getElementById("output").className = "alert alert-warning";
        document.getElementById("output").innerHTML = "No fact matches this number."
    } else {
        document.getElementById("output").className = "alert alert-success";
        document.getElementById("output").innerHTML = trivia.text;
    }
}
