
interface MyTree {    
    entryNo: number;
    description: string;
    parentEntryNo: number;    
}
let myNumber = 0;
//hier gehts los
function myRun() {        
    setTreeControl('');
    
    let toggler = document.getElementsByClassName("caret") as HTMLCollectionOf<HTMLSpanElement>;
    let i : number =  0;
    for (let i = 0; i < toggler.length; i++){
        const element = toggler[i];
        element.addEventListener("click", function() {                
            let myParentElement = this.parentElement;                
            if (myParentElement != null){                    
                let myNestedItems = myParentElement.querySelector(".nested");
                if (myNestedItems != null){
                    myNestedItems.classList.toggle("active");
                }                                        
            } 
            // @ts-ignore: NAV Invoke
            Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('TreeItemClicked', this.id);
            this.classList.toggle("caret-down");
        }); 
    }

    let otherElements = document.getElementsByClassName("noncaret") as HTMLCollectionOf<HTMLSpanElement>;
    for (let i = 0; i < otherElements.length; i++){
        const element = otherElements[i];
        element.addEventListener("click", function() {   
            // @ts-ignore: NAV Invoke
            Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('TreeItemClicked', this.id);                             
        });
    }

}      
   
function setTreeControl(inputText : string) :void {        
    let myBody = <HTMLDivElement>document.getElementById('controlAddIn');
    let myNewTree: MyTree[];
    if (inputText === ''){
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
    else{
        myNewTree = JSON.parse(inputText);
    }
    let myNewList = <HTMLUListElement>document.createElement("ul");
    myNewList.id = "myUL";
    
    myNumber = 0;    
    let myNewTreeFirstLevel: MyTree[] = myNewTree.filter(findChilds);
    
    myNewTreeFirstLevel.forEach(treeElement => {
        let newLiElement = <HTMLLIElement>document.createElement("li");            
        let newSpanElement = <HTMLSpanElement>document.createElement("span");
        newSpanElement.id = treeElement.entryNo.toString();
        if (hasChilds(treeElement,myNewTree)){
            newSpanElement.className = "caret";    
            newLiElement.appendChild(newSpanElement);
            addChilds(treeElement,myNewTree,newLiElement);
        } else {
            newSpanElement.className = "noncaret";
            newLiElement.appendChild(newSpanElement);
        }            
        newSpanElement.innerHTML = treeElement.description;            
        myNewList.appendChild(newLiElement);            
    });                
    
    myBody.appendChild(myNewList);
    
} 

function hasChilds(element : MyTree, completeTree : MyTree[]){
    myNumber = element.entryNo;
    let myNewTreeUnderLevel: MyTree[] = completeTree.filter(findChilds);    
    return myNewTreeUnderLevel.length > 0;
}    

function addChilds(element : MyTree, completeTree : MyTree[], currentLiElement :HTMLLIElement){
    myNumber = element.entryNo;
    let myNewTreeUnderLevel: MyTree[] = completeTree.filter(findChilds);
    let newULElement = <HTMLUListElement>document.createElement("ul");
    newULElement.className = "nested";
    currentLiElement.appendChild(newULElement);
    myNewTreeUnderLevel.forEach(underTreeElement => {
        let newUnderLiElement = <HTMLLIElement>document.createElement("li");
        let newUnderSpanElement = <HTMLSpanElement>document.createElement("span");
        newUnderSpanElement.id = underTreeElement.entryNo.toString();
        newUnderSpanElement.className = "noncaret";
        newUnderSpanElement.innerHTML = underTreeElement.description;
        newUnderLiElement.appendChild(newUnderSpanElement);
        newULElement.appendChild(newUnderLiElement);
        if (hasChilds(underTreeElement,completeTree)){
            newUnderSpanElement.className = "caret";
            addChilds(underTreeElement,completeTree,newUnderLiElement);
        }
    });

}

function findChilds(element : MyTree, index : number, array : MyTree[]) {        
    return element.parentEntryNo === myNumber;
}

function showTextFromNav2(inputText : string) {
    let myAddin2 = <HTMLDivElement>document.getElementById("controlAddIn");
    myAddin2.innerHTML = inputText;
}
