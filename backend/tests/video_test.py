import unittest
from pathlib import Path
from fastapi import HTTPException
from unittest.mock import patch
from preliminary.simple_api import _open_vid_or_404, VIDEOS


class TestVideoPlayback(unittest.TestCase):
    def test_404_if_file_does_not_exist(self):
        mock_path = Path("/this/is/my/fake/path.mp4")
        VIDEOS["missing_file"] = mock_path

        with patch.object(Path,"is_file", return_value=False):
            with self.assertRaises(HTTPException) as response:
                _open_vid_or_404("missing_file")

        self.assertEqual(response.exception.status_code,404)
        self.assertEqual(response.exception.detail,"Video not found")


if __name__ == '__main__':
    unittest.main()
