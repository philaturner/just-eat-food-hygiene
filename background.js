chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.local.set({status: 0}, function(innerObj){
        chrome.storage.local.get(['status'], function(storageObj){
            console.log('intial status is ', storageObj)
        })
    })
})

function getScores(request, sender, sendResponse){
    fetch(`http://api.ratings.food.gov.uk/Establishments?name=${request.name}&address=${request.postCode}`, {
        method: 'GET',
        headers: {
            "X-API-VERSION": 2,
            "crossDomain": true,
        }
    })
        .then(response => response.json())
        .then(json => {
            if (json.establishments[0]) {
                sendResponse({score: json.establishments[0].RatingValue, id: request.id});
            } else {
                sendResponse({score: "Not yet scored", id: request.id});
            }
    })
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "fetch") {
            getScores(request, sender, sendResponse)
            return true
        }
});

