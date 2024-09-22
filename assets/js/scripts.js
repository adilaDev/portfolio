// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Close menu when a link is clicked (optional)
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
    });
});

// Membuat konten dinamis dari data_portofolio.json
document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/db/data_portofolio.json')
        .then(response => response.json())
        .then(data => {
            // Mengisi konten berdasarkan data dari JSON
            populateProfil(data.profil);
            populateSkill(data.skill);
            populatePengalamanKerja(data.pengalaman_kerja);
            populateProyek(data.proyek);
            populateCV(data.cv);
            populateKontak(data.kontak);
        })
        .catch((error) => {
            console.error('Error loading portfolio data:', error);
        });
});

// Mengisi bagian Profil
function populateProfil(profil) {
    const profilContent = document.getElementById('profil-content');
    profilContent.innerHTML = `
        <img src="${profil.foto}" alt="Profil" width="290" height="250" class="profil-imgs">
        <div class="profil-text">
            <p>${profil.deskripsi}</p>
        </div>
    `;
}

// Mengisi bagian Skill
function populateSkill(skills) {
    const skillContent = document.getElementById('skill-content');
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        console.log("nama: ", skill.nama);
        if (skill.nama === 'Backend Development' || skill.nama === "Frontend Development") {
            skillItem.setAttribute("data-aos", "flip-right");
        } else {
            skillItem.setAttribute("data-aos", "flip-left");       
        }
        skillItem.setAttribute("data-aos-duration", "1000");
        const items = skill.items.map(item => `
            <div class="skill-subitem">
                <p title="${item.nama}">${item.nama}</p>
                <div class="progress-bar" style="width: 55%; margin: 5px 15px;">
                    <div class="progress" style="width: ${item.persentase}%;" title="${item.persentase}%">
                        <div class="text-progress">${item.persentase}%</div>
                    </div>
                </div>
            </div>
        `).join('');

        skillItem.innerHTML = `
            <h3><i class="${skill.icon}" style="margin-right: 5px;"></i> ${skill.nama}</h3>
            ${items}
        `;
        skillContent.appendChild(skillItem);
    });
}

// Mengisi bagian Pengalaman Kerja dalam bentuk horizontal timeline
function populatePengalamanKerja(pengalaman) {
    const pengalamanContent = document.getElementById('pengalaman-content');
    
    pengalaman.forEach(item => {
        const timelineItem = document.createElement('li');
        timelineItem.setAttribute("data-aos", "zoom-out-up");
        timelineItem.setAttribute("data-aos-duration", "1000");

        timelineItem.innerHTML = `
            <div div class = "timeline-content" data-aos="zoom-out-up" data-aos-duration="1000" >
                <div class="card-header">${item.nama_perusahaan}</div>
                <h3 class="padding-timeline">${item.posisi}</h3>
                <span class="padding-timeline">${item.tahun}</span>
                <p class="padding-timeline">${item.job_desc}</p>
            </div>
        `;
        pengalamanContent.appendChild(timelineItem);
    });
}

// Mengisi bagian Proyek
function populateProyek(proyek) {
    const proyekContent = document.getElementById('proyek-content');
    proyek.forEach(item => {
        const proyekItem = document.createElement('div');
        proyekItem.classList.add('proyek-item');
        proyekItem.setAttribute("data-aos", "zoom-out-up");
        proyekItem.setAttribute("data-aos-duration", "1000");
        proyekItem.innerHTML = `
            <img src="${item.gambar}" alt="${item.judul}" class="proyek-img">
            <div class="proyek-text">
                <a href="${item.link}" target="_blank"><h3>${item.judul}</h3></a>
                <p>${item.deskripsi}</p>
            </div>
        `;
        proyekContent.appendChild(proyekItem);
    });
}

// Mengisi bagian CV dengan link untuk diunduh
function populateCV(cv) {
    const deksripsiCv = document.getElementById('deksripsi-cv');
    const downloadCV = document.getElementById('download-cv');
    deksripsiCv.textContent = cv.deskripsi;
    downloadCV.href = cv.file;
}

// Mengisi bagian kontak sosial
function populateKontak(kontak) {
    const socialLinks = document.getElementById('social-links');
    kontak.forEach((item) => {
        const a = `
            <a href="${item.url}" target="_blank">
                <i class="${item.icon}"></i> ${item.nama}
            </a>`;
        socialLinks.innerHTML += a;
    })
}
