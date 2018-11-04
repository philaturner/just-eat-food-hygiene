var establishments = document.getElementsByClassName('o-tile__details');
for (var i = 0; i < establishments.length; i++) {
    var name = establishments[i].getElementsByTagName("h2")[0].innerHTML;
    var address = establishments[i].getElementsByClassName("c-restaurant__address")[0].innerHTML;
    var addressArray = address.split(" ");
    var postCode = addressArray[addressArray.length -2];

    chrome.runtime.sendMessage({
        type: "fetch",
        name: name,
        id: i,
        postCode: postCode,
    }, (response) => {
        let node = document.createElement("h5");
        let textnode = document.createTextNode("Hygiene Score " + response.score);
        node.appendChild(textnode);
        establishments[response.id].getElementsByTagName("h2")[0].appendChild(node);
    })
}