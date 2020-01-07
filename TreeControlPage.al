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
                end;
            }
            field(SelectedId; myInt)
            {

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
                    CurrPage.ControlName.setTreeControl('[ {"entryNo": 1, "description": "Deutschland1", "parentEntryNo": 0}, {"entryNo": 2, "description": "Niedersachsen1", "parentEntryNo": 1}, {"entryNo": 3, "description": "Hannover1", "parentEntryNo": 2}]');
                end;
            }
        }
    }

    var
        myInt: Integer;

}
