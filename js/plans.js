// ========================================
// Discover Egypt - Plans System
// Simple, Offline-Friendly Trip Planner
// ========================================

const plansApp = {
  // Current state
  state: {
    selectedRegion: null,
    selectedGovernorate: null,
    duration: 3,
    travelers: 2,
    budget: 'moderate',
    interests: ['history']
  },

  // Egypt regions and governorates data
  regions: [
    {
      id: 'cairo',
      nameAr: 'القاهرة الكبرى',
      nameEn: 'Greater Cairo',
      nameFr: 'Grand Caire',
      governorates: ['Cairo', 'Giza', 'Qalyubia'],
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400'
    },
    {
      id: 'alex',
      nameAr: 'الإسكندرية والساحل الشمالي',
      nameEn: 'Alexandria & North Coast',
      nameFr: 'Alexandrie et Côte Nord',
      governorates: ['Alexandria', 'Beheira', 'Matrouh'],
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400'
    },
    {
      id: 'delta',
      nameAr: 'الدلتا',
      nameEn: 'Nile Delta',
      nameFr: 'Delta du Nil',
      governorates: ['Dakahlia', 'Gharbia', 'Kafr El Sheikh', 'Damietta', 'Sharqia', 'Monufia'],
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400'
    },
    {
      id: 'canal',
      nameAr: 'قناة السويس',
      nameEn: 'Suez Canal',
      nameFr: 'Canal de Suez',
      governorates: ['Suez', 'Ismailia', 'Port Said'],
      image: 'https://images.unsplash.com/photo-1578070181910-f1e514afdd08?w=400'
    },
    {
      id: 'sinai',
      nameAr: 'سيناء',
      nameEn: 'Sinai',
      nameFr: 'Sinaï',
      governorates: ['North Sinai', 'South Sinai'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
    },
    {
      id: 'redsea',
      nameAr: 'البحر الأحمر',
      nameEn: 'Red Sea',
      nameFr: 'Mer Rouge',
      governorates: ['Red Sea'],
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400'
    },
    {
      id: 'uppernile',
      nameAr: 'صعيد مصر',
      nameEn: 'Upper Egypt',
      nameFr: 'Haute-Égypte',
      governorates: ['Giza', 'Beni Suef', 'Fayoum', 'Minya', 'Asyut', 'Sohag', 'Qena', 'Luxor', 'Aswan'],
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400'
    },
    {
      id: 'western',
      nameAr: 'الصحراء الغربية',
      nameEn: 'Western Desert',
      nameFr: 'Désert Occidental',
      governorates: ['New Valley'],
      image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400'
    }
  ],

  // Detailed governorate data with landmarks
  governorates: {
    'Cairo': {
      nameAr: 'القاهرة',
      nameEn: 'Cairo',
      nameFr: 'Le Caire',
      region: 'cairo',
      landmarks: [
        { name: 'Egyptian Museum', nameAr: 'المتحف المصري', type: 'history' },
        { name: 'Khan El Khalili', nameAr: 'خان الخليلي', type: 'culture' },
        { name: 'Citadel of Saladin', nameAr: 'قلعة صلاح الدين', type: 'islamic' },
        { name: 'Al-Azhar Mosque', nameAr: 'الجامع الأزهر', type: 'islamic' }
      ],
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400'
    },
    'Giza': {
      nameAr: 'الجيزة',
      nameEn: 'Giza',
      nameFr: 'Gizeh',
      region: 'cairo',
      landmarks: [
        { name: 'Pyramids of Giza', nameAr: 'أهرامات الجيزة', type: 'history' },
        { name: 'Great Sphinx', nameAr: 'أبو الهول', type: 'history' },
        { name: 'Saqqara', nameAr: 'سقارة', type: 'history' }
      ],
      image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=400'
    },
    'Alexandria': {
      nameAr: 'الإسكندرية',
      nameEn: 'Alexandria',
      nameFr: 'Alexandrie',
      region: 'alex',
      landmarks: [
        { name: 'Bibliotheca Alexandrina', nameAr: 'مكتبة الإسكندرية', type: 'culture' },
        { name: 'Qaitbay Citadel', nameAr: 'قلعة قايتباي', type: 'history' },
        { name: 'Montaza Palace', nameAr: 'قصر المنتزه', type: 'culture' },
        { name: 'Corniche', nameAr: 'الكورنيش', type: 'beach' }
      ],
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400'
    },
    'Luxor': {
      nameAr: 'الأقصر',
      nameEn: 'Luxor',
      nameFr: 'Louxor',
      region: 'uppernile',
      landmarks: [
        { name: 'Karnak Temple', nameAr: 'معبد الكرنك', type: 'history' },
        { name: 'Valley of the Kings', nameAr: 'وادي الملوك', type: 'history' },
        { name: 'Luxor Temple', nameAr: 'معبد الأقصر', type: 'history' },
        { name: 'Hatshepsut Temple', nameAr: 'معبد حتشبسوت', type: 'history' }
      ],
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400'
    },
    'Aswan': {
      nameAr: 'أسوان',
      nameEn: 'Aswan',
      nameFr: 'Assouan',
      region: 'uppernile',
      landmarks: [
        { name: 'Philae Temple', nameAr: 'معبد فيلة', type: 'history' },
        { name: 'Abu Simbel', nameAr: 'أبو سمبل', type: 'history' },
        { name: 'High Dam', nameAr: 'السد العالي', type: 'culture' },
        { name: 'Nubian Village', nameAr: 'القرية النوبية', type: 'culture' }
      ],
      image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=400'
    },
    'South Sinai': {
      nameAr: 'جنوب سيناء',
      nameEn: 'South Sinai',
      nameFr: 'Sinaï du Sud',
      region: 'sinai',
      landmarks: [
        { name: 'Sharm El Sheikh', nameAr: 'شرم الشيخ', type: 'beach' },
        { name: 'Dahab', nameAr: 'دهب', type: 'beach' },
        { name: 'St. Catherine Monastery', nameAr: 'دير سانت كاترين', type: 'culture' },
        { name: 'Mount Sinai', nameAr: 'جبل موسى', type: 'desert' }
      ],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
    },
    'Red Sea': {
      nameAr: 'البحر الأحمر',
      nameEn: 'Red Sea',
      nameFr: 'Mer Rouge',
      region: 'redsea',
      landmarks: [
        { name: 'Hurghada', nameAr: 'الغردقة', type: 'beach' },
        { name: 'Marsa Alam', nameAr: 'مرسى علم', type: 'beach' },
        { name: 'Giftun Island', nameAr: 'جزيرة الجفتون', type: 'beach' }
      ],
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400'
    },
    'Matrouh': {
      nameAr: 'مطروح',
      nameEn: 'Matrouh',
      nameFr: 'Marsa Matrouh',
      region: 'alex',
      landmarks: [
        { name: 'Cleopatra Beach', nameAr: 'شاطئ كليوباترا', type: 'beach' },
        { name: 'Siwa Oasis', nameAr: 'واحة سيوة', type: 'desert' },
        { name: 'Agiba Beach', nameAr: 'شاطئ العجيبة', type: 'beach' }
      ],
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'
    },
    'Qalyubia': {
      nameAr: 'القليوبية',
      nameEn: 'Qalyubia',
      nameFr: 'Qalyubiyya',
      region: 'cairo',
      landmarks: [
        { name: 'Qanater El Khayreya', nameAr: 'القناطر الخيرية', type: 'culture' }
      ],
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400'
    },
    'Beheira': {
      nameAr: 'البحيرة',
      nameEn: 'Beheira',
      nameFr: 'Beheira',
      region: 'alex',
      landmarks: [
        { name: 'Rosetta', nameAr: 'رشيد', type: 'history' },
        { name: 'Wadi El Natrun', nameAr: 'وادي النطرون', type: 'culture' }
      ],
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400'
    },
    'Dakahlia': {
      nameAr: 'الدقهلية',
      nameEn: 'Dakahlia',
      nameFr: 'Dakahlia',
      region: 'delta',
      landmarks: [
        { name: 'Mansoura', nameAr: 'المنصورة', type: 'culture' }
      ],
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400'
    },
    'Gharbia': {
      nameAr: 'الغربية',
      nameEn: 'Gharbia',
      nameFr: 'Gharbia',
      region: 'delta',
      landmarks: [
        { name: 'Tanta', nameAr: 'طنطا', type: 'culture' }
      ],
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400'
    },
    'Kafr El Sheikh': {
      nameAr: 'كفر الشيخ',
      nameEn: 'Kafr El Sheikh',
      nameFr: 'Kafr El-Cheikh',
      region: 'delta',
      landmarks: [
        { name: 'Burullus Lake', nameAr: 'بحيرة البرلس', type: 'beach' }
      ],
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400'
    },
    'Damietta': {
      nameAr: 'دمياط',
      nameEn: 'Damietta',
      nameFr: 'Damiette',
      region: 'delta',
      landmarks: [
        { name: 'Damietta Beach', nameAr: 'شاطئ دمياط', type: 'beach' }
      ],
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'
    },
    'Sharqia': {
      nameAr: 'الشرقية',
      nameEn: 'Sharqia',
      nameFr: 'Sharqia',
      region: 'delta',
      landmarks: [
        { name: 'Zagazig', nameAr: 'الزقازيق', type: 'culture' }
      ],
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400'
    },
    'Monufia': {
      nameAr: 'المنوفية',
      nameEn: 'Monufia',
      nameFr: 'Menoufia',
      region: 'delta',
      landmarks: [
        { name: 'Shibin El Kom', nameAr: 'شبين الكوم', type: 'culture' }
      ],
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400'
    },
    'Suez': {
      nameAr: 'السويس',
      nameEn: 'Suez',
      nameFr: 'Suez',
      region: 'canal',
      landmarks: [
        { name: 'Suez Canal', nameAr: 'قناة السويس', type: 'history' }
      ],
      image: 'https://images.unsplash.com/photo-1578070181910-f1e514afdd08?w=400'
    },
    'Ismailia': {
      nameAr: 'الإسماعيلية',
      nameEn: 'Ismailia',
      nameFr: 'Ismaïlia',
      region: 'canal',
      landmarks: [
        { name: 'Timsah Lake', nameAr: 'بحيرة التمساح', type: 'beach' }
      ],
      image: 'https://images.unsplash.com/photo-1578070181910-f1e514afdd08?w=400'
    },
    'Port Said': {
      nameAr: 'بورسعيد',
      nameEn: 'Port Said',
      nameFr: 'Port-Saïd',
      region: 'canal',
      landmarks: [
        { name: 'Port Said Lighthouse', nameAr: 'فنار بورسعيد', type: 'culture' }
      ],
      image: 'https://images.unsplash.com/photo-1578070181910-f1e514afdd08?w=400'
    },
    'North Sinai': {
      nameAr: 'شمال سيناء',
      nameEn: 'North Sinai',
      nameFr: 'Sinaï du Nord',
      region: 'sinai',
      landmarks: [
        { name: 'Arish Beach', nameAr: 'شاطئ العريش', type: 'beach' }
      ],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
    },
    'Beni Suef': {
      nameAr: 'بني سويف',
      nameEn: 'Beni Suef',
      nameFr: 'Beni Suef',
      region: 'uppernile',
      landmarks: [
        { name: 'Meidum Pyramid', nameAr: 'هرم ميدوم', type: 'history' }
      ],
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400'
    },
    'Fayoum': {
      nameAr: 'الفيوم',
      nameEn: 'Fayoum',
      nameFr: 'Fayoum',
      region: 'uppernile',
      landmarks: [
        { name: 'Wadi El Rayan', nameAr: 'وادي الريان', type: 'desert' },
        { name: 'Qarun Lake', nameAr: 'بحيرة قارون', type: 'beach' }
      ],
      image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400'
    },
    'Minya': {
      nameAr: 'المنيا',
      nameEn: 'Minya',
      nameFr: 'Minya',
      region: 'uppernile',
      landmarks: [
        { name: 'Beni Hassan', nameAr: 'بني حسن', type: 'history' },
        { name: 'Tuna El Gebel', nameAr: 'تونا الجبل', type: 'history' }
      ],
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400'
    },
    'Asyut': {
      nameAr: 'أسيوط',
      nameEn: 'Asyut',
      nameFr: 'Assiout',
      region: 'uppernile',
      landmarks: [
        { name: 'Asyut Barrage', nameAr: 'قناطر أسيوط', type: 'culture' }
      ],
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400'
    },
    'Sohag': {
      nameAr: 'سوهاج',
      nameEn: 'Sohag',
      nameFr: 'Sohag',
      region: 'uppernile',
      landmarks: [
        { name: 'Abydos Temple', nameAr: 'معبد أبيدوس', type: 'history' }
      ],
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400'
    },
    'Qena': {
      nameAr: 'قنا',
      nameEn: 'Qena',
      nameFr: 'Qena',
      region: 'uppernile',
      landmarks: [
        { name: 'Dendera Temple', nameAr: 'معبد دندرة', type: 'history' }
      ],
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400'
    },
    'New Valley': {
      nameAr: 'الوادي الجديد',
      nameEn: 'New Valley',
      nameFr: 'Nouvelle Vallée',
      region: 'western',
      landmarks: [
        { name: 'Kharga Oasis', nameAr: 'واحة الخارجة', type: 'desert' },
        { name: 'Dakhla Oasis', nameAr: 'واحة الداخلة', type: 'desert' }
      ],
      image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400'
    }
  },

  // Budget rates per day in EGP
  budgetRates: {
    budget: {
      accommodation: 300,
      food: 200,
      activities: 150,
      transport: 100
    },
    moderate: {
      accommodation: 800,
      food: 400,
      activities: 350,
      transport: 200
    },
    luxury: {
      accommodation: 2500,
      food: 800,
      activities: 800,
      transport: 400
    }
  },

  // Initialize the app
  init() {
    this.renderRegions();
    this.setupEventListeners();
    this.updateLanguage();
  },

  // Render regions grid
  renderRegions() {
    const container = document.getElementById('regionsShowcase');
    if (!container) return;

    const currentLang = localStorage.getItem('language') || 'en';
    const nameKey = currentLang === 'ar' ? 'nameAr' : (currentLang === 'fr' ? 'nameFr' : 'nameEn');

    container.innerHTML = this.regions.map(region => `
      <div class="region-card" data-region="${region.id}">
        <div class="region-image" style="background-image: url('${region.image}')"></div>
        <div class="region-info">
          <h3>${region[nameKey]}</h3>
          <p>${region.governorates.length} ${this.translate('governoratesLabel')}</p>
        </div>
      </div>
    `).join('');

    // Add click handlers
    container.querySelectorAll('.region-card').forEach(card => {
      card.addEventListener('click', () => {
        this.selectRegion(card.dataset.region);
      });
    });
  },

  // Select a region
  selectRegion(regionId) {
    this.state.selectedRegion = regionId;
    const region = this.regions.find(r => r.id === regionId);

    // Show step 2
    this.showStep(2);
    this.renderGovernorates(region.governorates);
  },

  // Render governorates for selected region
  renderGovernorates(govNames) {
    const container = document.getElementById('governoratesGrid');
    if (!container) return;

    const currentLang = localStorage.getItem('language') || 'en';
    const nameKey = currentLang === 'ar' ? 'nameAr' : (currentLang === 'fr' ? 'nameFr' : 'nameEn');

    container.innerHTML = govNames.map(govName => {
      const gov = this.governorates[govName];
      if (!gov) return '';

      return `
        <div class="governorate-card" data-governorate="${govName}">
          <div class="gov-image" style="background-image: url('${gov.image}')"></div>
          <div class="gov-info">
            <h4>${gov[nameKey]}</h4>
            <p>${gov.landmarks.length} ${this.translate('landmarksLabel')}</p>
          </div>
        </div>
      `;
    }).join('');

    // Add click handlers
    container.querySelectorAll('.governorate-card').forEach(card => {
      card.addEventListener('click', () => {
        this.selectGovernorate(card.dataset.governorate);
      });
    });
  },

  // Select a governorate
  selectGovernorate(govName) {
    this.state.selectedGovernorate = govName;
    this.showStep(3);
  },

  // Show specific step
  showStep(stepNumber) {
    document.querySelectorAll('.planning-step').forEach(step => {
      step.classList.remove('active');
    });
    const step = document.getElementById(`step${stepNumber}`);
    if (step) {
      step.classList.add('active');
      step.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  // Setup event listeners
  setupEventListeners() {
    // Duration selection
    document.querySelectorAll('.duration-options .option-card').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.duration-options .option-card').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.state.duration = parseInt(e.currentTarget.dataset.days);
      });
    });

    // Budget selection
    document.querySelectorAll('.budget-card').forEach(card => {
      card.addEventListener('click', (e) => {
        document.querySelectorAll('.budget-card').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.state.budget = e.currentTarget.dataset.budget;
      });
    });

    // Interests selection
    document.querySelectorAll('.interest-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('active');
        const interest = e.currentTarget.dataset.interest;
        const index = this.state.interests.indexOf(interest);

        if (index > -1) {
          this.state.interests.splice(index, 1);
        } else {
          this.state.interests.push(interest);
        }
      });
    });
  },

  // Change number of travelers
  changeTravelers(delta) {
    this.state.travelers = Math.max(1, Math.min(20, this.state.travelers + delta));
    document.getElementById('travelersCount').textContent = this.state.travelers;
  },

  // Generate trip plan
  generatePlan() {
    if (!this.state.selectedGovernorate) {
      alert(this.translate('selectGovFirst'));
      return;
    }

    const gov = this.governorates[this.state.selectedGovernorate];
    const currentLang = localStorage.getItem('language') || 'en';
    const nameKey = currentLang === 'ar' ? 'nameAr' : (currentLang === 'fr' ? 'nameFr' : 'nameEn');

    // Calculate costs
    const dailyRate = this.budgetRates[this.state.budget];
    const dailyCost = Object.values(dailyRate).reduce((a, b) => a + b, 0);
    const totalCost = dailyCost * this.state.duration * this.state.travelers;

    // Filter landmarks by interests
    const landmarks = gov.landmarks.filter(l =>
      this.state.interests.includes(l.type)
    );

    // Generate daily itinerary
    const dailyPlan = this.generateDailyItinerary(landmarks, this.state.duration);

    // Show results
    const resultsContainer = document.getElementById('planResults');
    const resultsSection = document.getElementById('resultsSection');

    if (resultsContainer && resultsSection) {
      resultsContainer.innerHTML = this.generateResultsHTML(
        gov[nameKey],
        dailyPlan,
        {
          daily: dailyCost,
          total: totalCost,
          breakdown: dailyRate
        }
      );

      resultsSection.style.display = 'block';
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  },

  // Generate daily itinerary
  generateDailyItinerary(landmarks, days) {
    const itinerary = [];
    const landmarksPerDay = Math.ceil(landmarks.length / days);

    for (let day = 1; day <= days; day++) {
      const startIdx = (day - 1) * landmarksPerDay;
      const dayLandmarks = landmarks.slice(startIdx, startIdx + landmarksPerDay);

      itinerary.push({
        day,
        activities: [
          { time: '09:00', activity: dayLandmarks[0]?.nameAr || dayLandmarks[0]?.name || 'Breakfast & Check-in' },
          { time: '12:00', activity: dayLandmarks[1]?.nameAr || dayLandmarks[1]?.name || 'Lunch' },
          { time: '15:00', activity: dayLandmarks[2]?.nameAr || dayLandmarks[2]?.name || 'Explore local area' },
          { time: '19:00', activity: 'Dinner & Leisure' }
        ]
      });
    }

    return itinerary;
  },

  // Generate results HTML
  generateResultsHTML(govName, itinerary, costs) {
    const currentLang = localStorage.getItem('language') || 'en';

    return `
      <div class="trip-results">
        <div class="results-header">
          <h2>${this.translate('tripTo')} ${govName}</h2>
          <div class="trip-meta">
            <span>${this.state.duration} ${this.translate('days')}</span>
            <span>•</span>
            <span>${this.state.travelers} ${this.translate('travelers')}</span>
            <span>•</span>
            <span>${this.translate(this.state.budget + 'Trip')}</span>
          </div>
        </div>

        <div class="cost-summary">
          <h3>${this.translate('totalBudget')}</h3>
          <div class="total-cost">${costs.total.toLocaleString()} EGP</div>
          <div class="cost-breakdown">
            <div class="cost-item">
              <span>${this.translate('accommodation')}</span>
              <span>${(costs.breakdown.accommodation * this.state.duration * this.state.travelers).toLocaleString()} EGP</span>
            </div>
            <div class="cost-item">
              <span>${this.translate('food')}</span>
              <span>${(costs.breakdown.food * this.state.duration * this.state.travelers).toLocaleString()} EGP</span>
            </div>
            <div class="cost-item">
              <span>${this.translate('activities')}</span>
              <span>${(costs.breakdown.activities * this.state.duration * this.state.travelers).toLocaleString()} EGP</span>
            </div>
            <div class="cost-item">
              <span>${this.translate('transportation')}</span>
              <span>${(costs.breakdown.transport * this.state.duration * this.state.travelers).toLocaleString()} EGP</span>
            </div>
          </div>
        </div>

        <div class="itinerary-section">
          <h3>${this.translate('dailyProgram')}</h3>
          ${itinerary.map(day => `
            <div class="day-plan">
              <h4>${this.translate('dayLabel')} ${day.day}</h4>
              <div class="activities-list">
                ${day.activities.map(act => `
                  <div class="activity-item">
                    <span class="activity-time">${act.time}</span>
                    <span class="activity-name">${act.activity}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="tips-section">
          <h3>${this.translate('importantTips')}</h3>
          <ul>
            <li>${currentLang === 'ar' ? 'احجز الفنادق مبكراً للحصول على أفضل الأسعار' : 'Book hotels early for best prices'}</li>
            <li>${currentLang === 'ar' ? 'تأكد من حمل بطاقة هوية سارية' : 'Carry valid ID at all times'}</li>
            <li>${currentLang === 'ar' ? 'احترم العادات والتقاليد المحلية' : 'Respect local customs and traditions'}</li>
            <li>${currentLang === 'ar' ? 'اشرب ماء معبأ فقط' : 'Drink bottled water only'}</li>
          </ul>
        </div>

        <div class="action-buttons">
          <button class="btn-primary" onclick="plansApp.editPlan()">${this.translate('editPlan')}</button>
          <button class="btn-secondary" onclick="plansApp.savePlan()">${this.translate('savePlan')}</button>
        </div>
      </div>
    `;
  },

  // Edit plan
  editPlan() {
    document.getElementById('resultsSection').style.display = 'none';
    this.showStep(1);
  },

  // Save plan (placeholder)
  savePlan() {
    const plan = {
      governorate: this.state.selectedGovernorate,
      duration: this.state.duration,
      travelers: this.state.travelers,
      budget: this.state.budget,
      interests: this.state.interests,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('savedTripPlan', JSON.stringify(plan));
    alert(this.translate('planSaved') || 'Plan saved successfully!');
  },

  // Translation helper
  translate(key) {
    const lang = localStorage.getItem('language') || 'en';
    const translations = {
      en: {
        governoratesLabel: 'Governorates',
        landmarksLabel: 'Landmarks',
        selectGovFirst: 'Please select a governorate first',
        days: 'days',
        travelers: 'travelers',
        tripTo: 'Trip to',
        totalBudget: 'Total Budget',
        accommodation: 'Accommodation',
        food: 'Food',
        activities: 'Activities',
        transportation: 'Transportation',
        dailyProgram: 'Daily Program',
        dayLabel: 'Day',
        importantTips: 'Important Tips',
        editPlan: 'Edit Plan',
        savePlan: 'Save Plan',
        budgetTrip: 'Budget',
        moderateTrip: 'Moderate',
        luxuryTrip: 'Luxury'
      },
      ar: {
        governoratesLabel: 'محافظات',
        landmarksLabel: 'معالم',
        selectGovFirst: 'اختر محافظة أولاً',
        days: 'أيام',
        travelers: 'مسافرون',
        tripTo: 'رحلة إلى',
        totalBudget: 'الميزانية الإجمالية',
        accommodation: 'الإقامة',
        food: 'الطعام',
        activities: 'الأنشطة',
        transportation: 'المواصلات',
        dailyProgram: 'البرنامج اليومي',
        dayLabel: 'اليوم',
        importantTips: 'نصائح مهمة',
        editPlan: 'تعديل الخطة',
        savePlan: 'حفظ الخطة',
        budgetTrip: 'اقتصادية',
        moderateTrip: 'متوسطة',
        luxuryTrip: 'فاخرة'
      },
      fr: {
        governoratesLabel: 'Gouvernorats',
        landmarksLabel: 'Sites',
        selectGovFirst: 'Veuillez sélectionner un gouvernorat d\'abord',
        days: 'jours',
        travelers: 'voyageurs',
        tripTo: 'Voyage à',
        totalBudget: 'Budget Total',
        accommodation: 'Hébergement',
        food: 'Nourriture',
        activities: 'Activités',
        transportation: 'Transport',
        dailyProgram: 'Programme Quotidien',
        dayLabel: 'Jour',
        importantTips: 'Conseils Importants',
        editPlan: 'Modifier le Plan',
        savePlan: 'Enregistrer le Plan',
        budgetTrip: 'Économique',
        moderateTrip: 'Modéré',
        luxuryTrip: 'Luxe'
      }
    };

    return translations[lang][key] || key;
  },

  // Update language when changed
  updateLanguage() {
    this.renderRegions();
    if (this.state.selectedRegion) {
      const region = this.regions.find(r => r.id === this.state.selectedRegion);
      if (region) this.renderGovernorates(region.governorates);
    }
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => plansApp.init());
} else {
  plansApp.init();
}

// Listen for language changes
document.addEventListener('languageChanged', () => plansApp.updateLanguage());
