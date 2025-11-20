import { useEffect, useState } from "react";
import "../App.css";

const STORAGE_KEY = "ocr_shortcuts_v1";

const DEFAULT_SHORTCUTS = {
    playPause: "space",
    pauseOcr: "ctrl+o",
    scrubForward: "shift+right",
    scrubBackward: "shift+left",
    toggleList: "ctrl+h",
    copyToClipboard: "ctrl + shift + c"
};

// not sure how to disable, or if you even can, disable alt tab etc, 
// but this works for ctrl p and ctrl s
const WIN_PROTECTED_SHORTCUTS = new Set([
    "alt+tab",
    "alt+f4",
    "ctrl+alt+del",
    "ctrl+shift+esc",
    "ctrl+p",   // print
    "ctrl+s",   // save
]);


function buildComboFromEvent(event) {
    const parts = [];

    // Treat Ctrl or Cmd as "ctrl" for simplicity
    if (event.ctrlKey || event.metaKey) parts.push("ctrl");
    if (event.altKey) parts.push("alt");
    if (event.shiftKey) parts.push("shift");

    let key = event.key.toLowerCase();

    // Ignore pure modifier presses
    if (["control", "shift", "alt", "meta"].includes(key)) {
        return null;
    }

    // Normalise some common keys
    if (key === " ") key = "space";
    if (key === "arrowleft") key = "left";
    if (key === "arrowright") key = "right";
    if (key === "arrowup") key = "up";
    if (key === "arrowdown") key = "down";

    parts.push(key);
    return parts.join("+");
}

export default function Settings() {
    function initShortcuts() {
        try {
            const savedString = localStorage.getItem(STORAGE_KEY);

            if (savedString) {
                const savedObject = JSON.parse(savedString);

                // merge defaults and saved shortcuts
                return {
                    ...DEFAULT_SHORTCUTS,
                    ...savedObject,
                };
            }

            // nothing saved yet
            return DEFAULT_SHORTCUTS;
        } catch (err) {
            // something goes wrong, just use defaults
            return DEFAULT_SHORTCUTS;
        }
    }
    const [shortcuts, setShortcuts] = useState(initShortcuts);

    // which action we are currently recording a shortcut for
    const [capturingAction, setCapturingAction] = useState(null);
    const [error, setError] = useState("");

    // Save to localStorage whenever shortcuts change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(shortcuts));
    }, [shortcuts]);

    // global (within settings) keydown listener when we're in "capture" mode
    useEffect(() => {
        if (!capturingAction) return;

        const handleKeyDown = (event) => {
            // stop browser default (ctrl + p, ctrl + s, etc)
            event.preventDefault();
            event.stopPropagation();

            //cancel with escape
            if (event.key === "Escape") {
                setCapturingAction(null);
                setError("");
                return;
            }

            const combo = buildComboFromEvent(event);
            if (!combo) return; // ignore modifier-only keys

            if (WIN_PROTECTED_SHORTCUTS.has(combo)) {
                setError(
                    `"${combo}" is reserved (system/browser shortcut). Please choose another.`
                );
                return; // don't save, stay in capture mode so they can try again
            }

            setError("");

            // get the previous shortcuts, and merge in the new recorded shortcut
            setShortcuts((prev) => ({
                ...prev,
                [capturingAction]: combo,
            }));

            setCapturingAction(null); // done capturing
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [capturingAction]);

    const startCapture = (actionKey) => {
        setError("");
        setCapturingAction(actionKey);
    };

    return (
        <div className="settings-page">
            <h1 className="page-heading">Shortcut Settings</h1>
            <table>
                <thead>
                    <tr>
                        <th>Shortcut Function</th>
                        <th>Current Command</th>
                        <th>Change Shortcut</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><kbd>Play / Pause</kbd></td>
                        <td><kbd>Space</kbd></td>
                        <td>
                            <button
                                type="button"
                                onClick={() => startCapture("playPause")}>
                                {capturingAction === "playPause" ? "Press keys..." : "Set Shortcut"}
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td><kbd>Pause + OCR</kbd></td>
                        <td><kbd>{shortcuts.pauseOcr || DEFAULT_SHORTCUTS.pauseOcr}</kbd></td>
                        <td>
                            <button
                                type="button"
                                onClick={() => startCapture("pauseOcr")}
                            >
                                {capturingAction === "pauseOcr" ? "Press keys..." : "Set Shortcut"}
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td><kbd>Scrub Forward</kbd></td>
                        <td><kbd>{shortcuts.scrubForward || DEFAULT_SHORTCUTS.scrubForward}</kbd></td>
                        <td>
                            <button
                                type="button"
                                onClick={() => startCapture("scrubForward")}
                            >
                                {capturingAction === "scrubForward" ? "Press keys..." : "Set Shortcut"}
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td><kbd>Scrub Backwards</kbd></td>
                        <td><kbd>{shortcuts.scrubBackward || DEFAULT_SHORTCUTS.scrubBackward}</kbd></td>
                        <td>
                            <button
                                type="button"
                                onClick={() => startCapture("scrubBackward")}
                            >
                                {capturingAction === "scrubBackward" ? "Press keys..." : "Set Shortcut"}
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td><kbd>Toggle Shortcut List</kbd></td>
                        <td><kbd>{shortcuts.toggleList || DEFAULT_SHORTCUTS.toggleList}</kbd></td>
                        <td>
                            <button
                                type="button"
                                onClick={() => startCapture("toggleList")}
                            >
                                {capturingAction === "toggleList" ? "Press keys..." : "Set Shortcut"}
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td><kbd>Copy OCR to Clipboard</kbd></td>
                        <td><kbd>{shortcuts.copyToClipboard || DEFAULT_SHORTCUTS.copyToClipboard}</kbd></td>
                        <td>
                            <button
                                type="button"
                                onClick={() => startCapture("copyToClipboard")}
                            >
                                {capturingAction === "copyToClipboard" ? "Press keys..." : "Set Shortcut"}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {capturingAction && (
                <p style={{ marginTop: "1rem" }}>
                    Press the keys you want for this shortcut, or press <kbd>Esc</kbd> to cancel.
                </p>
            )}
            {error && (
                <p style={{ marginTop: "0.5rem", color: "red" }}>
                    {error}
                </p>
            )}
        </div>
    );
}
