export default function ContactContent() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '15px' }}>
      <div style={{ backgroundColor: 'white', border: '2px solid #90CAF9', padding: '15px', borderRadius: '8px' }}>
        <h1 style={{ color: '#005A9C', fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', marginBottom: '15px', fontFamily: '"Noto Sans Bengali", serif' }}>
          যোগাযোগ করুন
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ color: '#228B22', fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 'bold', marginBottom: '12px', fontFamily: '"Noto Sans Bengali", serif' }}>
              যোগাযোগের তথ্য
            </h2>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>
                <strong>ঠিকানা:</strong> চকগোপাল, মান্দা, নদীয়া
              </p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>
                <strong>ফোন:</strong> (+880) ०१३०९-१२३२१९
              </p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>
                <strong>ইমেইল:</strong> edrishali@gmail.com
              </p>
            </div>
            <div>
              <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>
                <strong>ওয়েবসাইট:</strong> https://chakgopalhighschool.edu.bd/
              </p>
            </div>
          </div>

          <div>
            <h2 style={{ color: '#228B22', fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 'bold', marginBottom: '12px', fontFamily: '"Noto Sans Bengali", serif' }}>
              বার্তা পাঠান
            </h2>
            <form style={{ display: 'grid', gap: '8px' }}>
              <input
                type="text"
                placeholder="আপনার নাম"
                style={{ padding: '10px', border: '1px solid #90CAF9', borderRadius: '4px', fontSize: '14px' }}
              />
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                style={{ padding: '10px', border: '1px solid #90CAF9', borderRadius: '4px', fontSize: '14px' }}
              />
              <textarea
                placeholder="আপনার বার্তা"
                rows={5}
                style={{ padding: '10px', border: '1px solid #90CAF9', borderRadius: '4px', fontSize: '14px' }}
              ></textarea>
              <button
                type="submit"
                style={{ padding: '10px 20px', backgroundColor: '#228B22', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                পাঠান
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
