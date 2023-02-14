import React, { useState, useLayoutEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ReactPortalProps {
    children: ReactNode;
    // wrapperId: string;
}
/**
 * Portal is used to transport any component or element to the end of document.body and renders a React tree into it.
 * Useful for rendering a natural React element hierarchy with a different DOM hierarchy to prevent parent styles from clipping or hiding content (for popovers, dropdowns, and modals). It supports nested portals
 * @returns 
 */
// eslint-disable-next-line react/prop-types
const ReactPortal: React.FC<ReactPortalProps> = ({ children }): React.ReactPortal | null => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);
    const wrapperId = "react-portal-wrapper"
    function createWrapperAndAppendToBody(wrapperId: string) {
        const wrapperElement = document.createElement('div');
        // wrapperElement.setAttribute("id", wrapperId);
        wrapperElement.setAttribute("class", wrapperId);
        document.body.appendChild(wrapperElement);
        return wrapperElement;
    }
    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        // if element is not found with wrapperId or wrapperId is not provided,
        // create and append to body
        // if (!element) {
        //     element = createWrapperAndAppendToBody(wrapperId);
        // }
        element = createWrapperAndAppendToBody(wrapperId);
        setWrapperElement(element);
    }, [wrapperId]);

    // wrapperElement state will be null on the very first render.
    if (wrapperElement === null)
        return null;

    return createPortal(children, wrapperElement);
}

export default ReactPortal;