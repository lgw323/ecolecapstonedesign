const container = document.getElementById('presentation-container');
let currentSlide = 0;
let currentLang = 0; // 0: Java, 1: Python, 2: JS

// HTML 특수문자 이스케이프 함수
function escapeHtml(text) {
    if (!text) return text;
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// --- 1. 슬라이드 렌더링 로직 ---
function renderSlides() {
    container.innerHTML = '';
    let globalSlideIndex = 0;

    presentationData.forEach((data) => {
        // (1) 표지 (Title)
        if (data.type === 'title') {
            createSlide(globalSlideIndex++, `
                <div class="slide-content-wrapper text-center">
                    <div class="border-[8px] border-[#0076C0] rounded-[3rem] p-24 bg-white shadow-2xl inline-block mx-auto">
                        <h1 class="text-9xl font-extrabold text-[#0076C0] mb-12">${data.title}</h1>
                        <div class="text-5xl text-gray-600 font-medium">
                           <p class="mb-4">${data.author}</p>
                           <p class="text-6xl font-bold text-black mt-8">${data.author_detail}</p>
                        </div>
                    </div>
                </div>
            `);
        }
        // (2) 목차 (TOC)
        else if (data.type === 'toc') {
            createSlide(globalSlideIndex++, `
                <div class="slide-content-wrapper">
                    <h2 class="text-8xl font-bold mb-16 text-[#0076C0] text-center border-b-[6px] border-[#0076C0] pb-6 mx-auto w-2/3">목 차</h2>
                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-8 w-full max-w-[80rem] mx-auto">
                        ${data.items.map((item, i) => `
                            <li class="toc-item flex items-center" onclick="goToProblem(${i})">
                                <span class="text-[#0076C0] font-bold mr-6 w-12 text-right">${i + 1}.</span>
                                <span class="truncate">${item}</span>
                            </li>`).join('')}
                    </ul>
                </div>
            `);
        }
        // (3) 문제 세트 - 설명 (Slide A)
        else if (data.type === 'problem_set') {
            createSlide(globalSlideIndex++, `
                <div class="slide-content-wrapper">
                    <h2 class="slide-title">${data.title}</h2>
                    <div class="flex gap-10 flex-1 min-h-0">
                        <!-- 왼쪽: 문제 설명 -->
                        <div class="flex-[3] flex flex-col">
                            <div class="boj-box">
                                <h3 class="section-label">문제 설명</h3>
                                <p class="content-text">${data.problem}</p>
                            </div>
                        </div>
                        <!-- 오른쪽: 조건 -->
                        <div class="flex-[2] flex flex-col gap-6">
                            <div class="boj-box gray flex-1">
                                <h3 class="section-label">입력 조건</h3>
                                <p class="content-text text-gray-700">${data.input}</p>
                            </div>
                            <div class="boj-box gray flex-1">
                                <h3 class="section-label">출력 조건</h3>
                                <p class="content-text text-gray-700">${data.output}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `, 'problem_desc');

            // 문제 세트 - 예제 (Slide B)
            createSlide(globalSlideIndex++, `
                <div class="slide-content-wrapper">
                    <h2 class="slide-title">${data.title} <span class="text-gray-400 font-light ml-4">(예제)</span></h2>
                    <div class="flex gap-12 flex-1 min-h-0 h-[80%]">
                        <div class="flex-1 flex flex-col">
                            <h3 class="section-label">예제 입력 1</h3>
                            <div class="example-block shadow-md">${data.example_input_1}</div>
                        </div>
                        <div class="flex-1 flex flex-col">
                            <h3 class="section-label">예제 출력 1</h3>
                            <div class="example-block shadow-md">${data.example_output_1}</div>
                        </div>
                    </div>
                </div>
            `, 'problem_example');
        }
        // (4) 코드 풀이 (Code)
        else if (data.type === 'problem') {
            const languages = ['java', 'python', 'javascript'];
            let codeViewsHtml = '';

            languages.forEach(lang => {
                // 코드 데이터가 없으면 경고 메시지 표시
                let rawCode = data.codes && data.codes[lang] ? data.codes[lang] : '// 코드가 준비되지 않았습니다.';
                // 주석 제거 (간단한 라인 주석만 제거 시도, 복잡한 건 유지될 수 있음)
                // rawCode = rawCode.replace(/\/\/.*$/gm, '').replace(/#.*$/gm, ''); 

                let safeCode = escapeHtml(rawCode.trim());

                codeViewsHtml += `
                    <div class="code-view-wrapper" data-lang="${lang}">
                        <pre><code class="language-${lang} hljs">${safeCode}</code></pre>
                    </div>`;
            });

            createSlide(globalSlideIndex++, `
                <div class="slide-content-wrapper">
                    <div class="flex justify-between items-end border-b-2 border-gray-200 pb-4 mb-4 shrink-0">
                        <h2 class="text-5xl font-bold text-gray-800 truncate pr-8">${data.title}</h2>
                        <div class="flex space-x-6">
                            <span class="lang-btn java" onclick="setLanguage(0)">Java</span>
                            <span class="lang-btn python" onclick="setLanguage(1)">Python</span>
                            <span class="lang-btn javascript" onclick="setLanguage(2)">Node.js</span>
                        </div>
                    </div>
                    <div class="code-area shadow-xl">
                        ${codeViewsHtml}
                    </div>
                </div>
            `, 'code_view');
        }
        // (5) 심화 설명 (Explanation)
        else if (data.type === 'explanation_slide') {
            createSlide(globalSlideIndex++, `
                <div class="slide-content-wrapper">
                    <h2 class="slide-title text-indigo-700 border-indigo-700">${data.title}</h2>
                    <div class="flex-1 boj-box shadow-xl border-t-4 border-indigo-500 overflow-auto p-12">
                        ${data.content}
                    </div>
                </div>
            `, 'explanation');
        }
    });

    // Highlight.js 적용
    document.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));
    updateSlideState();
}

// --- 2. 헬퍼 함수 ---
function createSlide(index, html, type = 'normal') {
    const div = document.createElement('div');
    div.className = 'slide';
    div.dataset.index = index;
    div.dataset.type = type;
    div.innerHTML = html;
    container.appendChild(div);
}

function updateSlideState() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, idx) => {
        if (idx === currentSlide) {
            slide.classList.add('active');
            slide.style.display = 'flex'; // active일 때 flex 적용 보장
        } else {
            slide.classList.remove('active');
            slide.style.display = 'none';
        }
    });

    const activeSlide = slides[currentSlide];
    if (activeSlide && activeSlide.dataset.type === 'code_view') {
        const languages = ['java', 'python', 'javascript'];
        const currentLangName = languages[currentLang];

        // 언어 버튼 활성화
        activeSlide.querySelectorAll('.lang-btn').forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentLang);
        });

        // 코드 블록 보이기
        activeSlide.querySelectorAll('.code-view-wrapper').forEach(wrapper => {
            const isActive = wrapper.dataset.lang === currentLangName;
            wrapper.classList.toggle('visible', isActive);
        });
    }
}

function setLanguage(langIdx) {
    currentLang = langIdx;
    updateSlideState();
}

function goToProblem(problemIndex) {
    // Title(1) + TOC(1) = 2
    let targetSlide = 2 + (problemIndex * 3);
    // 11049번(6번 인덱스) 이후는 심화 슬라이드 1장 추가됨
    if (problemIndex > 6) targetSlide += 1;

    currentSlide = targetSlide;
    currentLang = 0;
    updateSlideState();
}

// --- 3. 이벤트 리스너 ---
const goNext = () => {
    const activeSlide = document.querySelectorAll('.slide')[currentSlide];

    // 코드 뷰에서 언어 순환
    if (activeSlide && activeSlide.dataset.type === 'code_view') {
        if (currentLang < 2) {
            currentLang++;
            updateSlideState();
            return;
        }
        currentLang = 0;
    }

    if (currentSlide < document.querySelectorAll('.slide').length - 1) {
        currentSlide++;
        updateSlideState();
    }
};

const goPrev = () => {
    const activeSlide = document.querySelectorAll('.slide')[currentSlide];

    if (activeSlide && activeSlide.dataset.type === 'code_view') {
        if (currentLang > 0) {
            currentLang--;
            updateSlideState();
            return;
        }
    }

    if (currentSlide > 0) {
        currentSlide--;
        const prevSlide = document.querySelectorAll('.slide')[currentSlide];
        if (prevSlide && prevSlide.dataset.type === 'code_view') {
            currentLang = 2; // 이전 슬라이드가 코드면 마지막 언어부터
        } else {
            currentLang = 0;
        }
        updateSlideState();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderSlides();

    document.addEventListener('keydown', e => {
        if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
            e.preventDefault(); goNext();
        }
        if (['ArrowLeft', 'PageUp'].includes(e.key)) {
            e.preventDefault(); goPrev();
        }
        if (e.key === 'Home') { currentSlide = 0; currentLang = 0; updateSlideState(); }
        if (e.key === 'End') { currentSlide = document.querySelectorAll('.slide').length - 1; updateSlideState(); }
    });

    document.getElementById('nav-left').addEventListener('click', goPrev);
    document.getElementById('nav-right').addEventListener('click', goNext);
});