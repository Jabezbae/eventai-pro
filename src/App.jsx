import { useState } from "react";

// ══════════════════════════════════════════════════════════════════════════════
//  장비 DB (v3 완전 계승)
// ══════════════════════════════════════════════════════════════════════════════
const EQUIPMENT_DB = {
  sound: [
    { id:"so01", name:"라인어레이 메인 스피커 (L+R 1박스)", unit:"박스", unitPrice:300000, category:"sound", desc:"J8/V-DOSC급 대형 어레이", tag:"메인스피커" },
    { id:"so02", name:"라인어레이 서브우퍼 (더블 18인치)", unit:"박스", unitPrice:200000, category:"sound", desc:"저음역 대형 강화", tag:"메인스피커" },
    { id:"so03", name:"포인트소스 메인 스피커 (L+R)", unit:"세트", unitPrice:250000, category:"sound", desc:"JBL SRX815/825급", tag:"메인스피커" },
    { id:"so04", name:"포인트소스 서브우퍼 (18인치)", unit:"개", unitPrice:120000, category:"sound", desc:"중형 행사 저음 보강", tag:"메인스피커" },
    { id:"so05", name:"포터블 PA 시스템 (올인원)", unit:"세트", unitPrice:150000, category:"sound", desc:"소규모 행사 자체앰프 내장", tag:"메인스피커" },
    { id:"so06", name:"딜레이 스피커 (필아웃)", unit:"개", unitPrice:80000, category:"sound", desc:"원거리 관객 커버리지 보완", tag:"메인스피커" },
    { id:"so07", name:"무대 웨지 모니터 스피커", unit:"개", unitPrice:80000, category:"sound", desc:"아티스트 발앞 모니터", tag:"모니터" },
    { id:"so08", name:"인이어 모니터 시스템 (IEM)", unit:"채널", unitPrice:120000, category:"sound", desc:"무선 IEM 송수신 1채널", tag:"모니터" },
    { id:"so09", name:"사이드필 모니터 스피커", unit:"개", unitPrice:100000, category:"sound", desc:"무대 측면 보조 모니터", tag:"모니터" },
    { id:"so10", name:"디지털 FOH 믹싱 콘솔 (32ch)", unit:"대", unitPrice:400000, category:"sound", desc:"DiGiCo/Avid/Yamaha CL급", tag:"콘솔" },
    { id:"so11", name:"디지털 모니터 믹싱 콘솔 (32ch)", unit:"대", unitPrice:350000, category:"sound", desc:"무대 전담 모니터 콘솔", tag:"콘솔" },
    { id:"so12", name:"아날로그 믹서 (16ch)", unit:"대", unitPrice:100000, category:"sound", desc:"소규모·보조 용도", tag:"콘솔" },
    { id:"so13", name:"디지털 스테이지 박스 (32ch)", unit:"대", unitPrice:200000, category:"sound", desc:"Cat6/광케이블 신호 변환", tag:"콘솔" },
    { id:"so14", name:"DSP 디지털 프로세서", unit:"대", unitPrice:120000, category:"sound", desc:"드라이브랙 / Lake 시스템 튜닝", tag:"콘솔" },
    { id:"so15", name:"그래픽 이퀄라이저 (31밴드 스테레오)", unit:"대", unitPrice:80000, category:"sound", desc:"주파수 튜닝 보정", tag:"콘솔" },
    { id:"so16", name:"파워 앰프 랙 (4채널)", unit:"랙", unitPrice:200000, category:"sound", desc:"멀티채널 스테이지 앰프", tag:"콘솔" },
    { id:"so17", name:"컴프레서·게이트 랙 (8ch)", unit:"대", unitPrice:100000, category:"sound", desc:"다이나믹 처리 랙", tag:"콘솔" },
    { id:"so18", name:"무선 핸드마이크 시스템 (UHF)", unit:"채널", unitPrice:80000, category:"sound", desc:"UHF 1채널 송수신", tag:"마이크" },
    { id:"so19", name:"무선 핀마이크 (라발리에) 시스템", unit:"채널", unitPrice:100000, category:"sound", desc:"행사 진행·강연자용", tag:"마이크" },
    { id:"so20", name:"무선 악기 시스템 (기타·베이스)", unit:"채널", unitPrice:80000, category:"sound", desc:"무선 악기 신호 전송", tag:"마이크" },
    { id:"so21", name:"유선 다이나믹 마이크 (SM58급)", unit:"개", unitPrice:20000, category:"sound", desc:"보컬·일반 유선 마이크", tag:"마이크" },
    { id:"so22", name:"유선 컨덴서 마이크", unit:"개", unitPrice:40000, category:"sound", desc:"악기·합창·고음질 수음", tag:"마이크" },
    { id:"so23", name:"드럼 마이크 세트 (풀셋)", unit:"세트", unitPrice:150000, category:"sound", desc:"킥·스네어·탐·오버헤드 포함", tag:"마이크" },
    { id:"so24", name:"DI 박스 (액티브)", unit:"개", unitPrice:15000, category:"sound", desc:"언밸런스→밸런스 변환", tag:"마이크" },
    { id:"so25", name:"멀티코어 케이블 (30m)", unit:"드럼", unitPrice:50000, category:"sound", desc:"무대↔FOH 다채널 배선", tag:"케이블" },
    { id:"so26", name:"CD·미디어 플레이어", unit:"대", unitPrice:30000, category:"sound", desc:"배경음악·효과음 재생", tag:"기타" },
    { id:"so27", name:"인터컴 시스템 (무선 4채널)", unit:"세트", unitPrice:150000, category:"sound", desc:"전 스태프 무선 통신", tag:"기타" },
    { id:"so28", name:"음향 감독 (FOH 엔지니어)", unit:"명/일", unitPrice:400000, category:"sound", desc:"FOH 믹서 담당 전문 엔지니어", tag:"인력" },
    { id:"so29", name:"음향 기사 (모니터 엔지니어)", unit:"명/일", unitPrice:350000, category:"sound", desc:"무대 모니터 전담 엔지니어", tag:"인력" },
    { id:"so30", name:"음향 보조 스태프", unit:"명/일", unitPrice:200000, category:"sound", desc:"셋업·케이블·보조 작업", tag:"인력" },
  ],
  video: [
    // ★ LED 전광판: unit="㎡", 가로×세로로 ㎡ 계산
    { id:"vi01", name:"LED 전광판 P2.5 (실내·고화질)", unit:"㎡", unitPrice:250000, category:"video", desc:"실내 컨벤션·무대 배경용 (P2.5)", tag:"LED전광판", isLED:true },
    { id:"vi02", name:"LED 전광판 P3 (야외·대형)", unit:"㎡", unitPrice:200000, category:"video", desc:"야외 메인 스크린 (P3)", tag:"LED전광판", isLED:true },
    { id:"vi03", name:"LED 전광판 P4 (야외·중형)", unit:"㎡", unitPrice:160000, category:"video", desc:"야외 중형 행사 (P4)", tag:"LED전광판", isLED:true },
    { id:"vi04", name:"LED 전광판 P5 (야외·원거리)", unit:"㎡", unitPrice:130000, category:"video", desc:"원거리 대형 야외 (P5)", tag:"LED전광판", isLED:true },
    { id:"vi05", name:"프로젝터 20,000루멘 (대형)", unit:"대", unitPrice:500000, category:"video", desc:"대형 실내 투영", tag:"프로젝터" },
    { id:"vi06", name:"프로젝터 10,000루멘 (중형)", unit:"대", unitPrice:300000, category:"video", desc:"중형 실내 행사용", tag:"프로젝터" },
    { id:"vi07", name:"프로젝터 5,000루멘 (소형)", unit:"대", unitPrice:150000, category:"video", desc:"소규모 회의·세미나", tag:"프로젝터" },
    { id:"vi08", name:"패스트폴드 스크린 (6×4.5m)", unit:"세트", unitPrice:150000, category:"video", desc:"트러스·플로어 설치형", tag:"프로젝터" },
    { id:"vi09", name:"패스트폴드 스크린 (4×3m)", unit:"세트", unitPrice:100000, category:"video", desc:"중형 행사 스크린", tag:"프로젝터" },
    { id:"vi10", name:"모니터 TV 55인치", unit:"대", unitPrice:50000, category:"video", desc:"사이드·백스테이지 모니터", tag:"모니터·분배" },
    { id:"vi11", name:"모니터 TV 75인치", unit:"대", unitPrice:80000, category:"video", desc:"부스·대기실 안내 모니터", tag:"모니터·분배" },
    { id:"vi12", name:"HDMI 분배기 (1:4)", unit:"대", unitPrice:30000, category:"video", desc:"영상 신호 분기", tag:"모니터·분배" },
    { id:"vi13", name:"SDI↔HDMI 신호 변환기", unit:"대", unitPrice:30000, category:"video", desc:"신호 포맷 변환·안정화", tag:"모니터·분배" },
    { id:"vi14", name:"광케이블 HDMI 연장기 (100m)", unit:"세트", unitPrice:80000, category:"video", desc:"원거리 무손실 영상 전송", tag:"모니터·분배" },
    { id:"vi15", name:"영상 스위처 (라이브 멀티캠)", unit:"대", unitPrice:400000, category:"video", desc:"ATEM Constellation급", tag:"스위처·서버" },
    { id:"vi16", name:"스케일러·멀티뷰 프로세서", unit:"대", unitPrice:200000, category:"video", desc:"해상도 변환·신호 분배", tag:"스위처·서버" },
    { id:"vi17", name:"미디어 서버 (WATCHOUT급)", unit:"대", unitPrice:500000, category:"video", desc:"멀티스크린 영상 연출", tag:"스위처·서버" },
    { id:"vi18", name:"타임코드 시스템 (LTC/SMPTE)", unit:"세트", unitPrice:200000, category:"video", desc:"음향·영상·조명 동기화", tag:"스위처·서버" },
    { id:"vi19", name:"노트북 (영상 재생 전담)", unit:"대", unitPrice:50000, category:"video", desc:"PPT·영상 콘텐츠 재생", tag:"스위처·서버" },
    { id:"vi20", name:"영상 감독 (TD)", unit:"명/일", unitPrice:400000, category:"video", desc:"영상 시스템 총괄·스위처", tag:"인력" },
    { id:"vi21", name:"영상 기사", unit:"명/일", unitPrice:300000, category:"video", desc:"장비 운용·콘텐츠 재생", tag:"인력" },
    { id:"vi22", name:"영상 보조 스태프", unit:"명/일", unitPrice:180000, category:"video", desc:"케이블·설치 보조", tag:"인력" },
  ],
  relay: [
    { id:"re01", name:"방송용 ENG 카메라 (2/3인치)", unit:"대", unitPrice:400000, category:"relay", desc:"Sony PDW/HDC급 방송 카메라", tag:"카메라" },
    { id:"re02", name:"방송용 스튜디오 카메라 (삼각대)", unit:"대", unitPrice:300000, category:"relay", desc:"고정형 삼각대 설치", tag:"카메라" },
    { id:"re03", name:"PTZ 카메라 (원격 제어)", unit:"대", unitPrice:200000, category:"relay", desc:"무인 자동 추적 팬틸트줌", tag:"카메라" },
    { id:"re04", name:"시네마 카메라 (FX3/BMPCC6K급)", unit:"대", unitPrice:250000, category:"relay", desc:"고화질 연출용 촬영", tag:"카메라" },
    { id:"re05", name:"드론 촬영 (4K, 파일럿 포함)", unit:"회", unitPrice:500000, category:"relay", desc:"항공 촬영·인허가 포함", tag:"카메라" },
    { id:"re06", name:"짐벌·스태디캠 (기사 포함)", unit:"대/일", unitPrice:250000, category:"relay", desc:"무빙샷·이동 촬영", tag:"카메라" },
    { id:"re07", name:"지미집 크레인 (카메라 포함)", unit:"대", unitPrice:600000, category:"relay", desc:"하이앵글·슬라이딩 크레인", tag:"카메라" },
    { id:"re08", name:"비디오 믹서 (방송 스위처)", unit:"대", unitPrice:500000, category:"relay", desc:"라이브 컷·트랜지션 스위처", tag:"중계시스템" },
    { id:"re09", name:"CCU (카메라 컨트롤 유닛)", unit:"채널", unitPrice:150000, category:"relay", desc:"방송 카메라 원격 색보정·제어", tag:"중계시스템" },
    { id:"re10", name:"광케이블 중계 시스템 (300m)", unit:"세트", unitPrice:400000, category:"relay", desc:"다중 카메라 신호 집선", tag:"중계시스템" },
    { id:"re11", name:"라이브 스트리밍 인코더", unit:"대", unitPrice:150000, category:"relay", desc:"유튜브·SNS 실시간 온라인 송출", tag:"중계시스템" },
    { id:"re12", name:"위성 중계차 (SNG)", unit:"대", unitPrice:3000000, category:"relay", desc:"광역 위성 생중계 차량", tag:"중계시스템" },
    { id:"re13", name:"녹화 레코더 (4K ProRes)", unit:"대", unitPrice:150000, category:"relay", desc:"마스터 영상 원본 녹화", tag:"중계시스템" },
    { id:"re14", name:"실시간 자막 CG 시스템", unit:"세트", unitPrice:300000, category:"relay", desc:"자막 삽입·그래픽 송출", tag:"자막·기타" },
    { id:"re15", name:"텔레프롬프터 (무대용)", unit:"대", unitPrice:100000, category:"relay", desc:"진행자·연사 큐시트 표시", tag:"자막·기타" },
    { id:"re16", name:"인터컴 (카메라맨 전용)", unit:"채널", unitPrice:50000, category:"relay", desc:"PD↔카메라맨 통신", tag:"자막·기타" },
    { id:"re17", name:"PD (연출·중계 감독)", unit:"명/일", unitPrice:600000, category:"relay", desc:"중계 총괄 연출", tag:"인력" },
    { id:"re18", name:"카메라맨", unit:"명/일", unitPrice:350000, category:"relay", desc:"촬영 전문 기사", tag:"인력" },
    { id:"re19", name:"VJ (영상 편집·CG)", unit:"명/일", unitPrice:300000, category:"relay", desc:"실시간 자막·그래픽·편집", tag:"인력" },
    { id:"re20", name:"스트리밍 기사", unit:"명/일", unitPrice:250000, category:"relay", desc:"온라인 라이브 송출 운용", tag:"인력" },
  ],
  lighting: [
    { id:"li01", name:"Robe BMFL WashBeam", unit:"대", unitPrice:350000, category:"lighting", desc:"최상급 무빙워시+빔 복합", tag:"프리미엄무빙" },
    { id:"li02", name:"Martin MAC Ultra Wash", unit:"대", unitPrice:320000, category:"lighting", desc:"프리미엄 LED 무빙워시", tag:"프리미엄무빙" },
    { id:"li03", name:"Martin MAC Aura XB", unit:"대", unitPrice:180000, category:"lighting", desc:"LED 워시+에어리어 이펙트", tag:"프리미엄무빙" },
    { id:"li04", name:"LED 무빙헤드 빔 (230W)", unit:"대", unitPrice:100000, category:"lighting", desc:"샤프 빔 이펙트 조명", tag:"LED무빙헤드" },
    { id:"li05", name:"LED 무빙헤드 워시 (300W)", unit:"대", unitPrice:90000, category:"lighting", desc:"컬러믹싱 소프트 워시", tag:"LED무빙헤드" },
    { id:"li06", name:"LED 무빙헤드 스팟 (350W)", unit:"대", unitPrice:110000, category:"lighting", desc:"고보·프리즘·조리개 스팟", tag:"LED무빙헤드" },
    { id:"li07", name:"LED PAR 캔 (RGBW 54구)", unit:"개", unitPrice:20000, category:"lighting", desc:"스테이지 플러드 기본 조명", tag:"고정조명" },
    { id:"li08", name:"프로파일 스팟 (ETC Source4급)", unit:"대", unitPrice:60000, category:"lighting", desc:"인물·핀스팟·고선명 조명", tag:"고정조명" },
    { id:"li09", name:"LED 핀스팟 (무빙)", unit:"대", unitPrice:50000, category:"lighting", desc:"테이블·포인트 조명", tag:"고정조명" },
    { id:"li10", name:"LED 바 (1m 픽셀 바)", unit:"개", unitPrice:40000, category:"lighting", desc:"무대 엣지·배경 무드 조명", tag:"고정조명" },
    { id:"li11", name:"플로어 업라이트 (풋라이트)", unit:"개", unitPrice:25000, category:"lighting", desc:"무대 하단 반사 조명", tag:"고정조명" },
    { id:"li12", name:"블라인더 (8셀 LED)", unit:"대", unitPrice:80000, category:"lighting", desc:"관객 향 섬광·블라인드 효과", tag:"고정조명" },
    { id:"li13", name:"레이저 (RGB 5W 이상)", unit:"대", unitPrice:200000, category:"lighting", desc:"빔·패턴·그래픽 레이저", tag:"특수효과" },
    { id:"li14", name:"LED 스트로브 (대형)", unit:"개", unitPrice:60000, category:"lighting", desc:"고출력 섬광 특수효과", tag:"특수효과" },
    { id:"li15", name:"연무기·헤이즈머신", unit:"대", unitPrice:80000, category:"lighting", desc:"빔 가시화 헤이즈 연출", tag:"특수효과" },
    { id:"li16", name:"드라이아이스 머신", unit:"대", unitPrice:150000, category:"lighting", desc:"저운 백연 무대 특수효과", tag:"특수효과" },
    { id:"li17", name:"콘페티 캐논 (전동)", unit:"대", unitPrice:100000, category:"lighting", desc:"종이·테이프 축포 발사", tag:"특수효과" },
    { id:"li18", name:"불꽃 효과기 (CO2·불꽃)", unit:"대", unitPrice:200000, category:"lighting", desc:"무대용 불꽃·CO2 분사", tag:"특수효과" },
    { id:"li19", name:"Avolites Quartz 콘솔", unit:"대", unitPrice:500000, category:"lighting", desc:"Titan 소프트웨어 프로 콘솔", tag:"콘솔·제어" },
    { id:"li20", name:"GrandMA3 컴팩트 콘솔", unit:"대", unitPrice:600000, category:"lighting", desc:"대형 공연 전문 콘솔", tag:"콘솔·제어" },
    { id:"li21", name:"DMX 디머 팩 (6ch)", unit:"대", unitPrice:60000, category:"lighting", desc:"백열·할로겐 조도 제어", tag:"콘솔·제어" },
    { id:"li22", name:"DMX 분배기 (1:8)", unit:"대", unitPrice:30000, category:"lighting", desc:"DMX 신호 분기·증폭", tag:"콘솔·제어" },
    { id:"li23", name:"트러스 박스 삼각 (4m)", unit:"개", unitPrice:50000, category:"lighting", desc:"조명 행잉 삼각 트러스", tag:"구조물" },
    { id:"li24", name:"트러스 박스 사각 (3m)", unit:"개", unitPrice:60000, category:"lighting", desc:"헤비듀티 사각 트러스", tag:"구조물" },
    { id:"li25", name:"모터 호이스트 (500kg)", unit:"대", unitPrice:100000, category:"lighting", desc:"트러스·스피커 리깅 호이스트", tag:"구조물" },
    { id:"li26", name:"조명 스탠드 (4m)", unit:"개", unitPrice:20000, category:"lighting", desc:"포터블 조명 거치 스탠드", tag:"구조물" },
    { id:"li27", name:"조명 감독 (LD)", unit:"명/일", unitPrice:500000, category:"lighting", desc:"전체 조명 설계·콘솔 운용", tag:"인력" },
    { id:"li28", name:"조명 기사", unit:"명/일", unitPrice:300000, category:"lighting", desc:"콘솔 보조·포커싱", tag:"인력" },
    { id:"li29", name:"조명 보조 스태프", unit:"명/일", unitPrice:180000, category:"lighting", desc:"리깅·케이블·장비 보조", tag:"인력" },
    { id:"li30", name:"리거 (고소 전문)", unit:"명/일", unitPrice:350000, category:"lighting", desc:"트러스·호이스트 고소 작업", tag:"인력" },
  ],
  stage: [
    { id:"st01", name:"이동식 야외 무대 (12×8m)", unit:"세트", unitPrice:3000000, category:"stage", desc:"대형 트레일러 야외 무대 완전체", tag:"무대구조" },
    { id:"st02", name:"이동식 야외 무대 (8×6m)", unit:"세트", unitPrice:1800000, category:"stage", desc:"중형 이동식 야외 무대", tag:"무대구조" },
    { id:"st03", name:"조립식 무대 플랫폼 (1×1m 유닛)", unit:"장", unitPrice:20000, category:"stage", desc:"높이 조절 모듈형 무대", tag:"무대구조" },
    { id:"st04", name:"런웨이 무대 (폭 1m, 직선)", unit:"m", unitPrice:50000, category:"stage", desc:"T자·런웨이 무대 연장", tag:"무대구조" },
    { id:"st05", name:"무대 계단 (3단)", unit:"세트", unitPrice:50000, category:"stage", desc:"무대 오르내림 안전 계단", tag:"무대구조" },
    { id:"st06", name:"무대 난간 (안전 핸드레일 1m)", unit:"개", unitPrice:20000, category:"stage", desc:"무대 가장자리 안전 난간", tag:"무대구조" },
    { id:"st07", name:"메인 PA 트러스 타워 (6m H)", unit:"세트", unitPrice:400000, category:"stage", desc:"PA·조명 행잉 메인 타워", tag:"트러스·리깅" },
    { id:"st08", name:"그라운드 서포트 시스템", unit:"세트", unitPrice:800000, category:"stage", desc:"대형 PA·조명 그라운드 리깅", tag:"트러스·리깅" },
    { id:"st09", name:"백드롭 프레임 (6×4m)", unit:"세트", unitPrice:150000, category:"stage", desc:"배경막 설치 알루미늄 프레임", tag:"연출·배경" },
    { id:"st10", name:"LED 백드롭 스크린 (3×2m)", unit:"세트", unitPrice:300000, category:"stage", desc:"무대 배경 LED 스크린", tag:"연출·배경" },
    { id:"st11", name:"파이프·드레이프 커튼 (1m)", unit:"m", unitPrice:15000, category:"stage", desc:"무대 백 커튼·파티션", tag:"연출·배경" },
    { id:"st12", name:"현수막·배너 프레임", unit:"개", unitPrice:30000, category:"stage", desc:"행사 현수막 거치대", tag:"연출·배경" },
    { id:"st13", name:"포디움·강연대", unit:"개", unitPrice:50000, category:"stage", desc:"연사·MC 강연 포디움", tag:"연출·배경" },
    { id:"st14", name:"사회자 테이블 세트", unit:"세트", unitPrice:80000, category:"stage", desc:"테이블·의자·테이블스커트", tag:"연출·배경" },
    { id:"st15", name:"발전기 100kVA (야외 메인)", unit:"대", unitPrice:700000, category:"stage", desc:"야외 대형 행사 메인 전원", tag:"전원·전기" },
    { id:"st16", name:"발전기 60kVA (보조)", unit:"대", unitPrice:450000, category:"stage", desc:"야외 보조·소규모 전원", tag:"전원·전기" },
    { id:"st17", name:"배전반·분전함 (200A)", unit:"식", unitPrice:200000, category:"stage", desc:"전원 분배·차단기 패널", tag:"전원·전기" },
    { id:"st18", name:"파워 케이블 (50m 3상 200A)", unit:"드럼", unitPrice:80000, category:"stage", desc:"고전력 3상 전원 배선", tag:"전원·전기" },
    { id:"st19", name:"멀티탭·연장선 세트", unit:"세트", unitPrice:30000, category:"stage", desc:"현장 소전력 분배", tag:"전원·전기" },
    { id:"st20", name:"행사용 텐트 (6×12m)", unit:"동", unitPrice:500000, category:"stage", desc:"부스·VIP·스태프 대형 텐트", tag:"시설·안전" },
    { id:"st21", name:"캐노피 (3×3m)", unit:"개", unitPrice:50000, category:"stage", desc:"소형 부스 지붕 캐노피", tag:"시설·안전" },
    { id:"st22", name:"관객 통제 바리케이드 (1m)", unit:"개", unitPrice:10000, category:"stage", desc:"관객 안전 통제 펜스", tag:"시설·안전" },
    { id:"st23", name:"군중 통제 벨트 스탠드", unit:"개", unitPrice:8000, category:"stage", desc:"실내 동선 유도 스탠드", tag:"시설·안전" },
    { id:"st24", name:"이동식 화장실 (간이)", unit:"칸", unitPrice:150000, category:"stage", desc:"야외 행사 임시 화장실", tag:"시설·안전" },
    { id:"st25", name:"소화기 (ABC 3.3kg)", unit:"개", unitPrice:20000, category:"stage", desc:"행사장 비치 필수 소화기", tag:"시설·안전" },
    { id:"st26", name:"무전기 (워키토키)", unit:"대", unitPrice:15000, category:"stage", desc:"현장 스태프 통신", tag:"시설·안전" },
    { id:"st27", name:"무대 감독 (SM)", unit:"명/일", unitPrice:500000, category:"stage", desc:"무대 전체 운영 총괄", tag:"인력" },
    { id:"st28", name:"무대 설치 기사", unit:"명/일", unitPrice:250000, category:"stage", desc:"무대·구조물 설치·철거", tag:"인력" },
    { id:"st29", name:"전기 기사 (산업전기 자격)", unit:"명/일", unitPrice:350000, category:"stage", desc:"발전기·배전 전담 전기 기사", tag:"인력" },
    { id:"st30", name:"특수효과 기사", unit:"명/일", unitPrice:400000, category:"stage", desc:"무대 연출 특수효과 담당", tag:"인력" },
  ],
  staff: [
    { id:"sf01", name:"행사 총감독 (Executive PD)", unit:"명/일", unitPrice:800000, category:"staff", desc:"전체 행사 기획·현장 총괄", tag:"기획·연출" },
    { id:"sf02", name:"행사 기획 PM", unit:"명/일", unitPrice:500000, category:"staff", desc:"세부 일정·업체 조율·문서 관리", tag:"기획·연출" },
    { id:"sf03", name:"행사 진행 큐시트 요원", unit:"명/일", unitPrice:200000, category:"staff", desc:"큐시트 기반 부서 간 신호 조율", tag:"기획·연출" },
    { id:"sf04", name:"VIP 의전 담당", unit:"명/일", unitPrice:300000, category:"staff", desc:"귀빈 영접·에스코트·의전 매뉴얼", tag:"기획·연출" },
    { id:"sf05", name:"MC·사회자 (전문 방송인)", unit:"명/회", unitPrice:1500000, category:"staff", desc:"전문 방송 MC 섭외", tag:"MC·사회자" },
    { id:"sf06", name:"MC·사회자 (준전문 프리랜서)", unit:"명/회", unitPrice:500000, category:"staff", desc:"프리랜서 행사 사회자", tag:"MC·사회자" },
    { id:"sf07", name:"행사 진행 요원 (스태프)", unit:"명/일", unitPrice:150000, category:"staff", desc:"현장 안내·등록·일반 진행", tag:"진행요원" },
    { id:"sf08", name:"안내 도우미 (컨벤션걸)", unit:"명/일", unitPrice:180000, category:"staff", desc:"등록·안내·귀빈 의전 도우미", tag:"진행요원" },
    { id:"sf09", name:"통역사 (영어·일어·중어)", unit:"명/일", unitPrice:500000, category:"staff", desc:"외국어 동시·순차 통역", tag:"진행요원" },
    { id:"sf10", name:"수어 통역사", unit:"명/일", unitPrice:400000, category:"staff", desc:"청각장애인 수어 통역", tag:"진행요원" },
    { id:"sf11", name:"보안 요원 (일반)", unit:"명/일", unitPrice:200000, category:"staff", desc:"현장 질서·안전 유지", tag:"보안·안전" },
    { id:"sf12", name:"보안 요원 (경비원 자격증)", unit:"명/일", unitPrice:250000, category:"staff", desc:"경비업 허가 자격 보유 보안", tag:"보안·안전" },
    { id:"sf13", name:"교통·주차 통제 요원", unit:"명/일", unitPrice:180000, category:"staff", desc:"주차장 유도·교통 통제", tag:"보안·안전" },
    { id:"sf14", name:"응급의료 요원 (EMT)", unit:"명/일", unitPrice:350000, category:"staff", desc:"현장 응급처치 전담 EMT", tag:"보안·안전" },
    { id:"sf15", name:"소방 안전 요원", unit:"명/일", unitPrice:300000, category:"staff", desc:"소방법 준수·화재 예방", tag:"보안·안전" },
    { id:"sf16", name:"공식 사진 기사", unit:"명/일", unitPrice:350000, category:"staff", desc:"행사 공식 사진 기록", tag:"기록" },
    { id:"sf17", name:"영상 촬영 기사 (행사 기록)", unit:"명/일", unitPrice:350000, category:"staff", desc:"행사 영상 기록·편집", tag:"기록" },
    { id:"sf18", name:"케이터링 서비스 (1인 기준)", unit:"명/식", unitPrice:30000, category:"staff", desc:"스태프·VIP 식사 제공", tag:"부대서비스" },
    { id:"sf19", name:"청소·환경 정리 요원", unit:"명/일", unitPrice:150000, category:"staff", desc:"행사 전·중·후 청소 정리", tag:"부대서비스" },
  ],
};

const CATEGORIES = [
  { key:"sound",    label:"음향 장비",  icon:"🔊", color:"#3b82f6" },
  { key:"video",    label:"영상 장비",  icon:"🎬", color:"#10b981" },
  { key:"relay",    label:"중계 장비",  icon:"📡", color:"#f59e0b" },
  { key:"lighting", label:"조명 장비",  icon:"💡", color:"#8b5cf6" },
  { key:"stage",    label:"무대 장비",  icon:"🏗️", color:"#ef4444" },
  { key:"staff",    label:"행사 인력",  icon:"👥", color:"#06b6d4" },
];

// D-30 체크리스트 데이터
const CHECKLIST_DATA = {
  "D-30": [
    "행사 기본 계획서 확정 및 담당자 배포","장소 계약 완료 및 현장 실측","예산 확정 및 지출 계획서 작성",
    "음향·조명·영상·무대 업체 선정 및 계약","MC·사회자 섭외 확정","보안·안전 업체 선정","인허가 서류 신청 (도로점용·소음·집회 등)","홍보물 디자인 착수","출연자·연사 섭외 및 계약",
  ],
  "D-14": [
    "큐시트 초안 작성 및 배포","음향·영상·조명 장비 리스트 최종 확정","무대 도면 확정 및 업체 공유","홍보물 인쇄 발주","케이터링·식음료 업체 계약","주차·교통 통제 계획 수립","비상 대응 매뉴얼 작성","스태프 배치표 초안 작성","SNS·홍보 채널 콘텐츠 일정 수립",
  ],
  "D-7": [
    "큐시트 최종 확정 및 전 스태프 공유","리허설 일정 확정 및 출연자 통보","장비 반입 동선·시간 확정","현장 전기 용량 최종 확인","소방·안전 점검 신청","스태프 최종 인원 확정 및 연락처 공유","행사장 주변 시설 점검 (화장실·주차·접근)","비상 연락망 구축 및 배포","기상 예보 모니터링 시작 (야외)",
  ],
  "D-3": [
    "장비 반입·설치 시작 (무대·트러스·조명)","음향 라인 체크 및 PA 시스템 세팅","영상 신호 라인 점검","발전기·전원 공급 테스트","출입구·동선 표지판 설치","현수막·배너·현장 홍보물 설치","스태프 사전 미팅 및 매뉴얼 교육","VIP 의전 동선 사전 점검",
  ],
  "D-1": [
    "전체 리허설 실시 (음향·조명·영상 통합 테스트)","큐시트 리허설 진행 (MC·출연자 포함)","무대 안전 최종 점검","비상 탈출로 확인 및 표시","소화기·응급의료 장비 위치 확인","스태프 최종 미팅 및 역할 재확인","케이터링 준비 상태 확인","기상 상황 최종 확인 (야외 대비 플랜B)","방송·중계 신호 최종 테스트",
  ],
  "당일 오전": [
    "현장 도착 및 스태프 출석 확인 (행사 3시간 전)","음향 사운드 체크 최종 실시","조명 포커싱 최종 점검","영상 콘텐츠 재생 최종 확인","무대 청결 및 소품 배치 완료","출연자·연사 도착 확인 및 리셉션","관객 입장 동선 최종 점검","보안·안전 요원 배치 완료","취재·미디어 등록 데스크 운영 시작",
  ],
  "행사 중": [
    "큐시트 기준 진행 상황 실시간 체크","스태프 무전 통신 유지","돌발 상황 대응 (NG 시 대체 프로그램 준비)","VIP 의전 실시간 지원","관객 안전 모니터링","음향·영상·조명 실시간 운용 점검","SNS 라이브 모니터링 및 대응",
  ],
  "종료 후": [
    "출연자·VIP 퇴장 에스코트","관객 질서 있는 퇴장 유도","장비 철수 시작 (역순 분해)","현장 청소 및 원상복구","분실물 수거 및 보관","결산 비용 정리 시작","스태프 수고 공지 및 해산","행사 결과 보고서 작성 시작","다음 행사를 위한 개선 사항 메모",
  ],
};

// 자동 추천 로직 (v3 완전 계승)
function autoRecommend(audience, locationTypes) {
  const n = parseInt(audience) || 0;
  const isOut = locationTypes?.some(t => t.includes("야외") || t.includes("광장"));
  const sm = n > 0 && n < 500, md = n >= 500 && n < 2000, lg = n >= 2000 && n < 5000, xl = n >= 5000;
  const picks = [];
  const add = (id, qty) => { for (const items of Object.values(EQUIPMENT_DB)) { const f = items.find(e => e.id === id); if (f) { picks.push({...f, qty}); return; } } };

  if (xl) {
    add("so01",6);add("so02",8);add("so06",4);add("so07",6);add("so08",4);add("so10",1);add("so11",1);add("so13",1);add("so14",1);add("so15",1);add("so16",2);add("so17",1);add("so18",6);add("so19",4);add("so23",1);add("so24",6);add("so25",4);add("so27",1);add("so28",1);add("so29",1);add("so30",2);
    isOut?add("vi02",24):add("vi01",20); add("vi10",4);add("vi12",4);add("vi15",1);add("vi16",1);add("vi17",1);add("vi18",1);add("vi19",1);add("vi20",1);add("vi21",2);add("vi22",1);
    add("re01",3);add("re02",2);add("re03",2);add("re05",1);add("re08",1);add("re09",5);add("re10",1);add("re11",1);add("re13",1);add("re14",1);add("re16",2);add("re17",1);add("re18",4);add("re19",1);add("re20",1);
    add("li01",12);add("li02",12);add("li03",8);add("li04",16);add("li05",16);add("li06",8);add("li07",24);add("li08",8);add("li10",12);add("li12",4);add("li13",2);add("li14",6);add("li15",3);add("li17",2);add("li18",2);add("li19",1);add("li22",1);add("li23",8);add("li24",4);add("li25",8);add("li26",8);add("li27",1);add("li28",2);add("li29",3);add("li30",2);
    add("st01",1);add("st05",4);add("st06",8);add("st07",4);add("st08",1);add("st09",1);add("st13",2);add("st14",2);add("st15",2);add("st17",1);add("st18",4);add("st19",2);add("st20",4);add("st22",200);add("st24",10);add("st25",8);add("st26",20);add("st27",1);add("st28",8);add("st29",2);add("st30",1);
    add("sf01",1);add("sf02",2);add("sf03",3);add("sf04",2);add("sf06",1);add("sf07",20);add("sf08",10);add("sf11",20);add("sf12",10);add("sf13",6);add("sf14",2);add("sf15",2);add("sf16",2);add("sf17",1);add("sf19",6);
  } else if (lg) {
    add("so01",4);add("so02",4);add("so06",2);add("so07",4);add("so08",2);add("so10",1);add("so11",1);add("so13",1);add("so14",1);add("so16",1);add("so18",4);add("so19",2);add("so23",1);add("so24",4);add("so25",2);add("so27",1);add("so28",1);add("so29",1);add("so30",1);
    isOut?add("vi02",12):add("vi01",12); add("vi10",2);add("vi12",2);add("vi15",1);add("vi16",1);add("vi19",1);add("vi20",1);add("vi21",1);add("vi22",1);
    add("re01",2);add("re02",1);add("re03",1);add("re08",1);add("re10",1);add("re11",1);add("re13",1);add("re14",1);add("re16",1);add("re17",1);add("re18",3);add("re19",1);add("re20",1);
    add("li01",8);add("li02",8);add("li03",4);add("li04",12);add("li05",12);add("li06",4);add("li07",16);add("li08",4);add("li10",8);add("li12",2);add("li14",4);add("li15",2);add("li19",1);add("li22",1);add("li23",6);add("li24",2);add("li25",4);add("li26",4);add("li27",1);add("li28",1);add("li29",2);add("li30",1);
    add("st01",1);add("st05",2);add("st06",4);add("st07",2);add("st09",1);add("st13",1);add("st14",1);add("st15",1);add("st17",1);add("st18",2);add("st19",1);add("st20",2);add("st22",100);add("st24",6);add("st25",4);add("st26",12);add("st27",1);add("st28",4);add("st29",1);add("st30",1);
    add("sf01",1);add("sf02",1);add("sf03",2);add("sf06",1);add("sf07",12);add("sf08",6);add("sf11",12);add("sf12",6);add("sf13",4);add("sf14",1);add("sf15",1);add("sf16",1);add("sf19",3);
  } else if (md) {
    add("so03",1);add("so04",2);add("so07",2);add("so10",1);add("so14",1);add("so18",3);add("so19",2);add("so21",4);add("so24",4);add("so25",1);add("so27",1);add("so28",1);add("so30",1);
    isOut?add("vi03",9):(add("vi05",1),add("vi08",1)); add("vi10",2);add("vi12",1);add("vi15",1);add("vi19",1);add("vi20",1);add("vi21",1);
    add("re02",1);add("re03",1);add("re11",1);add("re13",1);add("re16",1);add("re17",1);add("re18",1);add("re20",1);
    add("li04",8);add("li05",8);add("li07",12);add("li08",4);add("li10",4);add("li14",2);add("li15",1);add("li19",1);add("li22",1);add("li23",4);add("li25",2);add("li26",4);add("li27",1);add("li28",1);add("li29",1);
    add("st02",1);add("st05",1);add("st07",1);add("st09",1);add("st13",1);add("st16",1);add("st17",1);add("st19",1);add("st20",1);add("st22",50);add("st25",2);add("st26",8);add("st27",1);add("st28",2);add("st29",1);
    add("sf02",1);add("sf03",1);add("sf06",1);add("sf07",6);add("sf08",3);add("sf11",6);add("sf12",3);add("sf13",2);add("sf14",1);add("sf16",1);add("sf19",2);
  } else if (sm) {
    add("so05",1);add("so07",2);add("so12",1);add("so18",2);add("so19",1);add("so21",2);add("so24",2);add("so28",1);
    isOut?add("vi04",6):(add("vi06",1),add("vi09",1)); add("vi10",1);add("vi19",1);add("vi20",1);
    add("re18",1);add("re11",1);
    add("li05",4);add("li07",8);add("li10",4);add("li19",1);add("li23",2);add("li26",4);add("li27",1);add("li28",1);
    add("st03",6);add("st05",1);add("st09",1);add("st13",1);add("st19",1);add("st25",2);add("st26",4);add("st27",1);add("st28",1);
    add("sf03",1);add("sf06",1);add("sf07",3);add("sf11",3);add("sf13",1);add("sf16",1);
  }
  const map = {};
  picks.filter(Boolean).forEach(i => { if (map[i.id]) map[i.id].qty += i.qty; else map[i.id] = {...i}; });
  return Object.values(map);
}

// ══════════════════════════════════════════════════════════════════════════════
//  무대 레이아웃 도면 컴포넌트 (SVG 기반)
// ══════════════════════════════════════════════════════════════════════════════
function StageLayout({ form }) {
  const audience = parseInt(form.audience) || 500;
  const isOut = form.locationTypes?.some(t => t.includes("야외"));
  const lg = audience >= 2000;
  const xl = audience >= 5000;

  return (
    <div style={{ padding:"1.2rem" }}>
      <div style={{ fontWeight:800, fontSize:"0.95rem", color:"#1a1a2e", marginBottom:"0.8rem" }}>
        🏗️ 무대 레이아웃 도면 — {form.eventName||"행사"} ({audience.toLocaleString()}명)
      </div>
      <svg viewBox="0 0 600 400" style={{ width:"100%", borderRadius:"0.8rem", border:"1px solid #e5e7eb", background:"#f8f9ff" }}>
        {/* 관객석 */}
        <rect x="80" y="230" width="440" height="130" rx="4" fill="#e8f0fe" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6,3"/>
        <text x="300" y="300" textAnchor="middle" fontSize="13" fill="#3b82f6" fontWeight="700">관 객 석</text>
        <text x="300" y="318" textAnchor="middle" fontSize="10" fill="#6b7280">{audience.toLocaleString()}명 수용</text>

        {/* 무대 */}
        <rect x="150" y="130" width="300" height="90" rx="4" fill="#1a1a2e" stroke="#e94560" strokeWidth="2"/>
        <text x="300" y="175" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="800">STAGE</text>
        <text x="300" y="193" textAnchor="middle" fontSize="10" fill="#aaa">{xl?"12×8m":lg?"10×7m":"8×6m"}</text>

        {/* 메인 PA L */}
        <rect x="80" y="120" width="55" height="35" rx="3" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5"/>
        <text x="107" y="141" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">PA L</text>
        <text x="107" y="152" textAnchor="middle" fontSize="8" fill="#bfdbfe">MAIN</text>

        {/* 메인 PA R */}
        <rect x="465" y="120" width="55" height="35" rx="3" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5"/>
        <text x="492" y="141" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">PA R</text>
        <text x="492" y="152" textAnchor="middle" fontSize="8" fill="#bfdbfe">MAIN</text>

        {/* 서브우퍼 */}
        <rect x="148" y="218" width="60" height="22" rx="2" fill="#1e40af"/>
        <text x="178" y="233" textAnchor="middle" fontSize="8" fill="#fff">SUB ×{xl?8:lg?4:2}</text>
        <rect x="392" y="218" width="60" height="22" rx="2" fill="#1e40af"/>
        <text x="422" y="233" textAnchor="middle" fontSize="8" fill="#fff">SUB ×{xl?8:lg?4:2}</text>

        {/* FOH 믹싱 포지션 */}
        <rect x="250" y="338" width="100" height="32" rx="3" fill="#374151" stroke="#6b7280" strokeWidth="1.5"/>
        <text x="300" y="355" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">FOH 믹싱 포지션</text>
        <text x="300" y="365" textAnchor="middle" fontSize="8" fill="#9ca3af">음향·조명·영상</text>
        {/* FOH 연결선 */}
        <line x1="300" y1="338" x2="300" y2="230" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,3"/>

        {/* LED 전광판 / 스크린 */}
        {(lg||xl) && <>
          <rect x="155" y="50" width="290" height="68" rx="3" fill="#064e3b" stroke="#10b981" strokeWidth="2"/>
          <text x="300" y="82" textAnchor="middle" fontSize="12" fill="#10b981" fontWeight="800">LED 전광판</text>
          <text x="300" y="98" textAnchor="middle" fontSize="9" fill="#6ee7b7">{xl?"P3 · 12×4m":"P4 · 9×3m"}</text>
        </>}
        {(!lg&&!xl) && <>
          <rect x="190" y="55" width="220" height="62" rx="3" fill="#1f2937" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="5,3"/>
          <text x="300" y="83" textAnchor="middle" fontSize="11" fill="#9ca3af" fontWeight="700">스크린 / 프로젝터</text>
          <text x="300" y="98" textAnchor="middle" fontSize="9" fill="#6b7280">4×3m</text>
        </>}

        {/* 조명 트러스 */}
        <line x1="130" y1="115" x2="470" y2="115" stroke="#8b5cf6" strokeWidth="3"/>
        <text x="300" y="111" textAnchor="middle" fontSize="8" fill="#8b5cf6" fontWeight="700">— 조명 트러스 —</text>
        {[160,210,260,300,340,390,440].map((x,i)=>(
          <circle key={i} cx={x} cy="115" r="4" fill="#8b5cf6"/>
        ))}

        {/* 무대 모니터 웨지 */}
        {[190,260,340,410].map((x,i)=>(
          <polygon key={i} points={`${x},220 ${x+12},220 ${x+6},228`} fill="#f59e0b"/>
        ))}
        <text x="300" y="242" textAnchor="middle" fontSize="8" fill="#f59e0b">▲ 모니터 웨지</text>

        {/* 카메라 포지션 */}
        {lg && <>
          <circle cx="130" cy="280" r="10" fill="#ef4444" stroke="#fff" strokeWidth="1.5"/>
          <text x="130" y="284" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">CAM</text>
          <circle cx="470" cy="280" r="10" fill="#ef4444" stroke="#fff" strokeWidth="1.5"/>
          <text x="470" y="284" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">CAM</text>
          <circle cx="300" cy="237" r="9" fill="#ef4444" stroke="#fff" strokeWidth="1.5"/>
          <text x="300" y="241" textAnchor="middle" fontSize="7" fill="#fff">CAM</text>
        </>}

        {/* 스테이지 계단 */}
        <rect x="270" y="218" width="60" height="12" rx="1" fill="#4b5563"/>
        <text x="300" y="228" textAnchor="middle" fontSize="7" fill="#d1d5db">계단</text>

        {/* 범례 */}
        <g transform="translate(10, 10)">
          {[
            {c:"#3b82f6", l:"음향"},
            {c:"#8b5cf6", l:"조명"},
            {c:"#10b981", l:"영상"},
            {c:"#ef4444", l:"카메라"},
          ].map(({c,l},i)=>(
            <g key={l} transform={`translate(${i*60}, 0)`}>
              <rect width="10" height="10" rx="2" fill={c}/>
              <text x="13" y="9" fontSize="8" fill="#374151">{l}</text>
            </g>
          ))}
        </g>

        {/* 방위 */}
        <text x="565" y="20" textAnchor="middle" fontSize="10" fill="#6b7280">↑</text>
        <text x="565" y="32" textAnchor="middle" fontSize="9" fill="#6b7280">무대</text>
        <text x="565" y="390" textAnchor="middle" fontSize="9" fill="#6b7280">입구</text>
      </svg>

      {/* 포지션 범례 표 */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:"0.5rem", marginTop:"0.8rem" }}>
        {[
          { icon:"🔊", label:"PA 스피커", pos:"무대 좌우 날개" },
          { icon:"💡", label:"조명 트러스", pos:"무대 상단 행잉" },
          { icon:"🎬", label:"LED 전광판", pos:"무대 후면 상단" },
          { icon:"🎚️", label:"FOH 포지션", pos:"관객석 중앙 후방" },
          { icon:"📷", label:"카메라 포지션", pos:"FOH 좌우·무대 앞" },
          { icon:"🔺", label:"모니터 웨지", pos:"무대 전면 발앞" },
        ].map(p => (
          <div key={p.label} style={{ background:"#f8f9fa", borderRadius:"0.5rem", padding:"0.5rem 0.7rem", fontSize:"0.78rem" }}>
            <span style={{ marginRight:"0.3rem" }}>{p.icon}</span>
            <b>{p.label}</b>
            <div style={{ color:"#888", fontSize:"0.72rem", marginTop:"0.1rem" }}>{p.pos}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// LED 전광판 ㎡ 계산기
function LedCalculator({ onAdd }) {
  const [w, setW] = useState("");
  const [h, setH] = useState("");
  const [type, setType] = useState("vi02");
  const sqm = w && h ? (parseFloat(w) * parseFloat(h)).toFixed(2) : 0;
  const item = Object.values(EQUIPMENT_DB).flat().find(e => e.id === type);
  const cost = sqm && item ? Math.ceil(sqm) * item.unitPrice : 0;
  return (
    <div style={{ background:"#f0fdf4", border:"1.5px solid #10b981", borderRadius:"0.8rem", padding:"1rem", marginBottom:"0.8rem" }}>
      <div style={{ fontWeight:800, fontSize:"0.88rem", color:"#065f46", marginBottom:"0.6rem" }}>
        📐 LED 전광판 ㎡ 계산기
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.5rem", marginBottom:"0.6rem" }}>
        <div>
          <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#374151", marginBottom:"0.25rem" }}>가로 (m)</div>
          <input type="number" placeholder="예: 6" value={w} onChange={e=>setW(e.target.value)}
            style={{ width:"100%", padding:"0.5rem", borderRadius:"0.5rem", border:"1.5px solid #d1d5eb", fontSize:"0.88rem", boxSizing:"border-box" }}/>
        </div>
        <div>
          <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#374151", marginBottom:"0.25rem" }}>세로 (m)</div>
          <input type="number" placeholder="예: 3" value={h} onChange={e=>setH(e.target.value)}
            style={{ width:"100%", padding:"0.5rem", borderRadius:"0.5rem", border:"1.5px solid #d1d5eb", fontSize:"0.88rem", boxSizing:"border-box" }}/>
        </div>
        <div>
          <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#374151", marginBottom:"0.25rem" }}>LED 종류</div>
          <select value={type} onChange={e=>setType(e.target.value)}
            style={{ width:"100%", padding:"0.5rem", borderRadius:"0.5rem", border:"1.5px solid #d1d5eb", fontSize:"0.78rem", background:"#fff", boxSizing:"border-box" }}>
            {EQUIPMENT_DB.video.filter(e=>e.isLED).map(e=>(
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>
      </div>
      {sqm > 0 && (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#fff", borderRadius:"0.5rem", padding:"0.6rem 0.8rem" }}>
          <div>
            <span style={{ fontSize:"0.82rem", color:"#374151" }}>면적: </span>
            <b style={{ color:"#065f46" }}>{sqm}㎡</b>
            <span style={{ fontSize:"0.82rem", color:"#374151", marginLeft:"0.8rem" }}>견적: </span>
            <b style={{ color:"#e94560" }}>{cost.toLocaleString()}원</b>
          </div>
          <button onClick={() => onAdd({...item, qty: Math.ceil(sqm), ledW: w, ledH: h})}
            style={{ padding:"0.35rem 0.8rem", borderRadius:"0.4rem", border:"none", background:"#10b981", color:"#fff", fontWeight:700, fontSize:"0.8rem", cursor:"pointer" }}>
            견적 추가
          </button>
        </div>
      )}
    </div>
  );
}

// 체크리스트 컴포넌트
function Checklist() {
  const [checked, setChecked] = useState({});
  const [open, setOpen] = useState("D-30");
  const toggle = (phase, idx) => setChecked(c => ({ ...c, [`${phase}-${idx}`]: !c[`${phase}-${idx}`] }));

  const phaseColors = {
    "D-30":"#3b82f6","D-14":"#8b5cf6","D-7":"#f59e0b","D-3":"#ef4444",
    "D-1":"#e94560","당일 오전":"#10b981","행사 중":"#06b6d4","종료 후":"#6b7280",
  };

  return (
    <div style={{ padding:"1.2rem" }}>
      <div style={{ fontWeight:800, fontSize:"0.95rem", color:"#1a1a2e", marginBottom:"0.8rem" }}>
        ✅ D-DAY 체크리스트
      </div>
      {Object.entries(CHECKLIST_DATA).map(([phase, items]) => {
        const doneCount = items.filter((_,i) => checked[`${phase}-${i}`]).length;
        const isOpen = open === phase;
        const col = phaseColors[phase] || "#6b7280";
        return (
          <div key={phase} style={{ marginBottom:"0.5rem", border:`1px solid ${isOpen ? col : "#e5e7eb"}`, borderRadius:"0.7rem", overflow:"hidden" }}>
            <button onClick={() => setOpen(isOpen ? null : phase)}
              style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.6rem 0.9rem", background: isOpen ? col+"18" : "#fff", border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                <span style={{ background:col, color:"#fff", borderRadius:"1rem", padding:"0.15rem 0.6rem", fontSize:"0.75rem", fontWeight:800 }}>{phase}</span>
                <span style={{ fontSize:"0.82rem", fontWeight:700, color:"#374151" }}>{items.length}개 항목</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                <span style={{ fontSize:"0.8rem", color: doneCount===items.length ? "#10b981" : "#888", fontWeight:700 }}>
                  {doneCount}/{items.length} 완료
                </span>
                <span style={{ color:"#aaa" }}>{isOpen?"▲":"▼"}</span>
              </div>
            </button>
            {isOpen && (
              <div style={{ padding:"0.6rem 0.9rem", background:"#fafafa" }}>
                {items.map((item, i) => (
                  <label key={i} style={{ display:"flex", alignItems:"flex-start", gap:"0.5rem", padding:"0.35rem 0", cursor:"pointer", borderBottom: i < items.length-1 ? "1px solid #f0f0f0" : "none" }}>
                    <input type="checkbox" checked={!!checked[`${phase}-${i}`]} onChange={() => toggle(phase, i)}
                      style={{ marginTop:"2px", accentColor: col, width:14, height:14 }}/>
                    <span style={{ fontSize:"0.83rem", color: checked[`${phase}-${i}`] ? "#aaa" : "#374151", textDecoration: checked[`${phase}-${i}`] ? "line-through" : "none" }}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  메인 앱
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage]           = useState("home");
  const [step, setStep]           = useState(1);
  const [form, setForm]           = useState({
    eventName:"", eventType:"", date:"", duration:"", audience:"",
    budget:"", locationTypes:[], locationDetail:"", theme:"", specialRequests:"",
    contactName:"", contactPhone:"", contactEmail:"",
  });
  const [aiPlan, setAiPlan]       = useState("");
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [addTab, setAddTab]       = useState("sound");
  const [quoteNote, setQuoteNote] = useState("");
  const [resultTab, setResultTab] = useState("plan");

  const up = (k, v) => setForm(f => ({...f, [k]:v}));
  const toggleLocType = (v) => setForm(f => ({
    ...f,
    locationTypes: f.locationTypes.includes(v) ? f.locationTypes.filter(t=>t!==v) : [...f.locationTypes, v]
  }));

  const costs = {
    equip: equipment.filter(e=>e.tag!=="인력").reduce((s,e)=>s+e.unitPrice*e.qty,0),
    staff: equipment.filter(e=>e.tag==="인력").reduce((s,e)=>s+e.unitPrice*e.qty,0),
  };
  const transport  = Math.round(costs.equip * 0.08);
  const install    = Math.round(costs.equip * 0.12);
  const grandTotal = costs.equip + costs.staff + transport + install;

  const updateQty = (id,qty) => setEquipment(eq => qty<=0 ? eq.filter(e=>e.id!==id) : eq.map(e=>e.id===id?{...e,qty}:e));
  const addItem   = (item)   => setEquipment(eq => { const ex=eq.find(e=>e.id===item.id); return ex?eq.map(e=>e.id===item.id?{...e,qty:e.qty+1}:e):[...eq,{...item,qty:1}]; });

  const generate = async () => {
    setLoading(true); setAiPlan("");
    setEquipment(autoRecommend(form.audience, form.locationTypes));
    const prompt = `당신은 대한민국 최고 이벤트 기획 전문가입니다. 음향·영상·조명·무대 현장 경험이 풍부합니다.

행사 조건:
- 행사명: ${form.eventName||"행사"} / 유형: ${form.eventType}
- 일시: ${form.date} (${form.duration}) / 장소: ${form.locationDetail} (${form.locationTypes.join("·")})
- 관람객: ${form.audience}명 / 예산: ${form.budget}만원
- 테마: ${form.theme||"없음"} / 특이사항: ${form.specialRequests||"없음"}

# 🎪 ${form.eventName||"행사"} 기획서

## 1. 행사 컨셉 & 핵심 메시지
## 2. 공간 구성 & 동선 계획 (실내/야외 구분)
## 3. 프로그램 타임테이블
| 시간 | 프로그램 | 담당 | 비고 |
|------|---------|------|------|
(구체적으로 작성)
## 4. 운영 인력 배치 계획
## 5. 예산 배분 가이드 (${form.budget}만원 기준)
| 항목 | 금액 | 비율 |
|------|------|------|
## 6. 협력 업체 섭외 가이드 (광고 업체 연결 예정 항목 표시)
## 7. 리스크 & 대비책

실무에서 바로 쓸 수 있도록 구체적으로 작성해주세요.`;
    try {
      const r = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "서버 오류");
      if (d.text) { setAiPlan(d.text); setPage("result"); setResultTab("plan"); }
      else throw new Error("응답 내용이 비어있습니다.");
    } catch(e){
      alert("❌ 오류\n\n" + e.message + "\n\n💡 Vercel 환경변수 확인:\n이름: ANTHROPIC_API_KEY\n값: sk-ant-...");
    }
    finally{ setLoading(false); }
  };

  // ── 홈 ─────────────────────────────────────────────────────────────────
  if (page==="home") return (
    <div style={S.wrap}><style>{CSS}</style>
      <div style={S.hero}>
        <div style={S.badge}>🎪 음향·영상·중계·조명·무대 전문 AI 플랫폼</div>
        <h1 style={S.heroH1}>AI 행사 기획서 &<br/><span style={{color:"#FFD700"}}>전문 장비 견적 자동화</span></h1>
        <p style={S.heroP}>100+ 전문 장비 DB · 무대 레이아웃 도면 · D-30 체크리스트<br/>규모별 자동 추천 · LED 전광판 ㎡ 계산 · 즉시 PDF 출력</p>
        <div style={S.statRow}>
          {[["100+","장비 항목"],["6","전문 카테고리"],["도면","무대 레이아웃"],["D-30","체크리스트"]].map(([n,l])=>(
            <div key={l} style={S.stat}><b style={{fontSize:"1.3rem",color:"#FFD700"}}>{n}</b><span style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.6)"}}>{l}</span></div>
          ))}
        </div>
        <button style={S.cta} onClick={()=>setPage("planner")}>무료로 시작하기 →</button>
      </div>

      <div style={{padding:"2rem 1.2rem"}}>
        <h2 style={S.secH}>6대 전문 카테고리</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"0.8rem"}}>
          {CATEGORIES.map(c=>(
            <div key={c.key} style={{background:"#fff",borderRadius:"0.8rem",padding:"1.2rem 0.8rem",textAlign:"center",boxShadow:"0 2px 10px rgba(0,0,0,0.06)",borderTop:`4px solid ${c.color}`}}>
              <div style={{fontSize:"2rem",marginBottom:"0.4rem"}}>{c.icon}</div>
              <div style={{fontWeight:800,fontSize:"0.9rem",color:"#1a1a2e"}}>{c.label}</div>
              <div style={{fontSize:"0.72rem",color:"#888",marginTop:"0.2rem"}}>{EQUIPMENT_DB[c.key].length}개 항목</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:"#f8faff",margin:"0 1rem",borderRadius:"1.2rem",padding:"1.5rem"}}>
        <h2 style={S.secH}>신규 기능 ✨</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"0.8rem"}}>
          {[
            {icon:"🏗️",t:"무대 레이아웃 도면",d:"SVG 기반 음향·조명·영상 포지션 자동 생성"},
            {icon:"✅",t:"D-30 체크리스트",d:"D-30부터 종료 후까지 단계별 체크리스트"},
            {icon:"📐",t:"LED ㎡ 계산기",d:"가로×세로 입력으로 LED 전광판 면적·단가 자동 산출"},
            {icon:"📍",t:"장소 다중 선택",d:"실내+야외 복합 행사 동시 선택 지원"},
          ].map(f=>(
            <div key={f.t} style={{background:"#fff",borderRadius:"0.8rem",padding:"1rem",boxShadow:"0 1px 6px rgba(0,0,0,0.05)"}}>
              <div style={{fontSize:"1.6rem",marginBottom:"0.4rem"}}>{f.icon}</div>
              <div style={{fontWeight:800,fontSize:"0.88rem",color:"#1a1a2e",marginBottom:"0.3rem"}}>{f.t}</div>
              <div style={{fontSize:"0.78rem",color:"#666",lineHeight:1.5}}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{textAlign:"center",padding:"2rem"}}>
        <button style={S.cta} onClick={()=>setPage("planner")}>지금 바로 견적 만들기 🎛️</button>
      </div>
      <footer style={{textAlign:"center",padding:"1.5rem",color:"#888",fontSize:"0.78rem",borderTop:"1px solid #eee"}}>
        🎪 EventAI Pro v4 · 음향·영상·중계·조명·무대 전문 플랫폼 · Powered by Claude AI
      </footer>
    </div>
  );

  // ── 기획서 입력 ──────────────────────────────────────────────────────────
  if (page==="planner") return (
    <div style={S.wrap}><style>{CSS}</style>
      <div style={S.topBar}>
        <button style={S.back} onClick={()=>setPage("home")}>← 홈</button>
        <b style={{fontSize:"1rem"}}>행사 정보 입력</b>
        <div style={{width:48}}/>
      </div>

      {/* 스텝바 */}
      <div style={{display:"flex",justifyContent:"center",alignItems:"flex-start",gap:"0.2rem",padding:"1rem",background:"#fff",borderBottom:"1px solid #f0f0f0"}}>
        {["기본 정보","예산·컨셉","장소·연락처"].map((s,i)=>(
          <div key={s} style={{display:"flex",alignItems:"center",gap:"0.2rem"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.2rem"}}>
              <div style={{width:26,height:26,borderRadius:"50%",background:step===i+1?"#e94560":step>i+1?"#10b981":"#e5e7eb",color:step>=i+1?"#fff":"#aaa",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.78rem",fontWeight:800}}>
                {step>i+1?"✓":i+1}
              </div>
              <span style={{fontSize:"0.7rem",color:step===i+1?"#e94560":"#999",fontWeight:step===i+1?700:400}}>{s}</span>
            </div>
            {i<2 && <div style={{width:28,height:2,background:step>i+1?"#10b981":"#e5e7eb",margin:"0 0.1rem",marginBottom:"1rem"}}/>}
          </div>
        ))}
      </div>

      <div style={S.card}>
        {step===1 && <>
          <h3 style={S.cardT}>🎪 기본 정보</h3>
          <FL>행사 이름</FL>
          <FI placeholder="예: 2025 대구 봄 축제" value={form.eventName} onChange={e=>up("eventName",e.target.value)}/>
          <FL>행사 종류 *</FL>
          <Chips opts={["지자체 축제","기업 행사","대학 축제","콘서트·공연","전시회","체육 행사","종교 행사","기타"]} val={form.eventType} set={v=>up("eventType",v)}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.8rem"}}>
            <div><FL>행사 날짜 *</FL><FI type="date" value={form.date} onChange={e=>up("date",e.target.value)}/></div>
            <div><FL>행사 기간 *</FL>
              <select value={form.duration} onChange={e=>up("duration",e.target.value)} style={S.sel}>
                <option value="">선택</option>
                {["반나절(4시간)","하루(8시간)","1박2일","2박3일","3박4일 이상"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <FL>예상 관람객 수 *</FL>
          <Chips opts={["100명 이하","300명","500명","1,000명","3,000명","5,000명","10,000명 이상"]} val={form.audience} set={v=>up("audience",v.replace(/[^0-9]/g,"")||"10000")}/>
          <PB disabled={!form.eventType||!form.date||!form.duration||!form.audience} onClick={()=>setStep(2)}>다음 단계 →</PB>
        </>}

        {step===2 && <>
          <h3 style={S.cardT}>💰 예산 & 컨셉</h3>
          <FL>총 예산 (만원) *</FL>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.4rem",marginBottom:"0.6rem"}}>
            {["500","1000","2000","3000","5000","10000"].map(b=>(
              <button key={b} onClick={()=>up("budget",b)} style={{...S.chip,...(form.budget===b?S.chipOn:{})}}>{Number(b).toLocaleString()}만</button>
            ))}
          </div>
          <FI type="number" placeholder="직접 입력 (만원)" value={form.budget} onChange={e=>up("budget",e.target.value)}/>
          <FL>행사 테마 / 컨셉</FL>
          <FI placeholder="예: 봄꽃, K-POP, 가족 친화, 레트로..." value={form.theme} onChange={e=>up("theme",e.target.value)}/>
          <FL>특별 요청사항</FL>
          <textarea value={form.specialRequests} onChange={e=>up("specialRequests",e.target.value)} placeholder="장애인 편의, 어린이 체험존, 야간 조명 강조..." style={S.ta}/>
          <div style={{display:"flex",gap:"0.5rem"}}><SB onClick={()=>setStep(1)}>← 이전</SB><PB style={{flex:1}} disabled={!form.budget} onClick={()=>setStep(3)}>다음 단계 →</PB></div>
        </>}

        {step===3 && <>
          <h3 style={S.cardT}>📍 장소 & 연락처</h3>
          <FL>장소 유형 <span style={{fontWeight:400,color:"#10b981",fontSize:"0.75rem"}}>(복수 선택 가능 · 선택사항)</span></FL>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.4rem",marginBottom:"0.8rem"}}>
            {["야외 공원·광장","야외 도심·거리","실내 공연장","실내 컨벤션·전시장","실내 체육관","캠퍼스·학교","복합 공간 (실내+야외)","기타"].map(opt=>{
              const on = form.locationTypes.includes(opt);
              return (
                <button key={opt} onClick={()=>toggleLocType(opt)}
                  style={{padding:"0.5rem 0.6rem",borderRadius:"0.6rem",border:`2px solid ${on?"#e94560":"#e5e7eb"}`,background:on?"#fff0f3":"#fff",color:on?"#e94560":"#555",fontWeight:on?700:400,fontSize:"0.8rem",cursor:"pointer",fontFamily:"inherit",textAlign:"left",display:"flex",alignItems:"center",gap:"0.3rem"}}>
                  <span style={{fontSize:"1rem"}}>{on?"☑":"☐"}</span>{opt}
                </button>
              );
            })}
          </div>
          <FL>행사 장소명 * <span style={{fontWeight:400,color:"#e94560",fontSize:"0.75rem"}}>(필수 — 입력하면 버튼 활성화)</span></FL>
          <FI placeholder="예: 두류공원, 엑스코, 계명대학교..." value={form.locationDetail} onChange={e=>up("locationDetail",e.target.value)}/>

          {form.locationTypes.length > 0 && (
            <div style={{background:"#f0f7ff",borderRadius:"0.6rem",padding:"0.6rem 0.8rem",marginBottom:"0.5rem",fontSize:"0.8rem",color:"#1e40af"}}>
              ✅ 선택된 장소 유형: <b>{form.locationTypes.join(" + ")}</b>
            </div>
          )}

          <div style={{background:"#f0f7ff",borderRadius:"0.8rem",padding:"0.9rem",marginTop:"0.5rem"}}>
            <div style={{fontWeight:700,fontSize:"0.82rem",color:"#1e40af",marginBottom:"0.5rem"}}>📋 견적서 수신 정보 (선택)</div>
            <FI placeholder="담당자 이름" value={form.contactName} onChange={e=>up("contactName",e.target.value)}/>
            <FI placeholder="연락처" value={form.contactPhone} onChange={e=>up("contactPhone",e.target.value)}/>
            <FI placeholder="이메일" value={form.contactEmail} onChange={e=>up("contactEmail",e.target.value)}/>
          </div>
          <div style={{display:"flex",gap:"0.5rem",marginTop:"0.8rem"}}>
            <SB onClick={()=>setStep(2)}>← 이전</SB>
            <button disabled={!form.locationDetail||loading} onClick={generate}
              style={{...S.pb,flex:1,...(!form.locationDetail||loading?S.pbOff:{}),display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem"}}>
              {loading?<><span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⚙️</span>AI 생성 중...</>:"✨ AI 기획서 + 전체 견적 생성!"}
            </button>
          </div>
        </>}
      </div>
    </div>
  );

  // ── 결과 페이지 ──────────────────────────────────────────────────────────
  if (page==="result") return (
    <div style={S.wrap}><style>{CSS+printCSS}</style>

      {/* 탑 네비 */}
      <div style={{...S.topBar,gap:"0.3rem",flexWrap:"wrap"}} className="no-print">
        <button style={S.back} onClick={()=>{setPage("planner");setStep(1);}}>← 다시</button>
        <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap"}}>
          {[["plan","📋 기획서"],["layout","🏗️ 도면"],["quote","🎛️ 견적"],["checklist","✅ 체크리스트"]].map(([k,l])=>(
            <button key={k} onClick={()=>setResultTab(k)}
              style={{...S.tabBtn,...(resultTab===k?S.tabOn:{}),fontSize:"0.75rem",padding:"0.35rem 0.6rem"}}>{l}</button>
          ))}
        </div>
        <button style={S.printBtn} onClick={()=>window.print()}>🖨️</button>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"0.8rem"}}>

        {/* 기획서 탭 */}
        {resultTab==="plan" && (
          <div style={S.panel}>
            <div style={S.panelHd}>📋 AI 행사 기획서 — {form.eventName||"행사"}</div>
            <div style={{padding:"1.2rem",maxHeight:"80vh",overflowY:"auto"}}>{renderMd(aiPlan)}</div>
          </div>
        )}

        {/* 무대 레이아웃 도면 탭 */}
        {resultTab==="layout" && (
          <div style={S.panel}>
            <div style={S.panelHd}>🏗️ 무대 레이아웃 도면</div>
            <StageLayout form={form}/>
          </div>
        )}

        {/* 견적서 탭 */}
        {resultTab==="quote" && (
          <div style={S.panel}>
            <div style={S.panelHd}>
              <span>🎛️ 장비·인력 견적서 — {form.eventName||"행사"}</span>
              <span style={{color:"#FFD700",fontWeight:900}}>{grandTotal.toLocaleString()}원</span>
            </div>

            {/* 견적 요약 정보 */}
            <div style={{padding:"0.8rem 1.2rem",background:"#f8f9fa",borderBottom:"1px solid #eee",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:"0.3rem"}}>
              {[["행사명",form.eventName||"미정"],["행사일",form.date],["장소",form.locationDetail],["관람객",`${form.audience}명`],["장소유형",form.locationTypes.join("·")],
                ...(form.contactName?[["담당자",form.contactName]]:[])]
                .map(([k,v])=>(
                <div key={k} style={{fontSize:"0.8rem"}}><span style={{color:"#999"}}>{k}: </span><b style={{color:"#1a1a2e"}}>{v}</b></div>
              ))}
            </div>

            {/* LED 계산기 */}
            <div style={{padding:"0.8rem 1.2rem"}} className="no-print">
              <LedCalculator onAdd={addItem}/>
            </div>

            {/* 카테고리별 장비 */}
            {CATEGORIES.map(cat => {
              const items = equipment.filter(e=>e.category===cat.key);
              if (!items.length) return null;
              const catTotal = items.reduce((s,e)=>s+e.unitPrice*e.qty,0);
              const tags = [...new Set(items.map(e=>e.tag))];
              return (
                <div key={cat.key} style={{marginBottom:"0.4rem"}}>
                  <div style={{...S.catHd,borderLeft:`4px solid ${cat.color}`}}>
                    <span>{cat.icon} {cat.label}</span>
                    <span style={{color:cat.color,fontWeight:900}}>{catTotal.toLocaleString()}원</span>
                  </div>
                  <div style={{overflowX:"auto"}}>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem"}}>
                      <thead>
                        <tr style={{background:"#f8f9fa"}}>
                          <th style={S.th}>장비·항목명</th>
                          <th style={{...S.th,width:72,textAlign:"center"}}>수량</th>
                          <th style={{...S.th,width:90,textAlign:"right"}}>단가(원)</th>
                          <th style={{...S.th,width:100,textAlign:"right"}}>소계(원)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tags.map(tag=>[
                          <tr key={`t-${tag}`}><td colSpan={4} style={{padding:"0.25rem 0.7rem",background:"#f3f4f6",fontSize:"0.71rem",fontWeight:700,color:"#555"}}>▸ {tag}</td></tr>,
                          ...items.filter(e=>e.tag===tag).map((e,i)=>(
                            <tr key={e.id} style={{borderBottom:"1px solid #f5f5f5",background:i%2===0?"#fff":"#fafafa"}}>
                              <td style={S.td}>
                                <div style={{fontWeight:600,fontSize:"0.83rem"}}>{e.name}{e.ledW?` (${e.ledW}×${e.ledH}m)`:""}</div>
                                <div style={{fontSize:"0.7rem",color:"#aaa"}}>{e.desc}</div>
                              </td>
                              <td style={{...S.td,textAlign:"center"}}>
                                <div style={{display:"flex",alignItems:"center",gap:"0.25rem",justifyContent:"center"}} className="no-print">
                                  <button onClick={()=>updateQty(e.id,e.qty-1)} style={S.qb}>−</button>
                                  <b style={{minWidth:22,textAlign:"center",fontSize:"0.85rem"}}>{e.qty}</b>
                                  <button onClick={()=>updateQty(e.id,e.qty+1)} style={S.qb}>+</button>
                                </div>
                                <span className="print-only">{e.qty} {e.unit}</span>
                              </td>
                              <td style={{...S.td,textAlign:"right",color:"#666"}}>{e.unitPrice.toLocaleString()}</td>
                              <td style={{...S.td,textAlign:"right",fontWeight:800,color:"#1a1a2e"}}>{(e.unitPrice*e.qty).toLocaleString()}</td>
                            </tr>
                          ))
                        ])}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}

            {/* 장비 추가 */}
            <details style={{borderTop:"1px solid #f0f0f0",marginTop:"0.4rem"}} className="no-print">
              <summary style={{padding:"0.7rem 1.2rem",cursor:"pointer",fontWeight:700,fontSize:"0.85rem",color:"#e94560"}}>➕ 장비·인력 직접 추가</summary>
              <div style={{padding:"0.5rem 1.2rem 1rem"}}>
                <div style={{display:"flex",gap:"0.35rem",flexWrap:"wrap",marginBottom:"0.6rem"}}>
                  {CATEGORIES.map(c=>(
                    <button key={c.key} onClick={()=>setAddTab(c.key)}
                      style={{...S.chip,fontSize:"0.75rem",padding:"0.3rem 0.55rem",...(addTab===c.key?{...S.chipOn,borderColor:c.color,color:c.color,background:c.color+"18"}:{})}}>
                      {c.icon} {c.label}
                    </button>
                  ))}
                </div>
                <div style={{maxHeight:200,overflowY:"auto",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:"0.35rem"}}>
                  {EQUIPMENT_DB[addTab]?.map(item=>(
                    <div key={item.id} style={{display:"flex",alignItems:"center",gap:"0.4rem",padding:"0.4rem 0.6rem",background:"#f8f9fa",borderRadius:"0.5rem"}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:"0.78rem",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div>
                        <div style={{fontSize:"0.68rem",color:"#999"}}>{item.unitPrice.toLocaleString()}원/{item.unit}</div>
                      </div>
                      <button onClick={()=>addItem({...item,category:addTab})} style={S.addBtn}>추가</button>
                    </div>
                  ))}
                </div>
              </div>
            </details>

            {/* 비고 */}
            <div style={{padding:"0.5rem 1.2rem"}} className="no-print">
              <FL>📝 견적 비고사항</FL>
              <textarea value={quoteNote} onChange={e=>setQuoteNote(e.target.value)} placeholder="설치·철거 포함 / VAT 별도 / 유효기간 14일 / 계약금 50%..." style={{...S.ta,minHeight:50}}/>
            </div>

            {/* 합계 */}
            <div style={{padding:"1rem 1.2rem",background:"#f8f9fa",borderTop:"2px solid #eee"}}>
              {[["장비·기자재 렌탈",costs.equip],["인력·스태프 비용",costs.staff],["운반·물류비 (8%)",transport],["설치·철거 작업비 (12%)",install]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:"0.85rem",color:"#555",padding:"0.2rem 0"}}>
                  <span>{l}</span><span>{v.toLocaleString()}원</span>
                </div>
              ))}
              <div style={{height:1,background:"#e5e7eb",margin:"0.6rem 0"}}/>
              <div style={{display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:"1.05rem",color:"#e94560"}}>
                <span>합계 (VAT 별도)</span><span>{grandTotal.toLocaleString()}원</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",color:"#aaa",marginTop:"0.2rem"}}>
                <span>VAT 포함 (10%)</span><span>{Math.round(grandTotal*1.1).toLocaleString()}원</span>
              </div>
              {quoteNote && <div style={{marginTop:"0.6rem",padding:"0.5rem",background:"#fff",borderRadius:"0.5rem",fontSize:"0.8rem",color:"#555"}}>📝 {quoteNote}</div>}
              <div style={{fontSize:"0.7rem",color:"#ccc",textAlign:"right",marginTop:"0.4rem"}}>
                견적일: {new Date().toLocaleDateString("ko-KR")} · EventAI Pro v4
              </div>
            </div>
          </div>
        )}

        {/* 체크리스트 탭 */}
        {resultTab==="checklist" && (
          <div style={S.panel}>
            <div style={S.panelHd}>✅ D-DAY 체크리스트 — {form.eventName||"행사"}</div>
            <Checklist/>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  공통 컴포넌트
// ══════════════════════════════════════════════════════════════════════════════
function Chips({opts,val,set}){return(<div style={{display:"flex",flexWrap:"wrap",gap:"0.35rem",marginBottom:"0.6rem"}}>{opts.map(o=><button key={o} onClick={()=>set(o)} style={{...S.chip,...(val===o?S.chipOn:{})}}>{o}</button>)}</div>);}
function FL({children}){return <div style={{fontWeight:700,fontSize:"0.82rem",color:"#374151",margin:"0.55rem 0 0.28rem"}}>{children}</div>;}
function FI(p){return <input {...p} style={{width:"100%",padding:"0.6rem 0.75rem",borderRadius:"0.55rem",border:"1.5px solid #e5e7eb",fontSize:"0.87rem",fontFamily:"inherit",boxSizing:"border-box",marginBottom:"0.25rem",...p.style}}/>;}
function PB({children,disabled,onClick,style}){return <button onClick={onClick} disabled={disabled} style={{...S.pb,...(disabled?S.pbOff:{}),...style}}>{children}</button>;}
function SB({children,onClick}){return <button onClick={onClick} style={S.sb}>{children}</button>;}

function renderMd(text){
  return text.split("\n").map((l,i)=>{
    if(l.startsWith("# "))  return <h1 key={i} style={{fontSize:"1.2rem",fontWeight:900,color:"#1a1a2e",margin:"1rem 0 0.4rem",borderBottom:"2px solid #e94560",paddingBottom:"0.3rem"}}>{l.slice(2)}</h1>;
    if(l.startsWith("## ")) return <h2 key={i} style={{fontSize:"0.98rem",fontWeight:800,color:"#1e3a5f",margin:"0.9rem 0 0.3rem",borderLeft:"3px solid #e94560",paddingLeft:"0.5rem"}}>{l.slice(3)}</h2>;
    if(l.startsWith("### "))return <h3 key={i} style={{fontSize:"0.88rem",fontWeight:700,color:"#374151",margin:"0.5rem 0 0.2rem"}}>{l.slice(4)}</h3>;
    if(l.startsWith("- ")) return <li key={i} style={{marginLeft:"1.2rem",fontSize:"0.84rem",lineHeight:1.75,color:"#444"}}>{l.slice(2)}</li>;
    if(l.match(/^\|/))      return <div key={i} style={{fontSize:"0.8rem",color:"#444",fontFamily:"monospace",padding:"0.1rem 0",borderBottom:"1px solid #f0f0f0"}}>{l}</div>;
    if(l.trim()==="")       return <div key={i} style={{height:"0.3rem"}}/>;
    return <p key={i} style={{fontSize:"0.84rem",lineHeight:1.75,color:"#444",margin:"0.1rem 0"}}>{l}</p>;
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  스타일 (v3 완전 계승 + 확장)
// ══════════════════════════════════════════════════════════════════════════════
const S = {
  wrap:    {minHeight:"100vh",background:"#f5f7fb",fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif"},
  hero:    {background:"linear-gradient(135deg,#0f0c29 0%,#302b63 60%,#1a1a3e 100%)",padding:"3rem 1.5rem",textAlign:"center",color:"#fff"},
  badge:   {display:"inline-block",background:"rgba(255,215,0,0.15)",border:"1px solid rgba(255,215,0,0.4)",color:"#FFD700",borderRadius:"2rem",padding:"0.3rem 1rem",fontSize:"0.78rem",fontWeight:700,marginBottom:"1rem"},
  heroH1:  {fontSize:"clamp(1.7rem,5vw,2.8rem)",fontWeight:900,lineHeight:1.2,margin:"0 0 0.8rem"},
  heroP:   {fontSize:"0.92rem",color:"rgba(255,255,255,0.72)",lineHeight:1.75,margin:"0 0 1.8rem"},
  statRow: {display:"flex",justifyContent:"center",gap:"2rem",marginBottom:"2rem",flexWrap:"wrap"},
  stat:    {display:"flex",flexDirection:"column",alignItems:"center",gap:"0.15rem"},
  cta:     {background:"linear-gradient(135deg,#e94560,#c0392b)",color:"#fff",border:"none",borderRadius:"3rem",padding:"0.9rem 2.2rem",fontSize:"1rem",fontWeight:800,cursor:"pointer",boxShadow:"0 8px 24px rgba(233,69,96,0.38)"},
  secH:    {textAlign:"center",fontSize:"1.25rem",fontWeight:900,color:"#1a1a2e",marginBottom:"1.2rem"},
  topBar:  {display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.75rem 1rem",background:"#fff",borderBottom:"1px solid #eee",position:"sticky",top:0,zIndex:10},
  back:    {background:"none",border:"none",color:"#e94560",fontWeight:700,cursor:"pointer",fontSize:"0.88rem"},
  card:    {maxWidth:580,margin:"1.2rem auto 2rem",background:"#fff",borderRadius:"1.2rem",padding:"1.4rem",boxShadow:"0 4px 18px rgba(0,0,0,0.08)"},
  cardT:   {fontSize:"1.05rem",fontWeight:900,color:"#1a1a2e",margin:"0 0 0.9rem"},
  chip:    {padding:"0.4rem 0.8rem",borderRadius:"2rem",border:"1.5px solid #e5e7eb",background:"#fff",color:"#555",fontSize:"0.8rem",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"},
  chipOn:  {borderColor:"#e94560",background:"#fff0f3",color:"#e94560",fontWeight:700},
  sel:     {width:"100%",padding:"0.6rem 0.75rem",borderRadius:"0.55rem",border:"1.5px solid #e5e7eb",fontSize:"0.87rem",fontFamily:"inherit",background:"#fff",boxSizing:"border-box"},
  ta:      {width:"100%",minHeight:78,padding:"0.6rem 0.75rem",borderRadius:"0.55rem",border:"1.5px solid #e5e7eb",fontSize:"0.86rem",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box"},
  pb:      {width:"100%",marginTop:"0.8rem",padding:"0.82rem",borderRadius:"0.75rem",border:"none",background:"linear-gradient(135deg,#e94560,#c0392b)",color:"#fff",fontWeight:800,fontSize:"0.93rem",cursor:"pointer",fontFamily:"inherit"},
  pbOff:   {background:"#ccc",cursor:"not-allowed"},
  sb:      {marginTop:"0.8rem",padding:"0.82rem 1rem",borderRadius:"0.75rem",border:"1.5px solid #e5e7eb",background:"#fff",color:"#666",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},
  panel:   {background:"#fff",borderRadius:"1rem",boxShadow:"0 2px 12px rgba(0,0,0,0.07)",overflow:"hidden",marginBottom:"1rem"},
  panelHd: {background:"#1a1a2e",color:"#fff",padding:"0.85rem 1.2rem",fontWeight:800,fontSize:"0.93rem",display:"flex",justifyContent:"space-between",alignItems:"center"},
  tabBtn:  {padding:"0.4rem 0.8rem",borderRadius:"0.5rem",border:"1.5px solid #e5e7eb",background:"#fff",color:"#888",fontSize:"0.82rem",fontWeight:600,cursor:"pointer",fontFamily:"inherit"},
  tabOn:   {borderColor:"#e94560",background:"#e94560",color:"#fff",fontWeight:800},
  printBtn:{background:"#1a1a2e",color:"#fff",border:"none",borderRadius:"0.5rem",padding:"0.38rem 0.7rem",fontSize:"0.82rem",fontWeight:700,cursor:"pointer"},
  catHd:   {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.5rem 1rem",background:"#fafafa",fontWeight:700,fontSize:"0.85rem",color:"#1a1a2e",borderBottom:"1px solid #f0f0f0"},
  th:      {padding:"0.4rem 0.7rem",textAlign:"left",fontWeight:700,fontSize:"0.76rem",color:"#666",borderBottom:"1px solid #eee"},
  td:      {padding:"0.45rem 0.7rem",verticalAlign:"middle"},
  qb:      {width:22,height:22,border:"1px solid #e5e7eb",borderRadius:"4px",background:"#fff",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",padding:0,lineHeight:1},
  addBtn:  {padding:"0.18rem 0.55rem",borderRadius:"0.4rem",border:"1px solid #e94560",background:"#fff",color:"#e94560",fontSize:"0.73rem",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"},
};

const CSS=`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700;800;900&display=swap');
  *{box-sizing:border-box;} body{margin:0;}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  .print-only{display:none!important;}
  details summary::-webkit-details-marker{display:none;}
`;
const printCSS=`
  @media print{
    .no-print{display:none!important;}
    .print-only{display:inline!important;}
    body{background:white;}
    [style*="position: sticky"]{position:static!important;}
  }
`;
