document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ 페이지 로드 완료, 이벤트 리스너 등록 중...");

    // 🎮 "게임 시작" 버튼 클릭 시 지도 화면으로 전환 및 위치 추적 시작
    document.getElementById("start-button").addEventListener("click", function () {
        console.log("🎮 게임 시작 버튼 클릭됨!");
        
        // 시작 화면 숨기기
        document.getElementById("start-container").style.display = "none";

        // 지도 화면 표시
        document.getElementById("map-container").style.display = "block";

        // 지도 및 위치 추적 시작
        initMap();
    });
});

const serverURL = window.location.origin;
console.log("✅ 서버 URL:", serverURL);

let map, currentLocationMarker, destinationMarker, accuracyCircle;
let firstMissionCompleted = false;

// 📌 목표 위치 (예제: 제주도 특정 좌표)
const TARGET_LOCATION = {
    latitude: 33.452536,
    longitude: 126.559759
};

// 📌 허용 오차 (50m 반경)
const THRESHOLD_RADIUS = 50; // 미터 단위 (50m)

// 📌 지도 초기화 (게임 시작 버튼을 눌렀을 때만 실행)
function initMap() {
    console.log("🚀 initMap() 실행됨!");
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: TARGET_LOCATION.latitude, lng: TARGET_LOCATION.longitude }
    });

    destinationMarker = new google.maps.Marker({
        position: { lat: TARGET_LOCATION.latitude, lng: TARGET_LOCATION.longitude },
        map: map,
        title: "📍 목표 위치",
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
    });

    accuracyCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.2,
        map,
        center: { lat: TARGET_LOCATION.latitude, lng: TARGET_LOCATION.longitude },
        radius: THRESHOLD_RADIUS
    });

    currentLocationMarker = new google.maps.Marker({
        position: { lat: TARGET_LOCATION.latitude, lng: TARGET_LOCATION.longitude },
        map: map,
        title: "📍 현재 위치",
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
    });

    trackLocation(); // 게임 시작 후 위치 추적 실행
}

function trackLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(position => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            console.log(`📌 현재 위치: (${latitude}, ${longitude})`);

            let newPosition = { lat: latitude, lng: longitude };
            currentLocationMarker.setPosition(newPosition);
            map.setCenter(newPosition);

            checkIfArrived(latitude, longitude);
        }, error => {
            console.error("🚨 GPS 오류:", error);
            alert("📌 GPS 정보를 가져올 수 없습니다. 브라우저 설정에서 위치 권한을 확인하세요!");
        }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 });
    } else {
        alert("❌ 이 브라우저에서는 GPS를 지원하지 않습니다!");
    }
}

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function checkIfArrived(latitude, longitude) {
    let distance = getDistanceFromLatLonInMeters(latitude, longitude, TARGET_LOCATION.latitude, TARGET_LOCATION.longitude);
    console.log(`📏 현재 거리: ${distance.toFixed(2)}m`);

    if (distance < THRESHOLD_RADIUS && !firstMissionCompleted) {
        firstMissionCompleted = true;
        alert("🎉 1차 미션 통과! 이제 돌하르방을 촬영하세요.");
        document.getElementById("map-container").style.display = "none";
        document.getElementById("upload-container").style.display = "block";
    }
}





// 📌 "확인" 버튼 클릭 시 카메라 촬영 UI 활성화
document.getElementById("confirm-mission").addEventListener("click", function () {
    document.getElementById("confirm-mission").style.display = "none";
    document.getElementById("upload-container").style.display = "block";
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ 페이지 로드 완료, 이벤트 리스너 등록 중...");

    let fileInput = document.getElementById("file-input");

    // 📌 사진 선택 시 자동으로 YOLO 모델 분석 실행
    fileInput.addEventListener("change", function (event) {
        let file = event.target.files[0];
        if (file) {
            console.log("📸 사진 선택됨:", file.name);
            uploadImage(file); // 이미지 업로드 및 YOLO 분석 실행
        }
    });
});


// 📌 서버로 이미지 전송 후 YOLO 모델 분석 실행
function uploadImage(file) {
    let formData = new FormData();
    formData.append("file", file); // **Flask에서 `file` 키로 받도록 설정**

    console.log("📤 이미지 서버로 전송 중...");

    fetch("/detect", {
        method: "POST",
        body: formData
        
    })
    .then(response => response.json())
    .then(data => {
        console.log("✅ YOLO 분석 완료:", data);
        
        // 📌 분석 결과 UI 업데이트
        document.getElementById("upload-container").style.display = "none"; // 촬영 UI 숨기기
        document.getElementById("result-container").style.display = "block"; // 결과 UI 표시
        
        if (data.status === "success") {
            document.getElementById("result-message").innerText = "🎉 2차 미션 통과!";
            document.getElementById("result-image").src = data.result_image;
        } else {
            document.getElementById("result-message").innerText = "❌ 돌하르방을 찾지 못했습니다.";
        }
    })
    .catch(error => {
        console.error("🚨 오류 발생:", error);
        alert("🚨 서버 오류! 다시 시도해 주세요.");
    });
}