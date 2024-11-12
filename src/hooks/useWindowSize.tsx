import React,{useState,useEffect} from 'react';

interface WindowSizeProp{
    width:number;
    height:number;
}

const useWinSize = ():WindowSizeProp => {
    const [windowSize,setWindowsSize]=useState<WindowSizeProp>({
        width:0,
        height:0,
    });
    useEffect(()=>{
        function handleResize(){
            setWindowsSize({
                width:window.innerWidth,
                height:window.innerHeight,
            });
        }
        window.addEventListener('resize',handleResize);
        handleResize();
        return ()=>window.removeEventListener('resize',handleResize);
    },[]);
  return windowSize;
};

export default useWinSize;
