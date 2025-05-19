import React, { useState, useEffect } from 'react';
import Chatbot from 'react-simple-chatbot';

const MyChatbot = () => {
    const [initialMessage, setInitialMessage] = useState("Hi");

    useEffect(() => {
        // Listen for data from Streamlit
        const onStreamlitMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.type === 'streamlit:render') {
                if (data.initialMessage) {
                    setInitialMessage(data.initialMessage);
                }
            }
        };

        window.addEventListener('message', onStreamlitMessage);

        //send message to streamlit
        const sendDataToStreamlit = (message: any) => {
            window.parent.postMessage(JSON.stringify(message), '*');
        }

        // Cleanup
        return () => {
            window.removeEventListener('message', onStreamlitMessage);
        };
    }, []);

    const steps = [
          {
             id: '0',
             message: initialMessage,
             trigger: '1',
           },
           {
             id: '1',
             user: true,
             trigger: '2',
           },
           {
             id: '2',
             message: 'Thanks for your input!',
             end: true,
          },
    ];

    return (
        <Chatbot steps={steps} />
    );
};
export default MyChatbot;
