import numpy as np
import onnx
from skl2onnx import convert_sklearn
from sklearn.linear_model import LogisticRegression
from skl2onnx.common.data_types import FloatTensorType

print("🔧 Step 1: Initializing LogisticRegression model...")
model = LogisticRegression()

print("📊 Step 2: Generating dummy training data...")
X = np.random.rand(20, 128)
y = np.random.randint(2, size=20)

print(f"    ✔️ Training data shape: {X.shape}")
print(f"    ✔️ Labels shape: {y.shape}")
print(f"    ✔️ Example X[0][0:5]: {X[0][0:5]}")
print(f"    ✔️ Example y: {y[:5]}")

print("🎯 Step 3: Training LogisticRegression model...")
model.fit(X, y)
print("    ✔️ Training completed.")

print("📦 Step 4: Converting model → ONNX format...")
onnx_model = convert_sklearn(
    model,
    initial_types=[("input", FloatTensorType([None, 128]))],
    options={id(model): {"zipmap": False}},
)

print("    ✔️ Conversion completed.")
print(f"    ✔️ ONNX model opset: {onnx_model.opset_import[0].version}")

onnx_bytes = onnx_model.SerializeToString()
print(f"    ✔️ ONNX model size: {len(onnx_bytes) / 1024:.2f} KB")

filename = "invoice-parser.onnx"
print(f"💾 Step 5: Saving ONNX model to `{filename}`...")

with open(filename, "wb") as f:
    f.write(onnx_bytes)

print(f"🏁 Done! File saved: {filename}")
