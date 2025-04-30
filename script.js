const sites = {
    'youtube': 'https://youtube.com',
    'netflix': 'https://netflix.com',
    'spotify': 'https://open.spotify.com',
    'dribbble': 'https://dribbble.com',
    'behance': 'https://behance.net',
    'figma': 'https://figma.com',
    'github': 'https://github.com',
    'stack': 'https://stackoverflow.com',
    'dev': 'https://dev.to',
    'reddit': 'https://reddit.com',
    'mail': 'https://mail.google.com',
    'calendar': 'https://calendar.google.com'
};

const input = document.getElementById('commandInput');
const dropdown = document.getElementById('autocomplete');
let selectedIndex = -1;
let isDropdownVisible = false;

function toggleDropdown() {
    if (isDropdownVisible) {
        dropdown.style.display = 'none';
        isDropdownVisible = false;
    } else {
        const options = Object.keys(sites);
        showDropdown(options);
        isDropdownVisible = true;
    }
}

function showDropdown(filteredOptions) {
    dropdown.innerHTML = '';
    dropdown.style.display = 'block';
    
    filteredOptions.forEach((option, index) => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.textContent = option;
        item.onclick = () => {
            input.value = option;
            dropdown.style.display = 'none';
            isDropdownVisible = false;
            window.open(sites[option], '_blank', 'noopener,noreferrer');
        };
        dropdown.appendChild(item);
    });
}

function updateSelection() {
    const items = dropdown.getElementsByClassName('autocomplete-item');
    Array.from(items).forEach((item, index) => {
        item.classList.toggle('selected', index === selectedIndex);
    });
}

input.addEventListener('keydown', function(e) {
    const items = dropdown.getElementsByClassName('autocomplete-item');
    
    if (e.key === '/') {
        e.preventDefault();
        toggleDropdown();
        selectedIndex = -1;
        return;
    }
    
    switch(e.key) {
        case 'ArrowDown':
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % items.length;
            updateSelection();
            break;
            
        case 'ArrowUp':
            e.preventDefault();
            selectedIndex = selectedIndex <= 0 ? items.length - 1 : selectedIndex - 1;
            updateSelection();
            break;
            
        case 'Enter':
            e.preventDefault();
            if (selectedIndex >= 0) {
                const selectedOption = items[selectedIndex].textContent;
                input.value = selectedOption;
                dropdown.style.display = 'none';
                window.open(sites[selectedOption], '_blank', 'noopener,noreferrer');
            } else if (sites[input.value.toLowerCase()]) {
                window.open(sites[input.value.toLowerCase()], '_blank', 'noopener,noreferrer');
            }
            break;
            
        case 'Escape':
            dropdown.style.display = 'none';
            selectedIndex = -1;
            break;
    }
});

input.addEventListener('input', function() {
    if (this.value) {
        const filteredOptions = Object.keys(sites).filter(site => 
            site.toLowerCase().includes(this.value.toLowerCase())
        );
        showDropdown(filteredOptions);
        selectedIndex = -1;
    } else {
        dropdown.style.display = 'none';
    }
});

document.addEventListener('click', function(e) {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});