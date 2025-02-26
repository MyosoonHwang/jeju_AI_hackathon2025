import os
import cv2
import uuid
from flask import Flask, request, jsonify,render_template
from flask_cors import CORS
from ultralytics import YOLO

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

# 📌 YOLO 모델 로드
MODEL_PATH = r"C:\Users\user\python_project\jeju_pr\gps_pr\best.pt"
model = YOLO(MODEL_PATH)

# 📌 업로드 폴더 설정
UPLOAD_FOLDER = os.path.join(app.static_folder, "uploads")
RESULT_FOLDER = os.path.join(app.static_folder, "results")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["RESULT_FOLDER"] = RESULT_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB limit

@app.route("/detect", methods=["POST"])
def detect():
    if "file" not in request.files:
        print("🚨 파일이 요청에 포함되지 않음!")
        return jsonify({"status": "error", "message": "파일이 없습니다!"}), 400

    file = request.files["file"]
    if file.filename == "":
        print("🚨 파일 이름이 없음!")
        return jsonify({"status": "error", "message": "파일 이름이 없습니다!"}), 400

    # 📌 파일 저장
    filename = f"{uuid.uuid4()}.jpg"
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)
    print(f"📥 이미지 저장 완료: {file_path}")

    # 📌 YOLO 탐지 실행
    image = cv2.imread(file_path)
    results = model(image)

    detected = False
    for r in results:
        if len(r.boxes) > 0:
            detected = True
            image = r.plot()
            break

    # 📌 결과 저장
    result_path = os.path.join(app.config["RESULT_FOLDER"], filename)
    cv2.imwrite(result_path, image)
    print(f"✅ YOLO 탐지 완료, 결과 저장: {result_path}")

    if detected:
        return jsonify({"status": "success", "result_image": f"/static/results/{filename}"})
    else:
        return jsonify({"status": "error", "message": "돌하르방을 찾지 못했습니다!"})


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
