// TimeTools - Comprehensive Time Utilities
console.log('TimeTools script loaded successfully!');

class TimeTools {
    constructor() {
        console.log('TimeTools class initialized');
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupTimer();
        this.setupStopwatch();
        this.setupEpochConverter();
        this.setupTimezone();
        this.setupHolidays();
        this.updateCurrentEpoch();
        this.setupNavigation();
    }

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        document.body.setAttribute('data-theme', currentTheme);
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            document.body.setAttribute('data-theme', newTheme);
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            localStorage.setItem('theme', newTheme);
            
            // Force a repaint to ensure theme is applied
            document.body.style.display = 'none';
            document.body.offsetHeight; // Trigger reflow
            document.body.style.display = '';
        });
    }

    // Timer Functionality
    setupTimer() {
        const timerDisplay = document.getElementById('timerDisplay');
        const startBtn = document.getElementById('startTimer');
        const pauseBtn = document.getElementById('pauseTimer');
        const resetBtn = document.getElementById('resetTimer');
        const customMinutes = document.getElementById('customMinutes');
        const customSeconds = document.getElementById('customSeconds');
        const presetBtns = document.querySelectorAll('.preset-btn');

        let timerInterval = null;
        let timeLeft = 0;
        let isRunning = false;

        // Preset buttons
        presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const minutes = parseInt(btn.dataset.minutes);
                timeLeft = minutes * 60;
                this.updateTimerDisplay();
                this.resetTimerState();
            });
        });

        // Custom timer inputs
        [customMinutes, customSeconds].forEach(input => {
            input.addEventListener('input', () => {
                const minutes = parseInt(customMinutes.value) || 0;
                const seconds = parseInt(customSeconds.value) || 0;
                timeLeft = minutes * 60 + seconds;
                this.updateTimerDisplay();
                this.resetTimerState();
            });
        });

        // Timer controls
        startBtn.addEventListener('click', () => {
            if (timeLeft > 0) {
                this.startTimer();
            }
        });

        pauseBtn.addEventListener('click', () => {
            this.pauseTimer();
        });

        resetBtn.addEventListener('click', () => {
            this.resetTimer();
        });

        // Timer methods
        this.startTimer = () => {
            if (timeLeft <= 0) return;
            
            isRunning = true;
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            timerDisplay.classList.add('timer-active');

            timerInterval = setInterval(() => {
                timeLeft--;
                this.updateTimerDisplay();
                
                if (timeLeft <= 0) {
                    this.timerComplete();
                }
            }, 1000);
        };

        this.pauseTimer = () => {
            isRunning = false;
            clearInterval(timerInterval);
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            timerDisplay.classList.remove('timer-active');
        };

        this.resetTimer = () => {
            this.pauseTimer();
            timeLeft = 0;
            this.updateTimerDisplay();
            this.resetTimerState();
        };

        this.resetTimerState = () => {
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            timerDisplay.classList.remove('timer-active');
        };

        this.updateTimerDisplay = () => {
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;
            
            timerDisplay.textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        this.timerComplete = () => {
            this.pauseTimer();
            this.playNotificationSound();
            alert('Timer completed!');
        };

        this.playNotificationSound = () => {
            // Create a simple beep sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        };
    }

    // Stopwatch Functionality
    setupStopwatch() {
        const stopwatchDisplay = document.getElementById('stopwatchDisplay');
        const startBtn = document.getElementById('startStopwatch');
        const lapBtn = document.getElementById('lapStopwatch');
        const resetBtn = document.getElementById('resetStopwatch');
        const lapTimes = document.getElementById('lapTimes');

        let stopwatchInterval = null;
        let startTime = 0;
        let elapsedTime = 0;
        let isRunning = false;
        let lapCount = 0;

        startBtn.addEventListener('click', () => {
            if (!isRunning) {
                this.startStopwatch();
            } else {
                this.pauseStopwatch();
            }
        });

        lapBtn.addEventListener('click', () => {
            if (isRunning) {
                this.addLap();
            }
        });

        resetBtn.addEventListener('click', () => {
            this.resetStopwatch();
        });

        this.startStopwatch = () => {
            isRunning = true;
            startTime = Date.now() - elapsedTime;
            startBtn.textContent = 'Pause';
            lapBtn.disabled = false;
            resetBtn.disabled = false;

            stopwatchInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                this.updateStopwatchDisplay();
            }, 10);
        };

        this.pauseStopwatch = () => {
            isRunning = false;
            clearInterval(stopwatchInterval);
            startBtn.textContent = 'Start';
            lapBtn.disabled = true;
        };

        this.resetStopwatch = () => {
            this.pauseStopwatch();
            elapsedTime = 0;
            lapCount = 0;
            this.updateStopwatchDisplay();
            lapTimes.innerHTML = '';
            resetBtn.disabled = true;
        };

        this.updateStopwatchDisplay = () => {
            const totalMs = elapsedTime;
            const hours = Math.floor(totalMs / 3600000);
            const minutes = Math.floor((totalMs % 3600000) / 60000);
            const seconds = Math.floor((totalMs % 60000) / 1000);
            const milliseconds = Math.floor((totalMs % 1000) / 10);
            
            stopwatchDisplay.textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
        };

        this.addLap = () => {
            lapCount++;
            const lapTime = elapsedTime;
            const lapElement = document.createElement('div');
            lapElement.className = 'lap-time';
            
            const hours = Math.floor(lapTime / 3600000);
            const minutes = Math.floor((lapTime % 3600000) / 60000);
            const seconds = Math.floor((lapTime % 60000) / 1000);
            const milliseconds = Math.floor((lapTime % 1000) / 10);
            
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
            
            lapElement.innerHTML = `
                <span>Lap ${lapCount}</span>
                <span>${timeString}</span>
            `;
            
            lapTimes.insertBefore(lapElement, lapTimes.firstChild);
        };
    }

    // Epoch Converter
    setupEpochConverter() {
        const epochInput = document.getElementById('epochInput');
        const convertBtn = document.getElementById('convertEpoch');
        const epochOutput = document.getElementById('epochOutput');

        convertBtn.addEventListener('click', () => {
            this.convertEpoch();
        });

        epochInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.convertEpoch();
            }
        });

        // Auto-convert current time
        epochInput.addEventListener('input', () => {
            if (epochInput.value && !isNaN(epochInput.value)) {
                this.convertEpoch();
            }
        });

        this.convertEpoch = () => {
            const timestamp = parseInt(epochInput.value);
            
            if (isNaN(timestamp)) {
                epochOutput.textContent = 'Invalid timestamp';
                return;
            }

            // Handle both seconds and milliseconds
            const date = new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
            
            if (isNaN(date.getTime())) {
                epochOutput.textContent = 'Invalid timestamp';
                return;
            }

            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            };

            epochOutput.textContent = date.toLocaleString('en-US', options);
        };

        this.updateCurrentEpoch = () => {
            const currentEpoch = document.getElementById('currentEpoch');
            if (currentEpoch) {
                setInterval(() => {
                    currentEpoch.textContent = Math.floor(Date.now() / 1000);
                }, 1000);
            }
        };
    }

    // Timezone Converter
    setupTimezone() {
        const timezoneSelect = document.getElementById('timezoneSelect');
        const addTimezoneBtn = document.getElementById('addTimezone');
        const timezoneGrid = document.getElementById('timezoneGrid');

        // Populate timezone select
        const timezones = [
            // Americas
            { value: 'America/New_York', label: 'New York (EST/EDT)' },
            { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
            { value: 'America/Chicago', label: 'Chicago (CST/CDT)' },
            { value: 'America/Denver', label: 'Denver (MST/MDT)' },
            { value: 'America/Phoenix', label: 'Phoenix (MST)' },
            { value: 'America/Anchorage', label: 'Anchorage (AKST/AKDT)' },
            { value: 'Pacific/Honolulu', label: 'Honolulu (HST)' },
            { value: 'America/Toronto', label: 'Toronto (EST/EDT)' },
            { value: 'America/Vancouver', label: 'Vancouver (PST/PDT)' },
            { value: 'America/Mexico_City', label: 'Mexico City (CST/CDT)' },
            { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)' },
            { value: 'America/Buenos_Aires', label: 'Buenos Aires (ART)' },
            { value: 'America/Santiago', label: 'Santiago (CLT)' },
            { value: 'America/Lima', label: 'Lima (PET)' },
            { value: 'America/Bogota', label: 'Bogotá (COT)' },
            { value: 'America/Caracas', label: 'Caracas (VET)' },
            
            // Europe
            { value: 'Europe/London', label: 'London (GMT/BST)' },
            { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
            { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
            { value: 'Europe/Rome', label: 'Rome (CET/CEST)' },
            { value: 'Europe/Madrid', label: 'Madrid (CET/CEST)' },
            { value: 'Europe/Amsterdam', label: 'Amsterdam (CET/CEST)' },
            { value: 'Europe/Brussels', label: 'Brussels (CET/CEST)' },
            { value: 'Europe/Zurich', label: 'Zurich (CET/CEST)' },
            { value: 'Europe/Vienna', label: 'Vienna (CET/CEST)' },
            { value: 'Europe/Stockholm', label: 'Stockholm (CET/CEST)' },
            { value: 'Europe/Oslo', label: 'Oslo (CET/CEST)' },
            { value: 'Europe/Copenhagen', label: 'Copenhagen (CET/CEST)' },
            { value: 'Europe/Helsinki', label: 'Helsinki (EET/EEST)' },
            { value: 'Europe/Warsaw', label: 'Warsaw (CET/CEST)' },
            { value: 'Europe/Prague', label: 'Prague (CET/CEST)' },
            { value: 'Europe/Budapest', label: 'Budapest (CET/CEST)' },
            { value: 'Europe/Bucharest', label: 'Bucharest (EET/EEST)' },
            { value: 'Europe/Sofia', label: 'Sofia (EET/EEST)' },
            { value: 'Europe/Athens', label: 'Athens (EET/EEST)' },
            { value: 'Europe/Lisbon', label: 'Lisbon (WET/WEST)' },
            { value: 'Europe/Dublin', label: 'Dublin (GMT/IST)' },
            { value: 'Europe/Moscow', label: 'Moscow (MSK)' },
            { value: 'Europe/Istanbul', label: 'Istanbul (TRT)' },
            
            // Asia
            { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
            { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
            { value: 'Asia/Hong_Kong', label: 'Hong Kong (HKT)' },
            { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
            { value: 'Asia/Seoul', label: 'Seoul (KST)' },
            { value: 'Asia/Taipei', label: 'Taipei (CST)' },
            { value: 'Asia/Bangkok', label: 'Bangkok (ICT)' },
            { value: 'Asia/Jakarta', label: 'Jakarta (WIB)' },
            { value: 'Asia/Manila', label: 'Manila (PHT)' },
            { value: 'Asia/Ho_Chi_Minh', label: 'Ho Chi Minh City (ICT)' },
            { value: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur (MYT)' },
            { value: 'Asia/Kolkata', label: 'Mumbai (IST)' },
            { value: 'Asia/Karachi', label: 'Karachi (PKT)' },
            { value: 'Asia/Dhaka', label: 'Dhaka (BST)' },
            { value: 'Asia/Dubai', label: 'Dubai (GST)' },
            { value: 'Asia/Riyadh', label: 'Riyadh (AST)' },
            { value: 'Asia/Tehran', label: 'Tehran (IRST)' },
            { value: 'Asia/Jerusalem', label: 'Jerusalem (IST/IDT)' },
            { value: 'Asia/Baghdad', label: 'Baghdad (AST)' },
            { value: 'Asia/Kuwait', label: 'Kuwait (AST)' },
            { value: 'Asia/Qatar', label: 'Doha (AST)' },
            { value: 'Asia/Bahrain', label: 'Manama (AST)' },
            { value: 'Asia/Muscat', label: 'Muscat (GST)' },
            { value: 'Asia/Yerevan', label: 'Yerevan (AMT)' },
            { value: 'Asia/Baku', label: 'Baku (AZT)' },
            { value: 'Asia/Tbilisi', label: 'Tbilisi (GET)' },
            { value: 'Asia/Almaty', label: 'Almaty (ALMT)' },
            { value: 'Asia/Tashkent', label: 'Tashkent (UZT)' },
            { value: 'Asia/Kathmandu', label: 'Kathmandu (NPT)' },
            { value: 'Asia/Colombo', label: 'Colombo (SLST)' },
            { value: 'Asia/Yangon', label: 'Yangon (MMT)' },
            { value: 'Asia/Phnom_Penh', label: 'Phnom Penh (ICT)' },
            { value: 'Asia/Vientiane', label: 'Vientiane (ICT)' },
            { value: 'Asia/Ulaanbaatar', label: 'Ulaanbaatar (ULAT)' },
            { value: 'Asia/Vladivostok', label: 'Vladivostok (VLAT)' },
            { value: 'Asia/Yakutsk', label: 'Yakutsk (YAKT)' },
            { value: 'Asia/Novosibirsk', label: 'Novosibirsk (NOVT)' },
            { value: 'Asia/Yekaterinburg', label: 'Yekaterinburg (YEKT)' },
            { value: 'Asia/Omsk', label: 'Omsk (OMST)' },
            { value: 'Asia/Krasnoyarsk', label: 'Krasnoyarsk (KRAT)' },
            { value: 'Asia/Irkutsk', label: 'Irkutsk (IRKT)' },
            { value: 'Asia/Chita', label: 'Chita (YAKT)' },
            { value: 'Asia/Magadan', label: 'Magadan (MAGT)' },
            { value: 'Asia/Kamchatka', label: 'Petropavlovsk-Kamchatsky (PETT)' },
            { value: 'Asia/Anadyr', label: 'Anadyr (ANAT)' },
            
            // Africa
            { value: 'Africa/Cairo', label: 'Cairo (EET)' },
            { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST)' },
            { value: 'Africa/Lagos', label: 'Lagos (WAT)' },
            { value: 'Africa/Casablanca', label: 'Casablanca (WET)' },
            { value: 'Africa/Algiers', label: 'Algiers (CET)' },
            { value: 'Africa/Tunis', label: 'Tunis (CET)' },
            { value: 'Africa/Tripoli', label: 'Tripoli (EET)' },
            { value: 'Africa/Khartoum', label: 'Khartoum (CAT)' },
            { value: 'Africa/Addis_Ababa', label: 'Addis Ababa (EAT)' },
            { value: 'Africa/Nairobi', label: 'Nairobi (EAT)' },
            { value: 'Africa/Dar_es_Salaam', label: 'Dar es Salaam (EAT)' },
            { value: 'Africa/Kampala', label: 'Kampala (EAT)' },
            { value: 'Africa/Kigali', label: 'Kigali (CAT)' },
            { value: 'Africa/Bujumbura', label: 'Bujumbura (CAT)' },
            { value: 'Africa/Gaborone', label: 'Gaborone (CAT)' },
            { value: 'Africa/Harare', label: 'Harare (CAT)' },
            { value: 'Africa/Lusaka', label: 'Lusaka (CAT)' },
            { value: 'Africa/Maputo', label: 'Maputo (CAT)' },
            { value: 'Africa/Windhoek', label: 'Windhoek (WAT)' },
            { value: 'Africa/Luanda', label: 'Luanda (WAT)' },
            { value: 'Africa/Kinshasa', label: 'Kinshasa (WAT)' },
            { value: 'Africa/Brazzaville', label: 'Brazzaville (WAT)' },
            { value: 'Africa/Libreville', label: 'Libreville (WAT)' },
            { value: 'Africa/Douala', label: 'Douala (WAT)' },
            { value: 'Africa/Yaounde', label: 'Yaoundé (WAT)' },
            { value: 'Africa/Malabo', label: 'Malabo (WAT)' },
            { value: 'Africa/Bangui', label: 'Bangui (WAT)' },
            { value: 'Africa/Ndjamena', label: 'N\'Djamena (WAT)' },
            { value: 'Africa/Porto-Novo', label: 'Porto-Novo (WAT)' },
            { value: 'Africa/Lome', label: 'Lomé (GMT)' },
            { value: 'Africa/Accra', label: 'Accra (GMT)' },
            { value: 'Africa/Abidjan', label: 'Abidjan (GMT)' },
            { value: 'Africa/Bamako', label: 'Bamako (GMT)' },
            { value: 'Africa/Ouagadougou', label: 'Ouagadougou (GMT)' },
            { value: 'Africa/Niamey', label: 'Niamey (WAT)' },
            { value: 'Africa/Dakar', label: 'Dakar (GMT)' },
            { value: 'Africa/Banjul', label: 'Banjul (GMT)' },
            { value: 'Africa/Conakry', label: 'Conakry (GMT)' },
            { value: 'Africa/Freetown', label: 'Freetown (GMT)' },
            { value: 'Africa/Monrovia', label: 'Monrovia (GMT)' },
            { value: 'Africa/Bissau', label: 'Bissau (GMT)' },
            { value: 'Africa/Praia', label: 'Praia (CVT)' },
            { value: 'Africa/Sao_Tome', label: 'São Tomé (GMT)' },
            { value: 'Africa/Addis_Ababa', label: 'Addis Ababa (EAT)' },
            { value: 'Africa/Asmara', label: 'Asmara (EAT)' },
            { value: 'Africa/Djibouti', label: 'Djibouti (EAT)' },
            { value: 'Africa/Mogadishu', label: 'Mogadishu (EAT)' },
            { value: 'Africa/Antananarivo', label: 'Antananarivo (EAT)' },
            { value: 'Africa/Mauritius', label: 'Port Louis (MUT)' },
            { value: 'Africa/Seychelles', label: 'Victoria (SCT)' },
            { value: 'Africa/Comoro', label: 'Moroni (EAT)' },
            { value: 'Africa/Mayotte', label: 'Mamoudzou (EAT)' },
            { value: 'Africa/Reunion', label: 'Saint-Denis (RET)' },
            
            // Australia & Pacific
            { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
            { value: 'Australia/Melbourne', label: 'Melbourne (AEST/AEDT)' },
            { value: 'Australia/Brisbane', label: 'Brisbane (AEST)' },
            { value: 'Australia/Perth', label: 'Perth (AWST)' },
            { value: 'Australia/Adelaide', label: 'Adelaide (ACST/ACDT)' },
            { value: 'Australia/Darwin', label: 'Darwin (ACST)' },
            { value: 'Australia/Hobart', label: 'Hobart (AEST/AEDT)' },
            { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)' },
            { value: 'Pacific/Fiji', label: 'Suva (FJT)' },
            { value: 'Pacific/Guam', label: 'Guam (ChST)' },
            { value: 'Pacific/Honolulu', label: 'Honolulu (HST)' },
            { value: 'Pacific/Pago_Pago', label: 'Pago Pago (SST)' },
            { value: 'Pacific/Tahiti', label: 'Tahiti (TAHT)' },
            { value: 'Pacific/Marquesas', label: 'Marquesas (MART)' },
            { value: 'Pacific/Gambier', label: 'Gambier (GAMT)' },
            { value: 'Pacific/Pitcairn', label: 'Pitcairn (PST)' },
            { value: 'Pacific/Easter', label: 'Easter Island (EAST)' },
            { value: 'Pacific/Galapagos', label: 'Galapagos (GALT)' },
            { value: 'Pacific/Norfolk', label: 'Norfolk Island (NFT)' },
            { value: 'Pacific/Chatham', label: 'Chatham Islands (CHAST)' },
            { value: 'Pacific/Tongatapu', label: 'Nuku\'alofa (TOT)' },
            { value: 'Pacific/Apia', label: 'Apia (WST)' },
            { value: 'Pacific/Kiritimati', label: 'Kiritimati (LINT)' },
            { value: 'Pacific/Tarawa', label: 'Tarawa (GILT)' },
            { value: 'Pacific/Funafuti', label: 'Funafuti (TVT)' },
            { value: 'Pacific/Wallis', label: 'Wallis (WFT)' },
            { value: 'Pacific/Noumea', label: 'Nouméa (NCT)' },
            { value: 'Pacific/Port_Moresby', label: 'Port Moresby (PGT)' },
            { value: 'Pacific/Guadalcanal', label: 'Honiara (SBT)' },
            { value: 'Pacific/Efate', label: 'Port Vila (VUT)' },
            { value: 'Pacific/Norfolk', label: 'Kingston (NFT)' },
            { value: 'Pacific/Rarotonga', label: 'Rarotonga (CKT)' },
            { value: 'Pacific/Palau', label: 'Palau (PWT)' },
            { value: 'Pacific/Chuuk', label: 'Chuuk (CHUT)' },
            { value: 'Pacific/Pohnpei', label: 'Pohnpei (PONT)' },
            { value: 'Pacific/Kosrae', label: 'Kosrae (KOST)' },
            { value: 'Pacific/Majuro', label: 'Majuro (MHT)' },
            { value: 'Pacific/Kwajalein', label: 'Kwajalein (MHT)' },
            { value: 'Pacific/Nauru', label: 'Nauru (NRT)' },
            { value: 'Pacific/Wake', label: 'Wake Island (WAKT)' },
            { value: 'Pacific/Midway', label: 'Midway (SST)' },
            { value: 'Pacific/Johnston', label: 'Johnston Atoll (HST)' },
            { value: 'Pacific/Baker_Island', label: 'Baker Island (HST)' },
            { value: 'Pacific/Howland', label: 'Howland Island (HST)' },
            { value: 'Pacific/Jarvis', label: 'Jarvis Island (HST)' },
            { value: 'Pacific/Kingman_Reef', label: 'Kingman Reef (HST)' },
            { value: 'Pacific/Palmyra', label: 'Palmyra Atoll (HST)' }
        ];

        timezones.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz.value;
            option.textContent = tz.label;
            timezoneSelect.appendChild(option);
        });

        // Add default timezones
        this.addTimezoneCard('America/New_York', 'New York');
        this.addTimezoneCard('Europe/London', 'London');
        this.addTimezoneCard('Asia/Tokyo', 'Tokyo');

        // Auto-add timezone on selection
        timezoneSelect.addEventListener('change', () => {
            const selectedTimezone = timezoneSelect.value;
            if (selectedTimezone) {
                const label = timezoneSelect.options[timezoneSelect.selectedIndex].text;
                this.addTimezoneCard(selectedTimezone, label);
                timezoneSelect.value = '';
            }
        });



        // Update all timezone cards every second
        setInterval(() => {
            this.updateAllTimezones();
        }, 1000);
    }

    addTimezoneCard(timezone, label) {
        const timezoneGrid = document.getElementById('timezoneGrid');
        const card = document.createElement('div');
        card.className = 'timezone-card';
        card.dataset.timezone = timezone;
        
        card.innerHTML = `
            <h3>${label}</h3>
            <div class="time">--:--:--</div>
            <div class="date">--</div>
            <button class="remove-timezone" onclick="this.parentElement.remove()">×</button>
        `;
        
        timezoneGrid.appendChild(card);
        this.updateTimezoneCard(card);
    }

    updateTimezoneCard(card) {
        const timezone = card.dataset.timezone;
        const now = new Date();
        
        try {
            const timeString = now.toLocaleTimeString('en-US', {
                timeZone: timezone,
                hour12: false
            });
            
            const dateString = now.toLocaleDateString('en-US', {
                timeZone: timezone,
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
            
            card.querySelector('.time').textContent = timeString;
            card.querySelector('.date').textContent = dateString;
        } catch (error) {
            console.error('Error updating timezone:', error);
        }
    }

    updateAllTimezones() {
        const cards = document.querySelectorAll('.timezone-card');
        cards.forEach(card => this.updateTimezoneCard(card));
    }

    // Holiday Calendar
    setupHolidays() {
        const countrySelect = document.getElementById('countrySelect');
        const loadHolidaysBtn = document.getElementById('loadHolidays');
        const holidaysList = document.getElementById('holidaysList');

        // Auto-load holidays on country selection
        countrySelect.addEventListener('change', () => {
            const country = countrySelect.value;
            if (country) {
                this.loadHolidays(country);
            }
        });



        // Load default holidays for US
        this.loadHolidays('US');
    }

    async loadHolidays(country) {
        const holidaysList = document.getElementById('holidaysList');
        holidaysList.innerHTML = '<p>Loading holidays...</p>';

        try {
            // Using a free holidays API
            const year = new Date().getFullYear();
            const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch holidays');
            }
            
            const holidays = await response.json();
            this.displayHolidays(holidays);
            
        } catch (error) {
            console.error('Error loading holidays:', error);
            holidaysList.innerHTML = `
                <p>Unable to load holidays. Here are some common holidays for ${country}:</p>
                ${this.getFallbackHolidays(country)}
            `;
        }
    }

    displayHolidays(holidays) {
        const holidaysList = document.getElementById('holidaysList');
        
        if (holidays.length === 0) {
            holidaysList.innerHTML = '<p>No holidays found for this country.</p>';
            return;
        }

        const holidaysHTML = holidays.map(holiday => {
            const date = new Date(holiday.date);
            const formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            
            return `
                <div class="holiday-item">
                    <span class="holiday-name">${holiday.name}</span>
                    <span class="holiday-date">${formattedDate}</span>
                </div>
            `;
        }).join('');

        holidaysList.innerHTML = holidaysHTML;
    }

    getFallbackHolidays(country) {
        const commonHolidays = {
            'US': [
                { name: 'New Year\'s Day', date: '2024-01-01' },
                { name: 'Martin Luther King Jr. Day', date: '2024-01-15' },
                { name: 'Presidents\' Day', date: '2024-02-19' },
                { name: 'Memorial Day', date: '2024-05-27' },
                { name: 'Independence Day', date: '2024-07-04' },
                { name: 'Labor Day', date: '2024-09-02' },
                { name: 'Columbus Day', date: '2024-10-14' },
                { name: 'Veterans Day', date: '2024-11-11' },
                { name: 'Thanksgiving Day', date: '2024-11-28' },
                { name: 'Christmas Day', date: '2024-12-25' }
            ],
            'GB': [
                { name: 'New Year\'s Day', date: '2024-01-01' },
                { name: 'Good Friday', date: '2024-03-29' },
                { name: 'Easter Monday', date: '2024-04-01' },
                { name: 'Early May Bank Holiday', date: '2024-05-06' },
                { name: 'Spring Bank Holiday', date: '2024-05-27' },
                { name: 'Summer Bank Holiday', date: '2024-08-26' },
                { name: 'Boxing Day', date: '2024-12-26' }
            ]
        };

        const holidays = commonHolidays[country] || commonHolidays['US'];
        return holidays.map(holiday => {
            const date = new Date(holiday.date);
            const formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            
            return `
                <div class="holiday-item">
                    <span class="holiday-name">${holiday.name}</span>
                    <span class="holiday-date">${formattedDate}</span>
                </div>
            `;
        }).join('');
    }

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.tool-section');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TimeTools();
});

// Add some additional CSS for active nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-primary) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .remove-timezone {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: var(--accent-danger);
        color: white;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }
    .remove-timezone:hover {
        background: #dc2626;
        transform: scale(1.1);
    }
    .timezone-card {
        position: relative;
    }
`;
document.head.appendChild(style);
