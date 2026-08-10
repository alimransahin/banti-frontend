export default function TeachersContent() {
  const teachers = [
    { name: 'মোঃ ইদ্রিস আলি মন্ডল', designation: 'প্রধান শিক্ষক', subject: 'বিজ্ঞান' },
    { name: 'মিসেস ফাতেমা বেগম', designation: 'সিনিয়র শিক্ষক', subject: 'বাংলা' },
    { name: 'মোঃ করিম আহমেদ', designation: 'শিক্ষক', subject: 'ইংরেজি' },
    { name: 'মিসেস নাজমা আক্তার', designation: 'শিক্ষক', subject: 'গণিত' },
    { name: 'মোঃ হাসান মিয়া', designation: 'শিক্ষক', subject: 'সামাজিক বিজ্ঞান' },
    { name: 'মিসেস রেণু দাস', designation: 'শিক্ষক', subject: 'কম্পিউটার' },
  ]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '15px' }}>
      <div style={{ backgroundColor: 'white', border: '2px solid #90CAF9', padding: '15px', borderRadius: '8px' }}>
        <h1 style={{ color: '#005A9C', fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', marginBottom: '15px', fontFamily: '"Noto Sans Bengali", serif' }}>
          শিক্ষক ও কর্মচারী
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
          {teachers.map((teacher, idx) => (
            <div key={idx} style={{ backgroundColor: '#E3F2FD', border: '2px solid #90CAF9', padding: '12px', borderRadius: '8px' }}>
              <div style={{ width: '100%', height: 'auto', aspectRatio: '3/2', backgroundColor: '#90CAF9', borderRadius: '8px', marginBottom: '10px' }}></div>
              <h3 style={{ color: '#005A9C', fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 'bold', margin: '0 0 4px 0', fontFamily: '"Noto Sans Bengali", serif' }}>
                {teacher.name}
              </h3>
              <p style={{ color: '#228B22', fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 'bold', margin: '0 0 4px 0' }}>
                {teacher.designation}
              </p>
              <p style={{ color: '#666', fontSize: 'clamp(11px, 2vw, 13px)', margin: '0' }}>
                বিষয়: {teacher.subject}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
