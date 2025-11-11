// hooks/useHotkey.js
import { useHotkeys } from "react-hotkeys-hook";

/**
 * @param {string|string[]} keys the shortcut to use e.g. "ctrl+o" or ["ctrl+o","?"]
 * @param {Function} action callback to run when hotkey pressed
 * @param {Array} deps deps for the callback (usually [action])
 */
export default function useHotkey(keys, action, deps = []) {
  useHotkeys(
    keys,
    (e) => {
      e.preventDefault();
      action();
    },
    //enable on form tags is so that react-hotkeys-hook doesn't disable the shortcut when
    //the user is focused on a textbox, which is default behaviour
    { enableOnFormTags: true,},
    [action, ...deps]
  );
}
