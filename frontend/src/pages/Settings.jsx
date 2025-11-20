import "../App.css";

export default function Settings() {
    return (

        <div class="align-items: center">
            <h1 className="page-heading"> Settings</h1>
            <h1 className="page-subheading"> Default Shortcuts</h1>
            <table>
                <thead>
                    <th>Shortcut Function</th>
                    <th>Shortcut Command</th>
                    <th>Change Shortcut</th>
                </thead>
                <tbody>
                    <tr>
                        <td><kbd>Play / Pause</kbd></td>
                        <td><kbd>Space</kbd></td>
                    </tr>
                    <tr>
                        <td><kbd>Pause + OCR</kbd></td>
                        <td><kbd>Ctrl + O</kbd></td>
                    </tr>
                    <tr>
                        <td><kbd>Scrub Forward </kbd></td>
                        <td><kbd>Shift + Right</kbd></td>
                    </tr>
                    <tr>
                        <td><kbd>Scrub Backwards</kbd></td>
                        <td><kbd>Shift + Left</kbd></td>
                    </tr>
                    <tr>
                        <td><kbd>Toggle Shortcut List</kbd></td>
                        <td><kbd>Ctrl + H</kbd></td>
                    </tr>
                </tbody>
            </table>
            <h1 className="page-subheading"> Custom Shortcuts</h1>
            <table>
                <thead>
                    <th>Shortcut Function</th>
                    <th>Shortcut Command</th>
                </thead>
                <tbody>
                    <tr>
                        <td><kbd>Play / Pause</kbd></td>
                        <td><kbd>Space</kbd></td>
                    </tr>
                    <tr>
                        <td><kbd>Pause + OCR</kbd></td>
                        <td><kbd>Ctrl + O</kbd></td>
                    </tr>
                    <tr>
                        <td><kbd>Scrub Forward </kbd></td>
                        <td><kbd>Shift + Right</kbd></td>
                    </tr>
                    <tr>
                        <td><kbd>Scrub Backwards</kbd></td>
                        <td><kbd>Shift + Left</kbd></td>
                    </tr>
                    <tr>
                        <td><kbd>Toggle Shortcut List</kbd></td>
                        <td><kbd>Ctrl + H</kbd></td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
}