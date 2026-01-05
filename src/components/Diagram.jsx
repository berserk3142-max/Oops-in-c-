import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: true,
    theme: 'dark',
    themeVariables: {
        primaryColor: '#8B5CF6',
        primaryTextColor: '#fff',
        primaryBorderColor: '#8B5CF6',
        lineColor: '#06B6D4',
        secondaryColor: '#1A2035',
        tertiaryColor: '#242B42',
        background: '#0F1420',
        mainBkg: '#1A2035',
        nodeBorder: '#8B5CF6',
        clusterBkg: '#0F1420',
        titleColor: '#fff',
        edgeLabelBackground: '#0F1420',
    },
    flowchart: {
        htmlLabels: true,
        curve: 'basis',
    },
});

export default function Diagram({ code }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current && code) {
            containerRef.current.innerHTML = '';
            const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

            mermaid.render(id, code).then(({ svg }) => {
                if (containerRef.current) {
                    containerRef.current.innerHTML = svg;
                }
            }).catch(err => {
                console.error('Mermaid error:', err);
                if (containerRef.current) {
                    containerRef.current.innerHTML = `<p class="text-red-400 text-sm">Diagram rendering error</p>`;
                }
            });
        }
    }, [code]);

    return (
        <div ref={containerRef} className="diagram-container" />
    );
}
