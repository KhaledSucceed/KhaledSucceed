import unittest

import numpy as np

from src.smoke_detection import create_heatmap


class SmokePipelineTest(unittest.TestCase):
    def test_heatmap_preserves_shape_and_dtype(self):
        image = np.zeros((80, 120, 3), dtype=np.uint8)
        image[:, :] = (20, 40, 60)
        mask = np.zeros((80, 120), dtype=np.uint8)
        mask[25:55, 35:85] = 255

        output = create_heatmap(image, mask, alpha=0.5)

        self.assertEqual(output.shape, image.shape)
        self.assertEqual(output.dtype, np.uint8)
        self.assertGreater(int(output.sum()), 0)


if __name__ == "__main__":
    unittest.main()
