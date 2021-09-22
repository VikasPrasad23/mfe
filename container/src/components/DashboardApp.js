// Note: This is to load Vue Microfrontend. Do not use it if you are working on React
//We still need to make use of react inside of here because remember a lot of this react related stuff
//is really tied to displaying are the sub application inside the container.
import { mount } from 'dashboard/DashboardApp';
import React, {useRef, useEffect } from 'react';

//framework agnostic
export default() => {
    const ref = useRef(null);

    useEffect(() => {
        mount(ref.current);
    }, []);
    //To limit how often this use effect function actually gets invoked. I'm going to put in a second argument right there of an empty array.
    //That means only try to run this function when our marketing app component is first rendered to the screen.
    return <div ref={ref} />
}