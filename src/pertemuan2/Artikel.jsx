export default function Artikel() {
    return (
        <div>
            <Header />
            <Nama />
            <Description />
            <Point
                poin="KVAC, Bikin Proses Membuat Visa Korea-mu Makin Mudah"
                inti="Mengurus visa Korea Selatan tidak lagi bisa dilakukan di Kedutaan Besar Republik Korea Selatan ya, sobat tiket. Melainkan, kamu bisa mengurusnya di Korea Visa Application Center (KVAC) yang berada di lantai 5, Mall Lotte Shopping Avenue, Kuningan, Jakarta.

                Selain berpindah tempat, fasilitas loket juga ditambah nih, dari 5 menjadi 12. Tentunya pelayanan dan penanganan pengajuan visa akan lebih cepat. Waktu buka layanan penerimaan pengajuan visa di KVAC pun diperpanjang menjadi mulai dari 09.00 WIB – 15.00 WIB lho."
            />
            <img src="img/download (1).jpg" alt="visa" />
        </div>
    )
}
function Nama() {
    return (
        <small>Nur Muhammad</small>
    )
}
function Description() {
    return (
        <p>Korea, salah satu negara yang kerap dikunjungi wisatawan mancanegara. Nah, untuk kamu yang pengin pergi berlibur ke luar negeri, tentunya ada beberapa hal yang perlu kamu perhatikan ya!

            Di samping mengurus paspor, ada juga visa nih yang perlu kamu persiapkan. Nah, buat kamu yang akan liburan ke negerinya para oppa alias Korea Selatan, kamu udah tahu belum cara membuat visa Korea Selatan 2024 yang mudah dan cepat? Tenang, cek info lengkapnya di sini!</p>
    )
}
function Header() {
    return (
        <h1>Visa Korea Selatan</h1>
    )
}
function Point(props) {
    return (
        <div>
            <h2>{props.poin}</h2>
            <p>{props.inti}</p>
        </div>
    )
}