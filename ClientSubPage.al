page 50101 MyClientSubPage
{
    PageType = ListPart;
    ApplicationArea = All;
    UsageCategory = Lists;
    SourceTable = "KM Client";
    CardPageId = "KM Client Card";
    DeleteAllowed = false;

    layout
    {
        area(Content)
        {
            repeater(GroupName)
            {
                field("No."; "No.")
                {
                    ApplicationArea = All;
                }
                field(Firstname; Firstname)
                {
                    ApplicationArea = All;
                }
                field(Surname; Surname)
                {
                    ApplicationArea = All;
                }
                field("Post Code"; "Post Code")
                {
                    ApplicationArea = All;
                }
                field(City; City)
                {
                    ApplicationArea = All;
                }

            }
        }
    }

    actions
    {
        area(Processing)
        {
            action(ActionName)
            {
                ApplicationArea = All;

                trigger OnAction();
                begin

                end;
            }
        }
    }
    procedure SetClientFilterForOrgStrTreeElement(KMOrgStructureTreeTmpPar: Record "KM Org.-Structure Tree" temporary)
    var
        KMUserClientAssignmentMgtCULoc: Codeunit "KM User Client Assignment Mgt.";
    begin
        KMUserClientAssignmentMgtCULoc.GetClientFilterForOrgStrTreeElement(KMOrgStructureTreeTmpPar, Rec, TODAY, TODAY, TRUE);
        CurrPage.UPDATE(FALSE);
    end;


}