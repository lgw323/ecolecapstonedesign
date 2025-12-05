const container = document.getElementById('presentation-container');
let currentSlide = 0;
let currentLang = 0;
let currentFontSize = 16;
const DEFAULT_FONT_SIZE = 16;

function escapeHtml(text) {
    if (!text) return text;
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function renderSlides() {
    container.innerHTML = '';
    let globalSlideIndex = 0;

    presentationData.forEach((data) => {
        // (1) 표지: Tailwind text class 대신 style로 고정 px 지정 (확대 영향 안 받음)
        if (data.type === 'title') {
            createSlide(globalSlideIndex++, `
                <div class="slide-content-wrapper text-center">
                    <div class="border-[8px] border-[#0076C0] rounded-[3rem] p-24 bg-white shadow-2xl inline-block mx-auto">
                        <h1 class="font-extrabold text-[#0076C0] mb-12" style="font-size: 128px; line-height: 1;">${data.title}</h1>
                        <div class="text-gray-600 font-medium" style="font-size: 48px;">
                           <p class="mb-4">${data.author}</p>
                           <p class="font-bold text-black mt-8" style="font-size: 60px;">${data.author_detail}</p>
                        </div>
                    </div>
                </div>
            `);
        }
        // (2) 목차: 제목을 고정 px로 변경
        else if (data.type === 'toc') {
            createSlide(globalSlideIndex++, `
                <div class="slide-content-wrapper">
                    <h2 class="font-bold mb-16 text-[#0076C0] text-center border-b-[6px] border-[#0076C0] pb-6 mx-auto w-2/3" style="font-size: 96px;">목 차</h2>
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
        else if (data.type === 'problem_set') {
            createSlide(globalSlideIndex++, `
                <div class="slide-content-wrapper">
                    <h2 class="slide-title">${data.title}</h2>
                    <div class="flex gap-10 flex-1 min-h-0">
                        <div class="flex-[3] flex flex-col">
                            <div class="boj-box">
                                <h3 class="section-label">문제 설명</h3>
                                <p class="content-text">${data.problem}</p>
                            </div>
                        </div>
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

            createSlide(globalSlideIndex++, `
                <div class="slide-content-wrapper">
                    <h2 class="slide-title">${data.title} <span class="text-gray-400 font-light ml-4" style="font-size: 0.8em;">(예제)</span></h2>
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
        else if (data.type === 'problem') {
            const languages = ['java', 'python', 'javascript'];
            let codeViewsHtml = '';

            languages.forEach(lang => {
                let rawCode = data.codes && data.codes[lang] ? data.codes[lang] : '// 코드가 준비되지 않았습니다.';
                let safeCode = escapeHtml(rawCode.trim());

                codeViewsHtml += `
                    <div class="code-view-wrapper" data-lang="${lang}">
                        <pre><code class="language-${lang} hljs">${safeCode}</code></pre>
                    </div>`;
            });

            createSlide(globalSlideIndex++, `
                <div class="slide-content-wrapper">
                    <div class="flex justify-between items-end border-b-2 border-gray-200 pb-4 mb-4 shrink-0">
                        <h2 class="font-bold text-gray-800 truncate pr-8" style="font-size: 48px;">${data.title}</h2>
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

    document.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));
    updateSlideState();
}

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
            slide.style.display = 'flex';
        } else {
            slide.classList.remove('active');
            slide.style.display = 'none';
        }
    });

    const activeSlide = slides[currentSlide];
    if (activeSlide && activeSlide.dataset.type === 'code_view') {
        const languages = ['java', 'python', 'javascript'];
        const currentLangName = languages[currentLang];

        activeSlide.querySelectorAll('.lang-btn').forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentLang);
        });

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
    let targetSlide = 2 + (problemIndex * 3);
    if (problemIndex > 6) targetSlide += 1;

    currentSlide = targetSlide;
    currentLang = 0;
    updateSlideState();
}

function adjustFontSize(delta) {
    if (delta === 0) {
        currentFontSize = DEFAULT_FONT_SIZE;
    } else {
        currentFontSize += delta;
        if (currentFontSize < 10) currentFontSize = 10;
        if (currentFontSize > 60) currentFontSize = 60;
    }
    document.documentElement.style.fontSize = `${currentFontSize}px`;
}

const goNext = () => {
    const activeSlide = document.querySelectorAll('.slide')[currentSlide];

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
            currentLang = 2;
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
        if (e.key === 'ArrowUp') {
            e.preventDefault(); adjustFontSize(2);
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault(); adjustFontSize(-2);
        }
        if (e.key === 'Home') { currentSlide = 0; currentLang = 0; updateSlideState(); }
        if (e.key === 'End') { currentSlide = document.querySelectorAll('.slide').length - 1; updateSlideState(); }
    });

    document.getElementById('nav-left').addEventListener('click', goPrev);
    document.getElementById('nav-right').addEventListener('click', goNext);

    const btnDecrease = document.getElementById('btn-decrease');
    const btnReset = document.getElementById('btn-reset');
    const btnIncrease = document.getElementById('btn-increase');

    if (btnDecrease) btnDecrease.addEventListener('click', () => adjustFontSize(-2));
    if (btnReset) btnReset.addEventListener('click', () => adjustFontSize(0));
    if (btnIncrease) btnIncrease.addEventListener('click', () => adjustFontSize(2));
});