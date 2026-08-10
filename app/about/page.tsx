import config from "@/config";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col bg-background">

      {/* Header */}
      <section className="text-white py-16 px-4" style={{ background: 'linear-gradient(to right, #0F4C81, #1a5c9e)' }}>
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">আমাদের পরিচিতি</h1>
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.9)' }}>{config.schoolNameBN} সম্পর্কে আরও জানুন</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="container-max">
          {/* School Overview */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1E293B' }}>আমাদের ইতিহাস</h2>
            <div className="space-y-6">
              <p className="leading-relaxed text-lg" style={{ color: '#475569' }}>
                চকগোপাল উচ্চ বিদ্যালয় ১৯৮৫ সালে প্রতিষ্ঠিত হয় বৈচিত্র্যময় পটভূমির শিক্ষার্থীদের মানসম্পন্ন শিক্ষা প্রদানের লক্ষ্যে। গত ৩৫+ বছরে আমরা একাডেমিক উৎকর্ষতা এবং সামগ্রিক শিক্ষার্থী উন্নয়নের জন্য একটি সুখ্যাতি তৈরি করেছি।
              </p>
              <p className="leading-relaxed text-lg" style={{ color: '#475569' }}>
                আমাদের প্রতিষ্ঠান শুধুমাত্র একাডেমিকভাবে মেধাবী শিক্ষার্থী নয়, বরং এমন দায়িত্বশীল নাগরিক গড়ে তুলতে প্রতিশ্রুতিবদ্ধ যারা সমাজে ইতিবাচক অবদান রাখে। আমরা শিক্ষার শক্তিতে বিশ্বাস করি যা জীবন পরিবর্তন করে এবং উন্নত ভবিষ্যৎ সৃষ্টি করে।
              </p>
              <p className="text-paragraph leading-relaxed text-lg">
                অভিজ্ঞ শিক্ষকদের একটি নিবেদিত দল এবং আধুনিক সুবিধাদি সহ, আমরা আমাদের শিক্ষা প্রচেষ্টার প্রতিটি ক্ষেত্রে উৎকর্ষতার জন্য প্রচেষ্টা চালিয়ে যাচ্ছি।
              </p>
            </div>
          </div>

          {/* Mission and Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white border rounded-lg shadow-sm p-8" style={{ borderColor: '#E5E7EB' }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#1E293B' }}>আমাদের লক্ষ্য</h3>
              <p className="leading-relaxed" style={{ color: '#475569' }}>
                শিক্ষার্থীদের বুদ্ধিবৃত্তিক, সামাজিক, আবেগজনক এবং শারীরিক ক্ষমতা বিকশিত করে ব্যাপক, উচ্চ মানের শিক্ষা প্রদান করা, তাদেরকে দায়িত্বশীল নাগরিক এবং সফল পেশাদার হিসাবে ক্ষমতায়ন করা।
              </p>
            </div>
            <div className="bg-white border rounded-lg shadow-sm p-8" style={{ borderColor: '#E5E7EB' }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#1E293B' }}>আমাদের দৃষ্টিভঙ্গি</h3>
              <p className="leading-relaxed" style={{ color: '#475569' }}>
                একাডেমিক উৎকর্ষতা, শিক্ষা পদ্ধতিতে উদ্ভাবন, চরিত্র গঠন এবং মানসম্পন্ন শিক্ষার মাধ্যমে জাতি গঠনে অবদানের জন্য স্বীকৃত একটি শীর্ষস্থানীয় শিক্ষা প্রতিষ্ঠান হওয়া।
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: '#1E293B' }}>আমাদের মূল্যবোধ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'সততা', desc: 'আমরা সকল লেনদেনে সততা ও নৈতিক আচরণ বজায় রাখি' },
                { title: 'উৎকর্ষতা', desc: 'আমরা শিক্ষা ও সেবায় সর্বোচ্চ মান অর্জনের প্রচেষ্টা করি' },
                { title: 'সমন্বিতকরণ', desc: 'আমরা সকল পটভূমির শিক্ষার্থীদের স্বাগত ও সহায়তা করি' },
                { title: 'উদ্ভাবন', desc: 'আমরা আধুনিক শিক্ষা পদ্ধতি ও প্রযুক্তি গ্রহণ করি' },
                { title: 'সম্মান', desc: 'আমরা বৈচিত্র্য মূল্যবান মনে করি এবং সবাইকে সম্মান করি' },
                { title: 'সম্প্রদায়', desc: 'আমরা অন্তর্ভুক্তি এবং পারস্পরিক সহায়তার অনুভূতি গড়ি' },
              ].map((value, index) => (
                <div key={index} className="bg-white border rounded-lg shadow-sm p-6 text-center hover:shadow-lg transition-all" style={{ borderColor: '#E5E7EB' }}>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#1E293B' }}>{value.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: '#1E293B' }}>মূল অর্জন</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'জাতীয় পরীক্ষায় ধারাবাহিকভাবে ৯০% এর উপরে উত্তীর্ণ হার',
                'মর্যাদাপূর্ণ বিশ্ববিদ্যালয়ে একাধিক বৃত্তি প্রাপক',
                'আন্তঃস্কুল ক্রীড়া প্রতিযোগিতায় চ্যাম্পিয়ন',
                'পুরস্কার বিজয়ী বিজ্ঞান ও প্রযুক্তি প্রকল্প',
                'বিভিন্ন ক্ষেত্রে অবদান রাখা শক্তিশালী প্রাক্তন ছাত্র নেটওয়ার্ক',
                'অত্যাধুনিক ডিজিটাল শিক্ষা সুবিধা',
              ].map((achievement, index) => (
                <div key={index} className="bg-white border rounded-lg shadow-sm p-6 flex gap-4 items-start" style={{ borderColor: '#E5E7EB' }}>
                  <span className="font-bold text-2xl flex-shrink-0" style={{ color: '#F4B400' }}>✓</span>
                  <span className="leading-relaxed" style={{ color: '#475569' }}>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
