import "./style.css";

declare const process: {
    env: {
        VERCEL_API_BASE_URL: string;
        FIGMA_PLUGIN_API_KEY: string;
    };
};

const root = document.getElementById("root");

if (root) {
    root.innerHTML = `
    <h1 class="text-lg font-bold mb-3 text-gray-800" > ASO Icon Finder </h1>
    <div class="flex space-x-2 mb-3">
    <input type="text" id="searchInput" class="flex-grow border border-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder = "Nhập tên app..." >
    <button id="searchButton" type="button" class="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer" >
    <svg xmlns="http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" class="bi bi-search" viewBox = "0 0 16 16" > <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /> </svg>
    </button>
    </div>

    <!-- Options -->
    <div class="mb-3 text-sm" >
    <div class="flex items-center space-between">
    <div class="w-fit">
    <label for= "countrySelect" class= "font-medium text-gray-600 mr-2"> Quốc gia: </label>
    <select id="countrySelect" class="border border-gray-200 rounded-md px-2 py-1 text-sm">
    <option value="us">United States</option>
    <option value="vn">Vietnam</option>
    <option value="jp">Japan</option>
    <option value="kr">South Korea</option>
    <option value="gb">United Kingdom</option>
    <option value="de">Germany</option>
    <option value="fr">France</option>
    <option value="ru">Russia</option>
    <option value="in">India</option>
    <option value="id">Indonesia</option>
    <option value="th">Thailand</option>
    <option value="my">Malaysia</option>
    <option value="sg">Singapore</option>
    <option value="ph">Philippines</option>
    <option value="br">Brazil</option>
    <option value="mx">Mexico</option>
    <option value="ca">Canada</option>
    <option value="au">Australia</option>
    <option value="es">Spain</option>
    <option value="it">Italy</option>
    <option value="nl">Netherlands</option>
    <option value="pl">Poland</option>
    <option value="tr">Turkey</option>
    <option value="sa">Saudi Arabia</option>
    <option value="ae">United Arab Emirates</option>
    <option value="hk">Hong Kong</option>
    <option value="tw">Taiwan</option>
    <option value="za">South Africa</option>
    <option value="eg">Egypt</option>
    <option value="ar">Argentina</option>
    </select>
    </div>

    <div class="w-fit mx-auto p-2">
    <label for="appStoreSelect" class="font-medium text-gray-600 mr-2"> Store: </label>
    <select id="appStoreSelect" class="border border-gray-200 rounded-md px-2 py-1 text-sm">
    <option value="all" selected> Tất cả </option>
    <option value="google-play"> Google Play Store </option>
    <option value="apple-app-store"> Apple App Store </option>
    </select>
    </div>

    <div class="w-fit">
    <label for="itemsPerPageSelect" class="font-medium text-gray-600 mr-2"> Hiển thị: </label>
    <select id="itemsPerPageSelect" class="border border-gray-200 rounded-md pl-2 pr-8 py-1 text-sm">
    <option value="5" selected>5</option>
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="50">50</option>
    </select>
    </div>
    </div>
    </div>

    <!-- Action Bar -->
    <div id="actionBar" class="hidden items-center justify-between mb-2 text-sm">
    <div class="all-div flex items-center">
    <input type="checkbox" id ="selectAllCheckbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2">
    <label for="selectAllCheckbox" class="font-medium"> Chọn tất cả </label>
    </div>
    </div>

    <!-- Results -->
    <div class="results-container space-y-2" id="results">
    <p class="text-center text-gray-500 mt-8" > Nhập từ khóa để bắt đầu tìm kiếm...</p>
    <p class="text-center text-gray-500 mt-2" > Ví dụ: "Facebook", "Instagram", "TikTok"...</p>
    </div>

    <!-- Pagination -->
      <div id="paginationControls" class=" hidden flex items-center justify-center pt-3 text-sm">
      <button class="pagination-btn px-3 py-1 border rounded-l-md bg-white hover:bg-gray-100 text-gray-400 cursor-not-allowed">Trước</button>
      <span class="px-4 py-1 border-t border-b bg-white font-bold">Trang 1</span>
      <button class="pagination-btn px-3 py-1 border rounded-r-md bg-white hover:bg-gray-100">Sau</button>
      </div>

    <!-- Footer with Import Button -->
    <div id="footerBar" class="hidden pt-4 pb-4 border-t-0.7" >
    <button id="importButton" disabled class="action-button w-full font-bold py-2 px-4 rounded-md text-white bg-gray-400 cursor-not-allowed shadow-md">Import icon vào Figma</button>
    </div>
    `;
};

const API_URL = process.env.VERCEL_API_BASE_URL!;
const API_KEY = process.env.FIGMA_PLUGIN_API_KEY!;

setTimeout(() => { }, 1000);

// DOM Elements
const searchInput = document.getElementById('searchInput') as HTMLInputElement;
const searchButton = document.getElementById('searchButton') as HTMLButtonElement;
const countrySelect = document.getElementById('countrySelect') as HTMLSelectElement;
const appStoreSelect = document.getElementById('appStoreSelect') as HTMLSelectElement;
const importButton = document.getElementById('importButton') as HTMLButtonElement | null;
const selectAllCheckbox = document.getElementById('selectAllCheckbox') as HTMLInputElement | null;
const itemsPerPageSelect = document.getElementById('itemsPerPageSelect') as HTMLSelectElement;
const paginationControls = document.getElementById('paginationControls') as HTMLSelectElement;
const resultsDiv = document.getElementById('results') as HTMLElement;
const actionBar = document.getElementById('actionBar') as HTMLDivElement | null;
const alldiv = document.querySelector('all-div') as HTMLDivElement | null;

// State
let allResults: any[] = [];
let currentPage = 1;
let selectedAppIds = new Set<string>();
let totalPages = 0;

const fetchResults = async () => {
    const term = searchInput.value.trim();
    const country = countrySelect?.value;
    const limit = parseInt(itemsPerPageSelect.value, 5);
    const store = appStoreSelect?.value || 'all';

    if (!term) {
        alldiv!.hidden = true;
        updateImportState();
        importButton!.hidden = true;
        renderPagination();
        paginationControls.innerHTML = '';
        resultsDiv.innerHTML = `<p class="text-center text-gray-500 mt-6">Vui lòng nhập từ khóa tìm kiếm.</p>`;
        return;
    }

    resultsDiv.innerHTML = `<p class="text-center text-gray-400 mt-6">🔍 Đang tìm kiếm...</p>
    <p class="text-center text-gray-400 mt-2 text-sm" > Xin chờ, có thể server đang cần thời gian để reboot lại...</p>`;
    paginationControls.innerHTML = '';
    selectedAppIds.clear();
    updateImportState();

    try {
        const res = await fetch(
            `${API_URL}?term=${encodeURIComponent(term)}&country=${country}&limit=${limit}&store=${store}`,
            {
                headers: { 'x-api-key': API_KEY },
            }
        );

        const json = await res.json();

        if (!res.ok || json.error) {
            resultsDiv.innerHTML = `
        <p class="text-center text-red-500 mt-6">⚠️ Lỗi: ${json.error || "Không thể lấy dữ liệu từ server."}</p>`;
            return;
        }

        let data = [];

        if (store === "all") {
            const google = json.google || [];
            const appstore = json.appstore || [];
            data = [...google, ...appstore];
        } else {
            data = json.data || [];
        }

        allResults = data;
        totalPages = Math.ceil(allResults.length / limit);
        currentPage = 1;
        renderPage(1);

        if (allResults.length === 0) {
            resultsDiv.innerHTML = `<p class="text-center text-gray-500 mt-6">Không tìm thấy kết quả nào :( </p>`;
            return;
        }

        const renderPagination = document.getElementById('paginationControls');
        if (renderPagination) {
            renderPagination.classList.remove('hidden');
        }

        const footerBar = document.getElementById('footerBar');
        if (footerBar) {
            footerBar.classList.remove('hidden');
        }

        if (actionBar) {
            actionBar.classList.remove('hidden');
        }

    } catch (err) {
        resultsDiv.innerHTML = `<p class="text-center text-red-500 mt-6">Lỗi khi gọi API: ${(err as Error).message}</p>`;
    }
};

const renderPage = (page: number) => {
    const limit = parseInt(itemsPerPageSelect.value, 10);
    const start = (page - 1) * limit;
    const end = start + limit;
    const pageItems = allResults.slice(start, end);

    resultsDiv.innerHTML = '';

    if (pageItems.length === 0) {
        resultsDiv.innerHTML = `<p class="text-center text-gray-500 mt-6">Không tìm thấy kết quả nào :( </p>`;
        return;
    }

    pageItems.forEach((app) => {
        const id = app.appId;
        const isSelected = selectedAppIds.has(id);

        const hasGoogle = app.stores && app.stores.googlePlay;
        const hasAppStore = app.stores && app.stores.appStore;

        let storeIconsHTML = '';
        if (hasGoogle) {
            storeIconsHTML += `
      <!-- Google Play Icon -->
      <svg width="16px" height="16px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="3" width="24" height="26">
          <path d="M30.0484 14.4004C31.3172 15.0986 31.3172 16.9014 30.0484 17.5996L9.75627 28.7659C8.52052 29.4459 7 28.5634 7 27.1663L7 4.83374C7 3.43657 8.52052 2.55415 9.75627 3.23415L30.0484 14.4004Z" fill="#C4C4C4"/>
        </mask>
        <g mask="url(#mask0)">
          <path d="M7.63473 28.5466L20.2923 15.8179L7.84319 3.29883C7.34653 3.61721 7 4.1669 7 4.8339V27.1664C7 27.7355 7.25223 28.2191 7.63473 28.5466Z" fill="url(#paint0)"/>
          <path d="M30.048 14.4003C31.3169 15.0985 31.3169 16.9012 30.048 17.5994L24.9287 20.4165L20.292 15.8175L24.6923 11.4531L30.048 14.4003Z" fill="url(#paint1)"/>
          <path d="M24.9292 20.4168L20.2924 15.8179L7.63477 28.5466C8.19139 29.0232 9.02389 29.1691 9.75635 28.766L24.9292 20.4168Z" fill="url(#paint2)"/>
          <path d="M7.84277 3.29865L20.2919 15.8177L24.6922 11.4533L9.75583 3.23415C9.11003 2.87878 8.38646 2.95013 7.84277 3.29865Z" fill="url(#paint3)"/>
        </g>
        <defs>
          <linearGradient id="paint0" x1="15.6769" y1="10.874" x2="7.07106" y2="19.5506" gradientUnits="userSpaceOnUse">
            <stop stop-color="#00C3FF"/>
            <stop offset="1" stop-color="#1BE2FA"/>
          </linearGradient>
          <linearGradient id="paint1" x1="20.292" y1="15.8176" x2="31.7381" y2="15.8176" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFCE00"/>
            <stop offset="1" stop-color="#FFEA00"/>
          </linearGradient>
          <linearGradient id="paint2" x1="7.36932" y1="30.1004" x2="22.595" y2="17.8937" gradientUnits="userSpaceOnUse">
            <stop stop-color="#DE2453"/>
            <stop offset="1" stop-color="#FE3944"/>
          </linearGradient>
          <linearGradient id="paint3" x1="8.10725" y1="1.90137" x2="22.5971" y2="13.7365" gradientUnits="userSpaceOnUse">
            <stop stop-color="#11D574"/>
            <stop offset="1" stop-color="#01F176"/>
          </linearGradient>
        </defs>
      </svg>
      `;
        }

        if (hasAppStore) {
            storeIconsHTML += `
      <!-- Apple App Store Icon -->
      <svg width="16px" height="16px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="as-grad">
            <stop stop-color="#17C9FB" offset="0%"></stop>
            <stop stop-color="#1A74E8" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path d="M56.0638473,0 L199.936153,0 C230.899361,0 256,25.1006394 256,56.0638473 L256,199.936153 C256,230.899361 230.899361,256 199.936153,256 L56.0638473,256 C25.1006394,256 0,230.899361 0,199.936153 L0,56.0638473 C0,25.1006394 25.1006394,0 56.0638473,0 Z" fill="url(#as-grad)"></path>
        <path d="M82.041678,185.810289 ... (rút gọn) ..." fill="#FFFFFF"></path>
      </svg>
      `;
        }

        const wrapper = document.createElement("div");
        wrapper.className = `app-card flex items-center p-2 border border-gray-300 rounded-lg bg-white cursor-pointer ${isSelected ? 'selected border-color: #3B82F6 background-color: #DBEAFE' : ''}`;

        wrapper.innerHTML = `
      <input type="checkbox" class="app-checkbox mr-3" data-id="${id}" data-url="${app.icon}" data-name="${app.title}" data-developer="${app.developer}" ${isSelected ? 'checked' : ''}>
      <img src="${app.icon}" class="w-12 h-12 rounded-lg mr-3 pointer-events-none" />
      <div class="flex-grow pointer-events-none">
        <p class="font-semibold text-sm truncate">${app.title}</p>
        <p class="text-xs text-gray-500 truncate">${app.developer}</p>

        <div class="flex space-x-2 mt-1">
        ${storeIconsHTML}
        </div>
    `;
        resultsDiv.appendChild(wrapper);
    });

    const footerBar = document.getElementById('footerBar');
    if (footerBar) {
        footerBar.classList.remove('hidden');
    }

    renderPagination();
    bindCheckboxEvents();

    if (selectAllCheckbox) {
        selectAllCheckbox.checked = false;
    }

    updateImportState();
};


const renderPagination = () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('.app-checkbox');
    checkboxes.forEach(cb => cb.checked = false);
    selectedAppIds.clear();

    const limit = parseInt(itemsPerPageSelect.value, 10);
    paginationControls.innerHTML = '';

    totalPages = Math.ceil(allResults.length / limit);

    const wrapper = document.createElement('div');
    wrapper.className = 'flex items-center justify-center pt-3 text-sm';

    const prevBtn = document.createElement('button');
    prevBtn.className = `pagination-btn px-3 py-1 border rounded-l-md bg-white hover:bg-gray-100 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : ''
        }`;
    prevBtn.textContent = 'Trước';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
        }
    };

    const currentPageLabel = document.createElement('span');
    currentPageLabel.className = 'px-4 py-1 border-t border-b bg-white font-bold';
    currentPageLabel.textContent = `Trang ${currentPage}`;

    const nextBtn = document.createElement('button');
    nextBtn.className = `pagination-btn px-3 py-1 border rounded-r-md bg-white hover:bg-gray-100 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : ''
        }`;
    nextBtn.textContent = 'Sau';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage(currentPage);
        }
    };

    wrapper.appendChild(prevBtn);
    wrapper.appendChild(currentPageLabel);
    wrapper.appendChild(nextBtn);

    paginationControls.appendChild(wrapper);
};

const bindCheckboxEvents = () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('.app-checkbox');
    checkboxes.forEach((cb) => {
        cb.onchange = () => {
            const appId = cb.dataset.id!;
            if (cb.checked) {
                selectedAppIds.add(appId);
            } else {
                selectedAppIds.delete(appId);
            }
            updateImportState();
        };
    });
};

if (selectAllCheckbox) {
    selectAllCheckbox.onchange = () => {
        const checkboxes = document.querySelectorAll<HTMLInputElement>('.app-checkbox');
        checkboxes.forEach(cb => {
            cb.checked = selectAllCheckbox.checked;
            const appId = cb.dataset.id!;
            if (selectAllCheckbox.checked) {
                selectedAppIds.add(appId);
            } else {
                selectedAppIds.delete(appId);
            }
        });
        updateImportState();
    };
}

const updateImportState = () => {
    if (!importButton) return;
    if (selectedAppIds.size > 0) {
        importButton.disabled = false;
        importButton.innerHTML = `Import ${selectedAppIds.size} icon vào Figma`;
        importButton.classList.remove('bg-gray-400', 'cursor-not-allowed');
        importButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
    } else {
        importButton.disabled = true;
        importButton.innerHTML = `Import icon vào Figma`;
        importButton.classList.add('bg-gray-400', 'cursor-not-allowed');
        importButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
    }
};


if (importButton) {
    importButton.onclick = () => {
        const checkboxes = document.querySelectorAll<HTMLInputElement>('.app-checkbox:checked');
        const items = Array.from(checkboxes).map(cb => ({
            url: cb.dataset.url!,
            name: cb.dataset.name!,
            developer: cb.dataset.developer!
        }));
        parent.postMessage({ pluginMessage: { type: 'import-multiple', items } }, '*');
    };
}

searchInput?.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        fetchResults();
    }
});

searchButton?.addEventListener("click", fetchResults);

