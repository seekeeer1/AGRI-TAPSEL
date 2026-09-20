import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Card, Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { APP_ALT_NAMES, APP_NAME, APP_TAGLINE } from "@/lib/data";

export default function KonsepPage() {
  return (
    <Page kicker="Dokumen gerakan" title={`${APP_NAME}`} wide>
      <p className="font-display text-xl text-fg-muted">{APP_TAGLINE}</p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
        Konsep lengkap untuk membangun komunitas petani yang kuat di Kabupaten Tapanuli Selatan
        melalui tokenisasi aset pertanian yang terikat barang nyata — bukan spekulasi.
      </p>

      <img
        src="/images/hero-tapsel.jpg"
        alt="Lanskap pertanian Tapanuli Selatan"
        className="mt-6 h-56 w-full rounded-2xl object-cover md:h-72"
 loading="lazy" decoding="async" />

      <Section n="01" title="Nama & identitas">
        <p>
          Merek yang dipakai: <strong>{APP_NAME}</strong>. Tagline: <em>{APP_TAGLINE}</em>. Nama ini
          lurus, mudah diingat dinas dan petani, dan menempel pada daerah.
        </p>
        <p className="mt-3">Nama cadangan jika suatu saat perlu lebih “kampung”:</p>
        <ul className="mt-2 space-y-2">
          {APP_ALT_NAMES.map((a) => (
            <li key={a.name}>
              <Card>
                <p className="font-medium">{a.name}</p>
                <p className="text-sm text-fg-muted">{a.why}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section n="02" title="Visi dan misi">
        <p>
          <strong>Visi.</strong> Tapanuli Selatan swasembada bukan hanya beras di gudang pemerintah,
          melainkan petani rakyat yang punya kuasa atas harga, data, dan hasil kerjanya.
        </p>
        <p className="mt-3">
          <strong>Misi.</strong> (1) Mengubah panen jadi aset yang bisa dipegang, digadai, atau dijual
          tanpa tengkulak gelap. (2) Membuka pintu modal dari diaspora dan tetangga desa dengan bagi
          hasil yang tertulis. (3) Menjaga adat gotong royong — marharoan — dalam bentuk digital yang
          jujur. (4) Menarik anak muda tetap di huta, bukan hanya merantau. (5) Memberi Pemda peta
          hidup: desa mana aktif, komoditas mana bergerak, stok mana nyata.
        </p>
      </Section>

      <Section n="03" title="Siapa yang dilayani">
        <div className="grid gap-3 md:grid-cols-2">
          <Who
            t="Petani kecil"
            d="Pemilik 0,5–3 ha kopi, kakao, karet, sawit, padi, salak, aren. Butuh harga wajar, kas tanam, dan gudang yang jujur."
          />
          <Who
            t="Petani milenial"
            d="Anak gapoktan yang melek HP. Mereka jadi jembatan: catat panen, olah, cerita kebun, tarik kawan sebaya."
          />
          <Who
            t="Investor lokal & diaspora"
            d="Anak Tapsel di Medan, Jakarta, Malaysia. Ingin menolong kampung tanpa membeli tanah spekulatif."
          />
          <Who
            t="Koperasi & gapoktan"
            d="Penjaga stok fisik. Mereka menimbang, menyimpan, dan menandatangani bahwa 1 token = 1 kg di gudang."
          />
          <Who
            t="Pemerintah daerah"
            d="Dinas Pertanian, Bappeda, penyuluh. Butuh alat aktivasi desa, modul, dan data yang bisa dicek."
          />
        </div>
      </Section>

      <Section n="04" title="Fitur: MVP vs lanjutan">
        <h3 className="font-display text-lg font-semibold">MVP (bulan 1–6) — yang sudah bisa dicoba di aplikasi ini</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Identitas petani sederhana + profil lahan (demo NIK).</li>
          <li>Token panen 1:1 dengan stok koperasi (kopi, kakao dulu).</li>
          <li>Pasar desa: unggah stok, harga, jejak kebun.</li>
          <li>Gotong royong digital: patungan pupuk/alat.</li>
          <li>Feed komunitas per komoditas & kecamatan.</li>
          <li>Dompet rupiah + QRIS (mitra bank/PJP).</li>
          <li>Modul belajar + cuaca 7 hari + kalkulator tanam.</li>
          <li>Pendanaan panen di muka (kontrak bagi hasil).</li>
        </ul>
        <h3 className="mt-5 font-display text-lg font-semibold">Versi lanjutan (bulan 7–18)</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Resi gudang resmi (UU Sistem Resi Gudang) sebagai payung hukum token.</li>
          <li>Bagian kebun berupa hak bagi hasil, bukan pecahan SHM.</li>
          <li>Integrasi grup WhatsApp/Telegram per desa (bot pengumuman).</li>
          <li>Asuransi iklim mikro, ranking petani, ekspor ber-trace.</li>
          <li>Sawit TBS, karet bokar, salak, kulit manis, kemiri, aren.</li>
          <li>Panel admin web untuk Dinas dan koperasi primer.</li>
        </ul>
      </Section>

      <Section n="05" title="Manfaat petani dan investor">
        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <p className="font-medium">Petani</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-fg-muted">
              <li>Harga terbuka, bukan dikunci tengkulak.</li>
              <li>Panen bisa “disimpan” sebagai token, dijual saat harga naik.</li>
              <li>Modal tanam dari tetangga dan diaspora, bukan bunga mencekik.</li>
              <li>Nama kebun tercatat — martabat, bukan hanya kilo.</li>
            </ul>
          </Card>
          <Card>
            <p className="font-medium">Investor</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-fg-muted">
              <li>Uang tertambat ke kakao/kopi yang ada, bukan koin kosong.</li>
              <li>Jejak kebun sampai gudang.</li>
              <li>Bagi hasil otomatis saat koperasi mencairkan jual.</li>
              <li>Rasa pulang kampung yang terukur, bukan donasi buta.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section n="06" title="Cara aplikasi hidup tanpa merugikan petani">
        <p>Prinsip: petani kecil tidak bayar untuk hak dasar. Yang bayar adalah yang mengambil nilai lebih.</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>Biaya pasar 1%</strong> dibebankan ke pembeli/eksportir, bukan ke petani di bawah
            ambang 2 ton per musim.
          </li>
          <li>
            <strong>Biaya sukses investor 8%</strong> dari keuntungan, bukan dari pokok. Rugi bersama
            jika gagal panen sesuai kontrak.
          </li>
          <li>
            <strong>Langganan koperasi</strong> Rp 150 ribu/bulan — bisa disubsidi APBD tahun pertama.
          </li>
          <li>
            <strong>Sertifikat jejak</strong> untuk eksportir dan merek kopi yang butuh cerita asal.
          </li>
          <li>
            <strong>Tidak ada biaya cetak token</strong> bagi petani di desa percontohan.
          </li>
        </ul>
      </Section>

      <Section n="07" title="Cara masuk ke desa">
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>
            <strong>Pilih 4 desa jangkar:</strong> Bunga Bondar & Hutaraja (kopi Sipirok), Marancar
            Godang (kakao), Parsalakan (karet).
          </li>
          <li>
            <strong>Duduk dengan raja adat, ketua gapoktan, dan penyuluh</strong> — bukan sosialisasi
            dari atas. Horas dulu, aplikasi belakangan.
          </li>
          <li>
            <strong>Anak muda desa jadi juru catat.</strong> Petani tua cukup timbang dan cap jempol.
            HP boleh milik anak.
          </li>
          <li>
            <strong>Koperasi jadi gudang resmi.</strong> Tanpa gudang, token tidak boleh terbit.
          </li>
          <li>
            <strong>Kolaborasi:</strong> Dinas Pertanian (modul & penyuluh), Bank Nagari/BSI/BRI
            (QRIS), MPIG Kopi Arabika Tapsel, BUMDes, diaspora Tapsel di Medan/Jakarta.
          </li>
        </ol>
      </Section>

      <Section n="08" title="Risiko dan penahan">
        <div className="space-y-3">
          <Risk
            t="Regulasi token di Indonesia"
            d="Aset kripto kini di bawah OJK. Token panen jangan diposisikan sebagai ‘koin investasi spekulatif’. Payung yang lebih aman: resi gudang digital + kontrak bagi hasil koperasi. Pecahan sertifikat tanah (SHM) dihindari — UUPA tidak mengizinkan spekulasi lahan pertanian. Yang dijual: hak hasil kebun, bukan tanah."
          />
          <Risk
            t="Petani tua dan HP"
            d="Onboarding berdua: petani + anak/cucu. Mode suara, tombol besar, bahasa ladang. Koperasi punya meja bantu setiap hari pasar."
          />
          <Risk
            t="Stok fiktif"
            d="Token hanya terbit setelah timbang dual-control. Audit acak. Selisih gudang vs token menghentikan terbit baru."
          />
          <Risk
            t="Harga jatuh & iklim"
            d="Jangan janji return. Tampilkan risiko. Gotong royong dan dana cadangan desa menahan musim kering."
          />
          <Risk
            t="Keamanan uang"
            d="PIN, perangkat terdaftar, tidak ada seed phrase yang disodorkan ke petani. Kunci rantai dipegang koperasi berkustodian, bukan HP Android 2018."
          />
        </div>
      </Section>

      <Section n="09" title="Peta jalan 12 bulan">
        <ol className="space-y-3">
          <Road m="Bulan 1–2" t="Pondasi" d="Desain layanan, MoU Pemda & 2 koperasi, pilih Polygon (biaya sangat rendah) atau jaringan setara. Identitas petani + peta lahan 4 desa." />
          <Road m="Bulan 3–4" t="Gudang hidup" d="Timbang, resi internal, token kopi & kakao. Pelatihan 40 juru catat muda. Modul petik merah dan fermentasi." />
          <Road m="Bulan 5–6" t="Pasar & patungan" d="Marketplace tertutup anggota. Gotong royong pupuk. QRIS. Uji beli oleh 20 diaspora." />
          <Road m="Bulan 7–8" t="Pendanaan panen" d="Kampanye pertama kopi Sipirok. Kontrak bagi hasil. Panel Dinas." />
          <Road m="Bulan 9–10" t="Perluasan" d="Karet Parsalakan, aren Arse, padi Silatihan. WhatsApp bot desa. Audit stok independen." />
          <Road m="Bulan 11–12" t="Tinjau & buka" d="Laporan musim, rapat adat + Pemda, keputusan komoditas tahun ke-2. Siapkan izin resi gudang jika volume cukup." />
        </ol>
      </Section>

      <Card className="mt-8 bg-forest text-primary-foreground">
        <p className="font-display text-xl font-semibold">Marsipature huta na be</p>
        <p className="mt-2 text-sm text-primary-foreground/75">
          Mari kita bangun kampung sendiri. Aplikasi ini percontohan — sentuh Token, Pasar, Gotong
          royong, dan Pendanaan untuk merasakan alurnya.
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex h-11 items-center rounded-lg bg-leaf px-4 text-sm font-medium text-primary-foreground"
        >
          Kembali ke beranda
        </Link>
      </Card>
    </Page>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <p className="text-xs font-medium uppercase tracking-wider text-ulos">{n}</p>
      <h2 className="mt-1 font-display text-2xl font-semibold">{title}</h2>
      <div className="mt-3 max-w-2xl text-sm leading-relaxed text-fg">{children}</div>
    </section>
  );
}

function Who({ t, d }: { t: string; d: string }) {
  return (
    <Card>
      <p className="font-medium">{t}</p>
      <p className="mt-1 text-sm text-fg-muted">{d}</p>
    </Card>
  );
}

function Risk({ t, d }: { t: string; d: string }) {
  return (
    <Card>
      <div className="flex items-start gap-2">
        <Badge tone="ulos">Risiko</Badge>
        <p className="font-medium">{t}</p>
      </div>
      <p className="mt-2 text-sm text-fg-muted">{d}</p>
    </Card>
  );
}

function Road({ m, t, d }: { m: string; t: string; d: string }) {
  return (
    <li className="rounded-2xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
      <p className="text-xs font-medium uppercase tracking-wider text-leaf">{m}</p>
      <p className="font-medium">{t}</p>
      <p className="mt-1 text-sm text-fg-muted">{d}</p>
    </li>
  );
}
