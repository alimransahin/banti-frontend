export default function GalleryContent() {
  const images = [
    'https://images.unsplash.com/photo-1564629667269-b4cf1a40d92f?w=300&h=250&fit=crop',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=300&h=250&fit=crop',
    'https://images.unsplash.com/photo-1427504494785-cdec15f50a0d?w=300&h=250&fit=crop',
    'https://images.unsplash.com/photo-1491841573634-28cb1b47b619?w=300&h=250&fit=crop',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=250&fit=crop',
    'https://images.unsplash.com/photo-1488190211105-8342881b2b94?w=300&h=250&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=250&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=250&fit=crop',
  ]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '15px' }}>
      <div style={{ backgroundColor: 'white', border: '2px solid #90CAF9', padding: '15px', borderRadius: '8px' }}>
        <h1 style={{ color: '#005A9C', fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', marginBottom: '15px', fontFamily: '"Noto Sans Bengali", serif' }}>
          গ্যালারি ও কর্নার
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '12px'
        }}>
          {images.map((img, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                height: '250px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
