// 심화 슬라이드 HTML 템플릿 (SVG 좌표 보정 버전)

const HEADER_HTML = (title) => `
    <h2 class="w-full text-[56px] font-extrabold text-[#0076C0] mb-[50px] border-l-[12px] border-[#0076C0] pl-[32px] leading-tight text-left shrink-0">
        ${title}
    </h2>
`;

const PRESENTATION_TEMPLATES = {
    // [심화 1] 행렬 결합 법칙
    DIMENSION_RULE: `
    <div class="w-full h-full flex flex-col relative p-[64px] items-center justify-center">
        ${HEADER_HTML('심화: 행렬 곱셈의 법칙 (Dimension Rule)')}

        <div class="flex-1 w-full flex flex-col justify-center items-center">
            <div class="flex items-center justify-center gap-[4rem] mb-[5rem] relative scale-110 origin-top">
                <!-- Matrix A -->
                <div class="flex flex-col items-center group">
                    <div class="text-[1.5rem] font-bold text-gray-500 mb-[1rem]">Matrix A</div>
                    <div class="relative px-[2rem] py-[2.5rem] border-x-[0.25rem] border-gray-800 rounded-lg bg-gray-50 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 duration-300">
                        <div class="grid grid-cols-3 gap-[0.75rem] opacity-30">
                            ${'<div class="w-[0.75rem] h-[0.75rem] rounded-full bg-gray-800"></div>'.repeat(15)}
                        </div>
                        <span class="absolute inset-0 flex items-center justify-center text-[3rem] font-black text-gray-800 tracking-widest">A</span>
                    </div>
                    <div class="flex mt-[1.5rem] text-[2rem] font-mono font-bold bg-white px-[1rem] py-[0.5rem] rounded-lg shadow-sm border border-gray-200">
                        <span class="text-blue-600">5</span>
                        <span class="text-gray-400 mx-[0.5rem]">×</span>
                        <span class="text-red-500 bg-red-50 px-[0.5rem] rounded border border-red-200">3</span>
                    </div>
                </div>
                <!-- 곱셈 기호 -->
                <div class="text-[4rem] text-gray-300 font-light pt-[2rem]">×</div>
                <!-- Matrix B -->
                <div class="flex flex-col items-center group">
                    <div class="text-[1.5rem] font-bold text-gray-500 mb-[1rem]">Matrix B</div>
                    <div class="relative px-[2rem] py-[1.5rem] border-x-[0.25rem] border-gray-800 rounded-lg bg-gray-50 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 duration-300">
                        <div class="grid grid-cols-2 gap-[0.75rem] opacity-30">
                            ${'<div class="w-[0.75rem] h-[0.75rem] rounded-full bg-gray-800"></div>'.repeat(6)}
                        </div>
                        <span class="absolute inset-0 flex items-center justify-center text-[3rem] font-black text-gray-800 tracking-widest">B</span>
                    </div>
                    <div class="flex mt-[1.5rem] text-[2rem] font-mono font-bold bg-white px-[1rem] py-[0.5rem] rounded-lg shadow-sm border border-gray-200">
                        <span class="text-red-500 bg-red-50 px-[0.5rem] rounded border border-red-200">3</span>
                        <span class="text-gray-400 mx-[0.5rem]">×</span>
                        <span class="text-purple-600">2</span>
                    </div>
                </div>
                <!-- 화살표 -->
                <div class="text-[5rem] text-gray-400 font-bold mx-[2rem] pt-[2rem]">→</div>
                <!-- Result -->
                <div class="flex flex-col items-center">
                    <div class="text-[1.5rem] font-bold text-purple-700 mb-[1rem]">Result (New)</div>
                    <div class="relative px-[2rem] py-[2.5rem] border-x-[0.25rem] border-purple-600 rounded-lg bg-purple-50 flex items-center justify-center shadow-lg transform scale-105">
                        <span class="absolute inset-0 flex items-center justify-center text-[3rem] font-black text-purple-700 tracking-widest">AB</span>
                        <div class="grid grid-cols-2 gap-[0.75rem] opacity-20">
                            ${'<div class="w-[0.75rem] h-[0.75rem] rounded-full bg-purple-800"></div>'.repeat(10)}
                        </div>
                    </div>
                    <div class="flex mt-[1.5rem] text-[2rem] font-mono font-bold bg-white px-[1rem] py-[0.5rem] rounded-lg shadow-md border-2 border-purple-200">
                        <span class="text-blue-600">5</span>
                        <span class="text-gray-400 mx-[0.5rem]">×</span>
                        <span class="text-purple-600">2</span>
                    </div>
                </div>
            </div>
            <div class="flex gap-[2rem] w-full max-w-[80rem] origin-top">
                <div class="flex-1 bg-red-50 border-l-[0.5rem] border-red-500 p-[1.5rem] rounded-r-xl shadow-sm">
                    <h4 class="text-[1.5rem] font-bold text-red-700 mb-[0.5rem] flex items-center">
                        <span class="bg-red-200 rounded-full w-[2rem] h-[2rem] flex items-center justify-center mr-[0.75rem] text-[1rem]">1</span>
                        Inner Matching (안쪽)
                    </h4>
                    <p class="text-[1.3rem] text-gray-700">
                        가운데 맞닿은 숫자(3)가 <strong>같아야만</strong> 곱셈이 가능합니다.<br>
                        이 숫자는 합쳐지면서 <span class="line-through text-gray-400 decoration-2">사라집니다.</span>
                    </p>
                </div>
                <div class="flex-1 bg-blue-50 border-l-[0.5rem] border-blue-500 p-[1.5rem] rounded-r-xl shadow-sm">
                    <h4 class="text-[1.5rem] font-bold text-blue-700 mb-[0.5rem] flex items-center">
                        <span class="bg-blue-200 rounded-full w-[2rem] h-[2rem] flex items-center justify-center mr-[0.75rem] text-[1rem]">2</span>
                        Outer Remaining (바깥쪽)
                    </h4>
                    <p class="text-[1.3rem] text-gray-700">
                        최종 결과물의 크기는 <strong>양쪽 끝 숫자(5와 2)</strong>가 결정합니다.<br>
                        <span class="font-mono bg-white px-2 rounded border border-blue-100 text-blue-600">5 × 2</span>
                        크기의 새로운 행렬이 탄생합니다.
                    </p>
                </div>
            </div>
        </div>
    </div>
    `,

    // [심화 2] 스칼라 곱
    SCALAR_PRODUCT: `
    <div class="w-full h-full flex flex-col relative p-[64px] items-center">
        ${HEADER_HTML('심화: 계산은 어떻게 이루어지는가? (Scalar Product)')}
        
        <p class="w-full text-[1.8rem] text-gray-500 pl-[32px] mb-[3rem] z-20 text-left shrink-0">
            결과 행렬의 <span class="text-purple-600 font-bold">한 칸</span>을 채우기 위해, 
            <span class="text-blue-600 font-bold">가로 한 줄</span>과 <span class="text-red-600 font-bold">세로 한 줄</span>이 만납니다.
        </p>

        <div class="flex-1 w-full flex justify-center items-center relative origin-top">
            <!-- 1. Matrix A (Row Highlight) -->
            <div class="flex flex-col items-center mr-[5rem] z-20">
                <div class="text-[1.5rem] font-bold text-gray-500 mb-[1rem]">Matrix A (5×3)</div>
                <div class="relative px-[1.5rem] py-[2rem] border-x-[0.25rem] border-gray-800 rounded-lg bg-gray-50 shadow-sm">
                    <div class="grid grid-cols-3 gap-y-[1rem] gap-x-[1.5rem]">
                        <div class="contents opacity-20">${'<div class="w-[1rem] h-[1rem] rounded bg-gray-400"></div>'.repeat(3)}</div>
                        <div class="contents relative">
                            <div class="absolute -inset-[0.5rem] bg-blue-100 border-2 border-blue-500 rounded-lg z-0"></div>
                            ${'<div class="w-[1rem] h-[1rem] rounded bg-blue-600 z-10 relative"></div>'.repeat(3)}
                            <div class="absolute -left-[6rem] top-1/2 -translate-y-1/2 text-blue-600 font-bold text-[1.2rem] whitespace-nowrap">Row i</div>
                        </div>
                        ${('<div class="contents opacity-20">' + '<div class="w-[1rem] h-[1rem] rounded bg-gray-400"></div>'.repeat(3) + '</div>').repeat(3)}
                    </div>
                </div>
            </div>

            <div class="text-[3rem] text-gray-300 mr-[5rem]">×</div>

            <!-- 2. Matrix B (Col Highlight) -->
            <div class="flex flex-col items-center mr-[5rem] z-20">
                <div class="text-[1.5rem] font-bold text-gray-500 mb-[1rem]">Matrix B (3×2)</div>
                <div class="relative px-[1.5rem] py-[2rem] border-x-[0.25rem] border-gray-800 rounded-lg bg-gray-50 shadow-sm">
                    <div class="grid grid-cols-2 gap-y-[1rem] gap-x-[2rem]">
                        <div class="absolute top-[1.5rem] bottom-[1.5rem] left-[1.2rem] w-[2rem] bg-red-100 border-2 border-red-500 rounded-lg z-0"></div>
                        <div class="w-[1rem] h-[1rem] rounded bg-red-600 z-10 relative"></div><div class="w-[1rem] h-[1rem] rounded bg-gray-400 opacity-20"></div>
                        <div class="w-[1rem] h-[1rem] rounded bg-red-600 z-10 relative"></div><div class="w-[1rem] h-[1rem] rounded bg-gray-400 opacity-20"></div>
                        <div class="w-[1rem] h-[1rem] rounded bg-red-600 z-10 relative"></div><div class="w-[1rem] h-[1rem] rounded bg-gray-400 opacity-20"></div>
                        <div class="absolute -bottom-[2.5rem] left-[2.2rem] -translate-x-1/2 text-red-600 font-bold text-[1.2rem] whitespace-nowrap">Col j</div>
                    </div>
                </div>
            </div>

            <div class="text-[3rem] text-gray-300 mr-[5rem]">=</div>

            <!-- 3. Result (Cell Highlight) -->
            <div class="flex flex-col items-center z-20">
                <div class="text-[1.5rem] font-bold text-purple-700 mb-[1rem]">Result AB</div>
                <div class="relative px-[1.5rem] py-[2rem] border-x-[0.25rem] border-purple-600 rounded-lg bg-purple-50 shadow-md">
                    <div class="grid grid-cols-2 gap-y-[1rem] gap-x-[2rem]">
                        <div class="contents opacity-20">${'<div class="w-[1rem] h-[1rem] rounded bg-purple-800"></div>'.repeat(2)}</div>
                        <div class="contents">
                            <div class="w-[1.25rem] h-[1.25rem] rounded bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.6)] scale-125 z-10 relative border-2 border-white"></div>
                            <div class="w-[1rem] h-[1rem] rounded bg-purple-800 opacity-20"></div>
                        </div>
                        ${('<div class="contents opacity-20">' + '<div class="w-[1rem] h-[1rem] rounded bg-purple-800"></div>'.repeat(2) + '</div>').repeat(3)}
                    </div>
                     <div class="absolute -right-[6rem] top-[5rem] text-purple-600 font-bold text-[1.2rem] whitespace-nowrap">Cell (i, j)</div>
                </div>
            </div>
        </div>

        <div class="bg-gray-800 text-white rounded-xl p-[2rem] mb-[2rem] flex items-center justify-between shadow-2xl z-30 relative w-[90%] origin-bottom">
             <div class="flex items-center gap-[1.5rem]">
                <div class="flex flex-col items-center">
                    <span class="text-gray-400 text-[0.9rem] mb-[0.25rem]">Row i</span>
                    <div class="flex gap-1 text-[1.5rem] font-mono text-blue-300 bg-gray-700 px-[0.75rem] py-[0.25rem] rounded">
                        [a<sub>1</sub>, a<sub>2</sub>, a<sub>3</sub>]
                    </div>
                </div>
                <div class="text-[1.5rem] text-gray-500">×</div>
                <div class="flex flex-col items-center">
                    <span class="text-gray-400 text-[0.9rem] mb-[0.25rem]">Col j</span>
                    <div class="flex gap-1 text-[1.5rem] font-mono text-red-300 bg-gray-700 px-[0.75rem] py-[0.25rem] rounded">
                        [b<sub>1</sub>, b<sub>2</sub>, b<sub>3</sub>]<sup>T</sup>
                    </div>
                </div>
            </div>
            <div class="text-[2rem] text-gray-400">→</div>
             <div class="flex flex-col items-start">
                <div class="text-[0.9rem] text-purple-300 mb-[0.5rem] font-bold">Scalar Product (비용 발생 지점)</div>
                <div class="text-[2rem] font-mono font-bold leading-relaxed">
                    <span class="text-blue-300">a<sub>1</sub></span><span class="text-red-300">b<sub>1</sub></span> +
                    <span class="text-blue-300">a<sub>2</sub></span><span class="text-red-300">b<sub>2</sub></span> +
                    <span class="text-blue-300">a<sub>3</sub></span><span class="text-red-300">b<sub>3</sub></span>
                </div>
                 <div class="text-[0.9rem] text-gray-400 mt-[0.5rem]">
                    곱셈 <span class="text-yellow-400 font-bold">3번</span> + 덧셈 2번 발생
                </div>
            </div>
        </div>
    </div>
    `,

    // [심화 3] 크기 비교
    SIZE_COMPARISON: `
    <div class="w-full h-full flex flex-col relative p-[64px] items-center">
        ${HEADER_HTML('심화: 왜 10배 차이가 날까? (Intermediate Size)')}
        
        <p class="w-full text-[1.5rem] text-gray-500 mb-[3rem] pl-[32px] text-left shrink-0">
            중간 단계에서 만들어지는 <span class="text-red-600 font-bold">행렬의 크기</span>가 운명을 결정합니다.
        </p>

        <div class="flex-1 w-full flex gap-[2rem] h-[70%] origin-center">
            <!-- BAD Path -->
            <div class="flex-1 flex flex-col bg-red-50 rounded-2xl border-[0.25rem] border-red-100 relative overflow-hidden">
                <div class="absolute top-0 right-0 bg-red-500 text-white px-[1.5rem] py-[0.5rem] rounded-bl-xl font-bold text-[1.5rem] z-10">BAD Path</div>
                <div class="p-[2rem] flex flex-col h-full items-center">
                    <h3 class="text-[2rem] font-bold text-red-800 mb-[2rem]">순서 1: A <span class="text-gray-400">×</span> (B × C)</h3>
                    <div class="w-full bg-white rounded-xl p-[1.5rem] shadow-sm border border-red-200 mb-[1rem] flex flex-col items-center">
                        <div class="text-[1rem] font-bold text-gray-400 mb-[0.5rem] w-full text-left">Step 1. 뒤쪽 (B × C) 먼저 계산</div>
                        <div class="flex items-center gap-[1rem] text-[1.3rem] font-mono">
                            <span class="text-gray-600">10×100</span><span class="text-gray-300">×</span><span class="text-gray-600">5×50</span>
                            <span class="text-red-500 font-bold">→ 비용: 25,000</span>
                        </div>
                        <div class="mt-[1.5rem] flex flex-col items-center">
                            <div class="text-[0.8rem] text-red-500 font-bold mb-[0.25rem]">중간 결과물 (100×50)</div>
                             <div class="w-[10rem] h-[6rem] bg-red-200 border-2 border-red-400 flex items-center justify-center text-red-800 font-bold text-[1.5rem] shadow-inner relative" 
                                  style="background-image: linear-gradient(45deg, #ffffff 25%, #f3f4f6 25%, #f3f4f6 50%, #ffffff 50%, #ffffff 75%, #f3f4f6 75%, #f3f4f6 100%); background-size: 20px 20px;">
                                BC
                                <span class="absolute -right-[4rem] top-0 text-[0.8rem] bg-red-600 text-white px-[0.5rem] py-[0.25rem] rounded">Fat!</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-full bg-white rounded-xl p-[1.5rem] shadow-sm border border-red-200 mb-auto flex flex-col items-center opacity-80">
                         <div class="text-[1rem] font-bold text-gray-400 mb-[0.5rem] w-full text-left">Step 2. A × (BC) 계산</div>
                         <div class="flex items-center gap-[1rem] text-[1.3rem] font-mono">
                            <span class="text-gray-600">10×100</span><span class="text-gray-300">×</span><span class="text-red-600 font-bold">100×50</span>
                            <span class="text-red-500 font-bold">→ 비용: 50,000</span>
                        </div>
                    </div>
                    <div class="w-full bg-red-600 text-white rounded-xl p-[1.5rem] mt-[1rem] text-center shadow-lg transform scale-105">
                        <div class="text-[1rem] opacity-80 mb-[0.25rem]">Total Cost</div>
                        <div class="text-[3rem] font-black font-mono">75,000 회</div>
                    </div>
                </div>
            </div>

            <!-- VS Badge -->
            <div class="self-center w-[5rem] h-[5rem] bg-white rounded-full flex items-center justify-center text-[1.5rem] font-black text-gray-300 shadow-xl border-4 border-slate-100 z-20 shrink-0">VS</div>

            <!-- GOOD Path -->
            <div class="flex-1 flex flex-col bg-blue-50 rounded-2xl border-[0.25rem] border-blue-100 relative overflow-hidden">
                <div class="absolute top-0 right-0 bg-blue-500 text-white px-[1.5rem] py-[0.5rem] rounded-bl-xl font-bold text-[1.5rem] z-10">GOOD Path</div>
                <div class="p-[2rem] flex flex-col h-full items-center">
                    <h3 class="text-[2rem] font-bold text-blue-800 mb-[2rem]">순서 2: (A × B) <span class="text-gray-400">×</span> C</h3>
                    <div class="w-full bg-white rounded-xl p-[1.5rem] shadow-sm border border-blue-200 mb-[1rem] flex flex-col items-center">
                        <div class="text-[1rem] font-bold text-gray-400 mb-[0.5rem] w-full text-left">Step 1. 앞쪽 (A × B) 먼저 계산</div>
                        <div class="flex items-center gap-[1rem] text-[1.3rem] font-mono">
                            <span class="text-gray-600">10×100</span><span class="text-gray-300">×</span><span class="text-gray-600">100×5</span>
                            <span class="text-blue-500 font-bold">→ 비용: 5,000</span>
                        </div>
                        <div class="mt-[1.5rem] flex flex-col items-center">
                            <div class="text-[0.8rem] text-blue-500 font-bold mb-[0.25rem]">중간 결과물 (10×5)</div>
                            <div class="w-[4rem] h-[2.5rem] bg-blue-200 border-2 border-blue-400 flex items-center justify-center text-blue-800 font-bold text-[1rem] shadow-inner relative">
                                AB
                                <span class="absolute -right-[4rem] top-0 text-[0.8rem] bg-blue-500 text-white px-[0.5rem] py-[0.25rem] rounded">Skinny!</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-full bg-white rounded-xl p-[1.5rem] shadow-sm border border-blue-200 mb-auto flex flex-col items-center opacity-80">
                         <div class="text-[1rem] font-bold text-gray-400 mb-[0.5rem] w-full text-left">Step 2. (AB) × C 계산</div>
                         <div class="flex items-center gap-[1rem] text-[1.3rem] font-mono">
                            <span class="text-blue-600 font-bold">10×5</span><span class="text-gray-300">×</span><span class="text-gray-600">5×50</span>
                            <span class="text-blue-500 font-bold">→ 비용: 2,500</span>
                        </div>
                    </div>
                    <div class="w-full bg-blue-600 text-white rounded-xl p-[1.5rem] mt-[1rem] text-center shadow-lg transform scale-105">
                        <div class="text-[1rem] opacity-80 mb-[0.25rem]">Total Cost</div>
                        <div class="text-[3rem] font-black font-mono">7,500 회</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    // [심화 4] DP 전략 (Easy Version: 화살표 제거, 단계별 확장 강조)
    DP_STRATEGY: `
    <div class="w-full h-full flex flex-col relative p-[64px] items-center justify-center">
        ${HEADER_HTML('심화: 전략 (DP Table)')}
        
        <p class="w-full text-[1.8rem] text-gray-500 mb-[4rem] pl-[32px] text-left shrink-0">
            복잡한 계산 없이, <span class="text-indigo-600 font-bold bg-indigo-50 px-2 rounded">길이가 1인 구간</span>부터 대각선 방향으로 채워나갑니다.
        </p>
        
        <div class="flex gap-[6rem] items-start justify-center scale-110 origin-top mt-[2rem]">
            <!-- DP Grid Visualization -->
            <div class="relative bg-white p-[2rem] rounded-3xl shadow-2xl border border-slate-200">
                
                <!-- Grid Labels (i: Start, j: End) -->
                <div class="absolute -left-[3rem] top-1/2 -translate-y-1/2 -rotate-90 text-gray-400 font-bold text-[1.2rem]">Start Index (i)</div>
                <div class="absolute -top-[2.5rem] left-1/2 -translate-x-1/2 text-gray-400 font-bold text-[1.2rem]">End Index (j)</div>

                <!-- Header -->
                <div class="grid grid-cols-5 gap-[1rem] mb-[1rem]">
                    <div class="w-[4rem] h-[2rem]"></div>
                    <div class="w-[4rem] h-[2rem] flex items-center justify-center font-bold text-gray-500 text-[1.5rem]">A</div>
                    <div class="w-[4rem] h-[2rem] flex items-center justify-center font-bold text-gray-500 text-[1.5rem]">B</div>
                    <div class="w-[4rem] h-[2rem] flex items-center justify-center font-bold text-gray-500 text-[1.5rem]">C</div>
                    <div class="w-[4rem] h-[2rem] flex items-center justify-center font-bold text-gray-500 text-[1.5rem]">D</div>
                </div>

                <!-- Grid Rows -->
                <div class="grid grid-cols-5 gap-[1rem] font-mono text-[1.5rem]">
                    <!-- Row A -->
                    <div class="w-[4rem] h-[4rem] flex items-center justify-center font-bold text-gray-500">A</div>
                    <!-- (0,0) Step 1 -->
                    <div class="w-[4rem] h-[4rem] bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border-2 border-slate-200 font-bold">0</div>
                    <!-- (0,1) Step 2 -->
                    <div class="w-[4rem] h-[4rem] bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold border-2 border-blue-200">30</div>
                    <!-- (0,2) Step 3 -->
                    <div class="w-[4rem] h-[4rem] bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold border-4 border-indigo-200 shadow-md transform scale-105 z-10">Min</div>
                    <!-- (0,3) Goal -->
                    <div class="w-[4rem] h-[4rem] bg-yellow-50 rounded-xl flex flex-col items-center justify-center text-yellow-600 font-bold border-4 border-yellow-400 shadow-xl relative transform scale-110 z-20">
                        <span class="text-[2rem]">👑</span>
                    </div>

                    <!-- Row B -->
                    <div class="w-[4rem] h-[4rem] flex items-center justify-center font-bold text-gray-500">B</div>
                    <div class="w-[4rem] h-[4rem]"></div>
                    <!-- (1,1) Step 1 -->
                    <div class="w-[4rem] h-[4rem] bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border-2 border-slate-200 font-bold">0</div>
                    <!-- (1,2) Step 2 -->
                    <div class="w-[4rem] h-[4rem] bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold border-2 border-blue-200">36</div>
                    <!-- (1,3) Step 3 -->
                    <div class="w-[4rem] h-[4rem] bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold border-4 border-indigo-200 shadow-md">Min</div>

                    <!-- Row C -->
                    <div class="w-[4rem] h-[4rem] flex items-center justify-center font-bold text-gray-500">C</div>
                    <div class="w-[4rem] h-[4rem]"></div>
                    <div class="w-[4rem] h-[4rem]"></div>
                    <!-- (2,2) Step 1 -->
                    <div class="w-[4rem] h-[4rem] bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border-2 border-slate-200 font-bold">0</div>
                    <!-- (2,3) Step 2 -->
                    <div class="w-[4rem] h-[4rem] bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold border-2 border-blue-200">90</div>

                    <!-- Row D -->
                    <div class="w-[4rem] h-[4rem] flex items-center justify-center font-bold text-gray-500">D</div>
                    <div class="w-[4rem] h-[4rem]"></div>
                    <div class="w-[4rem] h-[4rem]"></div>
                    <div class="w-[4rem] h-[4rem]"></div>
                    <!-- (3,3) Step 1 -->
                    <div class="w-[4rem] h-[4rem] bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border-2 border-slate-200 font-bold">0</div>
                </div>
            </div>

            <!-- Legend (Step-by-Step) -->
            <div class="flex flex-col gap-[2rem]">
                <!-- Step 1 -->
                <div class="flex items-center group">
                    <div class="w-[3.5rem] h-[3.5rem] bg-slate-100 border-2 border-slate-300 rounded-xl mr-[1.5rem] flex items-center justify-center text-slate-500 font-bold text-[1.5rem] shadow-sm">1</div>
                    <div class="flex flex-col">
                        <span class="text-[1rem] text-slate-500 font-bold uppercase tracking-wider mb-[0.2rem]">Step 1 (Diagonal)</span>
                        <span class="text-[1.3rem] text-gray-700 font-bold">길이 1 : 자기 자신</span>
                        <span class="text-[1rem] text-gray-400">곱셈 비용 0</span>
                    </div>
                </div>

                <!-- Arrow down -->
                <div class="pl-[1.5rem] text-slate-300 text-[1.5rem]"><i class="fa-solid fa-arrow-down"></i></div>

                <!-- Step 2 -->
                <div class="flex items-center group">
                    <div class="w-[3.5rem] h-[3.5rem] bg-blue-50 border-2 border-blue-300 rounded-xl mr-[1.5rem] flex items-center justify-center text-blue-600 font-bold text-[1.5rem] shadow-sm">2</div>
                    <div class="flex flex-col">
                        <span class="text-[1rem] text-blue-400 font-bold uppercase tracking-wider mb-[0.2rem]">Step 2 (Neighbors)</span>
                        <span class="text-[1.3rem] text-gray-700 font-bold">길이 2 : 이웃 곱하기</span>
                        <span class="text-[1rem] text-gray-400">선택지 없음 (단순 계산)</span>
                    </div>
                </div>

                <!-- Arrow down -->
                <div class="pl-[1.5rem] text-blue-300 text-[1.5rem]"><i class="fa-solid fa-arrow-down"></i></div>

                <!-- Step 3 -->
                <div class="flex items-center group">
                    <div class="w-[3.5rem] h-[3.5rem] bg-indigo-50 border-2 border-indigo-400 rounded-xl mr-[1.5rem] flex items-center justify-center text-indigo-600 font-bold text-[1.5rem] shadow-md">3</div>
                    <div class="flex flex-col">
                        <span class="text-[1rem] text-indigo-400 font-bold uppercase tracking-wider mb-[0.2rem]">Step 3 (Combine)</span>
                        <span class="text-[1.3rem] text-gray-700 font-bold">길이 3 이상 : 조합</span>
                        <span class="text-[1rem] text-indigo-600 font-bold">작은 문제(Step 1,2) 활용</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    // [심화 5] 분할 로직
    OPTIMAL_SPLIT: `
    <div class="w-full h-full flex flex-col relative p-[64px] items-center justify-center">
        ${HEADER_HTML('심화: 전술 (Optimal Split)')}
        
        <p class="w-full text-[1.5rem] text-gray-500 mb-[4rem] pl-[32px] text-left shrink-0">
            점화식 <span class="font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">D[i][j] = min( ... )</span> 의 시각적 의미입니다.
        </p>
        
        <div class="flex justify-center items-stretch gap-[2rem] w-full max-w-[90rem] origin-top">
            <!-- Option 1 -->
            <div class="flex-1 bg-white border-[0.25rem] border-gray-100 rounded-3xl p-[2rem] shadow-sm flex flex-col items-center opacity-60">
                <span class="bg-gray-100 text-gray-500 px-[1rem] py-[0.5rem] rounded-full text-[1rem] font-bold mb-[2rem]">Option 1 (k=i)</span>
                <div class="flex items-center gap-[0.5rem] mb-[2rem]">
                    <div class="px-[1.5rem] py-[1rem] bg-slate-100 rounded-lg font-bold text-slate-600 text-[1.5rem]">A</div>
                    <div class="text-gray-300 font-bold text-[2rem] px-[0.5rem]">|</div>
                    <div class="px-[1.5rem] py-[1rem] bg-slate-100 rounded-lg font-bold text-slate-600 text-[1.5rem]">BCD</div>
                </div>
                <div class="mt-auto text-[1.5rem] font-mono font-bold text-gray-400">High Cost</div>
            </div>

            <!-- Option 2 (Best) -->
            <div class="flex-1 bg-indigo-50 border-[0.5rem] border-indigo-500 rounded-3xl p-[2.5rem] shadow-2xl relative transform scale-110 z-10 flex flex-col items-center">
                <div class="absolute -top-[1.5rem] bg-indigo-600 text-white px-[1.5rem] py-[0.5rem] rounded-full text-[1.2rem] font-bold shadow-lg">BEST CHOICE</div>
                <span class="bg-indigo-100 text-indigo-600 px-[1rem] py-[0.5rem] rounded-full text-[1rem] font-bold mb-[2rem] mt-[1rem]">Option 2 (k=i+1)</span>
                
                <div class="flex items-center gap-[0.5rem] mb-[3rem]">
                    <div class="px-[2rem] py-[1.2rem] bg-white border-2 border-indigo-200 rounded-xl font-black text-[1.8rem] text-indigo-700 shadow-sm">AB</div>
                    <div class="text-indigo-500 font-bold text-[2.5rem] px-[0.5rem] animate-pulse">|</div>
                    <div class="px-[2rem] py-[1.2rem] bg-white border-2 border-indigo-200 rounded-xl font-black text-[1.8rem] text-indigo-700 shadow-sm">CD</div>
                </div>

                <div class="bg-white rounded-xl p-[1.5rem] border border-indigo-100 w-full text-center">
                    <div class="text-[1.2rem] font-mono font-bold text-indigo-900 mb-[0.5rem]">
                        D[i][k] + D[k+1][j]
                    </div>
                    <div class="text-[1rem] text-indigo-500 font-bold">
                        + ( A×B와 C×D를 합치는 비용 )
                    </div>
                </div>
                <div class="mt-[2rem] text-[2.5rem] font-mono font-black text-indigo-700">Minimum</div>
            </div>

            <!-- Option 3 -->
            <div class="flex-1 bg-white border-[0.25rem] border-gray-100 rounded-3xl p-[2rem] shadow-sm flex flex-col items-center opacity-60">
                <span class="bg-gray-100 text-gray-500 px-[1rem] py-[0.5rem] rounded-full text-[1rem] font-bold mb-[2rem]">Option 3 (k=j-1)</span>
                <div class="flex items-center gap-[0.5rem] mb-[2rem]">
                    <div class="px-[1.5rem] py-[1rem] bg-slate-100 rounded-lg font-bold text-slate-600 text-[1.5rem]">ABC</div>
                    <div class="text-gray-300 font-bold text-[2rem] px-[0.5rem]">|</div>
                    <div class="px-[1.5rem] py-[1rem] bg-slate-100 rounded-lg font-bold text-slate-600 text-[1.5rem]">D</div>
                </div>
                <div class="mt-auto text-[1.5rem] font-mono font-bold text-gray-400">High Cost</div>
            </div>
        </div>
    </div>
    `
};