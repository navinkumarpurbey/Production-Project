import React, { useEffect, useRef, useState } from 'react';

const TableauDashboard: React.FC = () => {
  const vizContainer = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (!vizContainer.current || isScriptLoaded) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      var divElement = document.getElementById('viz1746990532331');
      var vizElement = divElement.getElementsByTagName('object')[0];
      vizElement.style.width = '100%';
      vizElement.style.height = '100vh';
      var scriptElement = document.createElement('script');
      scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
      vizElement.parentNode.insertBefore(scriptElement, vizElement);
    `;
    vizContainer.current.appendChild(script);
    setIsScriptLoaded(true);
  }, [isScriptLoaded]);

  const enterFullScreen = () => {
    const el = vizContainer.current;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    } else if ((el as any).msRequestFullscreen) {
      (el as any).msRequestFullscreen();
    }
  };

  return (
    <div className="relative w-full h-screen bg-white">
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={enterFullScreen}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          Full Screen
        </button>
      </div>
      <div
        ref={vizContainer}
        className="w-full h-full"
        dangerouslySetInnerHTML={{
          __html: `
            <div class='tableauPlaceholder' id='viz1746990532331' style='width:100%; height:100vh; position: relative'>
              <noscript>
                <a href='#'>
                  <img alt='Dashboard 1' src='https://public.tableau.com/static/images/He/HealthcareAccessTrends/Dashboard1/1_rss.png' style='border: none' />
                </a>
              </noscript>
              <object class='tableauViz' style='display:none;'>
                <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
                <param name='embed_code_version' value='3' />
                <param name='site_root' value='' />
                <param name='name' value='HealthcareAccessTrends/Dashboard1' />
                <param name='tabs' value='no' />
                <param name='toolbar' value='yes' />
                <param name='static_image' value='https://public.tableau.com/static/images/He/HealthcareAccessTrends/Dashboard1/1.png' />
                <param name='animate_transition' value='yes' />
                <param name='display_static_image' value='yes' />
                <param name='display_spinner' value='yes' />
                <param name='display_overlay' value='yes' />
                <param name='display_count' value='yes' />
                <param name='language' value='en-GB' />
              </object>
            </div>
          `,
        }}
      />
    </div>
  );
};

export default TableauDashboard;
