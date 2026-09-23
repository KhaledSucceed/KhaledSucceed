import unittest

from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

from src.train_evaluate import evaluate


class PipelineSmokeTest(unittest.TestCase):
    def test_evaluate_returns_expected_metrics(self):
        x, y = make_classification(
            n_samples=120,
            n_features=8,
            n_informative=5,
            n_redundant=0,
            n_classes=3,
            random_state=42,
        )
        x_train, x_test, y_train, y_test = train_test_split(
            x, y, test_size=0.25, random_state=42, stratify=y
        )
        result = evaluate(
            "logistic-smoke-test",
            LogisticRegression(max_iter=1000),
            x_train,
            x_test,
            y_train,
            y_test,
        )
        self.assertEqual(result["model"], "logistic-smoke-test")
        self.assertGreaterEqual(result["accuracy"], 0.0)
        self.assertLessEqual(result["accuracy"], 1.0)
        self.assertGreaterEqual(result["macro_f1"], 0.0)
        self.assertLessEqual(result["macro_f1"], 1.0)


if __name__ == "__main__":
    unittest.main()
