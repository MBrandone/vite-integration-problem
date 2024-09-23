import { useEffect, useState } from "react";
import ProductPage from "decide/ProductPage";
import CartPage from "checkout/CartPage";
import Checkout from "checkout/Checkout";
import Thanks from "checkout/Thanks";

function modifyHistory(type) {
    const orig = history[type];
    return function (...args) {
        const rv = orig.apply(this, args);
        const ev = new Event(type.toLowerCase());
        window.dispatchEvent(ev);
        return rv;
    };
}

function navigate(route, state) {
    history.pushState(state, "", route);
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function onClick(e) {
    let link = e.target instanceof Element && e.target.closest("a");

    if (
        link &&
        link instanceof HTMLAnchorElement &&
        link.href &&
        (!link.target || link.target === "_self") &&
        link.origin === location.origin &&
        !link.hasAttribute("download") &&
        e.button === 0 && // left clicks only
        !e.metaKey && // open in new tab (mac)
        !e.ctrlKey && // open in new tab (windows)
        !e.altKey && // download
        !e.shiftKey &&
        !e.defaultPrevented
    ) {
        e.preventDefault();
        navigate(link.href, {});
    }
}

history.pushState = modifyHistory("pushState");
history.replaceState = modifyHistory("replaceState");

export const Router = () => {
    const [url, setUrl] = useState(location.pathname + location.search);

    useEffect(() => {
        function onHistory() {
            scrollToTop();
            setUrl(location.pathname + location.search);
        }

        window.addEventListener("popstate", onHistory);
        window.addEventListener("pushstate", onHistory);
        window.addEventListener("replacestate", onHistory);
        document.addEventListener("click", onClick);

        return () => {
            window.removeEventListener("popstate", onHistory);
            window.removeEventListener("pushstate", onHistory);
            window.removeEventListener("replacestate", onHistory);
            document.removeEventListener("click", onClick);
        };
    }, []);

    switch (url) {
        case "/checkout/cart":
            return <CartPage />;
        case "/checkout/checkout":
            return <Checkout />;
        case "/checkout/thanks":
            return <Thanks />;
    }

    return <ProductPage id={'AU-01'}/>;
}
