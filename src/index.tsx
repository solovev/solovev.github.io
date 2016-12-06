import * as React from "react";
import * as ReactDOM from "react-dom";

import { Chart } from "./chart"
import { Hello } from "./components/Hello";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("chart")
);

window.onload = () => {
    var c = new Chart();
    c.render();

    var lock = document.getElementById('lock');
    var unlock = document.getElementById('unlock');
    lock.onclick = unlock.onclick = (e) => {
        if (e.srcElement.id === 'unlock') {
            c.uiSet.animate({ opacity : 1 }, 300);
            c.viewLocked = true;
            lock.className = '';
            unlock.className = 'hidden';
        } else {
            c.uiSet.animate({ opacity : 0 }, 300);
            c.viewLocked = false;
            unlock.className = '';
            lock.className = 'hidden';
        }
    };
}