/**
 * Georgian (ქართული) copy. Must match the shape of `en.ts` exactly —
 * TypeScript enforces this via `Copy = typeof en`.
 *
 * Where technical terms lack a clean Georgian equivalent, the loanword form
 * used in local tech writing is preferred (დეშბორდი, ტრანზაქცია, ბანკი).
 * Brand names (Xarji, Bank of Georgia, TBC, InstantDB, macOS) are not
 * transliterated.
 */   

import type { Copy, RichPart } from './types';

export const ka: Copy = {
  meta: {
    title: 'Xarji · ხარჯების აღრიცხვა ქართული ბანკებისთვის — self-hosted',
    description:
      'Xarji კითხულობს SMS ად მოსულ თითოეულ ტრანზაქციას და გარდაქმნის მარტივ, სწრაფ Dashboard-ად. პერსონალური და სრულიად უფასო, Open Source. Built in Tbilisi.',
  },

  nav: {
    brandTagline: 'ხარჯი',
    sourceLabel: 'Source',
    downloadCta: 'Download',
    localeSwitchAria: 'ენის შეცვლა',
    links: [
      { label: 'პროდუქტი', href: '#product' },
      { label: 'როგორ მუშაობს', href: '#how' },
      { label: 'Download', href: '#download' },
      { label: 'FAQ', href: '#faq' },
    ],
  },

  hero: {
    badgeSuffix: 'უკვე ხელმისაწვდომია',
    titleLine1: 'ბანკი გიგზავნის ტრანზაქციის შეტყობინებას',
    titleLine2Pre: 'Xarji ქმნის ',
    titleLine2Accent: 'Dashboard-ს',
    titleLine2Post: '.',
    subhead: [
      'პირადი ფინანსების მართვის ხელსაწყო საქართველოსთვის. აპლიკაცია კითხულობს SMS-ებს ',
      { bold: 'Bank of Georgia' },
      '-დან და ',
      { bold: 'TBC' },
      '-დან, ამუშავებს ტრანზაქციებს ლოკალურად და ახდენს მათ კატეგორიზაციას. მონაცემები არ იტვირთება cloud ზე და შენი ინფორმაცია მხოლოდ შენს კომპიუტერში რჩება.',
    ] as RichPart[],
    ctaPrimary: 'Download macOS',
    ctaSecondary: 'ნახე როგორ მუშაობს',
    checks: [
      { title: 'Fully Open Source', sub: 'MIT License' },
      { title: 'მუშაობს მხოლოდ შენს Mac-ზე', sub: 'iCloud ის გარეშე' },
      { title: 'მუშაობს offline', sub: 'პირველი წაკითხვის შემდეგ' },
    ],
    sms: {
      messagesAppLabel: 'Messages.app · ახლახან',
      smsBadge: 'SMS',
      stageReceived: 'SMS მიღებულია',
      stageParsing: 'მუშავდება…',
      stageParsed: 'დამუშავდა ✓',
      labelAutoCategory: 'კატეგორია',
      labelBank: 'ბანკი',
      labelStored: 'შენახულია',
      valueStored: 'ლოკალურად',
      bankLabels: { SOLO: 'BOG Solo', TBC: 'თიბისი ბანკი' },
      messages: [
        {
          raw: 'გადახდა: GEL47.80\nWOLT.GE / 20261\nბარათი: VISA *1423\n21.04.26 · 19:42',
          merchant: 'Wolt · მიტანა',
          amount: 47.8,
          cat: 'საკვები',
          color: '#ff8a5c',
          icon: 'W',
          time: '19:42',
          bank: 'SOLO' as const,
        },
        {
          raw: 'გადახდა: GEL12.40\nSOCAR PETROL 17\nVISA *1423\n21.04.26 · 12:08',
          merchant: 'Socar · საწვავი',
          amount: 12.4,
          cat: 'ტრანსპორტი',
          color: '#6aa3ff',
          icon: 'S',
          time: '12:08',
          bank: 'TBC' as const,
        },
        {
          raw: 'გადახდა: GEL256.00\nGOODWILL SAR #4\nVISA *1423\n20.04.26 · 21:14',
          merchant: 'გუდვილი',
          amount: 256.0,
          cat: 'პროდუქტები',
          color: '#4bd9a2',
          icon: 'G',
          time: '21:14',
          bank: 'SOLO' as const,
        },
      ],
    },
  },

  product: {
    eyebrow: 'მართვის პანელი',
    title: 'შექმნილია ყოველდღიურობისთვის.',
    subtitle:
      'მშვიდი, მუქი ინტერფეისი, ჯამური შემოსავალი და დანახარჯი. თითოეული ტრანზაქცია დაყოფილი კატეოგირებად, გაიგე რაში ხარჯავ ყველაზე მეტს და აკონტროლე შენი ფინანსები',
    browserBar: 'xarji · localhost:3000',
    screens: [
      { name: 'მიმოხილვა', sub: 'დღეს · თვე · ტრენდი' },
      { name: 'ტრანზაქციები', sub: '713 დამუშავებული, ფილტრაცია' },
      { name: 'კატეგორიები', sub: '9 კატეგორია, თვითსწავლება' },
      { name: 'ობიექტები', sub: 'ვისთან ხარჯავ, დალაგებული' },
      { name: 'სიგნალები', sub: 'ანომალიები და უარყოფები' },
      { name: 'პარამეტრები', sub: 'ბანკები, კონფიგურაცია' },
    ],
    annotations: [
      'კატეგორიების განაწილება',
      'ცოცხალი ტრანზაქციები Messages.app-იდან',
      '9-თვიანი ტრენდების გრაფიკი',
    ],
    mock: {
      greeting: 'საღამო მშვიდობისა, თორნიკე',
      heroTitle: 'აპრილის მიმოხილვა',
      ranges: ['დღეს', 'კვირა', 'თვე', 'წელი'],
      activeRange: 'თვე',
      spentLabel: 'დახარჯული ამ თვეში · GEL',
      amountWhole: '6,650',
      amountDecimal: '.70',
      amountDelta: '+₾812 მარტთან შედარებით · 21 დღე · 94 ტრანზაქცია',
      dailyAvgLabel: 'დღიური საშუალო',
      dailyAvgValue: '₾317',
      dailyAvgSub: 'მინ. ₾48 · მაქს. ₾742',
      declinedLabel: 'უარყოფილი',
      declinedValue: '4',
      declinedSub: '2× ბალანსი · 1× დაბლოკილი',
      spendingMixLabel: 'ხარჯების განაწილება',
      spendingMix: [
        { c: '#ff8a5c', n: 'საკვები', p: 32 },
        { c: '#4bd9a2', n: 'პროდუქტები', p: 22 },
        { c: '#6aa3ff', n: 'ტრანსპორტი', p: 14 },
        { c: '#b38df7', n: 'სახლი', p: 12 },
      ],
      recentLabel: 'ბოლო ტრანზაქციები',
      liveBadge: '● live',
      recent: [
        { ic: 'W', m: 'Wolt · მიტანა', c: 'საკვები', co: '#ff8a5c', a: 47.8, t: '19:42' },
        { ic: 'S', m: 'Socar · საწვავი', c: 'ტრანსპორტი', co: '#6aa3ff', a: 12.4, t: '12:08' },
        { ic: 'G', m: 'გუდვილი', c: 'პროდუქტები', co: '#4bd9a2', a: 256.0, t: 'გუშინ 21:14' },
        { ic: 'A', m: 'ავერსი', c: 'ჯანმრთელობა', co: '#b38df7', a: 18.5, t: 'გუშინ 14:02' },
      ],
      sidebar: [
        { g: '◉', n: 'მიმოხილვა', a: true },
        { g: '≡', n: 'ტრანზაქციები', a: false },
        { g: '◐', n: 'კატეგორიები', a: false },
        { g: '◆', n: 'ობიექტები', a: false },
        { g: '✦', n: 'სიგნალები', a: false },
        { g: '⚙', n: 'პარამეტრები', a: false },
      ],
      donutLabelTop: 'აპრ',
      donutLabelBottom: '₾6.6k',
    },
  },

  features: {
    eyebrow: 'რატომ Xarji',
    title: 'იმისთვის რომ აკონტროლო შენი ფინანსები',
    subtitle: 'შენი მონაცემები მხოლოდ შენს კომპიუტერშია.',
    items: [
      {
        ic: '◉',
        t: 'სრულად Self-hosted',
        d: 'აპლიკაცია მუშაობს ლოკალურად შენს საკუთარ InstantDB ის მონაცემთა ბაზაზე',
      },
      {
        ic: '✉',
        t: 'კითხულობს მხოლოდ SMS-ებს',
        d: 'Xarji ამუშავებს იმავე შეტყობინებებს, რომლებსაც ბანკი ისედაც გიგზავნის. არ საჭიროებს საბანკო პაროლებს, API გასაღებებს ან ეკრანის სკანირებას.',
      },
      {
        ic: '◈',
        t: 'ქართული ბანკებისთვის',
        d: 'მხარდაჭერილია: საქართველოს ბანკი (Solo) და თიბისი. მალე დაემატება: ლიბერთი, ბაზისბანკი, პროკრედიტი, კრედო, ტერაბანკი და სხვები.',
      },
      {
        ic: '⬢',
        t: 'თვითსწავლებადი კატეგორიები',
        d: 'მიუთითე ერთხელ, რომ "WOLT.GE" არის საკვები და აპლიკაცია ამას დაიმახსოვრებს. მსგავსი დასახელების ობიექტები ავტომატურად გაერთიანდება.',
      },
      {
        ic: '∆',
        t: 'ანომალიები და სიგნალები',
        d: 'აპლიკაცია თავად შეგატყობინებს საეჭვო ტრანზაქციების, დუბლირებული ჩამოჭრებისა და უარყოფილი გადახდების შესახებ.',
      },
      {
        ic: '⬢',
        t: 'ექსპორტი ნებისმიერ დროს',
        d: 'შეგიძლია მონაცემების სრული ექსპორტი CSV ან JSON ფორმატში. შენი ინფორმაცია შენ გეკუთვნის და ხელმისაწვდომია ღია ფორმატში.',
      },
    ],
  },

  how: {
    eyebrow: 'როგორ მუშაობს',
    title: 'სამი ნაბიჯი. ნულოვანი რისკი.',
    stepLabel: 'ნაბიჯი',
    steps: [
      {
        n: '01',
        t: 'მიეცი Xarji-ს წვდომა SMS-ებზე',
        d: 'ინსტალაციის შემდეგ, Xarji ითხოვს მხოლოდ Messages.app-ის მონაცემთა ბაზის წაკითხვის უფლებას.',
      },
      {
        n: '02',
        t: 'SMS-ების დამუშავება',
        d: 'საქართველოს ბანკისა და თიბისის პარსერები გარდაქმნიან ტექსტურ შეტყობინებებს სტრუქტურირებულ მონაცემებად.',
      },
      {
        n: '03',
        t: 'ლოკალური Dashboard',
        d: 'მონაცემები მყისიერად აისახება შენს ეკრანზე',
      },
    ],
    banks: {
      eyebrow: 'მხარდაჭერილი ბანკები',
      title: 'მორგებულია ქართულ საბანკო სისტემაზე.',
      subtitle: 'ამჟამად მუშაობს ორი მთავარი ბანკი. დანარჩენები დაემატება პრიორიტეტის მიხედვით.',
      supportedLabel: 'უკვე მუშაობს',
      plannedLabel: 'Roadmap',
      supported: [
        { k: 'BOG', n: 'საქართველოს ბანკი', c: '#ffc83d', sub: 'Solo SMS · parser · live' },
        { k: 'TBC', n: 'თიბისი ბანკი', c: '#00aaff', sub: 'TBC SMS · parser · live' },
      ],
      planned: [
        { k: 'LIB', n: 'ლიბერთი ბანკი' },
        { k: 'BAS', n: 'ბაზისბანკი' },
        { k: 'PRC', n: 'პროკრედიტ ბანკი' },
        { k: 'CRD', n: 'კრედო ბანკი' },
        { k: 'TER', n: 'ტერაბანკი' },
        { k: 'CRT', n: 'ქართუ ბანკი' },
        { k: 'HLK', n: 'ჰალიკ ბანკი' },
        { k: 'VTB', n: 'ვითიბი საქართველო' },
        { k: 'PSH', n: 'პაშა ბანკი' },
        { k: 'ISB', n: 'იშბანკი' },
        { k: 'ZIR', n: 'ზირაათ ბანკი' },
        { k: 'SLK', n: 'სილქ როუდ ბანკი' },
      ],
    },
  },

  download: {
    eyebrow: 'Download',
    title: 'ერთი ფაილი. რეგისტრაციის გარეშე.',
    latestBadge: 'ბოლო ვერსია',
    xarjiForPre: 'Xarji ',
    xarjiForAccent: 'macOS-ისთვის',
    releasedPrefix: 'გამოვიდა',
    requires: 'macOS Apple Silicon',
    dmgCta: 'Xarji.dmg ჩამოტვირთვა',
    signedNotarized: '· signed · notarized',
    changelogLabel: 'ცვლილებების ისტორია',
    whatsNewPrefix: 'რა არის ახალი ამ ვერსიაში: ',
    releaseNotes: [
      'აპლიკაცია მუშაობს როგორც macOS-ის სრულფასოვანი პროგრამა — საკუთარი ფანჯრით და Dock icon-ით',
      'დაემატა "Install as app" ღილაკი გვერდითა პანელში (Chrome, Arc და სხვა ბრაუზერებისთვის)',
      'გაუმჯობესდა შეცდომების მართვის ეკრანი',
      'Web app manifest-ისა და ხატულების (icons) ოპტიმიზაცია',
      'მინიმალური სერვის-ვორკერი Chromium PWA ინსტალაციისთვის',
    ],
    previousLabel: 'წინა ვერსიები',
    priorDownloadLink: 'ჩამოტვირთვა →',
    priorSummaries: {
      '0.2.3': 'Animated onboarding · welcome glow fix',
      '0.2.2': 'Release process fixes',
      '0.2.1': 'Release process fixes',
      '0.2.0': 'Single binary built with Bun · browser onboarding · menubar shell',
      '0.1.1': 'Ink Dashboard redesign · multi-bank parser refactor',
    },
    fallbackPrefix: 'ეძებ ვერსიას Windows-ისთვის ან Linux-ისთვის? ',
    fallbackLink: 'ნახე FAQ →',
  },

  faq: {
    eyebrow: 'ხშირი კითხვები',
    title: 'პასუხები პოპულარულ კითხვებზე.',
    items: [
      {
        q: 'ნამდვილად self-hosted-ია? სად ინახება ჩემი მონაცემები?',
        a: 'მთლიანად შენს Mac-ზე. Xarji იყენებს InstantDB-ს, რომელსაც თავად ქმნი უფასოდ. ავტორიზაციის მონაცემები ინახება `~/.xarji/config.json`-ში. ჩვენს სერვერებს არანაირი კავშირი არ აქვთ შენს ინფორმაციასთან. აპლიკაციის წაშლის შემთხვევაში, მონაცემებიც მხოლოდ შენთან რჩება.',
      },
      {
        q: 'როგორ კითხულობს ბანკის SMS-ებს?',
        a: 'macOS Messages.app მიღებულ შეტყობინებებს ინახავს ლოკალურ ბაზაში (`~/Library/Messages/chat.db`), მხოლოდ მაშინ თუ iPhone-ზე ჩართული გაქვს SMS ების Cloud ზე შენახვა. როცა macOS იდანაც იგივე ექაუნთით იყენებ Messages აპლიკაციას, შენი შეტყობინებები ავტომატურად სინქრონირდება. Xarji ითხოვს წვდომას მხოლოდ ამ ფაილზე, ფილტრავს საბანკო ტრანზაქციებს და უგულებელყოფს ყველაფერ სხვას.',
      },
      {
        q: 'რომელი ბანკებია მხარდაჭერილი?',
        a: 'ამჟამად: **საქართველოს ბანკი (Solo)** და **თიბისი**. სხვა 12 ქართული ბანკის მხარდაჭერა დაგეგმილია. თუ შენი ბანკი სიაში არ არის და გსურს დაგვეხმარო, გაგვიზიარე ანონიმური SMS-ის ნიმუშები GitHub-ზე.',
      },
      {
        q: 'არსებობს Windows ან Linux ვერსია?',
        a: 'ჯერჯერობით არა. Xarji დამოკიდებულია macOS-ის ფუნქციაზე, რომელიც iPhone-იდან SMS-ებს Messages აპლიკაციაში ასინქრონებს.',
      },
      {
        q: 'რატომ InstantDB?',
        a: 'ეს საშუალებას გვაძლევს მონაცემები მომენტალურად აისახოს ლოკალური სინქრონიზაციით.',
      },
      {
        q: 'შესაძლებელია მონაცემების ექსპორტი?',
        a: 'დიახ, სრული CSV და JSON ექსპორტი ნებისმიერ დროს.',
      },
      {
        q: 'Open Source ია?',
        a: 'დიახ, ვრცელდება MIT ლიცენზიით. კოდი ხელმისაწვდომია GitHub-ზე. ნებისმიერი დახმარება, განსაკუთრებით ახალი ბანკების პარსერების შექმნაში, მისასალმებელია.',
      },
      {
        q: 'რა ღირს?',
        a: 'სრულიად უფასოა. არ არსებობს ფასიანი ვერსია ან გამოწერა. თუ პროექტი მოგწონს, შეგიძლია დაგვიწერო ვარსკვლავი (star) რეპოზიტორიაზე https://github.com/tornikegomareli/Xarji.',
      },
    ],
  },

  newsletter: {
    eyebrow: 'იყავი ინფორმირებული',
    titlePre: 'სიახლეები, ',
    titleAccent: 'ზედმეტი შეტყობინებების გარეშე',
    titlePost: '.',
    body:
      'მოკლე ელ-ფოსტა მხოლოდ მაშინ, როცა ახალი ვერსია გამოვა ან ახალი ბანკი დაემატება. არანაირი მარკეტინგი და სპამი. გამოწერის გაუქმება შესაძლებელია ერთი დაწკაპუნებით.',
    emailPlaceholder: 'შენი@email.com',
    subscribeCta: 'გამოწერა',
    successTitle: 'მადლობა გამოწერისთვის.',
    successSubPre: 'დასტური გავგზავნეთ ',
    successSubPost: '-ზე. პროცესის დასასრულებლად მიჰყევით ბმულს.',
    trustNote: 'თქვენს ელ-ფოსტასაც იმავე პრინციპით ვინახავთ: არანაირი მესამე მხარის ტრეკერები.',
  },

  techStack: {
    eyebrow: 'ტექნოლოგიები',
    items: [
      { name: 'InstantDB', role: 'Local Sync Engine', link: 'https://instantdb.com' },
      { name: 'React', role: 'Frontend', link: 'https://react.dev' },
      { name: 'Bun', role: 'Runtime', link: 'https://bun.sh' },
      { name: 'SwiftPM', role: 'macOS', link: 'https://www.swift.org/documentation/package-manager/' },
    ],
  },

  footer: {
    brand: 'Xarji · ხარჯი',
    madeIn: 'Built in with Love · MIT License · © 2026',
    productCol: {
      title: 'პროდუქტი',
      links: [
        { label: 'მიმოხილვა', href: '#product' },
        { label: 'როგორ მუშაობს', href: '#how' },
        { label: 'ჩამოტვირთვა', href: '#download' },
        { label: 'სიახლეები', href: '#download' },
      ],
    },
    resourcesCol: {
      title: 'რესურსები',
      faqLabel: 'FAQ',
      githubLabel: 'GitHub',
      instantdbLabel: 'InstantDB',
      bugLabel: 'შეცდომის მოხსენება',
    },
    legalCol: {
      title: 'სამართლებრივი',
      licenseLabel: 'ლიცენზია · MIT',
      sourceLabel: 'წყარო',
    },
    notAffiliated: 'აპლიკაცია არ არის დაკავშირებული არცერთ ბანკთან. ვალუტის კურსი აღებულია ეროვნული ბანკისგან.',
  },
};
