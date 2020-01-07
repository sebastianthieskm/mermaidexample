"use strict";
var myNumber = 0;
function myRun() {
    setTreeControl('');
    var toggler = document.getElementsByClassName("caret");
    var i = 0;
    for (var i_1 = 0; i_1 < toggler.length; i_1++) {
        var element = toggler[i_1];
        element.addEventListener("click", function () {
            var myParentElement = this.parentElement;
            if (myParentElement != null) {
                var myNestedItems = myParentElement.querySelector(".nested");
                if (myNestedItems != null) {
                    myNestedItems.classList.toggle("active");
                }
            }
            // @ts-ignore: NAV Invoke
            Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('TreeItemClicked', this.id);
            this.classList.toggle("caret-down");
        });
    }
    var otherElements = document.getElementsByClassName("noncaret");
    for (var i_2 = 0; i_2 < otherElements.length; i_2++) {
        var element = otherElements[i_2];
        element.addEventListener("click", function () {
            // @ts-ignore: NAV Invoke
            Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('TreeItemClicked', this.id);
        });
    }
}
function setTreeControl(inputText) {
    var myBody = document.getElementById('controlAddIn');
    var myNewTree;
    if (inputText === '') {
        myNewTree = JSON.parse('[ \
            {"entryNo": 1, "description": "Deutschland", "parentEntryNo": 0}, \
                {"entryNo": 2, "description": "Niedersachsen", "parentEntryNo": 1}, \
                    {"entryNo": 3, "description": "Hannover", "parentEntryNo": 2}, \
                        {"entryNo": 9, "description": "Bothfeld", "parentEntryNo": 3}, \
                        {"entryNo": 10, "description": "Lahe", "parentEntryNo": 3}, \
                        {"entryNo": 11, "description": "Mitte", "parentEntryNo": 3}, \
                    {"entryNo": 4, "description": "Braunschweig", "parentEntryNo": 2}, \
                {"entryNo": 5, "description": "Nordrhein Westfalen", "parentEntryNo": 1}, \
                    {"entryNo": 6, "description": "Dortmund", "parentEntryNo": 5}, \
                    {"entryNo": 7, "description": "Köln", "parentEntryNo": 5}, \
                {"entryNo": 8, "description": "Sachsen", "parentEntryNo": 1} \
            ]');
    }
    else {
        myNewTree = JSON.parse(inputText);
    }
    var myNewList = document.createElement("ul");
    myNewList.id = "myUL";
    myNumber = 0;
    var myNewTreeFirstLevel = myNewTree.filter(findChilds);
    myNewTreeFirstLevel.forEach(function (treeElement) {
        var newLiElement = document.createElement("li");
        var newSpanElement = document.createElement("span");
        newSpanElement.id = treeElement.entryNo.toString();
        if (hasChilds(treeElement, myNewTree)) {
            newSpanElement.className = "caret";
            newLiElement.appendChild(newSpanElement);
            addChilds(treeElement, myNewTree, newLiElement);
        }
        else {
            newSpanElement.className = "noncaret";
            newLiElement.appendChild(newSpanElement);
        }
        newSpanElement.innerHTML = treeElement.description;
        myNewList.appendChild(newLiElement);
    });
    myBody.appendChild(myNewList);
}
function hasChilds(element, completeTree) {
    myNumber = element.entryNo;
    var myNewTreeUnderLevel = completeTree.filter(findChilds);
    return myNewTreeUnderLevel.length > 0;
}
function addChilds(element, completeTree, currentLiElement) {
    myNumber = element.entryNo;
    var myNewTreeUnderLevel = completeTree.filter(findChilds);
    var newULElement = document.createElement("ul");
    newULElement.className = "nested";
    currentLiElement.appendChild(newULElement);
    myNewTreeUnderLevel.forEach(function (underTreeElement) {
        var newUnderLiElement = document.createElement("li");
        var newUnderSpanElement = document.createElement("span");
        newUnderSpanElement.id = underTreeElement.entryNo.toString();
        newUnderSpanElement.className = "noncaret";
        newUnderSpanElement.innerHTML = underTreeElement.description;
        newUnderLiElement.appendChild(newUnderSpanElement);
        newULElement.appendChild(newUnderLiElement);
        if (hasChilds(underTreeElement, completeTree)) {
            newUnderSpanElement.className = "caret";
            addChilds(underTreeElement, completeTree, newUnderLiElement);
        }
    });
}
function findChilds(element, index, array) {
    return element.parentEntryNo === myNumber;
}
function showTextFromNav2(inputText) {
    var myAddin2 = document.getElementById("controlAddIn");
    myAddin2.innerHTML = inputText;
}
//# sourceMappingURL=main.js.map