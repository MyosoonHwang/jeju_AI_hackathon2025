# 🌟 Jeju Landmark Treasure Hunt Game

## 🏖️ 프로젝트 소개  
**트레저오 프로젝트**는 제주 관광지를 활용한 보물찾기 게임입니다. YOLO 기반의 이미지 인식 기술과 GPS 위치 추적을 활용하여 관광지 랜드마크를 찾아가고, 성공 시 관광 쿠폰을 제공하는 방식으로 운영됩니다.

## 🔎 해결할 문제 및 목적
최근 제주도의 방문객 분석 결과, 20~50대 연령층의 방문 비율이 높으며, MZ세대는 새로운 콘텐츠를, 40~50대는 합리적 소비를 원한다는 점을 확인했습니다. 이에 따라 두 세대를 아우를 수 있는 **위치 기반 보물찾기 게임**을 개발하였습니다.

## 🌐 게임 형식
- **YOLO 기반 비전 모델**을 활용해 랜드마크를 인식
- **구글 API를 활용한 GPS 위치 추적**을 통해 관광지 도착 여부 판단
- **제주 역사 및 이야기와 결합한 스토리형 미션 제공**
- **85% 이상 정확도 도달 시 관광 쿠폰 지급**

## 🚀 사용한 기술
- **프론트엔드**: JavaScript, Google Maps API
- **백엔드**: Flask, SQLite
- **AI 모델**: YOLOv5 (제주 랜드마크 데이터셋으로 파인튜닝)
- **배포 및 운영**: Docker, AWS

## ⚡ 게임 시스템 시스템
1. QR 코드를 스캔하여 사이트 접속
2. 게임 시작 후 **구글맵을 통해 랜드마크 위치 확인**
3. **도착 지점 반경 50m 이내 진입 시 미션 활성화**
4. **랜드마크 촬영 및 YOLO 모델을 통한 이미지 분석**
5. **85% 이상 일치 시 미션 완료 & 관광 쿠폰 지급**

## 🏛️ 정책적 효과 및 결과
- **높은 접근성**: 앱 설치 없이 QR 코드로 즉시 참여 가능
- **지역 경제 활성화**: 관광지 방문 증가 → 지역 상권 활성화
- **관광 트렌드 반영**: 흥미로운 스토리와 연계한 게임 요소 제공

## 👥 지원 팀
| 이름 | 역할 | GitHub |
|------|------|------|
| 김형선 | 팀장, AI 개발 | [GitHub](https://github.com/MyosoonHwang) |

## ➡ 증리 내용
1. 제주 원도심 지역 상인 대상 인터뷰 진행 → 쿠폰 발행에 대한 긍정적 반응 확인
2. 기존 관광 트렌드 분석 → 사용자 맞춤형 콘텐츠 제공 필요성 도출
3. 하버사인 공식을 이용한 정확한 위치 추적 적용

## 크리트 모델 및 현재 성과
- 제주 랜드마크 사진 400장 학습을 통해 **YOLO 모델 88% 정확도 달성**
- 관광객 대상 시연 결과 **높은 흥미도 및 참여율 확인**

## 확장 가능성
- AI 챗봇 도입: 관광지 정보 제공 및 보물찾기 미션 연계
- SNS 연동 및 랭킹 시스템 추가: 사용자 참여 유도 및 홍보 효과 기대
- 지자체 및 지역 가맹점 협력 확대: 지속 가능한 서비스 구축

## 💪 경례
프로젝트를 실환경에 적용하기 위해 **서버 안정성 확보, GPS 오차 최소화, 지자체 및 가맹점과의 협업** 등의 추가 고려사항이 필요합니다.

마지막으로, 이제까지 주소해주신 신입 보물창기 경험을 아는 것에 감사드립니다! 🚀

