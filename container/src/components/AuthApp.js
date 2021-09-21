import { mount } from 'auth/AuthApp';
import React, {useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//framework agnostic
export default() => {
    const ref = useRef(null);
    //this history object is a copy of current browser history
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ( { pathname: nextPathname}) => {
                const { pathname } = history.location;
                 //this check is to prevent infinite loop of navigation
                if(pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            }
        });
        history.listen(onParentNavigate);
    }, []);
    //To limit how often this use effect function actually gets invoked. I'm going to put in a second argument right there of an empty array.
    //That means only try to run this function when our marketing app component is first rendered to the screen.
    return <div ref={ref} />
}