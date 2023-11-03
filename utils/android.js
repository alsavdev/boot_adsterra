const randomListAndroid = () => {
    const listUserAgent = [
        'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.111 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 14; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.111 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 14; SM-A102U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.111 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 14; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.111 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 14; SM-N960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.111 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 14; LM-Q720) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.111 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 14; LM-X420) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.111 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 14; LM-Q710(FGN)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.111 Mobile Safari/537.36',
        'Mozilla/5.0 (iPad; CPU OS 99_3_5 like Mac OS X) AppleWebKit/601.1.46 (DNS, like Gecko) OPiOS/96.0.15.124050 android/13G36 Safari/98.53',
        'Mozilla/5.0 (Linux; Android 13.9.4; amd64) AppleWebKit/978.1.63 (KHTML, like Gecko) Chrome/99.0.4792.58 Mobile Safari/978.1.63',
        'Mozilla/5.0 (Linux; Android 13.9.4; x86_64) AppleWebKit/978.1.63 (KHTML, like Gecko) Chrome/99.0.4792.56 Mobile Safari/978.1.63',
        'Mozilla/5.0 (Linux; Android 13.9.4; x86_64) AppleWebKit/978.1.63 (KHTML, like Gecko) Chrome/99.0.4792.58 Mobile Safari/978.1.63',
        'Mozilla/5.0 (Linux; Android 13.9.4; x86_64) AppleWebKit/978.1.63 (KHTML, llike Gecko) Chrome/99.0.3479.162 Safari/978.1.63',
        'Mozilla/5.0 (Linux; Android 13; Pixel 4 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; Pixel 4a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.83 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; Pixel 6a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; Redfin 64-bit only Build/TP1A.220624.017; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/101.0.4951.74 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; RMX2151 Gecko Chrome/469.0.4664.92 Klarna/21.24.180',
        'Mozilla/5.0 (Linux; Android 13; sdk_gphone64_arm64 Build/TPB4.220624.004; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/101.0.4951.74 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; sdk_gphone64_x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.74 Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; HTC One X10 Build/MRA70K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.3175.110 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; Nexus 9P Build/Alpha2.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.1.1000.100 Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.6823.02 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; LG-H918 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3202.84 Mobile Safari/537.36',
        'Mozilla/5.0 (Android 12; Mobile; LG-M255; rv:100.0) Gecko/100.0 Firefox/100.0Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.61 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; CPH2515 Build/RKQ1.211119.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/117.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/437.0.0.35.116;]',
        'Mozilla/5.0 (Linux; Android 5.1; OPPO A59s Build/LMY47I; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.121 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/321.0.0.37.119;]',
        'Mozilla/5.0 (Linux; Android 10; Hisense Infinity H40 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/438.0.0.33.118;]',
        'Mozilla/5.0 (Linux; Android 13; NX729J Build/TKQ1.221220.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/437.0.0.35.116;]',
        'Mozilla/5.0 (Linux; Android 12; SL100EA Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/436.0.0.35.101;]',
        'Mozilla/5.0 (Linux; Android 10; HarmonyOS; MGA-AL40; HMSCore 6.12.0.302) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.88 HuaweiBrowser/14.0.3.340 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 11; ZTE A7040 Build/RP1A.201005.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/393.0.0.35.106;]',
        'Mozilla/5.0 (Linux; Android 13; 2107119DC Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/438.0.0.33.118;]',
        'Mozilla/5.0 (Linux; Android 13; V2145 Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/438.0.0.33.118;]',
        'Mozilla/5.0 (Linux; Android 13; M2105K81AC Build/TKQ1.221013.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Safari/537.36 [FB_IAB/FB4A;FBAV/438.0.0.33.118;]',
        'Mozilla/5.0 (Linux; Android 13; 23053RN02A Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36[FBAN/EMA;FBLC/id_ID;FBAV/378.0.0.12.118;]',
        'Mozilla/5.0 (Linux; Android 13; CPH2529 Build/RKQ1.211119.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/436.0.0.35.101;]',
        'Mozilla/5.0 (Linux; Android 13; Infinix X6831 Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/434.0.0.36.115;]',
        'Mozilla/5.0 (Linux; Android 13; Infinix X678B Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/438.0.0.33.118;]',
        'Mozilla/5.0 (Linux; Android 11; BV6600E Build/RP1A.201005.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.210 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/377.0.0.22.107;]',
        'Mozilla/5.0 (Linux; U; Android 13; id-id; Redmi 12 Build/TP1A.220624.014) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/112.0.5615.136 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.37.1-gn',
        'Mozilla/5.0 (Linux; Android 13; 22021211RG Build/TKQ1.220807.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/117.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/436.0.0.35.101;]',
        'Mozilla/5.0 (Linux; Android 13; 22081283C Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.128 Safari/537.36 [FB_IAB/FB4A;FBAV/404.0.0.35.70;]',
        'Mozilla/5.0 (Linux; Android 10; S59Pro Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/437.0.0.35.116;]',
        'Mozilla/5.0 (Linux; Android 12; Nokia C02 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/436.0.0.35.101;]',
        'Mozilla/5.0 (Linux; Android 10; SM-A605K Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.138 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/361.0.0.39.115;]',
        'Mozilla/5.0 (Linux; Android 12; Vodafone Pro 4G Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/102.0.5005.125 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/436.0.0.35.101;]',
        'Mozilla/5.0 (Linux; Android 9; KSA-AL10 Build/HONORKSA-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.64 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/320.0.0.34.118;]',
        'Mozilla/5.0 (Linux; Android 13; Infinix X6835B Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/438.0.0.33.118;]',
        'Mozilla/5.0 (Linux; Android 12; BNE-LX1 Build/HUAWEIBNE-LX1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.105 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/427.0.0.31.63;]',
        'Mozilla/5.0 (Linux; Android 12; motorola edge plus (2022) Build/S3SHS32.12-41-4-4; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/117.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/433.0.0.31.111;]',
        'Mozilla/5.0 (Linux; Android 12; VNA-LX2 Build/HONORVNA-LX2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/437.0.0.35.116;]',
        'Dart/2.18 (dart:io), Mozilla/5.0 (Linux; Android 12; SM-A032M Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; T610K Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/438.0.0.34.118;]',
        'Mozilla/5.0 (Linux; Android 12; BNE-LX1 Build/HUAWEIBNE-LX1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.105 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/411.1.0.29.112;]',
        'Mozilla/5.0 (Linux; Android 12; ZTE A7050 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36[FBAN/EMA;FBLC/es_LA;FBAV/378.0.0.12.118;]',
        'Mozilla/5.0 (Linux; Android 12; motorola edge plus (2022) Build/S3SHS32.12-41-4-4; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/102.0.5005.125 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/436.0.0.35.101;]',
        'Mozilla/5.0 (Linux; Android 13; CPH2591 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36[FBAN/EMA;FBLC/id_ID;FBAV/376.0.0.7.103;]',
        'Mozilla/5.0 (Linux; Android 10; Positivo Q20 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/438.0.0.33.118;]',
        'Mozilla/5.0 (Linux; Android 13; RMO-NX1 Build/HONORRMO-N21; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/117.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/437.0.0.35.116;]',
        'Mozilla/5.0 (Linux; Android 11; BISON Pro Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/438.0.0.33.118;]',
        'Mozilla/5.0 (Linux; Android 9; SH-C02 Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/438.0.0.33.118;]',
        'Mozilla/5.0 (Linux; Android 10; S6 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/429.0.0.27.114;]',
        'Mozilla/5.0 (Linux; Android 13; Infinix X6831 Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36[FBAN/EMA;FBLC/id_ID;FBAV/378.0.0.12.118;]',
        'Mozilla/5.0 (Linux; Android 13; SM-M146B Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/106.0.5249.126 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/427.0.0.31.63;]',
        'Mozilla/5.0 (Linux; Android 13; SM-F946U Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Safari/537.36 [FB_IAB/FB4A;FBAV/436.0.0.35.101;]',
        'Mozilla/5.0 (Linux; Android 13; SM-F946U Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Safari/537.36 [FB_IAB/FB4A;FBAV/426.0.0.26.50;]',
        'Mozilla/5.0 (Linux; Android 10; SM-A605K Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.138 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/361.0.0.39.115;]',
        'Dart/2.18 (dart:io), Mozilla/5.0 (Linux; Android 12; SM-A032M Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; SM-F946W Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Safari/537.36 [FB_IAB/FB4A;FBAV/438.0.0.33.118;]',
        'Mozilla/5.0 (Linux; Android 12; SM-A032M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; SM-M146B Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.138 Mobile Safari/537.36[FBAN/EMA;FBLC/es_LA;FBAV/378.0.0.12.118;]',
        'Mozilla/5.0 (Linux; Android 13; SM-E426S Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/438.0.0.33.118;]',
        'Mozilla/5.0 (Linux; Android 10; SM-A125F Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/117.0.0.0 Mobile Safari/537.36 SznProhlizec/10.3.1a',
        'Mozilla/5.0 (Linux; Android 13; SM-F946U1 Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/117.0.0.0 Safari/537.36 [FB_IAB/FB4A;FBAV/436.0.0.35.101;]',
        'Mozilla/5.0 (Linux; Android 13; SM-F946U Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.166 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/428.0.0.26.108;]',
        'Mozilla/5.0 (Linux; Android 13; SM-F946U1 Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/437.0.0.35.116;]',
        'Mozilla/5.0 (Linux; Android 13; SM-G736U Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.166 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/427.0.0.31.63;]',
        'Mozilla/5.0 (Linux; Android 13; SM-F946U Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/434.0.0.36.115;]',
        'Mozilla/5.0 (Linux; Android 13; SM-F946U Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Safari/537.36 [FB_IAB/FB4A;FBAV/388.0.0.32.105;]',
        'Mozilla/5.0 (Linux; Android 13; SM-G736U Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.128 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/396.1.0.28.104;]',
        'Mozilla/5.0 (Linux; Android 13; SM-F731U Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/430.0.0.23.113;]',
        'Mozilla/5.0 (Linux; Android 13; SM-F946U Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Safari/537.36 [FB_IAB/FB4A;FBAV/438.0.0.34.118;]',
    ];

    const random = Math.floor(Math.random() * listUserAgent.length);
    
    return listUserAgent[random];

}

exports.randomListAndroid = randomListAndroid