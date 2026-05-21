// ════════════════════════════════════════════════════
// HOTSPOT DATA
// ════════════════════════════════════════════════════
const HOTSPOTS = [
  {
    id: 'sticky',
    type: 'risk',
    label: 'Password Sticky Note',
    badge: 'CRITICAL RISK',
    badgeClass: 'badge-risk',
    tooltip: 'Plaintext passwords written on sticky note',
    summary: 'Three production system passwords written in plaintext on a sticky note affixed to the monitor bezel — visible to anyone passing the workstation.',
    why: 'Plaintext credential exposure is one of the most common initial access vectors. An attacker, cleaning staff, visitor, or social engineer photographing this note gains immediate access to VPN, database, and email systems. This violates NIST SP 800-63B, ISO/IEC 27001 Annex A.9.4.3, and most enterprise AUPs.',
    remediation: 'Use an approved enterprise password manager (e.g., 1Password, CyberArk). Never write passwords on paper. Immediately rotate all exposed credentials. Enable MFA on all exposed accounts.',
    points: 10
  },
  {
    id: 'phishing',
    type: 'risk',
    label: 'Phishing Email Open',
    badge: 'HIGH RISK',
    badgeClass: 'badge-risk',
    tooltip: 'Spoofed sender domain on urgent email',
    summary: 'An email from "IT-Support@micros0ft-corp.net" (note: "0" substituting "o") is open on screen demanding immediate password reset. The email contains a deceptive call-to-action button linking to a lookalike portal.',
    why: 'This is a typosquatting/homoglyph phishing attack. The domain "micros0ft-corp.net" impersonates Microsoft. Opening and interacting with such emails is a leading cause of corporate credential theft, ransomware delivery, and data exfiltration. Urgency language is a classic social engineering tactic.',
    remediation: 'Report via the phishing button in Outlook. Never click links in suspicious emails — navigate directly to known portals. Enable DMARC/DKIM email authentication at the organizational level. Conduct regular phishing simulation training.',
    points: 10
  },
  {
    id: 'terminal',
    type: 'risk',
    label: 'Credentials in Command History',
    badge: 'CRITICAL RISK',
    badgeClass: 'badge-risk',
    tooltip: 'MySQL password visible in bash history',
    summary: 'The bash terminal history shows a MySQL connection command with a plaintext password flag: "-pS3cur3P@ss#2024" — exposing production database credentials to anyone who views this screen or accesses ~/.bash_history.',
    why: 'Credentials passed via CLI flags are stored in shell history files, process lists (ps aux), and system logs. This exposes production database access to any local user, system administrator reviewing logs, or attacker with file system access. The OWASP Top 10 lists this as A07 (Identification and Authentication Failures).',
    remediation: 'Use a credentials file with restrictive permissions (chmod 600) or environment variables for database connections. Clear command history immediately (history -c). Use mysql_config_editor to store credentials encrypted. Rotate the exposed database password immediately.',
    points: 10
  },
  {
    id: 'document',
    type: 'risk',
    label: 'Confidential Document Exposed',
    badge: 'HIGH RISK',
    badgeClass: 'badge-risk',
    tooltip: 'Q3 financial report face-up on unattended desk',
    summary: 'A draft Q3 financial report marked "STRICTLY CONFIDENTIAL" containing material non-public financial data ($84.2M revenue, EBITDA, net income) is left face-up on an unattended, publicly accessible workstation area.',
    why: 'Exposing material non-public information (MNPI) violates SEC Regulation FD, Sarbanes-Oxley, and internal information security policies. This data is a target for insider trading, corporate espionage, and competitive intelligence. A clean desk policy is a foundational physical security control.',
    remediation: 'Lock or shred documents when leaving your desk. Implement and enforce a Clean Desk Policy. Classify documents per your DLP framework. Use document watermarking for sensitive financial data. File or secure confidential documents immediately after use.',
    points: 10
  },
  {
    id: 'usb',
    type: 'risk',
    label: 'Unknown USB Device',
    badge: 'CRITICAL RISK',
    badgeClass: 'badge-risk',
    tooltip: 'Unrecognized red USB device in hub',
    summary: 'An unidentified red USB device is connected to the workstation USB hub. The device has no visible manufacturer markings, asset label, or recognized form factor. The activity LED is blinking rapidly.',
    why: 'Unknown USB devices represent a severe supply chain and physical access risk. A USB Rubber Ducky or O.MG cable can execute keyboard injection attacks in seconds. A malicious USB can also deploy firmware-level malware, establish reverse shells, or exfiltrate data. Notable examples include Stuxnet (USB propagation) and multiple nation-state APT campaigns.',
    remediation: 'Immediately disconnect and quarantine the unknown device. Report to the SOC/IT Security team. Scan the workstation for compromise indicators. Implement USB Device Control policies (e.g., via Microsoft Endpoint Manager or CrowdStrike). Use USB port blockers on public-area workstations.',
    points: 10
  },
  {
    id: 'vpn',
    type: 'risk',
    label: 'VPN Disconnected on Corporate Device',
    badge: 'HIGH RISK',
    badgeClass: 'badge-risk',
    tooltip: 'System tray shows VPN OFF status',
    summary: 'The system tray VPN indicator shows "VPN OFF" in red. The corporate workstation is operating without an encrypted tunnel, exposing all network traffic including potentially sensitive data transmissions.',
    why: 'Without VPN, corporate traffic traverses the network unencrypted, enabling man-in-the-middle attacks, credential interception, and data exfiltration on untrusted or shared networks. Many compliance frameworks (SOC 2, ISO 27001, HIPAA) require encrypted transmission for sensitive data. Remote access without VPN also bypasses perimeter security controls.',
    remediation: 'Reconnect the corporate VPN immediately. Configure Always-On VPN enforcement via MDM (Microsoft Intune, Jamf). Implement split-tunneling policies. Enable network-level monitoring to detect VPN non-compliance. Alert users before sensitive operations if VPN is disconnected.',
    points: 10
  },
  {
    id: 'webcam',
    type: 'distractor',
    label: 'Webcam Covered with Tape',
    badge: 'GOOD PRACTICE',
    badgeClass: 'badge-distractor',
    tooltip: 'Tape over webcam lens — good privacy hygiene',
    summary: 'The webcam has been covered with a piece of tape. This is actually a recommended privacy protection against unauthorized camera activation.',
    why: 'Covering physical cameras is endorsed by security professionals and even FBI Director James Comey. While modern OS permissions exist, firmware-level exploits and zero-days can enable covert surveillance. This is a simple, zero-cost privacy control.',
    remediation: 'No action needed — this is correct security hygiene. Consider using a dedicated webcam privacy slider. For organizational deployments, integrate camera policies into endpoint security baselines.',
    points: -5
  },
  {
    id: 'phone',
    type: 'distractor',
    label: 'Smartphone with Notifications',
    badge: 'FALSE ALARM',
    badgeClass: 'badge-distractor',
    tooltip: 'Personal smartphone with work app notifications',
    summary: 'The smartphone shows standard work application notifications from Slack, Email, and Teams. This is a normal BYOD or company-issued device in a typical enterprise environment.',
    why: 'Smartphone notifications in a work context are standard and expected. While MDM policies govern BYOD security, the presence of a phone with work notifications alone is not a security finding without additional indicators of compromise.',
    remediation: 'No immediate action required. Ensure the device is enrolled in MDM, has a screen lock, and complies with the organizational BYOD policy. Sensitive notifications should be configured to show only on unlocked devices.',
    points: -5
  },
  {
    id: 'mug',
    type: 'distractor',
    label: 'Coffee Mug on Desk',
    badge: 'IRRELEVANT',
    badgeClass: 'badge-distractor',
    tooltip: 'Standard workplace coffee mug',
    summary: 'A standard corporate-branded coffee mug is on the desk. No security concerns identified.',
    why: 'A coffee mug is not a security risk. Flagging irrelevant items wastes investigation time and reduces the signal-to-noise ratio of security findings, leading to alert fatigue.',
    remediation: 'No action required. Focus investigation efforts on genuine security indicators and policy violations.',
    points: -5
  },
  {
    id: 'whiteboard',
    type: 'ambig',
    label: 'Whiteboard with Sensitive Data',
    badge: 'INVESTIGATE',
    badgeClass: 'badge-ambig',
    tooltip: 'Whiteboard shows server IPs and root password',
    summary: 'The whiteboard in the shared workspace area displays: production server names and internal IP addresses (192.168.1.100, 10.0.0.50), a root password "Tr0ub4dor&3!" with a note to change it, and project codenames. This information is visible to anyone entering the office.',
    why: 'Writing credentials and internal network topology on a whiteboard in a shared or visitor-accessible space is a significant information exposure risk. Even without malicious intent, this data enables network reconnaissance and lateral movement if seen by an unauthorized party. Context matters: is this room accessible to visitors or third parties?',
    remediation: 'Never write credentials on whiteboards or in shared spaces. Erase sensitive information before leaving a meeting room. Use a threat model to determine if the whiteboard space is appropriately secured. The root password should be rotated immediately as it may already be compromised.',
    points: 5
  },
  {
    id: 'badge',
    type: 'ambig',
    label: 'Visitor Badge on Desk',
    badge: 'INVESTIGATE',
    badgeClass: 'badge-ambig',
    tooltip: 'Third-party vendor visitor badge — unescorted access notation',
    summary: 'A visitor badge for "Alex T." from "TechVendor Corp" is on the desk, marked as a 3rd party vendor. The badge reads "UNESCORTED ACCESS." The vendor does not appear to be present with an escort.',
    why: 'Unescorted visitor access is a physical security risk. Vendors and contractors should be escorted in sensitive areas where they could access workstations, server rooms, or confidential materials. An unescorted third party near an unlocked workstation with sensitive documents could enable physical access attacks, shoulder surfing, or data theft.',
    remediation: 'Verify visitor escort policy compliance. Ensure visitors are always accompanied in secure areas. Implement visitor management systems with real-time tracking. Review badge issuance procedures. If the visitor is unaccounted for, escalate to physical security.',
    points: 5
  }
];

// ════════════════════════════════════════════════════
// GAME STATE
// ════════════════════════════════════════════════════
const gameState = {
  clicked: new Set(),
  findings: 0,
  fp: 0,
  ambig: 0,
  score: 0,
  startTime: null,
  elapsed: 0,
  timerInterval: null,
  panelCollapsed: true
};

// ════════════════════════════════════════════════════
// TIMER
// ════════════════════════════════════════════════════
function startTimer() {
  gameState.startTime = Date.now();
  gameState.timerInterval = setInterval(() => {
    gameState.elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    const mm = String(Math.floor(gameState.elapsed / 60)).padStart(2, '0');
    const ss = String(gameState.elapsed % 60).padStart(2, '0');
    const tv = `${mm}:${ss}`;
    document.getElementById('timer-val').textContent = tv;
    document.getElementById('mob-timer').textContent = tv;
  }, 500);
}

function stopTimer() {
  clearInterval(gameState.timerInterval);
}

// ════════════════════════════════════════════════════
// GAME START
// ════════════════════════════════════════════════════
function startGame() {
  document.getElementById('intro-screen').style.display = 'none';
  document.getElementById('header').classList.remove('hidden');
  document.getElementById('game-layout').classList.remove('hidden');
  startTimer();
}

// ════════════════════════════════════════════════════
// HOTSPOT CLICK HANDLER
// ════════════════════════════════════════════════════
function handleClick(id) {
  if (gameState.clicked.has(id)) return; // already clicked
  gameState.clicked.add(id);
  updateLogCount(); 
  
  const hs = HOTSPOTS.find(h => h.id === id);
  if (!hs) return;

  // Update game state
  gameState.score = Math.max(0, gameState.score + hs.points);
  if (hs.type === 'risk') gameState.findings++;
  if (hs.type === 'distractor') gameState.fp++;
  if (hs.type === 'ambig') gameState.ambig++;

  // Update header stats
  document.getElementById('score-val').textContent = gameState.score;
  document.getElementById('fp-val').textContent = gameState.fp;
  document.getElementById('findings-val').textContent = gameState.findings;
  document.getElementById('mob-findings').textContent = gameState.findings;
  document.getElementById('mob-fp').textContent = gameState.fp;

  // Mark hotspot as clicked
  const el = document.getElementById(`hs-${id}`);
  el.classList.add('clicked');

  // Burst animation
  showBurst(el, hs.type);

  // Add finding card to log
  addFindingCard(hs);

  // Show toast
  showToast(hs);
}

// ════════════════════════════════════════════════════
// BURST ANIMATION
// ════════════════════════════════════════════════════
function showBurst(el, type) {
  const colors = { risk: '#ff4d6a', distractor: '#9b6dff', ambig: '#ffb830' };
  const burst = document.createElement('div');
  burst.className = 'burst';
  const rect = el.getBoundingClientRect();
  const containerRect = el.closest('#scene-container').getBoundingClientRect();
  burst.style.cssText = `
    left: ${rect.left - containerRect.left + rect.width/2}px;
    top: ${rect.top - containerRect.top + rect.height/2}px;
    width: 60px; height: 60px;
    background: ${colors[type]};
    opacity: 0.6;
  `;
  el.closest('#scene-container').appendChild(burst);
  setTimeout(() => burst.remove(), 600);
}

// ════════════════════════════════════════════════════
// FINDING CARD
// ════════════════════════════════════════════════════
function buildCardHTML(hs) {
  const ptSign = hs.points > 0 ? '+' : '';
  const ptClass = hs.points > 0 ? (hs.type === 'ambig' ? 'pts-ambig' : 'pts-positive') : 'pts-negative';
  return `
    <div class="finding-card" id="card-${hs.id}">
      <div class="card-header" onclick="toggleCard('${hs.id}')">
        <span class="card-badge ${hs.badgeClass}">${hs.badge}</span>
        <span class="card-label">${hs.label}</span>
        <span class="card-pts ${ptClass}">${ptSign}${hs.points}</span>
        <span class="card-chevron">›</span>
      </div>
      <div class="card-body">
        <div class="card-section">
          <div class="card-section-label">Observation</div>
          <p>${hs.summary}</p>
        </div>
        <div class="card-section">
          <div class="card-section-label">Why It Matters</div>
          <p>${hs.why}</p>
        </div>
        <div class="card-section remediation">
          <div class="card-section-label">Recommended Action</div>
          <p>${hs.remediation}</p>
        </div>
      </div>
    </div>
  `;
}

function addFindingCard(hs) {
  const cardHTML = buildCardHTML(hs);

  // Remove empty state
  document.getElementById('panel-empty').style.display = 'none';
  document.getElementById('scene-caption').style.display = 'none';

  // Add to desktop panel
  const pc = document.getElementById('panel-content');
  pc.insertAdjacentHTML('beforeend', cardHTML);

  // Open the new card
  setTimeout(() => toggleCard(hs.id), 100);

  // Add to mobile sheet too
  const sheetContent = document.getElementById('sheet-content');
  sheetContent.querySelector('.panel-empty') && (sheetContent.querySelector('.panel-empty').style.display = 'none');
  const mobileCard = document.createElement('div');
  mobileCard.innerHTML = cardHTML;
  // Give mobile card different ID to avoid conflicts
  const mobileCardEl = mobileCard.firstElementChild;
  mobileCardEl.id = `mob-card-${hs.id}`;
  mobileCardEl.querySelector('.card-header').setAttribute('onclick', `toggleMobCard('${hs.id}')`);
  sheetContent.appendChild(mobileCardEl);
}

function toggleCard(id) {
  const card = document.getElementById(`card-${id}`);
  if (card) card.classList.toggle('open');
}

function toggleMobCard(id) {
  const card = document.getElementById(`mob-card-${id}`);
  if (card) card.classList.toggle('open');
}

// ════════════════════════════════════════════════════
// TOAST
// ════════════════════════════════════════════════════
function showToast(hs) {
  const typeLabel = {
    risk: '🔴 Security Risk Identified',
    distractor: '🟣 False Positive — Penalty Applied',
    ambig: '🟡 Ambiguous Finding Flagged'
  };
  const toast = document.createElement('div');
  toast.className = `toast ${hs.type}`;
  toast.innerHTML = `
    <div class="toast-title">${typeLabel[hs.type]}</div>
    <div class="toast-sub">${hs.label} · ${hs.points > 0 ? '+' : ''}${hs.points} pts</div>
  `;
  const container = document.getElementById('toast-container');
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ════════════════════════════════════════════════════
// PANEL TOGGLE
// ════════════════════════════════════════════════════
function togglePanel() {
  const panel = document.getElementById('log-panel');
  const btn = panel.querySelector('.panel-toggle');
  gameState.panelCollapsed = !gameState.panelCollapsed;
  panel.classList.toggle('collapsed', gameState.panelCollapsed);
  btn.textContent = gameState.panelCollapsed ? '❮' : '❯';  // < : >
}
function updateLogCount() {
  const count = gameState.clicked.size;
  const countEl = document.getElementById('log-count');
  if (countEl) {
    countEl.textContent = count;
  }
}

// ════════════════════════════════════════════════════
// MOBILE SHEET
// ════════════════════════════════════════════════════
function openMobileSheet() {
  document.getElementById('mobile-sheet-overlay').style.display = 'block';
  setTimeout(() => {
    document.getElementById('mobile-sheet-overlay').classList.add('visible');
    document.getElementById('mobile-sheet').classList.add('open');
  }, 10);
}

function closeMobileSheet() {
  document.getElementById('mobile-sheet-overlay').classList.remove('visible');
  document.getElementById('mobile-sheet').classList.remove('open');
  setTimeout(() => {
    document.getElementById('mobile-sheet-overlay').style.display = 'none';
  }, 350);
}

// ════════════════════════════════════════════════════
// SCORE CALCULATION
// ════════════════════════════════════════════════════
function calculateFinalScore() {
  const riskItems = HOTSPOTS.filter(h => h.type === 'risk');
  const foundRisks = riskItems.filter(h => gameState.clicked.has(h.id)).length;
  const totalRisks = riskItems.length;

  let score = Math.round((foundRisks / totalRisks) * 60);

  // Ambiguous bonus
  if (gameState.ambig >= 1) score += 15;

  // False positive bonus
  if (gameState.fp === 0) score += 15;
  else if (gameState.fp === 1) score += 8;

  // Speed bonus
  if (gameState.elapsed <= 120) score += 10;
  else if (gameState.elapsed <= 300) score += 5;

  return Math.min(100, Math.max(0, score));
}

function getMaturityRating(score) {
  if (score >= 90) return 'Expert';
  if (score >= 75) return 'Proficient';
  if (score >= 55) return 'Competent';
  if (score >= 35) return 'Developing';
  return 'Uninitiated';
}

function getMaturityColor(score) {
  if (score >= 90) return 'var(--cyan)';
  if (score >= 75) return 'var(--green)';
  if (score >= 55) return 'var(--amber)';
  if (score >= 35) return 'var(--amber)';
  return 'var(--red)';
}

// ════════════════════════════════════════════════════
// SUBMIT REPORT
// ════════════════════════════════════════════════════
function submitReport() {
  stopTimer();
  const finalScore = calculateFinalScore();
  const maturity = getMaturityRating(finalScore);

  // Populate completion screen
  document.getElementById('comp-date').textContent = new Date().toLocaleDateString();
  document.getElementById('comp-title').textContent =
    finalScore >= 75 ? '✅ Assessment Passed' :
    finalScore >= 55 ? '⚠️ Assessment Completed' : '❌ Assessment Failed';

  // Animate score
  setTimeout(() => {
    document.getElementById('comp-score').textContent = finalScore;
    const circumference = 408;
    const offset = circumference - (finalScore / 100) * circumference;
    document.getElementById('ring-fill').style.strokeDashoffset = offset;
    document.getElementById('ring-fill').style.stroke = getMaturityColor(finalScore);
  }, 300);

  // Metrics
  const foundRisks = HOTSPOTS.filter(h => h.type === 'risk' && gameState.clicked.has(h.id)).length;
  document.getElementById('comp-findings').textContent = `${foundRisks}/5`;
  document.getElementById('comp-fp').textContent = gameState.fp;
  const mm = String(Math.floor(gameState.elapsed / 60)).padStart(2,'0');
  const ss = String(gameState.elapsed % 60).padStart(2,'0');
  document.getElementById('comp-time').textContent = `${mm}:${ss}`;
  document.getElementById('comp-ambig').textContent = `${gameState.ambig}/2`;

  // Maturity bar
  document.getElementById('maturity-rating').textContent = maturity;
  document.getElementById('maturity-rating').style.color = getMaturityColor(finalScore);
  setTimeout(() => {
    document.getElementById('maturity-bar').style.width = `${finalScore}%`;
  }, 400);

  // Breakdown table
  const tbody = document.getElementById('breakdown-tbody');
  tbody.innerHTML = '';

  const allItems = [...HOTSPOTS];
  allItems.forEach(hs => {
    const wasClicked = gameState.clicked.has(hs.id);
    let status, statusClass, points;

    if (hs.type === 'risk') {
      status = wasClicked ? 'IDENTIFIED' : 'MISSED';
      statusClass = wasClicked ? 'status-identified' : 'status-missed';
      points = wasClicked ? '+10' : '0';
    } else if (hs.type === 'distractor') {
      status = wasClicked ? 'FALSE POSITIVE' : 'CORRECTLY IGNORED';
      statusClass = wasClicked ? 'status-fp' : 'status-ignored';
      points = wasClicked ? '−5' : '+0';
    } else {
      status = wasClicked ? 'INVESTIGATED' : 'NOT REVIEWED';
      statusClass = wasClicked ? 'status-investigated' : 'status-not-investigated';
      points = wasClicked ? '+5' : '0';
    }

    const severityMap = { risk: 'HIGH', distractor: 'N/A', ambig: 'MED' };
    const severityColorMap = { risk: 'var(--red)', distractor: 'var(--text-3)', ambig: 'var(--amber)' };

    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="color:var(--text-1);font-weight:500">${hs.label}</td>
      <td style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;font-size:0.7rem;color:var(--text-2);text-transform:uppercase">${hs.type}</td>
      <td style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;font-size:0.72rem;font-weight:600;color:${severityColorMap[hs.type]}">${severityMap[hs.type]}</td>
      <td><span class="status-badge ${statusClass}">${status}</span></td>
      <td style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;font-size:0.75rem;font-weight:600;color:${points.startsWith('+') && points !== '+0' ? 'var(--green)' : points === '+0' ? 'var(--text-3)' : 'var(--red)'}">${points}</td>
    `;
    tbody.appendChild(row);
  });

  // Show completion
  document.getElementById('completion-screen').style.display = 'block';
}

// ════════════════════════════════════════════════════
// RETAKE
// ════════════════════════════════════════════════════
function retakeAssessment() {
  // Reset state
  gameState.clicked.clear();
  gameState.findings = 0;
  gameState.fp = 0;
  gameState.ambig = 0;
  gameState.score = 0;
  gameState.elapsed = 0;
  gameState.panelCollapsed = true;

  // Reset UI stats
  document.getElementById('score-val').textContent = '0';
  document.getElementById('fp-val').textContent = '0';
  document.getElementById('findings-val').textContent = '0';
  document.getElementById('mob-findings').textContent = '0';
  document.getElementById('mob-fp').textContent = '0';
  document.getElementById('timer-val').textContent = '00:00';
  document.getElementById('mob-timer').textContent = '00:00';

  // Reset caption
  document.getElementById('scene-caption').style.display = 'block';
  
  // Reset hotspots
  HOTSPOTS.forEach(hs => {
    const el = document.getElementById(`hs-${hs.id}`);
    if (el) el.classList.remove('clicked');
  });

  // Reset panel
  const pc = document.getElementById('panel-content');
  pc.innerHTML = `
    <div class="panel-empty" id="panel-empty">
      <span class="icon">🔍</span>
      Click on items in the scene to investigate them.<br><br>
      Findings will appear here with detailed analysis.
    </div>
  `;
  document.getElementById('sheet-content').innerHTML = `
    <div class="panel-empty">
      <span class="icon">🔍</span>
      No findings yet. Tap items in the scene.
    </div>
  `;

  // Restore panel if collapsed
  document.getElementById('log-panel').classList.add('collapsed');
  document.querySelector('.panel-toggle').textContent = '›';

  // Reset ring
  document.getElementById('ring-fill').style.strokeDashoffset = '408';
  document.getElementById('maturity-bar').style.width = '0%';

  // Hide completion
  document.getElementById('completion-screen').style.display = 'none';

  // Restart timer
  startTimer();
  
  // Reset logCount
  updateLogCount();
}
