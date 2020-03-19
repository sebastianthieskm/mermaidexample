// Welcome to your new AL extension.
// Remember that object names and IDs should be unique across all extensions.
// AL snippets start with t*, like tpageext - give them a try and happy coding!

page 50100 TreeControlPage
{
    layout
    {
        area(Content)
        {
            // The control add-in can be placed on the page using usercontrol keyword.
            usercontrol(ControlName; TreeControlAddin)
            {

                ApplicationArea = All;
                trigger TreeItemClicked(i: Integer)
                begin
                    myInt := i;
                    KMOrgStructureTreeTmp.Get(i);
                    CurrPage.MySub.PAGE.SetClientFilterForOrgStrTreeElement(KMOrgStructureTreeTmp);
                    CurrPage.Update(false);
                end;

                trigger ScriptLoaded()
                begin
                    //CurrPage.ControlName.myRun('[{"entryNo": 1, "description": "Deutschland", "parentEntryNo": 0},{"entryNo": 2, "description": "Niedersachsen", "parentEntryNo": 1},{"entryNo": 3, "description": "Hannover", "parentEntryNo": 2},{"entryNo": 9, "description": "Bothfeld", "parentEntryNo": 3},{"entryNo": 10, "description": "Lahe", "parentEntryNo": 3},{"entryNo": 11, "description": "Mitte", "parentEntryNo": 3},{"entryNo": 4, "description": "Braunschweig", "parentEntryNo": 2},{"entryNo": 5, "description": "Nordrhein Westfalen", "parentEntryNo": 1},{"entryNo": 6, "description": "Dortmund", "parentEntryNo": 5},{"entryNo": 7, "description": "Köln", "parentEntryNo": 5},{"entryNo": 8, "description": "Sachsen", "parentEntryNo": 1}]');
                    CurrPage.ControlName.myRun(MyText);
                end;
            }
            field(SelectedId; myInt)
            {

            }
            part(MySub; MyClientSubPage)
            {
                ApplicationArea = All;
            }

        }

    }



    actions
    {
        // Add changes to page actions here
        area(Creation)
        {
            action(TextAnzeigen)
            {
                ApplicationArea = All;
                Promoted = true;
                PromotedOnly = true;
                PromotedCategory = Process;
                trigger OnAction();
                begin
                    CurrPage.ControlName.showTextFromNav2('Testtext from BC');
                end;
            }

            action(BaumAnders)
            {
                ApplicationArea = All;
                Promoted = true;
                PromotedOnly = true;
                PromotedCategory = Process;
                trigger OnAction();
                begin

                    //CurrPage.ControlName.myRun('[{"entryNo": 1, "description": "Land", "parentEntryNo": 0},{"entryNo": 2, "description": "Region", "parentEntryNo": 1},{"entryNo": 3, "description": "Stadt", "parentEntryNo": 2}]');
                    CurrPage.ControlName.myRun(MyText);
                end;
            }
        }
    }

    trigger OnOpenPage()
    begin
        KMOrgStrTreewContent.InitTreeWithStructureContent(KMOrgStructureTreeTmp, TRUE, TRUE, TODAY, TODAY, USERID, 0);
        if KMOrgStructureTreeTmp.FindSet() then
            repeat
                MyJsonObject.Add('entryNo', KMOrgStructureTreeTmp."Entry No.");
                MyJsonObject.Add('description', KMOrgStructureTreeTmp.Name);
                MyJsonObject.Add('parentEntryNo', KMOrgStructureTreeTmp."Parent Entry No.");
                TreeJson.Add(MyJsonObject);
                Clear(MyJsonObject);
            until KMOrgStructureTreeTmp.Next() = 0;
        TreeJson.WriteTo(MyText);


    end;

    trigger OnAfterGetRecord()
    begin

    end;

    var
        MyText: Text;
        TreeJson: JsonArray;
        MyTokenJson: JsonToken;
        MyJsonObject: JsonObject;
        KMOrgStrTreewContent: Codeunit "KM Org.-Str. Tree w. Content";
        KMOrgStructureTreeTmp: Record "KM Org.-Structure Tree" temporary;
        myInt: Integer;

}
