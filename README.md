# Mohammadali Nemati Nejad — Premium Engineering Portfolio

**Domain:** https://nematinejad.cv  
**Brand:** ENGINEERING. EXECUTION. DESIGN.  
**Tagline:** FROM CONCEPT TO CONSTRUCTION.

سایت پورتفولیو شخصی حرفه‌ای برای مهندس عمران و مدیر پروژه — محمدعلی نعمتی‌نژاد

---

## فونت‌ها

| زبان | فونت | محل فایل |
|------|------|----------|
| فارسی | **Iran Yekan (BYekan+)** | `public/fonts/BYekan+.ttf` و `BYekan+ Bold.ttf` |
| انگلیسی (عنوان) | **Space Grotesk** | Google Fonts |
| انگلیسی (متن) | **Inter** | Google Fonts |

فونت ایران یکان به‌صورت محلی (`@font-face`) لود می‌شود.

---

## پیش‌نمایش محلی

```bash
cd public
npx serve .
# یا
python3 -m http.server 8080
```

مرورگر: `http://localhost:8080`

---

## استقرار روی Cloudflare Pages (رایگان — مرحله به مرحله)

### ۱. آپلود به GitHub
1. یک ریپازیتوری جدید در GitHub بسازید (مثلاً `nematinejad-cv`).
2. محتویات پوشه `nematinejad-portfolio` را داخل آن push کنید.

```bash
cd nematinejad-portfolio
git init
git add .
git commit -m "Initial premium portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nematinejad-cv.git
git push -u origin main
```

### ۲. اتصال به Cloudflare Pages
1. وارد https://dash.cloudflare.com شوید.
2. Workers & Pages → Create → Pages → Connect to Git.
3. ریپوی `nematinejad-cv` را انتخاب کنید.
4. تنظیمات Build:
   - Framework preset: **None**
   - Build command: *(خالی)*
   - Build output directory: **`public`**
5. Save and Deploy.

### ۳. اتصال دامنه nematinejad.cv
1. در پروژه Pages → Custom domains → Set up a domain.
2. دامنه `nematinejad.cv` را وارد کنید.
3. DNS را طبق پیشنهاد Cloudflare تنظیم کنید (معمولاً CNAME).
4. SSL خودکار فعال می‌شود.

### ۴. تست
- https://nematinejad.cv
- سوئیچ زبان FA/EN
- لینک تلفن و واتساپ
- موبایل

---

## واتساپ و تماس

- تلفن: `tel:+989212340352`
- واتساپ: `https://wa.me/989212340352`
- دکمه واتساپ سبز در بخش Contact

---

## افزودن عکس پروژه‌ها

1. عکس‌ها را اینجا بگذارید:
   `public/images/projects/<project-id>/`
2. در `public/scripts/main.js` فیلد coverImage و gallery اضافه کنید.
3. Placeholderها خودکار جایگزین می‌شوند.

---

## ساختار

```
nematinejad-portfolio/
├── public/                  ← خروجی Cloudflare
│   ├── index.html
│   ├── styles/main.css
│   ├── scripts/
│   ├── fonts/               ← Iran Yekan
│   ├── brand/               ← لوگو + کارت ویزیت
│   └── images/portrait/
├── src/content/projects/
└── README.md
```

---

ENGINEERING. EXECUTION. DESIGN.
