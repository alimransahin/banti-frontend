'use client'

import { useState, useEffect } from 'react'

export default function HomeContent({ setCurrentPage }: { setCurrentPage?: (page: string) => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [animatingNotices, setAnimatingNotices] = useState(false)

  useEffect(() => {
    setAnimatingNotices(true)
  }, [])
  
  const schoolImages = [
    'https://images.unsplash.com/photo-1564629667269-b4cf1a40d92f?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1427504494785-cdec15f50a0d?w=800&h=300&fit=crop',
  ]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '15px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
      {/* Left Column */}
      <div>
        {/* Notice Ticker */}
        <div style={{
          backgroundColor: '#FFF9C4',
          border: '2px solid #FFB300',
          padding: '10px 12px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 'bold',
          fontSize: '12px',
          overflowX: 'auto'
        }}>
          <span style={{ color: '#D32F2F' }}>নিয়োগ বিজ্ঞপ্তি ***</span>
          <span style={{ color: '#D32F2F' }}>|</span>
          <span style={{ color: '#D32F2F' }}>পরীক্ষার সময়সূচী ***</span>
          <span style={{ color: '#D32F2F' }}>|</span>
          <span style={{ color: '#D32F2F' }}>ছুটির দিনের তালিকা ***</span>
        </div>

        {/* Image Carousel */}
        <div style={{
          backgroundColor: 'white',
          border: '2px solid #90CAF9',
          padding: '12px',
          marginBottom: '20px',
          position: 'relative',
          height: 'auto',
          aspectRatio: '16/9',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <img
            src={schoolImages[currentImageIndex]}
            alt="School Building"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
          />
          
          {/* Carousel Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
            {schoolImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: index === currentImageIndex ? '#00838F' : '#B3E5FC',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                aria-label={`Image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* School Overview */}
        <div style={{ backgroundColor: 'white', border: '2px solid #90CAF9', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#005A9C', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', fontFamily: '"Noto Sans Bengali", serif' }}>
            চকগোপাল উচ্চ বিদ্যালয়
          </h2>
          <p style={{ color: '#333', lineHeight: '1.6', fontSize: '13px', marginBottom: '10px' }}>
            মান্দার প্রাচীনতম প্রতিষ্ঠানগুলোর মধ্যে চকগোপাল উচ্চ বিদ্যালয় অন্যতম। অত্র এলাকার মধ্যে এই প্রতিষ্ঠান একটি শুনামধন্য বিদ্যানিকেতন। এখানে অভিঙ্গ শিক্ষক মন্ডলী দ্বারা পাঠদান করানো হয়। প্রতি বছর এস এস সি পরীক্ষায় অনেক শিক্ষাথী জিপিএ -৫ সহ গোল্ডেন পায়।
          </p>
          <button style={{ color: '#005A9C', fontWeight: 'bold', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0', fontSize: '14px' }}>
            বিস্তারিত »
          </button>
        </div>

        {/* Chairman's Message */}
        <div style={{ backgroundColor: 'white', border: '2px solid #90CAF9', padding: '15px', marginBottom: '20px', borderRadius: '8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', alignItems: 'start' }}>
          <div style={{ minWidth: '120px' }}>
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=250&fit=crop"
              alt="Chairman"
              style={{ width: '100%', borderRadius: '8px', height: 'auto' }}
            />
          </div>
          <div>
            <h3 style={{ color: '#228B22', fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', fontFamily: '"Noto Sans Bengali", serif' }}>
              সভাপতির বাণী
            </h3>
            <h4 style={{ color: '#005A9C', fontSize: '16px', fontWeight: 'bold', margin: '10px 0', fontFamily: '"Noto Sans Bengali", serif' }}>
              মোঃ ইদ্রিস আলি মন্ডল
            </h4>
            <p style={{ color: '#333', lineHeight: '1.6', fontSize: '13px' }}>
              শিক্ষাই জাতির মেরুদন্ড। কাজেই সবার জন্য শিক্ষা অর্জন করা মানুষের মৌলিক অধিকার। এ অধিকারকে যথাযথভাবে বাস্তবায়নের মাধ্যমে বিশ্বের অনেক দেশ আজ উন্নত দেশ হিসেবে উন্নতির চরম শিখরে আরোহণ করেছে।
            </p>
          </div>
        </div>

        {/* Principal's Message */}
        <div style={{ backgroundColor: 'white', border: '2px solid #90CAF9', padding: '15px', marginBottom: '20px', borderRadius: '8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', alignItems: 'start' }}>
          <div style={{ minWidth: '120px' }}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=250&fit=crop"
              alt="Principal"
              style={{ width: '100%', borderRadius: '8px', height: 'auto' }}
            />
          </div>
          <div>
            <h3 style={{ color: '#228B22', fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', fontFamily: '"Noto Sans Bengali", serif' }}>
              প্রধান শিক্ষকের বাণী
            </h3>
            <h4 style={{ color: '#005A9C', fontSize: '16px', fontWeight: 'bold', margin: '10px 0', fontFamily: '"Noto Sans Bengali", serif' }}>
              মোঃ ইদ্রিস আলি মন্ডল
            </h4>
            <p style={{ color: '#333', lineHeight: '1.6', fontSize: '13px' }}>
              শিক্ষাই জাতির মেরুদন্ড। কাজেই সবার জন্য শিক্ষা অর্জন করা মানুষের মৌলিক অধিকার। এ অধিকারকে যথাযথভাবে বাস্তবায়নের মাধ্যমে বিশ্বের অনেক দেশ আজ উন্নত দেশ হিসেবে উন্নতির চরম শিখরে আরোহণ করেছে।
            </p>
          </div>
        </div>

        {/* School Information */}
        <div style={{ backgroundColor: 'white', border: '2px solid #90CAF9', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#005A9C', fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', fontFamily: '"Noto Sans Bengali", serif', borderBottom: '3px solid #228B22', paddingBottom: '10px' }}>
            চকগোপাল উচ্চ বিদ্যালয়
          </h2>
          <p style={{ color: '#333', lineHeight: '1.6', fontSize: '14px', marginBottom: '10px' }}>
            চকগোপাল উচ্চ বিদ্যালয় দীর্ঘ ইতিহাস এবং ঐতিহ্যবাহী একটি শিক্ষা প্রতিষ্ঠান। এই প্রতিষ্ঠানটি শিক্ষার মান উন্নয়ন এবং ছাত্রছাত্রীদের সর্বাঙ্গীণ উন্নয়নের জন্য নিরলস প্রচেষ্টা ��ালিয়ে যাচ্ছে।
          </p>
        </div>

        {/* Institutional Video */}
        <div style={{ backgroundColor: 'white', border: '2px solid #90CAF9', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#005A9C', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', fontFamily: '"Noto Sans Bengali", serif', borderBottom: '3px solid #228B22', paddingBottom: '8px' }}>
            প্রাতিষ্ঠানিক ভিডিও
          </h2>
          <div style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
            borderRadius: '8px',
            backgroundColor: '#000',
            marginBottom: '15px'
          }}>
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
              src="https://www.youtube.com/embed/jNgP6d9HraI?rel=0"
              title="School Institutional Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Photo Gallery */}
        <div style={{ backgroundColor: 'white', border: '2px solid #90CAF9', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#005A9C', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', fontFamily: '"Noto Sans Bengali", serif', borderBottom: '3px solid #228B22', paddingBottom: '8px' }}>
            ফটো গ্যালারি
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px',
            marginTop: '12px'
          }}>
            {[
              'https://images.unsplash.com/photo-1564629667269-b4cf1a40d92f?w=250&h=200&fit=crop',
              'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=250&h=200&fit=crop',
              'https://images.unsplash.com/photo-1427504494785-cdec15f50a0d?w=250&h=200&fit=crop',
              'https://images.unsplash.com/photo-1491841573634-28cb1b47b619?w=250&h=200&fit=crop',
              'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=250&h=200&fit=crop',
              'https://images.unsplash.com/photo-1488190211105-8342881b2b94?w=250&h=200&fit=crop',
            ].map((img, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  height: 'auto',
                  aspectRatio: '1'
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

      {/* Right Sidebar */}
      <div>
        {/* Achievement Logos */}
        <div style={{ backgroundColor: 'white', border: '2px solid #90CAF9', padding: '12px', marginBottom: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h4 style={{ color: '#228B22', fontWeight: 'bold', marginBottom: '12px', fontFamily: '"Noto Sans Bengali", serif', fontSize: '13px' }}>
            দাক্ষিণ্যের স্বীকৃতি
          </h4>
          <img
            src="https://images.unsplash.com/photo-1599305445671-639c74d37de4?w=150&h=80&fit=crop"
            alt="Awards"
            style={{ width: '100%', marginBottom: '10px', borderRadius: '4px' }}
          />
        </div>

        {/* Notice Board */}
        <div style={{ backgroundColor: '#228B22', color: 'white', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '13px', fontFamily: '"Noto Sans Bengali", serif' }}>
            নোটিস বোর্ড
          </h4>
          <div style={{ backgroundColor: 'white', color: '#333', padding: '12px', borderRadius: '4px', minHeight: 'auto', fontSize: '12px', overflow: 'hidden', height: '120px' }}>
            <style>{`
              @keyframes scrollUp {
                0% {
                  transform: translateY(100%);
                  opacity: 0;
                }
                10% {
                  opacity: 1;
                }
                90% {
                  opacity: 1;
                }
                100% {
                  transform: translateY(-100%);
                  opacity: 0;
                }
              }
              .notice-item {
                animation: ${animatingNotices ? 'scrollUp 8s ease-in-out infinite' : 'none'};
                margin-bottom: 6px;
                font-size: 11px;
              }
            `}</style>
            <ul style={{ margin: 0, paddingLeft: '18px', listStyleType: 'disc' }}>
              <li className="notice-item">নিয়োগ বিজ্ঞপ্তি সম্পর্কিত তথ্য</li>
              <li className="notice-item">পরীক্ষার সময়সূচী প্রকাশিত</li>
              <li className="notice-item">ছুটির দিনের তালিকা</li>
              <li className="notice-item">ভর্তি নোটিশ আপডেট</li>
            </ul>
          </div>
          <button
            onClick={() => {
              setAnimatingNotices(false)
              if (setCurrentPage) {
                setCurrentPage('notices')
              }
            }}
            style={{
              width: '100%',
              backgroundColor: '#FFB300',
              color: '#333',
              border: 'none',
              padding: '8px',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '11px',
              cursor: 'pointer',
              marginTop: '8px',
              fontFamily: '"Noto Sans Bengali", serif'
            }}
          >
            সকল নোটিশ দেখুন »
          </button>
        </div>



        {/* Important Forms Section */}
        <div style={{ backgroundColor: '#228B22', color: 'white', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '13px', fontFamily: '"Noto Sans Bengali", serif', textAlign: 'center' }}>
            উল্লেখপূর্ণ ফরম
          </h4>
          <ul style={{ margin: 0, paddingLeft: '0', listStyleType: 'none' }}>
            <li style={{ marginBottom: '6px' }}>
              <button onClick={() => {}} style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}>
                » ছাত্র ভর্তি ফরম
              </button>
            </li>
            <li style={{ marginBottom: '6px' }}>
              <button onClick={() => {}} style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}>
                » ট্রান্সফার সার্টিফিকেট ফরম
              </button>
            </li>
            <li style={{ marginBottom: '6px' }}>
              <button onClick={() => {}} style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}>
                » চরিত্র সার্টিফিকেট ফরম
              </button>
            </li>
            <li>
              <button onClick={() => {}} style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}>
                » ছুটির দরখাস্ত ফরম
              </button>
            </li>
          </ul>
        </div>

        {/* Important Links Section */}
        <div style={{ backgroundColor: '#228B22', color: 'white', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '13px', fontFamily: '"Noto Sans Bengali", serif', textAlign: 'center' }}>
            গুরুত্বপূর্ণ লিংক
          </h4>
          <ul style={{ margin: 0, paddingLeft: '0', listStyleType: 'none' }}>
            <li style={{ marginBottom: '6px' }}>
              <button onClick={() => {}} style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}>
                » শিক্ষা বোর্ড
              </button>
            </li>
            <li style={{ marginBottom: '6px' }}>
              <button onClick={() => {}} style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}>
                » এসএসসি পরীক্ষার ফলাফল
              </button>
            </li>
            <li style={{ marginBottom: '6px' }}>
              <button onClick={() => {}} style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}>
                » অনলাইন ভর্তি সিস্টেম
              </button>
            </li>
            <li>
              <button onClick={() => {}} style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}>
                » শিক্ষার্থী ডিজিটাল আইডি
              </button>
            </li>
          </ul>
        </div>

        {/* Government Services Section */}
        <div style={{ backgroundColor: '#228B22', color: 'white', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '13px', fontFamily: '"Noto Sans Bengali", serif', textAlign: 'center' }}>
            সরকারি সেবা
          </h4>
          <ul style={{ margin: 0, paddingLeft: '0', listStyleType: 'none' }}>
            <li style={{ marginBottom: '6px' }}>
              <button onClick={() => {}} style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}>
                » আন্তর্জাতিক পরিচয় পত্র
              </button>
            </li>
            <li style={{ marginBottom: '6px' }}>
              <button onClick={() => {}} style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}>
                » শিক্ষাথী বৃত্তি কর্মসূচি
              </button>
            </li>
            <li style={{ marginBottom: '6px' }}>
              <button onClick={() => {}} style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}>
                » শিক্ষা উপকরণ সহায়তা
              </button>
            </li>
            <li>
              <button onClick={() => {}} style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '4px 0' }}>
                » শিক্ষা ঋণ কর্মসূচি
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
