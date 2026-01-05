import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
        primaryColor: '#04AA6D',
        primaryTextColor: '#000000',
        primaryBorderColor: '#04AA6D',
        lineColor: '#555555',
        secondaryColor: '#E7E9EB',
        tertiaryColor: '#FFFFFF',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: '14px',
    },
    flowchart: {
        curve: 'basis',
        padding: 20,
    }
});

function Diagram({ code }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current && code) {
            containerRef.current.innerHTML = '';
            mermaid.render('mermaid-diagram-' + Date.now(), code)
                .then(({ svg }) => {
                    if (containerRef.current) {
                        containerRef.current.innerHTML = svg;
                    }
                })
                .catch(err => {
                    console.error('Mermaid error:', err);
                    if (containerRef.current) {
                        containerRef.current.innerHTML = '<p style="color:#666">Diagram could not be rendered</p>';
                    }
                });
        }
    }, [code]);

    return (
        <div
            ref={containerRef}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100px'
            }}
        />
    );
}

export default Diagram;
