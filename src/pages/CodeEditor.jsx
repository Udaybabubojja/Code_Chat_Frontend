import React, { useState } from 'react';
import AceEditor from 'react-ace';
import axios from 'axios';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github'; // Additional themes
import 'ace-builds/src-noconflict/theme-twilight'; // Additional themes
import 'ace-builds/src-noconflict/ext-language_tools';

const CodeEditor = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [input, setInput] = useState('');
    const [language, setLanguage] = useState('python'); // Default to Python
    const [loading, setLoading] = useState(false); // Loading state
    const [fontSize, setFontSize] = useState(16); // Default font size
    const [theme, setTheme] = useState('monokai'); // Default theme

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
        
        // Set default code for Java
        if (selectedLanguage === 'java') {
            setCode(`public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`);
        } else {
            setCode('');
        }
    };

    const handleFontSizeChange = (event) => {
        setFontSize(parseInt(event.target.value, 10));
    };

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    const runCode = async () => {
        setLoading(true); // Start loading
        setOutput(''); // Clear previous output
        try {
            const response = await axios.post(`https://code-chat-backend-elh6.onrender.com/api/run/${language}`, { code, input });
            setOutput(response.data.result);
        } catch (error) {
            setOutput(error.response ? error.response.data.error : 'An error occurred');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div style={{ padding: '20px' }} id="code-editor">
            <h1>Online Code Editor</h1>
            <div>
                <label htmlFor="language-select">Select Language: </label>
                <select id="language-select" value={language} onChange={handleLanguageChange}>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </select>
            </div>
            <div style={{ marginTop: '10px' }}>
                <label htmlFor="font-size">Font Size: </label>
                <select id="font-size" value={fontSize} onChange={handleFontSizeChange}>
                    <option value="14">14px</option>
                    <option value="16">16px</option>
                    <option value="18">18px</option>
                    <option value="20">20px</option>
                </select>
            </div>
            <div style={{ marginTop: '10px' }}>
                <label htmlFor="theme-select">Select Theme: </label>
                <select id="theme-select" value={theme} onChange={handleThemeChange}>
                    <option value="monokai">Monokai</option>
                    <option value="github">GitHub</option>
                    <option value="twilight">Twilight</option>
                </select>
            </div>
            <AceEditor
                mode={language === 'java' ? 'java' : language === 'c_cpp' ? 'c_cpp' : 'python'} // Set mode based on selected language
                theme={theme}
                name="code-editor"
                onChange={handleCodeChange}
                fontSize={fontSize}
                width="100%"
                height="400px"
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={code}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
            />
            <div style={{ marginTop: '10px' }}>
                <h2>Input</h2>
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    rows="4"
                    cols="50"
                    placeholder="Enter input here"
                />
            </div>
            <button onClick={runCode} style={{ marginTop: '10px' }}>Run Code</button>
            <div style={{ marginTop: '20px' }}>
                <h2>Output</h2>
                {loading ? (
                    <div className="loader">Running...</div>
                ) : (
                    <pre className="terminal-output">{output}</pre>
                )}
            </div>
        </div>
    );
};

export default CodeEditor;
