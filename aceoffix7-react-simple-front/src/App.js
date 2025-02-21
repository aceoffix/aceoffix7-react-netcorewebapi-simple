import "./App.css";
import { AceBrowser } from "js-aceoffix";
import service from "./api";
import { useEffect } from 'react';

const createOpenWindowParams = () => {
    return {
        file_id: 1,
        file_name: "editword.docx"
    };
};

function App() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate sending a GET request to the backend's /index interface to return data. This is not required in an actual application.
                const response = await service.get("/index");
                console.log("result=" + response);
            } catch (error) {
                console.error("The request has gone wrong:", error);
            }
        };

        fetchData();
    }, []);

    const paramJson = createOpenWindowParams();
    const paramString = JSON.stringify(paramJson);

    const openWordFile = () => {
        try {
           // The third parameter of openWindow() is used to pass parameters (with no limit on parameter length) to the popped-up Aceoffix browser (POBrowser) window. It supports JSON - formatted strings.
           // For the convenience of demonstration here, we've passed two parameters, file_id and file_name. Please adjust according to your actual development.
            AceBrowser.openWindow("/showDoc", "width=1150px;height=900px;", paramString);
        } catch (error) {
            console.error("The request has gone wrong:", error);
        }
    };

    return (
        <div className="App">
            <div style={{ textAlign: "center" }}>
                <h2>Aceoffix V7 Minimal Example</h2>
                <div>
                    <button
                        onClick={openWordFile}
                        className="link-button"
                    >
                        Open Word File
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;