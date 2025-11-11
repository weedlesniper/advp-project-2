// TODO: create page detailing project details, information on how it works, links to key resources eg ocr docs
import React, { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function About() {
    const [count, setCount] = useState(0);

    // Ctrl+K increments the counter.
    // We prevent default so it doesn't trigger browser/app search boxes.
    useHotkeys(
        "ctrl+k",
        (e) => {
            e.preventDefault();
            setCount((c) => c + 1);
        },
        // Options (works with v4+ of react-hotkeys-hook)
        { enableOnFormTags: true },
        // Deps
        [count]
    );

    return (
        <div className="prose max-w-none">
            <h1>About</h1>
            <p>
                Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to increment the counter.
            </p>
            <p>
                Pressed <strong>{count}</strong> times.
            </p>

            {/* Screen-reader announcement */}
            <div aria-live="polite" className="sr-only">
                Counter value is {count}
            </div>
        </div>
    );
}
