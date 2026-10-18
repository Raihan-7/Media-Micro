'use client';

import { useState } from 'react';

export default function HomeDataStructure() {
  // State Utama Tab Navigasi ('materi' | 'simulator' | 'lkpd')
  const [activeTab, setActiveTab] = useState('materi');

  // --- STATE TAB 1: MATERI & LATIHAN ---
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizFeedback, setQuizFeedback] = useState({});

  const questions = [
    {
      id: 'q1',
      question: '1. Dalam antrean kasir, pembeli yang datang pertama akan dilayani lebih dahulu. Prinsip kerja ini disebut...',
      options: ['FIFO (First-In, First-Out)', 'LIFO (Last-In, First-Out)', 'FILO (First-In, Last-Out)', 'Random Processing'],
      correct: 'FIFO (First-In, First-Out)',
    },
    {
      id: 'q2',
      question: '2. Apa yang terjadi jika sistem mencoba mengeluarkan data (Dequeue) dari antrean yang sudah kosong?',
      options: ['Overflow', 'Underflow', 'Buffer Full', 'Memory Leak'],
      correct: 'Underflow',
    },
  ];

  const handleSelectQuiz = (qId, option) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const checkQuizAnswers = () => {
    const feedback = {};
    questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) {
        feedback[q.id] = '✅ Jawaban Benar!';
      } else {
        feedback[q.id] = `❌ Kurang tepat. Jawaban benar: ${q.correct}`;
      }
    });
    setQuizFeedback(feedback);
  };

  // --- STATE TAB 2: SIMULATOR VISUAL ---
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState(null);
  const [mode, setMode] = useState('simulasi');
  const [structureType, setStructureType] = useState('FIFO');
  const [exitingIndex, setExitingIndex] = useState(null);

  const handleInsert = (valueToAdd) => {
    const text = valueToAdd || inputValue;
    if (!text.trim()) {
      setMessage({ text: '⚠️ Masukkan nama data terlebih dahulu!', type: 'error' });
      return;
    }

    const newItem = { id: Math.random().toString(36).substring(2, 9), value: text.trim() };
    setItems((prev) => [...prev, newItem]);
    if (!valueToAdd) setInputValue('');

    const actionName = structureType === 'FIFO' ? 'ENQUEUE' : 'PUSH';
    const posName = structureType === 'FIFO' ? 'TAIL' : 'TOP';

    setMessage({ text: `✅ [${actionName}] "${text}" masuk ke posisi ${posName}.`, type: 'info' });
  };

  const handleRemove = () => {
    if (items.length === 0) {
      const label = structureType === 'FIFO' ? 'Antrean' : 'Tumpukan';
      setMessage({ text: `❌ [UNDERFLOW] ${label} kosong! Tidak ada data yang dapat dikeluarkan.`, type: 'error' });
      return;
    }

    if (exitingIndex !== null) return;
    const targetIndex = structureType === 'FIFO' ? 0 : items.length - 1;
    const removedItem = items[targetIndex];

    setExitingIndex(targetIndex);

    setTimeout(() => {
      setItems((prev) => prev.filter((_, idx) => idx !== targetIndex));
      setExitingIndex(null);
      const actionName = structureType === 'FIFO' ? 'DEQUEUE' : 'POP';
      const posName = structureType === 'FIFO' ? 'HEAD' : 'TOP';
      setMessage({ text: `🚀 [${actionName}] "${removedItem.value}" keluar dari posisi ${posName}.`, type: 'info' });
    }, 500);
  };

  const handleReset = () => {
    setItems([]);
    setExitingIndex(null);
    setMessage({ text: '🔄 Data berhasil dikosongkan.', type: 'info' });
  };

  // --- STATE TAB 3: LKPD INTERAKTIF ---
  const [lkpdAnswers, setLkpdAnswers] = useState({
    groupName: '',
    classInfo: '',
    dateInfo: '',
    val1: '',
    val2: '',
    val3: '',
    q1: '',
    q2: '',
    q3: '',
  });

  const handleLkpdChange = (field, value) => {
    setLkpdAnswers((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem 1rem', fontFamily: 'system-ui, sans-serif', color: '#0f172a' }}>
      {/* CSS Keyframe Animasi & Layout Cetak PDF */}
      <style>{`
        @keyframes floatDown {
          from {
            opacity: 0;
            transform: translateY(-35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-35px);
          }
        }

        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: #ffffff !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>

      {/* Header Utama */}
      <header className="no-print" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 14px', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem' }}>
          Informatika — Fase E
        </span>
        <h1 style={{ fontSize: '2rem', color: '#1e3a8a', margin: '8px 0 4px 0' }}>Data Structure Simulator</h1>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>
          Media Pembelajaran Interaktif Konsep <strong>Queue (FIFO)</strong> & <strong>Stack (LIFO)</strong>
        </p>
      </header>

      {/* Navigation Bar / Tab Utama */}
      <nav className="no-print" style={{ display: 'flex', gap: '8px', background: '#ffffff', padding: '6px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <button
          onClick={() => setActiveTab('materi')}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer',
            background: activeTab === 'materi' ? '#2563eb' : 'transparent',
            color: activeTab === 'materi' ? '#ffffff' : '#64748b',
            transition: 'all 0.2s',
          }}
        >
          📚 1. Materi & Latihan
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer',
            background: activeTab === 'simulator' ? '#2563eb' : 'transparent',
            color: activeTab === 'simulator' ? '#ffffff' : '#64748b',
            transition: 'all 0.2s',
          }}
        >
          💻 2. Simulator Visual
        </button>
        <button
          onClick={() => setActiveTab('lkpd')}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer',
            background: activeTab === 'lkpd' ? '#10b981' : 'transparent',
            color: activeTab === 'lkpd' ? '#ffffff' : '#64748b',
            transition: 'all 0.2s',
          }}
        >
          📝 3. LKPD Interaktif
        </button>
      </nav>

      {/* ========================================================= */}
      {/* TAB 1: MATERI & LATIHAN */}
      {/* ========================================================= */}
      {activeTab === 'materi' && (
        <div className="no-print">
          <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h2 style={{ color: '#1e3a8a', marginTop: 0 }}>📚 Konsep Dasar Queue & Stack</h2>
            
            <div style={{ background: '#eff6ff', borderLeft: '4px solid #2563eb', padding: '12px 16px', borderRadius: '6px', marginBottom: '1rem' }}>
              <h3 style={{ margin: '0 0 6px 0', color: '#1e40af' }}>Queue (FIFO - First In, First Out)</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#334155', lineHeight: '1.5' }}>
                Prinsip antrean di mana elemen yang <strong>pertama kali masuk</strong> akan menjadi yang <strong>pertama kali keluar</strong>. Penambahan data dilakukan di posisi <strong>TAIL</strong> dan penarikan data dilakukan di posisi <strong>HEAD</strong>. Contoh nyata: Antrean kasir kantin, antrean cetak printer.
              </p>
            </div>

            <div style={{ background: '#f3e8ff', borderLeft: '4px solid #8b5cf6', padding: '12px 16px', borderRadius: '6px' }}>
              <h3 style={{ margin: '0 0 6px 0', color: '#6b21a8' }}>Stack (LIFO - Last In, First Out)</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#334155', lineHeight: '1.5' }}>
                Prinsip tumpukan di mana elemen yang <strong>terakhir kali masuk</strong> akan menjadi yang <strong>pertama kali keluar</strong>. Seluruh operasi masuk (Push) dan keluar (Pop) dilakukan pada satu Ujung yang sama, yaitu posisi <strong>TOP</strong>. Contoh nyata: Tumpukan piring, tombol Undo.
              </p>
            </div>
          </section>

          {/* Quiz Latihan */}
          <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>✏️ Pertanyaan Latihan Pemahaman</h3>
            
            {questions.map((q) => (
              <div key={q.id} style={{ marginBottom: '1.2rem', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontWeight: 600, marginTop: 0, color: '#1e293b' }}>{q.question}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectQuiz(q.id, opt)}
                      style={{
                        padding: '10px 12px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        background: quizAnswers[q.id] === opt ? '#2563eb' : '#ffffff',
                        color: quizAnswers[q.id] === opt ? '#ffffff' : '#1e293b',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.88rem',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {quizFeedback[q.id] && (
                  <p style={{ margin: '8px 0 0 0', fontWeight: 700, fontSize: '0.85rem', color: quizFeedback[q.id].includes('Benar') ? '#059669' : '#dc2626' }}>
                    {quizFeedback[q.id]}
                  </p>
                )}
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
              <button
                onClick={checkQuizAnswers}
                style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                Cek Jawaban
              </button>

              <button
                onClick={() => setActiveTab('simulator')}
                style={{ background: '#10b981', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                Lanjut ke Simulator Visual ➔
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: SIMULATOR VISUAL */}
      {/* ========================================================= */}
      {activeTab === 'simulator' && (
        <div className="no-print">
          {/* Switcher Struktur & Mode */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => { setStructureType('FIFO'); handleReset(); }}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                background: structureType === 'FIFO' ? '#2563eb' : '#e2e8f0',
                color: structureType === 'FIFO' ? '#ffffff' : '#475569',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Queue (FIFO)
            </button>
            <button
              onClick={() => { setStructureType('LIFO'); handleReset(); }}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                background: structureType === 'LIFO' ? '#8b5cf6' : '#e2e8f0',
                color: structureType === 'LIFO' ? '#ffffff' : '#475569',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Stack (LIFO)
            </button>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
              <button
                onClick={() => { setMode('simulasi'); handleReset(); }}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  background: mode === 'simulasi' ? '#eff6ff' : '#ffffff',
                  color: mode === 'simulasi' ? '#1d4ed8' : '#475569',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Simulasi Konsep
              </button>
              <button
                onClick={() => { setMode('print'); handleReset(); }}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  background: mode === 'print' ? '#eff6ff' : '#ffffff',
                  color: mode === 'print' ? '#1d4ed8' : '#475569',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Studi Kasus Printer
              </button>
            </div>
          </div>

          {/* Control Panel */}
          <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.2rem', marginBottom: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
                placeholder={mode === 'print' ? 'Masukkan nama file dokumen...' : 'Masukkan nama elemen data...'}
                style={{ flex: 1, minWidth: '200px', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '0.95rem' }}
              />
              <button
                onClick={() => handleInsert()}
                style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                + {structureType === 'FIFO' ? 'Enqueue' : 'Push'}
              </button>
              <button
                onClick={handleRemove}
                style={{ background: '#f97316', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                - {structureType === 'FIFO' ? 'Dequeue' : 'Pop'}
              </button>
              <button
                onClick={handleReset}
                style={{ background: '#64748b', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                Reset
              </button>
            </div>

            {mode === 'print' && (
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Preset Dokumen:</span>
                <button onClick={() => handleInsert('📄 Tugas_Informatika.pdf')} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>+ 📄 Tugas_Informatika.pdf</button>
                <button onClick={() => handleInsert('📄 Laporan_Biologi.docx')} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>+ 📄 Laporan_Biologi.docx</button>
                <button onClick={() => handleInsert('🖼️ Kartu_Ujian.jpg')} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>+ 🖼️ Kartu_Ujian.jpg</button>
              </div>
            )}
          </section>

          {/* Message Box */}
          {message && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontWeight: 600,
                fontSize: '0.9rem',
                background: message.type === 'error' ? '#fef2f2' : '#eff6ff',
                color: message.type === 'error' ? '#dc2626' : '#1d4ed8',
                borderLeft: `4px solid ${message.type === 'error' ? '#dc2626' : '#2563eb'}`,
              }}
            >
              {message.text}
            </div>
          )}

          {/* Visual Arena */}
          <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem 1.5rem', minHeight: '200px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#1e3a8a' }}>
              {structureType === 'FIFO' ? '🚶‍♂️ Jalur Antrean Queue (FIFO)' : '📚 Tumpukan Stack (LIFO)'} (Jumlah: {items.length})
            </h3>

            {items.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#94a3b8', fontWeight: 600, padding: '2rem 0' }}>[ Wadah Kosong / Underflow ]</p>
            ) : (
              <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '15px 8px' }}>
                {items.map((item, index) => {
                  const isHead = structureType === 'FIFO' && index === 0;
                  const isTail = structureType === 'FIFO' && index === items.length - 1;
                  const isTop = structureType === 'LIFO' && index === items.length - 1;
                  const isExiting = exitingIndex === index;

                  return (
                    <div
                      key={item.id}
                      style={{
                        position: 'relative',
                        minWidth: '125px',
                        height: '90px',
                        background: '#ffffff',
                        border: `2px solid ${structureType === 'FIFO' ? '#2563eb' : '#8b5cf6'}`,
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        color: structureType === 'FIFO' ? '#1e3a8a' : '#4c1d95',
                        boxShadow: '0 4px 10px rgba(37, 99, 235, 0.08)',
                        animation: isExiting ? 'floatUp 0.5s ease-in forwards' : 'floatDown 0.5s ease-out forwards',
                      }}
                    >
                      {/* HEAD Label (Atas Card) */}
                      {isHead && (
                        <span style={{ position: 'absolute', top: '-11px', background: '#2563eb', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                          HEAD
                        </span>
                      )}

                      {/* TOP Label (Atas Card khusus Stack) */}
                      {isTop && (
                        <span style={{ position: 'absolute', top: '-11px', background: '#8b5cf6', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                          TOP
                        </span>
                      )}

                      {/* Deskripsi Data & Indeks */}
                      <span style={{ fontSize: '1rem', color: '#0f172a' }}>{item.value}</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Index [{index}]</span>

                      {/* TAIL Label (Bawah Card) */}
                      {isTail && (
                        <span style={{ position: 'absolute', bottom: '-11px', background: '#f97316', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                          TAIL
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: LKPD INTERAKTIF */}
      {/* ========================================================= */}
      {activeTab === 'lkpd' && (
        <div style={{ background: '#ffffff', border: '1px solid #bae6fd', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '10px' }}>
            <h2 style={{ margin: 0, color: '#1e3a8a' }}>📝 Lembar Kerja Peserta Didik (LKPD) Interaktif</h2>
            <button
              onClick={() => window.print()}
              style={{ background: '#10b981', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
            >
              🖨️ Cetak / Simpan PDF LKPD
            </button>
          </div>

          <h2 className="only-print" style={{ margin: '0 0 1rem 0', color: '#1e3a8a', display: 'none' }}>
            📝 Lembar Kerja Peserta Didik (LKPD) — Queue & Stack
          </h2>

          {/* Form Identitas Kelompok (3 Kolom Terpisah: Nama, Kelas, Tanggal) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '1.2rem', background: '#f1f5f9', padding: '1rem', borderRadius: '12px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                Nama Kelompok / Anggota:
              </label>
              <input
                type="text"
                value={lkpdAnswers.groupName}
                onChange={(e) => handleLkpdChange('groupName', e.target.value)}
                placeholder=""
                style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                Kelas:
              </label>
              <input
                type="text"
                value={lkpdAnswers.classInfo}
                onChange={(e) => handleLkpdChange('classInfo', e.target.value)}
                placeholder=""
                style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                Tanggal:
              </label>
              <input
                type="text"
                value={lkpdAnswers.dateInfo}
                onChange={(e) => handleLkpdChange('dateInfo', e.target.value)}
                placeholder=""
                style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
              />
            </div>
          </div>

          {/* Aktivitas 1 */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.2rem', marginBottom: '1.2rem' }}>
            <h3 style={{ marginTop: 0, color: '#2563eb' }}>Aktivitas 1: Pengamatan Urutan Elemen & Underflow</h3>
            <p style={{ fontSize: '0.9rem', color: '#475569' }}>
              Uji cobakan 3 data pada tab <strong>Simulator Visual</strong>, lalu catat hasilnya pada tabel di bawah ini:
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1rem 0', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#eff6ff', color: '#1e40af' }}>
                  <th style={{ border: '1px solid #cbd5e1', padding: '8px', textAlign: 'left' }}>Urutan Masuk Data</th>
                  <th style={{ border: '1px solid #cbd5e1', padding: '8px', textAlign: 'left' }}>Nama Elemen Data</th>
                  <th style={{ border: '1px solid #cbd5e1', padding: '8px', textAlign: 'left' }}>Indeks Array</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #cbd5e1', padding: '8px' }}><strong>Elemen Pertama</strong></td>
                  <td style={{ border: '1px solid #cbd5e1', padding: '8px' }}>
                    <input type="text" value={lkpdAnswers.val1} onChange={(e) => handleLkpdChange('val1', e.target.value)} placeholder="Elemen ke-1..." style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                  </td>
                  <td style={{ border: '1px solid #cbd5e1', padding: '8px' }}>Index [0]</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #cbd5e1', padding: '8px' }}><strong>Elemen Kedua</strong></td>
                  <td style={{ border: '1px solid #cbd5e1', padding: '8px' }}>
                    <input type="text" value={lkpdAnswers.val2} onChange={(e) => handleLkpdChange('val2', e.target.value)} placeholder="Elemen ke-2..." style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                  </td>
                  <td style={{ border: '1px solid #cbd5e1', padding: '8px' }}>Index [1]</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #cbd5e1', padding: '8px' }}><strong>Elemen Ketiga</strong></td>
                  <td style={{ border: '1px solid #cbd5e1', padding: '8px' }}>
                    <input type="text" value={lkpdAnswers.val3} onChange={(e) => handleLkpdChange('val3', e.target.value)} placeholder="Elemen ke-3..." style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                  </td>
                  <td style={{ border: '1px solid #cbd5e1', padding: '8px' }}>Index [2]</td>
                </tr>
              </tbody>
            </table>

            <p style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '10px' }}>1. Tekan Dequeue 1x. Elemen mana yang keluar dan mengapa?</p>
            <textarea value={lkpdAnswers.q1} onChange={(e) => handleLkpdChange('q1', e.target.value)} placeholder="Tuliskan analisis berdasarkan hasil simulasi..." style={{ width: '100%', minHeight: '60px', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', fontFamily: 'inherit' }} />

            <p style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '10px' }}>2. Kosongkan antrean lalu tekan Dequeue sekali lagi. Apa yang terjadi?</p>
            <textarea value={lkpdAnswers.q2} onChange={(e) => handleLkpdChange('q2', e.target.value)} placeholder="Tuliskan penjelasan kondisi Underflow..." style={{ width: '100%', minHeight: '60px', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', fontFamily: 'inherit' }} />
          </div>

          {/* Aktivitas 2 */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.2rem' }}>
            <h3 style={{ marginTop: 0, color: '#2563eb' }}>Aktivitas 2: Analisis Queue vs Stack</h3>
            <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Jelaskan perbedaan lokasi masuk dan keluarnya data antara struktur Queue (FIFO) dan Stack (LIFO):</p>
            <textarea value={lkpdAnswers.q3} onChange={(e) => handleLkpdChange('q3', e.target.value)} placeholder="Tuliskan perbandingan urutan penambahan dan pengurangan data..." style={{ width: '100%', minHeight: '70px', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', fontFamily: 'inherit' }} />
          </div>
        </div>
      )}
    </main>
  );
}