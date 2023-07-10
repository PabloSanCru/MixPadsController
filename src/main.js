import React, { useEffect, useState } from 'react';
import Body from './body/body';

function Main(){
  function screenSize(){
    const { innerWidth: width, innerHeight: height } = window;
    if(width > height){
      return(true);
    }else{
      return(false);
    }
  };
  const [responsive, setResponsive] = useState(screenSize());

  useEffect(() => {
    function handleResize() {
      setResponsive(screenSize());
      console.log(responsive)
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return(
    <main className={responsive === true ? "desktopSize" : "mobileSize"}>
    <section id="marca">
      <h1>MixPads<span>Controller</span></h1>
    </section>
    <React.StrictMode>
      <Body/>
    </React.StrictMode>
  </main>
  )
}

export default Main;
