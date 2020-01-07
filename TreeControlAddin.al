controladdin TreeControlAddin
{
    RequestedHeight = 300;
    MinimumHeight = 300;
    MaximumHeight = 300;
    RequestedWidth = 700;
    MinimumWidth = 700;
    MaximumWidth = 700;
    VerticalStretch = true;
    VerticalShrink = true;
    HorizontalStretch = true;
    HorizontalShrink = true;
    Scripts =
        'scripts/main.js';
    StyleSheets =
        'scripts/css/stylesheet.css';
    StartupScript = 'scripts/startUp.js';
    /*
    RecreateScript = 'recreateScript.js';
    RefreshScript = 'refreshScript.js';
    Images =
        'image1.png',
        'image2.png';
    */
    event TreeItemClicked(i: Integer)
    procedure showTextFromNav2(iT: Text)
    procedure setTreeControl(jsonText: Text)

}