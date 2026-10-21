/* ==========================================================================
   GİZEMLİ GECE - ETKİLEŞİM VE MANTIK DOSYASI (script.js)
   Açıklama: Sahne geçişlerini ve kullanıcı seçimlerini yöneten sade JavaScript kodu.
   ========================================================================== */

// 1. HTML'deki Elemanları Seçme (DOM Manipülasyonu)
// Sayfadaki metin alanını, butonların ekleneceği kutuyu ve başa dön butonunu yakalıyoruz.
const storyTextElement = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const restartButton = document.getElementById('restart-btn');

// 2. Sahne Verileri (Oyun Haritası)
// Bir nesne (Object) yapısı kullanarak her sahneyi ve o sahnenin seçeneklerini tanımlıyoruz.
// Bu yöntem, onlarca "if-else" yazmak yerine kodun düzenli ve kolayca genişletilebilir olmasını sağlar.
const storyScenes = {
    // Açılış Ekranı
    start: {
        text: "Karanlık ve tekinsiz bir gecede bilinmeze adım atmaya hazır mısın?",
        choices: [
            { text: "Hikâyeye Başla", targetScene: "waking_up" }
        ],
        showRestart: false // Başlangıç ekranında başa dön butonu görünmesin
    },

    // 1. Aşama: Gizemli Binada Uyanış
    waking_up: {
        text: "Gözlerini yavaşça açıyorsun. Kendini terk edilmiş, soğuk ve loş bir binanın zemininde buluyorsun. Başın hafifçe dönüyor ve buraya nasıl geldiğini hatırlamıyorsun. Karşında paslı menteşeleri gıcırdayan bir kapı var.",
        choices: [
            { text: "🚪 Koridora git", targetScene: "corridor" },
            { text: "🪑 Odada kal", targetScene: "stay_room" }
        ],
        showRestart: true
    },

    // Seçenek A: Koridora Gitme Hikâyesi
    corridor: {
        text: "Kapıyı usulca itip uzun, karanlık koridora adım atıyorsun. Ayak seslerin koridorda yankılanıyor. İlerideki köşeyi döndüğünde yerde hafifçe parıldayan pirinç bir anahtar ve duvara kazınmış bir işaret görüyorsun...",
        choices: [], // Bu dalın sonu
        showRestart: true
    },

    // Seçenek B: Odada Kalma Hikâyesi
    stay_room: {
        text: "Odada kalıp biraz daha beklemeye karar veriyorsun. Odanın sessizliğini dinlerken duvardaki eski tablonun arkasından hafif bir mekanik tıkırtı geliyor. Tablo yana kayıyor ve arkasından gizli bir geçit aralanıyor...",
        choices: [], // Bu dalın sonu
        showRestart: true
    }
};

// 3. Sahneyi Ekrana Yansıtma Fonksiyonu
function showScene(sceneKey) {
    const currentScene = storyScenes[sceneKey];

    // Hikaye metnini güncelle
    storyTextElement.textContent = currentScene.text;

    // Önceki sahneden kalan butonları temizle
    choicesContainer.innerHTML = '';

    // Bu sahnenin seçeneklerini tek tek dönüp dinamik olarak buton oluşturalım
    currentScene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.classList.add('btn');

        // Butona tıklandığında hedef sahneye geçiş yapmasını sağlıyoruz
        button.addEventListener('click', () => {
            showScene(choice.targetScene);
        });

        // Oluşturulan butonu ekrandaki taşıyıcıya ekle
        choicesContainer.appendChild(button);
    });

    // Başa Dön butonunun görünürlüğünü ayarla
    if (currentScene.showRestart) {
        restartButton.classList.remove('hidden');
    } else {
        restartButton.classList.add('hidden');
    }
}

// 4. "Başa Dön" Butonunun Olay Dinleyicisi
restartButton.addEventListener('click', () => {
    // Oyunu ilk açılış ekranına döndür
    showScene('start');
});

// 5. Oyunu Başlat
// Sayfa ilk yüklendiğinde "start" sahnesini ekrana getiriyoruz
showScene('start');
