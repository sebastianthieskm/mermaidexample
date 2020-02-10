"use strict";
var myNumber = 0;
//hier gehts los
function myRun(inputText) {
    setTreeControl(inputText);
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
    //hier wird der tree aufgebaut
    var myBody = document.getElementById('controlAddIn');
    myBody.childNodes.forEach(function (myBodyChild) {
        myBody.removeChild(myBodyChild);
    });
    var myNewTree;
    if (inputText === '') {
        throw "need input in JSON-format";
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
// @ts-ignore: NAV Invoke
Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('ScriptLoaded');
//# sourceMappingURL=main.js.map