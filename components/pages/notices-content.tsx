export default function NoticesContent() {
  const notices = [
    { date: '১৫ আগস্ট ২০২৬', title: 'পরীক্ষার সময়সূচী প্রকাশিত', description: 'এসএসসি ও জেএসসি পরীক্ষার সময়সূচী এখন পাওয়া যাচ্ছে।' },
    { date: '১০ আগস্ট ২০২৬', title: 'নতুন ভর্তির জন্য নোটিশ', description: 'নতুন শিক্ষার্থী ভর্তির জন্য অনলাইন ফর্ম পূরণ করতে হবে।' },
    { date: '৫ আগস্ট ২০২৬', title: 'গ্রীষ্মকালীন ছুটির তালিকা', description: 'স্কুল গ্রীষ্মকালীন ছুটিতে থাকবে ৫ আগস্ট থেকে ৩০ আগস্ট পর্যন্ত।' },
    { date: '১ আগস্ট ২০२६', title: 'শিক্ষক নিয়োগ বিজ্ঞপ্তি', description: 'বিভিন্ন বিষয়ে শিক্ষক নিয়োগের জন্য আবেদন আহ্বান করা হচ্ছে।' },
  ]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '15px' }}>
      <div style={{ backgroundColor: 'white', border: '2px solid #90CAF9', padding: '15px', borderRadius: '8px' }}>
        <h1 style={{ color: '#005A9C', fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', marginBottom: '15px', fontFamily: '"Noto Sans Bengali", serif' }}>
          নোটিশ বোর্ড
        </h1>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          {notices.map((notice, idx) => (
            <div key={idx} style={{ backgroundColor: '#FFF9C4', border: '2px solid #FFB300', padding: '12px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
                <h3 style={{ color: '#D32F2F', fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 'bold', margin: '0', fontFamily: '"Noto Sans Bengali", serif' }}>
                  {notice.title}
                </h3>
                <span style={{ color: '#666', fontSize: '11px', fontWeight: 'bold' }}>
                  {notice.date}
                </span>
              </div>
              <p style={{ color: '#333', fontSize: 'clamp(12px, 2.5vw, 14px)', margin: '0', lineHeight: '1.5' }}>
                {notice.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
