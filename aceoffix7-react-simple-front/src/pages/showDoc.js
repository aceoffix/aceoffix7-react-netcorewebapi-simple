/* eslint-disable no-undef */
import React, { useState, useEffect, useRef} from 'react';
import service from '../api';
const ShowDoc = () => {
  const [poHtmlCode, setPoHtmlCode] = useState('');
  const  open_params = useRef('');
  // The callback function for the initialization event of Aceoffix. You can add custom buttons here.
  const OnAceoffixCtrlInit = () => {
    aceoffixctrl.AddCustomToolButton("Save", "Save", 1);
    aceoffixctrl.AddCustomToolButton("SaveAs", "SaveAs", 5);
    aceoffixctrl.AddCustomToolButton("PrintSet", "PrintSet", 8);
    aceoffixctrl.AddCustomToolButton("PrintFile", "PrintFile", 6);
    aceoffixctrl.AddCustomToolButton("FullScreen", "IsFullScreen", 4);
    aceoffixctrl.AddCustomToolButton("Close", "Close", 9);
  };

  const Save = () => {
    // Use the SaveFilePage property to set the Controller route address of the backend save method. This address must start with "/", and you can also pass JSON string parameters to this route address. An example is as follows:
    let saveFileUrl = "/doc/saveFile";
    let paramValue = new URLSearchParams(open_params.current);// For simplicity, we directly use the parameters used during the opening process here.
    aceoffixctrl.SaveFilePage = `${saveFileUrl}?${paramValue.toString()}`;
    //aceoffixctrl.SaveFilePage = saveFileUrl;
    // Write your code here before saving.
    aceoffixctrl.WebSave();
    // Write your code here after saving. For example, you can check the save result using aceoffixctrl.CustomSaveResult.
  };

  const SaveAs = () => {
    aceoffixctrl.ShowDialog(3);
  };
  const  PrintSet = () => {
    aceoffixctrl.ShowDialog(5);
  };
  const PrintFile = () => {
    aceoffixctrl.ShowDialog(4);
  };
  const Close = () => {
    aceoffixctrl.CloseWindow();
  };
  const IsFullScreen = () => {
    aceoffixctrl.FullScreen = !aceoffixctrl.FullScreen;
  };

  const AfterDocumentOpened = () => {
  // Write the code here that will be automatically triggered after the document is opened.
  };

  const openFile = async () => {
    try {
        const response = await service.post('/doc/openFile', open_params.current);
        return response;
    } catch (error) {
        console.error('Error fetching file:', error);
        return null;
    }
};

useEffect(() => {
    open_params.current = JSON.parse(aceoffixctrl.WindowParams);
    openFile().then((response) => {
        if (response) {
            setPoHtmlCode(response);
        }
    });

    window.ACEPageMounted = { OnAceoffixCtrlInit, AfterDocumentOpened, Save, SaveAs, PrintSet, PrintFile, Close, IsFullScreen };

    return () => {
        delete window.ACEPageMounted;
    };
}, []);

  return (
    <div className="showDoc">
     {/* This div is used to load the Aceoffix control. The height and width of the div determine the size and position of the control. */}
      <div
        style={{position:'absolute', width: '100%', height: '100%' }}
        dangerouslySetInnerHTML={{ __html: poHtmlCode }}
      />
    </div>
  );
};

export default ShowDoc;