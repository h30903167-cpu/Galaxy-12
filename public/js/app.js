/**
 * Galaxy Manual Seeder (GL-12) - Application Logic
 */

(function () {
  'use strict';

  // --- Merchant UPI Pool (Matched with Android App) ---
  const MERCHANT_UPI_POOL = [
    'jayray8257@nyes',
    'jayray120@nyes',
    'komaraj988@naviaxis',
    'komalraj988@naviaxis',
    'shivanimtpkyp@mvhdfc',
    'komalrajput988@ptyes',
    'Madhukant220@ybl',
    'Madhukant220@ibl',
    'Madhukant220@axl'
  ];

  // Pick assigned UPI
  let assignedUpi = localStorage.getItem('assigned_merchant_upi');
  if (!assignedUpi || !MERCHANT_UPI_POOL.includes(assignedUpi)) {
    assignedUpi = MERCHANT_UPI_POOL[Math.floor(Math.random() * MERCHANT_UPI_POOL.length)];
    localStorage.setItem('assigned_merchant_upi', assignedUpi);
  }

  // --- Initial / Default State ---
  const defaultState = {
    user: {
      phone: '+91 98765 43210',
      loginPassword: 'password123',
      withdrawalPassword: '123456',
      inviteCode: 'c07cdf4c',
      walletBalance: 600.0, // Demo balance to allow immediate test buy of ₹300 / ₹500
      todayIncome: 0.0,
      totalIncome: 0.0,
      totalRecharged: 600.0,
      totalWithdrawn: 0.0,
      isLoggedIn: true,
      boundBankName: 'State Bank of India',
      boundAccountNo: '392019482910',
      boundHolderName: 'Galaxy Equipment Partner',
      boundIfsc: 'SBIN0001234',
      boundUpiId: 'partner@upi'
    },
    myDevices: [
      // Initially empty or can be populated on buy
    ],
    recharges: [
      {
        id: 'RC839102',
        orderNo: 'RC839102',
        amount: 600.0,
        channel: 'UPI FastPay (PhonePe/GPay)',
        utr: '431298765421',
        date: '2026-11-17 14:30',
        status: 'Success'
      }
    ],
    withdrawals: [
      {
        id: 'WD782910',
        orderNo: 'WD782910',
        amount: 250.0,
        fee: 12.5,
        finalAmount: 237.5,
        payoutMethod: 'Bank Account',
        account: '392019482910',
        date: '2026-11-16 11:15',
        status: 'Success'
      }
    ],
    team: [
      { phone: '+91 98124 ****9', level: 1, recharge: 500, commission: 125, date: '2026-11-15' },
      { phone: '+91 94562 ****1', level: 1, recharge: 300, commission: 75, date: '2026-11-16' },
      { phone: '+91 87291 ****4', level: 2, recharge: 500, commission: 15, date: '2026-11-16' },
      { phone: '+91 76210 ****8', level: 3, recharge: 300, commission: 6, date: '2026-11-17' }
    ]
  };

  // Load state from localStorage or seed
  let state = defaultState;
  try {
    const saved = localStorage.getItem('galaxy_seeder_state_v2');
    if (saved) {
      state = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse saved state:', e);
  }

  function saveState() {
    try {
      localStorage.setItem('galaxy_seeder_state_v2', JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state:', e);
    }
    renderAll();
  }

  // --- Product Definitions ---
  const products = [
    // Live Starter Plans
    {
      id: 'prod_gl12_300',
      name: 'GL-12 Seeder (₹300 Starter)',
      category: 'DAY_INCOME',
      price: 300,
      dailyProfit: 75,
      durationDays: 120,
      totalProfit: 9000,
      image: '/assets/images/galaxy_product_gl12.jpg',
      badge: 'HOT SALE',
      isLocked: false,
      desc: 'Galaxy GL-12 Manual Seeder Starter Machine (₹300 Plan • ₹75 Daily Profit)'
    },
    {
      id: 'prod_gl12_500',
      name: 'GL-12 Seeder (₹500 Standard)',
      category: 'DAY_INCOME',
      price: 500,
      dailyProfit: 125,
      durationDays: 120,
      totalProfit: 15000,
      image: '/assets/images/galaxy_product_gl12.jpg',
      badge: 'POPULAR',
      isLocked: false,
      desc: 'Galaxy GL-12 Manual Seeder Standard Machine (₹500 Plan • ₹125 Daily Profit)'
    },
    // Locked / Upcoming Day Income Plans
    {
      id: 'prod_gl10',
      name: 'GL-10 Galaxy Seeder',
      category: 'DAY_INCOME',
      price: 1800,
      dailyProfit: 450,
      durationDays: 120,
      totalProfit: 54000,
      image: '/assets/images/galaxy_product_gl10.jpg',
      badge: 'LOCKED',
      isLocked: true,
      desc: 'Galaxy GL-10 Automatic Seed Planter & Cultivator'
    },
    {
      id: 'prod_gl14',
      name: 'GL-14 Multi-Crop Seeder',
      category: 'DAY_INCOME',
      price: 4900,
      dailyProfit: 1350,
      durationDays: 120,
      totalProfit: 162000,
      image: '/assets/images/galaxy_product_gl14.jpg',
      badge: 'LOCKED',
      isLocked: true,
      desc: 'Multi-Crop Corn, Peanut, Soybean & Wheat Seeder Unit'
    },
    {
      id: 'prod_gl16',
      name: 'GL-16 Heavy Seeder',
      category: 'DAY_INCOME',
      price: 12000,
      dailyProfit: 3600,
      durationDays: 120,
      totalProfit: 432000,
      image: '/assets/images/galaxy_product_vip.jpg',
      badge: 'LOCKED',
      isLocked: true,
      desc: 'Heavy Duty Stainless Steel Agricultural Seeding Rig'
    },
    {
      id: 'prod_tractor_seeder',
      name: 'Galaxy Tractor Seeder',
      category: 'DAY_INCOME',
      price: 35000,
      dailyProfit: 11200,
      durationDays: 120,
      totalProfit: 1344000,
      image: '/assets/images/galaxy_seeder_box.jpg',
      badge: 'LOCKED',
      isLocked: true,
      desc: 'Commercial High-Yield Tractor Attachable Seeding Machine'
    },
    {
      id: 'prod_ultra_1lakh',
      name: 'Galaxy Mega Seeder (1 Lakh)',
      category: 'DAY_INCOME',
      price: 100000,
      dailyProfit: 34000,
      durationDays: 120,
      totalProfit: 4080000,
      image: '/assets/images/galaxy_product_gl12.jpg',
      badge: 'VIP LIMIT',
      isLocked: true,
      desc: 'Galaxy Industrial Farm Seeding Fleet (₹1 Lakh Investment)'
    },
    // VIP Income Plans
    {
      id: 'vip_seeder_1',
      name: 'VIP Seeder 1',
      category: 'VIP_INCOME',
      price: 1200,
      dailyProfit: 600,
      durationDays: 3,
      totalProfit: 1800,
      image: '/assets/images/galaxy_product_vip.jpg',
      badge: 'VIP 1',
      isLocked: true,
      desc: 'High Speed 3-Day Return Galaxy Seeder VIP Plan'
    },
    {
      id: 'vip_seeder_2',
      name: 'VIP Seeder 2',
      category: 'VIP_INCOME',
      price: 3800,
      dailyProfit: 2200,
      durationDays: 3,
      totalProfit: 6600,
      image: '/assets/images/galaxy_product_gl10.jpg',
      badge: 'VIP 2',
      isLocked: true,
      desc: 'Advanced VIP Rapid Yield Galaxy Agricultural Plan'
    },
    {
      id: 'vip_seeder_3',
      name: 'VIP Seeder 3',
      category: 'VIP_INCOME',
      price: 10000,
      dailyProfit: 6500,
      durationDays: 3,
      totalProfit: 19500,
      image: '/assets/images/galaxy_product_gl14.jpg',
      badge: 'VIP 3',
      isLocked: true,
      desc: 'VIP Executive Farm Equipment Yield Program'
    },
    {
      id: 'vip_mega_1lakh',
      name: 'VIP Mega Seeder (1 Lakh)',
      category: 'VIP_INCOME',
      price: 100000,
      dailyProfit: 75000,
      durationDays: 3,
      totalProfit: 225000,
      image: '/assets/images/galaxy_seeder_box.jpg',
      badge: 'VIP PRO',
      isLocked: true,
      desc: 'Exclusive 1 Lakh Fast-Yield VIP Machine'
    }
  ];

  // Referral URL Parameter Handling
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref') || urlParams.get('invite');
  if (refCode) {
    showToast(`Referral code detected: ${refCode}`);
  }

  // Current state variables
  let currentTab = 'screen-home';
  let currentCategory = 'DAY_INCOME';
  let currentTeamLevel = 1;

  // --- UI Toast ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : '📢';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }
  window.showToast = showToast;

  // --- Render Functions ---
  function renderAll() {
    renderBalance();
    renderProducts();
    renderDevices();
    renderTeam();
    renderProfile();
    renderRechargeHistory();
    renderWithdrawalHistory();
  }

  function renderBalance() {
    const balFormatted = `₹${state.user.walletBalance.toFixed(2)}`;
    document.querySelectorAll('.wallet-balance-val').forEach(el => el.textContent = balFormatted);
    document.querySelectorAll('.today-income-val').forEach(el => el.textContent = `₹${state.user.todayIncome.toFixed(2)}`);
    document.querySelectorAll('.total-income-val').forEach(el => el.textContent = `₹${state.user.totalIncome.toFixed(2)}`);
  }

  function renderProducts() {
    const listEl = document.getElementById('products-container');
    if (!listEl) return;

    const filtered = products.filter(p => p.category === currentCategory);
    listEl.innerHTML = '';

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = `product-card ${p.isLocked ? 'locked' : ''}`;
      card.innerHTML = `
        <div class="product-banner-wrap">
          <img src="${p.image}" alt="${p.name}" onerror="this.src='/assets/images/galaxy_product_gl12.jpg'">
          <div class="product-tag-limit">${p.badge}</div>
          <div class="product-overlay-title">${p.name}</div>
        </div>
        <div class="product-body">
          <div class="product-stats-grid">
            <div class="stat-box">
              <span class="stat-box-val">₹${p.price.toLocaleString()}</span>
              <span class="stat-box-label">Price</span>
            </div>
            <div class="stat-box">
              <span class="stat-box-val">₹${p.dailyProfit.toLocaleString()}</span>
              <span class="stat-box-label">Daily Profit</span>
            </div>
            <div class="stat-box">
              <span class="stat-box-val">${p.durationDays} Days</span>
              <span class="stat-box-label">Duration</span>
            </div>
            <div class="stat-box">
              <span class="stat-box-val">₹${p.totalProfit.toLocaleString()}</span>
              <span class="stat-box-label">Total Profit</span>
            </div>
          </div>
          ${
            p.isLocked
              ? `<button class="btn-buy locked-btn" onclick="window.onLockedPlanClick('${p.name}')">
                  🔒 Blocked by Admin (Coming Soon)
                </button>`
              : `<button class="btn-buy" onclick="window.buyPlan('${p.id}')">
                  🛒 Buy Now (₹${p.price})
                </button>`
          }
        </div>
      `;
      listEl.appendChild(card);
    });
  }

  function renderDevices() {
    const container = document.getElementById('my-devices-list');
    const countEl = document.getElementById('devices-active-count');
    const dailyEl = document.getElementById('devices-daily-total');
    const claimedEl = document.getElementById('devices-claimed-total');

    if (!container) return;

    const totalDaily = state.myDevices.reduce((sum, d) => sum + d.dailyProfit, 0);
    const totalClaimed = state.myDevices.reduce((sum, d) => sum + (d.totalClaimed || 0), 0);

    if (countEl) countEl.textContent = state.myDevices.length;
    if (dailyEl) dailyEl.textContent = `₹${totalDaily.toFixed(2)}`;
    if (claimedEl) claimedEl.textContent = `₹${totalClaimed.toFixed(2)}`;

    if (state.myDevices.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🚜</div>
          <div class="empty-state-title">No Active Seeders Yet</div>
          <div class="empty-state-desc">Activate a ₹300 or ₹500 starter seeder machine to generate daily revenue!</div>
          <button class="btn-pill btn-pill-primary" style="margin: 0 auto;" onclick="window.switchTab('screen-home')">
            Explore Seeder Plans
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    state.myDevices.forEach(d => {
      const card = document.createElement('div');
      card.className = 'device-item-card';
      const isClaimed = d.claimedToday;
      card.innerHTML = `
        <div class="device-header">
          <span class="device-name">${d.name}</span>
          <span class="device-status-badge">⚡ ACTIVE (${d.daysRemaining}/${d.totalDays}d)</span>
        </div>
        <div class="device-details-grid">
          <div class="stat-box">
            <span class="stat-box-val">₹${d.price}</span>
            <span class="stat-box-label">Investment</span>
          </div>
          <div class="stat-box">
            <span class="stat-box-val">₹${d.dailyProfit}</span>
            <span class="stat-box-label">Daily Return</span>
          </div>
          <div class="stat-box">
            <span class="stat-box-val">₹${(d.totalClaimed || 0).toFixed(0)}</span>
            <span class="stat-box-label">Earned</span>
          </div>
        </div>
        <button class="btn-claim ${isClaimed ? 'claimed' : 'ready'}" ${isClaimed ? 'disabled' : ''} onclick="window.claimDeviceIncome('${d.id}')">
          ${isClaimed ? '✓ Claimed for Today' : `🎁 Claim Today's Profit (+₹${d.dailyProfit})`}
        </button>
      `;
      container.appendChild(card);
    });
  }

  function renderTeam() {
    const countEl = document.getElementById('team-members-count');
    const rechargeEl = document.getElementById('team-recharge-total');
    const commissionEl = document.getElementById('team-commission-total');
    const listEl = document.getElementById('team-members-list');

    const totalRecharge = state.team.reduce((sum, m) => sum + m.recharge, 0);
    const totalCommission = state.team.reduce((sum, m) => sum + m.commission, 0);

    if (countEl) countEl.textContent = state.team.length;
    if (rechargeEl) rechargeEl.textContent = `₹${totalRecharge.toLocaleString()}`;
    if (commissionEl) commissionEl.textContent = `₹${totalCommission.toLocaleString()}`;

    if (listEl) {
      const filtered = state.team.filter(m => m.level === currentTeamLevel);
      if (filtered.length === 0) {
        listEl.innerHTML = `<p style="text-align:center;color:var(--text-muted);font-size:13px;padding:20px;">No members yet in Level ${currentTeamLevel}</p>`;
      } else {
        listEl.innerHTML = filtered.map(m => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:#091a18;border-radius:8px;margin-bottom:8px;border:1px solid rgba(255,255,255,0.06);">
            <div>
              <div style="font-weight:600;font-size:13.5px;color:#fff;">${m.phone}</div>
              <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">Joined: ${m.date}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:13.5px;font-weight:700;color:var(--primary);">+₹${m.commission}</div>
              <div style="font-size:11px;color:var(--text-muted);">Recharge: ₹${m.recharge}</div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  function renderProfile() {
    const phoneEl = document.getElementById('profile-phone');
    const inviteEl = document.getElementById('profile-invite-code');
    if (phoneEl) phoneEl.textContent = state.user.phone;
    if (inviteEl) inviteEl.textContent = state.user.inviteCode;

    const totalRecEl = document.getElementById('profile-total-recharged');
    const totalWdEl = document.getElementById('profile-total-withdrawn');
    if (totalRecEl) totalRecEl.textContent = `₹${state.user.totalRecharged.toFixed(2)}`;
    if (totalWdEl) totalWdEl.textContent = `₹${state.user.totalWithdrawn.toFixed(2)}`;
  }

  function renderRechargeHistory() {
    const container = document.getElementById('recharge-history-list');
    if (!container) return;
    if (state.recharges.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--text-muted);font-size:12px;padding:15px;">No recharge records</p>';
      return;
    }
    container.innerHTML = state.recharges.map(r => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:#051211;border-radius:8px;margin-bottom:6px;border:1px solid rgba(255,255,255,0.06);">
        <div>
          <div style="font-weight:600;font-size:13px;color:#fff;">₹${r.amount.toFixed(2)}</div>
          <div style="font-size:10.5px;color:var(--text-muted);">${r.channel} • UTR: ${r.utr || 'N/A'}</div>
          <div style="font-size:10px;color:#64748b;">${r.date}</div>
        </div>
        <div>
          <span style="background:rgba(34,197,94,0.15);color:#4ade80;font-size:11px;font-weight:600;padding:2px 8px;border-radius:10px;border:1px solid rgba(34,197,94,0.3);">${r.status}</span>
        </div>
      </div>
    `).join('');
  }

  function renderWithdrawalHistory() {
    const container = document.getElementById('withdrawal-history-list');
    if (!container) return;
    if (state.withdrawals.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--text-muted);font-size:12px;padding:15px;">No withdrawal records</p>';
      return;
    }
    container.innerHTML = state.withdrawals.map(w => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:#051211;border-radius:8px;margin-bottom:6px;border:1px solid rgba(255,255,255,0.06);">
        <div>
          <div style="font-weight:600;font-size:13px;color:#fff;">₹${w.amount.toFixed(2)} (Net: ₹${w.finalAmount.toFixed(2)})</div>
          <div style="font-size:10.5px;color:var(--text-muted);">${w.payoutMethod} • ${w.account}</div>
          <div style="font-size:10px;color:#64748b;">${w.date} • Fee: ₹${w.fee.toFixed(2)}</div>
        </div>
        <div>
          <span style="background:rgba(34,197,94,0.15);color:#4ade80;font-size:11px;font-weight:600;padding:2px 8px;border-radius:10px;border:1px solid rgba(34,197,94,0.3);">${w.status}</span>
        </div>
      </div>
    `).join('');
  }

  // --- Purchase Flow ---
  window.buyPlan = function (productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (product.isLocked) {
      showToast('🔒 Blocked by Admin. Only ₹300 and ₹500 plans are currently live.', 'error');
      return;
    }

    if (state.user.walletBalance < product.price) {
      const diff = product.price - state.user.walletBalance;
      showToast(`Insufficient balance! Need ₹${diff.toFixed(2)} more. Opening Recharge.`, 'error');
      window.openRechargeModal(diff);
      return;
    }

    // Deduct balance
    state.user.walletBalance -= product.price;

    // Add to devices
    const newDevice = {
      id: 'dev_' + Date.now(),
      productId: product.id,
      name: product.name,
      price: product.price,
      dailyProfit: product.dailyProfit,
      totalDays: product.durationDays,
      daysRemaining: product.durationDays,
      totalClaimed: 0,
      claimedToday: false,
      purchaseDate: new Date().toISOString().slice(0, 10),
      image: product.image
    };

    state.myDevices.unshift(newDevice);
    saveState();
    showToast(`🎉 Success! Activated ${product.name}! Daily profit: ₹${product.dailyProfit}`, 'success');
  };

  window.onLockedPlanClick = function (planName) {
    showToast(`🔒 ${planName} is locked by Admin. Starter ₹300 & ₹500 plans are active!`, 'error');
  };

  // --- Claim Daily Profit ---
  window.claimDeviceIncome = function (deviceId) {
    const dev = state.myDevices.find(d => d.id === deviceId);
    if (!dev) return;

    if (dev.claimedToday) {
      showToast("Already claimed today's return! Comes back at 00:00 midnight.", 'info');
      return;
    }

    dev.claimedToday = true;
    dev.totalClaimed = (dev.totalClaimed || 0) + dev.dailyProfit;
    state.user.walletBalance += dev.dailyProfit;
    state.user.todayIncome += dev.dailyProfit;
    state.user.totalIncome += dev.dailyProfit;

    saveState();
    showToast(`💰 Claimed +₹${dev.dailyProfit.toFixed(2)} to your wallet!`, 'success');
  };

  // --- Navigation & Tab Switching ---
  window.switchTab = function (screenId) {
    currentTab = screenId;
    document.querySelectorAll('.screen-view').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');

    // Update bottom nav active state
    document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-screen') === screenId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.switchCategory = function (category) {
    currentCategory = category;
    document.querySelectorAll('.category-tabs .tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === category);
    });
    renderProducts();
  };

  window.switchTeamLevel = function (level) {
    currentTeamLevel = level;
    document.querySelectorAll('.team-level-tab').forEach((el, idx) => {
      el.classList.toggle('active', idx + 1 === level);
    });
    renderTeam();
  };

  // --- Modals Management ---
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  };

  // --- Recharge Flow ---
  window.openRechargeModal = function (presetAmount = null) {
    const modal = document.getElementById('modal-recharge');
    if (!modal) return;
    modal.classList.add('active');

    const input = document.getElementById('recharge-amount-input');
    if (presetAmount && input) {
      input.value = Math.ceil(presetAmount);
    }
    updateRechargeQr();
  };

  window.selectRechargePreset = function (amount) {
    const input = document.getElementById('recharge-amount-input');
    if (input) input.value = amount;
    document.querySelectorAll('.btn-preset').forEach(b => {
      b.classList.toggle('selected', b.textContent.includes(amount.toString()));
    });
    updateRechargeQr();
  };

  function updateRechargeQr() {
    const input = document.getElementById('recharge-amount-input');
    const amount = input ? input.value || '300' : '300';
    const qrImg = document.getElementById('recharge-qr-img');
    const assignedUpiEl = document.getElementById('merchant-upi-text');

    if (assignedUpiEl) assignedUpiEl.textContent = assignedUpi;

    if (qrImg) {
      const upiUrl = `upi://pay?pa=${assignedUpi}&pn=GalaxySeeder&am=${amount}&cu=INR`;
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUrl)}`;
    }
  }

  window.copyAssignedUpi = function () {
    navigator.clipboard.writeText(assignedUpi).then(() => {
      showToast(`Copied Merchant UPI: ${assignedUpi}`, 'success');
    }).catch(() => {
      showToast(`Merchant UPI: ${assignedUpi}`, 'info');
    });
  };

  window.submitUtrRecharge = function () {
    const amountInput = document.getElementById('recharge-amount-input');
    const utrInput = document.getElementById('recharge-utr-input');

    const amount = parseFloat(amountInput.value);
    const utr = utrInput.value.trim();

    if (!amount || amount < 100) {
      showToast('Minimum recharge amount is ₹100', 'error');
      return;
    }

    if (!utr || utr.length !== 12 || !/^\d+$/.test(utr)) {
      showToast('Please enter a valid 12-digit numeric UTR / Reference number', 'error');
      return;
    }

    // Add to user balance
    state.user.walletBalance += amount;
    state.user.totalRecharged += amount;

    const newRecord = {
      id: 'RC' + Math.floor(100000 + Math.random() * 900000),
      orderNo: 'RC' + Math.floor(100000 + Math.random() * 900000),
      amount: amount,
      channel: 'UPI FastPay (PhonePe/GPay)',
      utr: utr,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Success'
    };

    state.recharges.unshift(newRecord);
    saveState();

    utrInput.value = '';
    closeModal('modal-recharge');
    showToast(`⚡ Recharge Approved! ₹${amount.toFixed(2)} credited to your wallet!`, 'success');
  };

  // Instant Demo Sandbox Credit
  window.instantDemoCredit = function (amt) {
    state.user.walletBalance += amt;
    state.user.totalRecharged += amt;
    const rec = {
      id: 'RC_DEMO_' + Date.now().toString().slice(-6),
      orderNo: 'RC' + Math.floor(100000 + Math.random() * 900000),
      amount: amt,
      channel: '⚡ Instant Sandbox Demo Credit',
      utr: '998877665544',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Success'
    };
    state.recharges.unshift(rec);
    saveState();
    closeModal('modal-recharge');
    showToast(`⚡ Added ₹${amt} sandbox credit to test seeder plans!`, 'success');
  };

  // --- Withdraw Flow ---
  window.openWithdrawModal = function () {
    const modal = document.getElementById('modal-withdraw');
    if (!modal) return;
    modal.classList.add('active');
    updateWithdrawSummary();
  };

  window.updateWithdrawSummary = function () {
    const input = document.getElementById('withdraw-amount-input');
    const amt = parseFloat(input.value) || 0;
    const fee = amt * 0.05;
    const net = Math.max(0, amt - fee);

    const feeEl = document.getElementById('withdraw-fee-text');
    const netEl = document.getElementById('withdraw-net-text');
    if (feeEl) feeEl.textContent = `₹${fee.toFixed(2)} (5%)`;
    if (netEl) netEl.textContent = `₹${net.toFixed(2)}`;
  };

  window.setWithdrawAmount = function (val) {
    const input = document.getElementById('withdraw-amount-input');
    if (val === 'ALL') {
      input.value = Math.floor(state.user.walletBalance);
    } else {
      input.value = val;
    }
    updateWithdrawSummary();
  };

  window.submitWithdrawal = function () {
    const amountInput = document.getElementById('withdraw-amount-input');
    const passInput = document.getElementById('withdraw-pass-input');
    const methodEl = document.querySelector('input[name="withdraw_method"]:checked');

    const amount = parseFloat(amountInput.value);
    const pass = passInput.value.trim();
    const method = methodEl ? methodEl.value : 'bank';

    if (!amount || amount < 200) {
      showToast('Minimum withdrawal amount is ₹200', 'error');
      return;
    }

    if (amount > state.user.walletBalance) {
      showToast('Insufficient wallet balance!', 'error');
      return;
    }

    if (pass !== state.user.withdrawalPassword) {
      showToast('Incorrect withdrawal password! (Default: 123456)', 'error');
      return;
    }

    const fee = amount * 0.05;
    const finalAmount = amount - fee;

    state.user.walletBalance -= amount;
    state.user.totalWithdrawn += amount;

    const accountDesc = method === 'bank'
      ? `${state.user.boundBankName} (${state.user.boundAccountNo})`
      : state.user.boundUpiId;

    const record = {
      id: 'WD' + Math.floor(100000 + Math.random() * 900000),
      orderNo: 'WD' + Math.floor(100000 + Math.random() * 900000),
      amount: amount,
      fee: fee,
      finalAmount: finalAmount,
      payoutMethod: method === 'bank' ? 'Bank Account' : 'UPI Transfer',
      account: accountDesc,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Success'
    };

    state.withdrawals.unshift(record);
    saveState();

    amountInput.value = '';
    passInput.value = '';
    closeModal('modal-withdraw');
    showToast(`✅ Withdrawal of ₹${amount} submitted! Arriving in 10-30 mins.`, 'success');
  };

  // --- Bank & UPI Settings ---
  window.saveBankDetails = function () {
    const bank = document.getElementById('input-bank-name').value.trim();
    const ac = document.getElementById('input-bank-ac').value.trim();
    const ifsc = document.getElementById('input-bank-ifsc').value.trim();
    const holder = document.getElementById('input-bank-holder').value.trim();
    const upi = document.getElementById('input-bank-upi').value.trim();

    if (bank) state.user.boundBankName = bank;
    if (ac) state.user.boundAccountNo = ac;
    if (ifsc) state.user.boundIfsc = ifsc;
    if (holder) state.user.boundHolderName = holder;
    if (upi) state.user.boundUpiId = upi;

    saveState();
    closeModal('modal-bind-bank');
    showToast('Bank & UPI details successfully updated!', 'success');
  };

  window.saveWithdrawPassword = function () {
    const oldPass = document.getElementById('input-old-wpass').value.trim();
    const newPass = document.getElementById('input-new-wpass').value.trim();

    if (oldPass !== state.user.withdrawalPassword) {
      showToast('Current withdrawal password is wrong (Default: 123456)', 'error');
      return;
    }
    if (newPass.length < 6) {
      showToast('New password must be at least 6 digits', 'error');
      return;
    }

    state.user.withdrawalPassword = newPass;
    saveState();
    closeModal('modal-change-wpass');
    showToast('Withdrawal password updated successfully!', 'success');
  };

  // --- Referral & Sharing ---
  window.copyInviteCode = function () {
    navigator.clipboard.writeText(state.user.inviteCode).then(() => {
      showToast(`Copied invitation code: ${state.user.inviteCode}`, 'success');
    });
  };

  window.copyShareLink = function () {
    const link = `${window.location.origin}/?ref=${state.user.inviteCode}`;
    navigator.clipboard.writeText(link).then(() => {
      showToast('Copied referral link to clipboard!', 'success');
    });
  };

  window.shareWhatsApp = function () {
    const link = `${window.location.origin}/?ref=${state.user.inviteCode}`;
    const msg = encodeURIComponent(
      `🚜 *Galaxy Manual Seeder (GL-12)*\n` +
      `Instant ₹300 & ₹500 Starter Plans with Daily Income & Instant UPI Withdrawals!\n\n` +
      `👉 Join here: ${link}\n` +
      `🔑 Invitation Code: ${state.user.inviteCode}`
    );
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  window.shareTelegram = function () {
    const link = `${window.location.origin}/?ref=${state.user.inviteCode}`;
    const msg = encodeURIComponent(
      `Galaxy Manual Seeder GL-12 Agricultural Equipment Platform!\nDaily income and instant UPI withdrawals.`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${msg}`, '_blank');
  };

  window.openTelegramChannel = function () {
    showToast('Redirecting to official Galaxy Seeder channel...', 'info');
    window.open('https://t.me/galaxy_seeder_official', '_blank');
  };

  // --- Customer Support Chat Simulator ---
  window.sendChatMessage = function () {
    const input = document.getElementById('chat-input-field');
    const msg = input.value.trim();
    if (!msg) return;

    const chatWindow = document.getElementById('support-chat-window');
    
    // Append user message
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-bubble user';
    userDiv.textContent = msg;
    chatWindow.appendChild(userDiv);
    input.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Simulate smart bot response
    setTimeout(() => {
      const botDiv = document.createElement('div');
      botDiv.className = 'chat-bubble bot';
      const lower = msg.toLowerCase();

      if (lower.includes('recharge') || lower.includes('payment') || lower.includes('upi')) {
        botDiv.textContent = 'To recharge, copy the assigned Merchant UPI ID or scan the QR, pay using PhonePe/GPay, then paste your 12-digit UTR in the recharge modal for instant credit.';
      } else if (lower.includes('withdraw') || lower.includes('bank') || lower.includes('money')) {
        botDiv.textContent = 'Withdrawals are processed 24/7. Minimum withdrawal is ₹200 with a 5% tax/fee. Ensure your bank account or UPI ID is correctly bound.';
      } else if (lower.includes('300') || lower.includes('500') || lower.includes('plan')) {
        botDiv.textContent = 'The ₹300 Starter Plan gives ₹75 daily profit for 120 days. The ₹500 Plan gives ₹125 daily profit. Other higher plans are currently locked by administration.';
      } else {
        botDiv.textContent = 'Namaste! An official Galaxy Seeder support specialist is available. For urgent assistance, you can also join our official Telegram channel.';
      }
      chatWindow.appendChild(botDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 600);
  };

  // --- App initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    renderAll();

    // Event listener for recharge input change
    const recInput = document.getElementById('recharge-amount-input');
    if (recInput) {
      recInput.addEventListener('input', updateRechargeQr);
    }

    const wdInput = document.getElementById('withdraw-amount-input');
    if (wdInput) {
      wdInput.addEventListener('input', updateWithdrawSummary);
    }
  });

})();
