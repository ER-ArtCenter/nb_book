// 雙和急診 Nerve Block 診斷資料
// 資料來源：SHHER-ART Center Nerve Block Handbook (PDF p.8-12)

const REGIONS = ['上肢', '胸', '腹', '背', '下肢'];

const DIAGNOSES = [
  // ============ 上肢 ============
  {
    id: 'finger-injury',
    region: '上肢',
    nameZh: '手指撕裂傷／脫臼／骨折',
    nameEn: 'Finger laceration / dislocation / fracture',
    keywords: ['手指', 'finger', '指', 'digital'],
    blocks: [
      {
        name: 'Digital block (traditional 或 palmar approach)',
        volume: '3 mL',
        note: '簡單局部阻斷，急診常用',
        nysora: 'https://www.nysora.com/techniques/digital-block/'
      }
    ]
  },
  {
    id: 'metacarpal-carpal-fx',
    region: '上肢',
    nameZh: '掌骨／腕骨骨折',
    nameEn: 'Metacarpal / carpal bone fracture',
    keywords: ['掌骨', '腕骨', 'metacarpal', 'carpal', '手腕'],
    blocks: [
      {
        name: 'Forearm median nerve + Forearm ulnar nerve + Above-elbow radial nerve',
        volume: '各 5 mL',
        note: '三條神經皆需阻斷，方可覆蓋手部',
        nysora: 'https://www.nysora.com/topics/regional-anesthesia-for-specific-surgical-procedures/upper-extremity-regional-anesthesia-for-specific-surgical-procedures/anesthesia-and-analgesia-for-hand-procedures/ultrasound-guided-blocks-elbow/'
      }
    ]
  },
  {
    id: 'distal-radial-fx',
    region: '上肢',
    nameZh: '橈骨遠端／骨幹骨折',
    nameEn: 'Distal / shaft radial fracture',
    keywords: ['橈骨', 'radial', '遠端', 'distal', 'shaft', 'colles'],
    blocks: [
      {
        name: 'Above-elbow radial nerve (+/- forearm median nerve)',
        volume: '各 5 mL',
        note: '橈神經為主，必要時加 median nerve',
        nysora: 'https://www.nysora.com/topics/regional-anesthesia-for-specific-surgical-procedures/upper-extremity-regional-anesthesia-for-specific-surgical-procedures/anesthesia-and-analgesia-for-hand-procedures/ultrasound-guided-blocks-elbow/'
      }
    ]
  },
  {
    id: 'elbow-fx-dislocation',
    region: '上肢',
    nameZh: '肘關節骨折／脫臼（或橈尺骨多根骨折）',
    nameEn: 'Elbow fracture / dislocation; radial+ulnar multi-bone fracture',
    keywords: ['肘', 'elbow', '橈尺骨', '前臂'],
    blocks: [
      {
        name: 'Brachial plexus — Supraclavicular',
        volume: '10 mL',
        note: '鎖骨上路徑，整支前臂麻醉',
        nysora: 'https://www.nysora.com/tag/brachial-plexus-block/'
      },
      {
        name: 'Brachial plexus — Costoclavicular',
        volume: '10 mL',
        note: '鎖骨下路徑，避開肺尖',
        nysora: 'https://www.nysora.com/education-news/tips-for-a-costoclavicular-brachial-plexus-block/'
      }
    ]
  },
  {
    id: 'humeral-shaft-fx',
    region: '上肢',
    nameZh: '肱骨骨幹骨折',
    nameEn: 'Humeral shaft fracture',
    keywords: ['肱骨', 'humerus', 'humeral', '骨幹'],
    warning: '⚠️ 此部位有很高的 radial nerve injury 可能性，不建議施行 nerve block（會干擾神經學評估）',
    blocks: []
  },
  {
    id: 'proximal-humeral-fx',
    region: '上肢',
    nameZh: '肱骨近端骨折',
    nameEn: 'Proximal humeral fracture',
    keywords: ['肱骨近端', 'proximal humerus', '肩'],
    blocks: [
      {
        name: 'Brachial plexus — Interscalene / Supraclavicular / Costoclavicular',
        volume: '10 mL',
        note: '三種入路皆可，依操作熟練度選擇',
        nysora: 'https://www.nysora.com/tag/brachial-plexus-block/'
      }
    ]
  },
  {
    id: 'shoulder-dislocation',
    region: '上肢',
    nameZh: '肩關節脫臼',
    nameEn: 'Shoulder dislocation',
    keywords: ['肩', 'shoulder', 'dislocation', '脫臼'],
    blocks: [
      {
        name: 'Brachial plexus — Interscalene / Supraclavicular / Costoclavicular',
        volume: '10 mL',
        note: '完整麻醉，但會影響肩部運動',
        nysora: 'https://www.nysora.com/tag/brachial-plexus-block/'
      },
      {
        name: 'Axillary nerve + Suprascapular nerve block (Motor sparing)',
        volume: '10 + 10 mL',
        note: '保留肩部運動功能，適合復位後觀察',
        nysora: 'https://www.nysora.com/education-news/shoulder-block-axillary-nerve-block/'
      }
    ]
  },

  // ============ 胸 ============
  {
    id: 'clavicle-fx',
    region: '胸',
    nameZh: '鎖骨骨折',
    nameEn: 'Clavicle fracture',
    keywords: ['鎖骨', 'clavicle', '肩'],
    blocks: [
      {
        name: 'Clavipectoral fascial plane block',
        volume: '15 mL × 2（斷端前後）',
        note: '時間不夠或想減少入針處時，單打此 block 效果就不錯',
        nysora: 'https://pocusacademy.com/2024/02/29/how-to-perform-an-ultrasound-guided-clavipectoral-block-acep-now/'
      },
      {
        name: 'Cervical plexus block',
        volume: '5–10 mL',
        note: '打太多會 hoarsiness（聲音沙啞）',
        nysora: 'https://www.nysora.com/techniques/head-and-neck-blocks/cervical/ultrasound-guided-cervical-plexus-block/'
      },
      {
        name: 'Selective supraclavicular nerve（含 surgical dermatome）',
        volume: '5 mL',
        note: '打太多會 hoarsiness',
        nysora: 'https://pocusacademy.com/2024/10/23/supraclavicular-nerves-selective-block-nysora/'
      }
    ],
    tip: '想要完整阻斷：Clavipectoral fascial plane block + cervical plexus block 或 selective supraclavicular nerve；時間不夠時，單打 Clavipectoral fascial plane block 即可。'
  },
  {
    id: 'upper-chest-procedure',
    region: '胸',
    nameZh: '上胸壁處置',
    nameEn: 'Upper chest wall procedure',
    keywords: ['胸壁', 'chest wall', 'pec'],
    blocks: [
      {
        name: 'PEC I / PEC II block',
        volume: '20 mL',
        note: '適合胸壁淺層操作（如胸管置入、植入物）',
        nysora: 'https://www.nysora.com/topics/regional-anesthesia-for-specific-surgical-procedures/thorax/pectoralis-serratus-plane-blocks/#toc_THORACIC-WALL-NERVE-BLOCKS'
      }
    ]
  },
  {
    id: 'anterior-ribs-fx',
    region: '胸',
    nameZh: '前側肋骨骨折',
    nameEn: 'Anterior ribs fracture',
    keywords: ['肋骨', 'rib', '前胸', 'anterior'],
    blocks: [
      {
        name: 'Serratus anterior plane block (SAPB)',
        volume: '20–40 mL',
        note: '範圍涵蓋 T2-T9 側胸壁',
        nysora: 'https://www.nysora.com/topics/regional-anesthesia-for-specific-surgical-procedures/thorax/pectoralis-serratus-plane-blocks/#toc_THORACIC-WALL-NERVE-BLOCKS'
      }
    ]
  },
  {
    id: 'posterior-ribs-fx',
    region: '胸',
    nameZh: '後側肋骨骨折',
    nameEn: 'Posterior ribs fracture',
    keywords: ['肋骨', 'rib', '後胸', 'posterior'],
    blocks: [
      {
        name: 'Erector spinae plane block (ESPB)（多根肋骨）',
        volume: '25 mL',
        note: '止痛範圍大約注射節數上下 1.5–2 節，Volume 越大節數越多',
        nysora: 'https://www.nysora.com/erector-spinae-plane-block/'
      },
      {
        name: 'Intercostal nerve block（少根肋骨）',
        volume: '每節 5 mL',
        note: '單根骨折最佳，注意氣胸風險',
        nysora: 'https://www.nysora.com/topics/regional-anesthesia-for-specific-surgical-procedures/thorax/intercostal-nerve-block/'
      }
    ]
  },
  {
    id: 'sternum-fx',
    region: '胸',
    nameZh: '胸骨骨折',
    nameEn: 'Sternum fracture',
    keywords: ['胸骨', 'sternum'],
    blocks: [
      {
        name: 'Parasternal PIFB (Pecto-intercostal fascial block)',
        volume: '每側 20 mL',
        note: '安全、頭尾 spread 較差；適合橫向骨折、不需大範圍阻斷',
        nysora: 'https://pocusacademy.com/2025/03/25/parasternal-nerve-block-for-sternal-fracture/'
      },
      {
        name: 'Parasternal TTPB (Transversus thoracic plane block)',
        volume: '每側 20 mL',
        note: '靠近肋膜有氣胸風險；頭尾 spread 好；適合胸骨切開術後傷口',
        nysora: 'https://pocusacademy.com/2025/03/25/parasternal-nerve-block-for-sternal-fracture/'
      }
    ]
  },

  // ============ 腹 ============
  {
    id: 'umbilical',
    region: '腹',
    nameZh: '臍部膿瘍／臍疝氣復位',
    nameEn: 'Umbilical abscess / hernia reduction',
    keywords: ['臍', 'umbilical', '肚臍', '疝氣'],
    blocks: [
      {
        name: 'Rectus sheath block',
        volume: '每側 20 mL',
        note: '阻斷腹中線兩側',
        nysora: 'https://www.nysora.com/education-news/tips-for-a-rectus-sheath-block-2/'
      },
      {
        name: 'Anterior / Subcostal Transversus abdominis plane (TAP) block',
        volume: '25 mL',
        note: '較廣泛覆蓋腹壁',
        nysora: 'https://www.nysora.com/techniques/truncal-and-cutaneous-blocks/truncal-and-cutaneous-blocks/'
      }
    ]
  },
  {
    id: 'inguinal-hernia',
    region: '腹',
    nameZh: '腹股溝疝氣復位',
    nameEn: 'Inguinal hernia reduction',
    keywords: ['腹股溝', 'inguinal', '疝氣', 'hernia'],
    blocks: [
      {
        name: 'Ilioinguinal & iliohypogastric nerves block (II & IH block)',
        volume: '10 mL',
        note: '針對腹股溝區皮神經',
        nysora: 'https://www.nysora.com/techniques/truncal-and-cutaneous-blocks/truncal-and-cutaneous-blocks/'
      }
    ]
  },
  {
    id: 'abdominal-carbuncle',
    region: '腹',
    nameZh: '腹壁癰／膿瘍',
    nameEn: 'Abdominal wall carbuncle',
    keywords: ['腹壁', 'abdominal', 'carbuncle', '膿瘍'],
    blocks: [
      {
        name: 'Transversus abdominis plane (TAP) block',
        volume: '25 mL',
        note: '腹壁切開引流時止痛',
        nysora: 'https://www.nysora.com/techniques/truncal-and-cutaneous-blocks/truncal-and-cutaneous-blocks/'
      }
    ]
  },

  // ============ 背 ============
  {
    id: 'compression-fx',
    region: '背',
    nameZh: '脊椎壓迫性骨折',
    nameEn: 'Compression fracture',
    keywords: ['壓迫性', 'compression', '脊椎', 'vertebra'],
    blocks: [
      {
        name: 'Erector spinae plane block (ESPB)',
        volume: '每側 25 mL（左右都要打）',
        note: '針對骨折節段施打',
        nysora: 'https://www.nysora.com/erector-spinae-plane-block/'
      }
    ]
  },
  {
    id: 'postherpetic-neuralgia',
    region: '背',
    nameZh: '帶狀皰疹後神經痛',
    nameEn: 'Postherpetic neuralgia',
    keywords: ['帶狀皰疹', 'herpes', '神經痛', 'neuralgia', '皮蛇'],
    blocks: [
      {
        name: 'Erector spinae plane block (ESPB)',
        volume: '每側 25 mL（左右都要打）',
        note: '依疼痛皮節選擇注射節段',
        nysora: 'https://www.nysora.com/erector-spinae-plane-block/'
      }
    ]
  },
  {
    id: 'lower-back-pain',
    region: '背',
    nameZh: '下背痛 / 坐骨神經痛 / 下腰椎 (L4/5) 骨折',
    nameEn: 'Lower back pain / Sciatica / Lower lumbar (L4/5) fracture',
    keywords: ['下背', '腰', 'low back', 'sciatica', '坐骨', '腰椎', 'lumbar'],
    blocks: [
      {
        name: 'Caudal block',
        volume: '25 mL',
        note: '濃度建議 Bupivacaine < 0.25%、Ropivacaine < 0.2%，避免過麻和下肢無力導致無法回家',
        nysora: 'https://www.nysora.com/pain-management/ultrasound-guided-caudal-epidural-injections/'
      }
    ]
  },

  // ============ 下肢 ============
  {
    id: 'calcaneus-fx',
    region: '下肢',
    nameZh: '跟骨骨折',
    nameEn: 'Calcaneus fracture',
    keywords: ['跟骨', 'calcaneus', '腳跟'],
    blocks: [
      {
        name: 'Tibial nerve',
        volume: '5 mL',
        note: '腳跟感覺主要由 tibial nerve 支配',
        nysora: 'https://www.nysora.com/techniques/ultrasound-guided-ankle-block/'
      }
    ]
  },
  {
    id: 'tarsal-metatarsal-fx',
    region: '下肢',
    nameZh: '跗骨／蹠骨骨折',
    nameEn: 'Tarsal / metatarsal fracture',
    keywords: ['跗骨', '蹠骨', 'tarsal', 'metatarsal', '足部', '腳掌'],
    blocks: [
      {
        name: 'Tibial nerve + Deep peroneal nerve',
        volume: '各 5 mL',
        note: '足部骨頭只要這兩條就足夠，除非有 skin laceration 需要補其餘 nerve',
        nysora: 'https://www.nysora.com/techniques/ultrasound-guided-ankle-block/'
      },
      {
        name: 'Popliteal sciatic nerve',
        volume: '10 mL',
        note: '一針阻斷整個小腿以下',
        nysora: 'https://www.nysora.com/techniques/lower-extremity/ultrasound-guided-popliteal-sciatic-block/'
      }
    ]
  },
  {
    id: 'ankle-dislocation',
    region: '下肢',
    nameZh: '踝關節脫臼',
    nameEn: 'Ankle dislocation',
    keywords: ['踝', 'ankle', '脫臼'],
    blocks: [
      {
        name: 'Popliteal sciatic nerve',
        volume: '10 mL',
        note: '復位前完整麻醉',
        nysora: 'https://www.nysora.com/techniques/lower-extremity/ultrasound-guided-popliteal-sciatic-block/'
      }
    ]
  },
  {
    id: 'lateral-malleolus-fx',
    region: '下肢',
    nameZh: '外踝骨折',
    nameEn: 'Lateral malleolus fracture',
    keywords: ['外踝', 'lateral malleolus', '腓骨遠端'],
    blocks: [
      {
        name: 'Popliteal sciatic nerve',
        volume: '10 mL',
        note: '內踝 cover 不到',
        nysora: 'https://www.nysora.com/techniques/lower-extremity/ultrasound-guided-popliteal-sciatic-block/'
      }
    ]
  },
  {
    id: 'medial-malleolus-fx',
    region: '下肢',
    nameZh: '內踝骨折',
    nameEn: 'Medial malleolus fracture',
    keywords: ['內踝', 'medial malleolus', '脛骨遠端'],
    blocks: [
      {
        name: 'Popliteal sciatic nerve',
        volume: '10 mL',
        note: '主要止痛來源',
        nysora: 'https://www.nysora.com/techniques/lower-extremity/ultrasound-guided-popliteal-sciatic-block/'
      },
      {
        name: 'Adductor canal saphenous block（可選）',
        volume: '10 mL',
        note: '加強內側皮節覆蓋',
        nysora: 'https://www.nysora.com/techniques/lower-extremity/ultrasound-guided-saphenous-adductor-canal-nerve-block/'
      }
    ]
  },
  {
    id: 'tibial-fibular-shaft-fx',
    region: '下肢',
    nameZh: '脛骨／腓骨骨幹骨折',
    nameEn: 'Tibial / fibular shaft fracture',
    keywords: ['脛骨', '腓骨', 'tibia', 'fibula', '小腿'],
    blocks: [
      {
        name: 'Popliteal sciatic nerve',
        volume: '10 mL',
        note: '小腿主要神經阻斷',
        nysora: 'https://www.nysora.com/techniques/lower-extremity/ultrasound-guided-popliteal-sciatic-block/'
      }
    ]
  },
  {
    id: 'knee-fx',
    region: '下肢',
    nameZh: '脛骨平台／髕骨／股骨遠端／股骨幹／轉子間骨折',
    nameEn: 'Tibial plateau / Patellar / Distal femur / Femur shaft / Intertrochanteric fracture',
    keywords: ['脛骨平台', '髕骨', 'patellar', '股骨', 'femur', 'tibial plateau', '轉子', 'intertrochanteric', '膝', 'knee'],
    blocks: [
      {
        name: 'Femoral nerve block',
        volume: '10 mL',
        note: '經典股神經阻斷',
        nysora: 'https://www.nysora.com/techniques/lower-extremity/ultrasound-guided-femoral-nerve-block/'
      },
      {
        name: 'Adductor canal saphenous block',
        volume: '10 mL',
        note: '保留股四頭肌力，下床較安全',
        nysora: 'https://www.nysora.com/techniques/lower-extremity/ultrasound-guided-saphenous-adductor-canal-nerve-block/'
      }
    ]
  },
  {
    id: 'femoral-neck-fx',
    region: '下肢',
    nameZh: '股骨頸骨折',
    nameEn: 'Femoral neck fracture',
    keywords: ['股骨頸', 'femoral neck', '髖', 'hip'],
    blocks: [
      {
        name: 'PENG block (Pericapsular Nerve Group)',
        volume: '25 mL',
        note: '保留股四頭肌力的髖關節阻斷',
        nysora: 'https://www.nysora.com/education-news/the-hip-block-new-addition-to-nysoras-web-app/'
      },
      {
        name: 'Supra-inguinal Fascia iliaca block',
        volume: '40 mL',
        note: '較廣泛阻斷，但會影響股四頭肌',
        nysora: 'https://www.nysora.com/topics/regional-anesthesia-for-specific-surgical-procedures/lower-extremity-regional-anesthesia-for-specific-surgical-procedures/ultrasound-guided-fascia-iliaca-block/'
      }
    ]
  },
  {
    id: 'superior-pubic-ramus-fx',
    region: '下肢',
    nameZh: '恥骨上枝骨折',
    nameEn: 'Superior pubic ramus fracture',
    keywords: ['恥骨', 'pubic', '骨盆', 'pelvis'],
    blocks: [
      {
        name: 'PENG block',
        volume: '25 mL',
        note: '止痛效果佳',
        nysora: 'https://www.nysora.com/education-news/the-hip-block-new-addition-to-nysoras-web-app/'
      }
    ]
  }
];

// 藥物資料
const ANESTHETICS = [
  {
    name: 'Lidocaine',
    class: '胺類 (Amide)',
    onset: '快（2–5 分）',
    duration: '中等（1–2 小時）',
    proteinBinding: '約 65%',
    lipidSolubility: '中等',
    formulation: '400 mg / 20 mL / vial',
    maxDose: '4.5 mg/kg（最大 300 mg）',
    maxDoseEpi: '7 mg/kg（最大 500 mg）',
    toxicity: '中',
    concentration: '1–2%',
    use: '局麻、神經阻斷、硬膜外'
  },
  {
    name: 'Bupivacaine',
    class: '胺類 (Amide)',
    onset: '慢（5–10 分）',
    duration: '長效（4–8 小時）',
    proteinBinding: '約 95%',
    lipidSolubility: '高',
    formulation: '100 mg / 20 mL / vial (0.5%)',
    maxDose: '2.5 mg/kg（最大 175 mg）；60 kg = 1.5 amp Marcaine',
    maxDoseEpi: '3 mg/kg（最大 225 mg）',
    toxicity: '高',
    concentration: '0.25–0.5%',
    use: '硬膜外、神經阻斷、術後止痛'
  },
  {
    name: 'Ropivacaine',
    class: '胺類 (Amide)',
    onset: '慢（5–10 分）',
    duration: '長效（4–6 小時）',
    proteinBinding: '約 94%',
    lipidSolubility: '中高',
    formulation: '200 mg / 20 mL / vial (1%)',
    maxDose: '3 mg/kg（最大 200–225 mg）',
    maxDoseEpi: '4 mg/kg（最大 250–300 mg）',
    toxicity: '中偏低',
    concentration: '0.2–0.75%',
    use: '與 bupivacaine 用途相似，但毒性更低'
  }
];

const ADJUVANTS = [
  {
    name: 'Epinephrine',
    use: '減緩吸收、延長藥效、增加最大劑量',
    dose: '1:200k 至 1:400k',
    tip: '依最終稀釋完的溶液量，決定一開始加多少 epinephrine (1:1000) 至 Bupivacaine / Ropivacaine 原瓶 20 mL 中。例如：20 mL 溶液加 0.1 mL = 1:200k；40 mL 溶液加 0.2 mL = 1:200k。'
  },
  {
    name: 'Dexamethasone',
    use: '抗發炎，常用於 Caudal block；小型研究指出可延長藥效（perineural 與 intravenous 效果差不多）',
    dose: '5 mg = 1 amp = 1 mL',
    tip: ''
  },
  {
    name: 'Triamcinolone',
    use: '抗發炎，常用於肌肉拉傷、筋膜拉傷、關節腔注射',
    dose: '40 mg = 1 amp = 1 mL',
    tip: ''
  }
];

const BILLING_CODES = [
  { code: '2203021A23', item: '心肌長針 23G', price: '健保 5 點' },
  { code: '2203021A21', item: '心肌長針 21G', price: '健保 5 點' },
  { code: '2210155120', item: '大 OP site', price: '自費 23 元' },
  { code: 'F96011C', item: '神經叢阻斷術', price: '健保 1129 點' },
  { code: 'F47051B', item: '末梢神經阻斷術', price: '健保 380 點' },
  { code: 'F96013C', item: 'Caudal block', price: '健保 1438 點' }
];
