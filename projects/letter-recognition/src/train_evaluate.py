from __future__ import annotations

from io import BytesIO
from pathlib import Path
from urllib.request import urlopen
import zipfile
from time import perf_counter

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

UCI_ZIP = "https://archive.ics.uci.edu/static/public/59/letter+recognition.zip"
FEATURES = [
    "x-box", "y-box", "width", "high", "onpix", "x-bar", "y-bar", "x2bar",
    "y2bar", "xybar", "x2ybr", "xy2br", "x-ege", "xegvy", "y-ege", "yegvx",
]


def load_uci_letter():
    with urlopen(UCI_ZIP, timeout=60) as response:
        payload = response.read()
    with zipfile.ZipFile(BytesIO(payload)) as zf:
        candidate = next(name for name in zf.namelist() if "letter-recognition.data" in name)
        with zf.open(candidate) as fh:
            df = pd.read_csv(fh, header=None, names=["letter", *FEATURES])
    return df[FEATURES], df["letter"]


def evaluate(name, model, x_train, x_test, y_train, y_test):
    started = perf_counter()
    model.fit(x_train, y_train)
    train_seconds = perf_counter() - started

    started = perf_counter()
    pred = model.predict(x_test)
    prediction_seconds = perf_counter() - started

    return {
        "model": name,
        "accuracy": accuracy_score(y_test, pred),
        "macro_f1": f1_score(y_test, pred, average="macro"),
        "train_seconds": train_seconds,
        "prediction_seconds_per_sample": prediction_seconds / len(x_test),
    }


def main():
    x, y = load_uci_letter()
    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=0.20, random_state=42, stratify=y
    )

    models = {
        "KNN": make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5)),
        "SVM RBF": make_pipeline(StandardScaler(), SVC(kernel="rbf")),
        "Logistic Regression": make_pipeline(
            StandardScaler(), LogisticRegression(max_iter=3000)
        ),
        "MLPClassifier": make_pipeline(
            StandardScaler(),
            MLPClassifier(hidden_layer_sizes=(100,), max_iter=500, random_state=42),
        ),
        "Random Forest": RandomForestClassifier(
            n_estimators=300, random_state=42, n_jobs=-1
        ),
    }

    rows = [
        evaluate(name, model, x_train, x_test, y_train, y_test)
        for name, model in models.items()
    ]
    out = pd.DataFrame(rows).sort_values("accuracy", ascending=False)

    output = Path(__file__).resolve().parents[1] / "results" / "reproduced_results.csv"
    output.parent.mkdir(parents=True, exist_ok=True)
    out.to_csv(output, index=False)
    print(out.to_string(index=False))
    print("Saved:", output)


if __name__ == "__main__":
    main()
